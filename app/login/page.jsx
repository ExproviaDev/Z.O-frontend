

"use client";
import React, { useState, useEffect, useRef } from "react";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi"; 
import { MdOutlineArrowBackIos } from "react-icons/md"; 
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/slices/authSlice"; 
import Cookies from "js-cookie";
import ForgotPasswordModal from "../Components/ForgotPasswordModal"; 

// Slow internet users depend on this headroom; do not shrink without re-evaluating UX.
const LOGIN_MAX_RETRIES = 3;
const LOGIN_PER_TRY_TIMEOUT_MS = 30000;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Connecting…");
  const [attempt, setAttempt] = useState(1);
  const [redirecting, setRedirecting] = useState(false);
  const progressIntervalRef = useRef(null);
  const finishLoginRef = useRef(null);

  // Pre-warm the homepage bundle so post-login navigation feels instant
  // even on slow networks where global prefetch is disabled.
  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  // Two-phase progress so the bar never visually freezes during a slow login:
  //   Phase A (0 → 85): fast climb (~3.5s) so the user immediately sees activity.
  //   Phase B (85 → 97): tiny crawl (~0.05/tick) so even a 30s+ wait keeps moving.
  // We never hit 100 here; success/error transitions handle the final jump.
  useEffect(() => {
    if (!loading) return;
    setLoadProgress(1);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => {
      setLoadProgress((p) => {
        if (p < 85) {
          const step = p < 28 ? 4 : p < 55 ? 3 : p < 75 ? 2 : 1;
          return Math.min(85, p + step);
        }
        if (p >= 97) return 97;
        return Math.min(97, p + 0.05);
      });
    }, 95);
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [loading]);

  // Stage-aware status copy: time-based on the first attempt, retry-counter on subsequent attempts.
  useEffect(() => {
    if (!loading) return;

    if (attempt > 1) {
      setStatusMessage(
        attempt === LOGIN_MAX_RETRIES
          ? `Last attempt… (${attempt}/${LOGIN_MAX_RETRIES})`
          : `Retrying… (${attempt}/${LOGIN_MAX_RETRIES})`
      );
      return;
    }

    const start = Date.now();
    setStatusMessage("Connecting…");
    const id = setInterval(() => {
      const elapsedSec = (Date.now() - start) / 1000;
      if (elapsedSec >= 30) setStatusMessage("Still working — don't close (slow connection).");
      else if (elapsedSec >= 15) setStatusMessage("Slow network — hang on.");
      else if (elapsedSec >= 5) setStatusMessage("Waiting for server…");
    }, 500);
    return () => clearInterval(id);
  }, [loading, attempt]);

  useEffect(() => {
    return () => {
      if (finishLoginRef.current) clearTimeout(finishLoginRef.current);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAttempt(1);
    setStatusMessage("Connecting…");

    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;
    let loginSucceeded = false;

    try {
      const loginWithRetry = async () => {
        for (let i = 0; i < LOGIN_MAX_RETRIES; i++) {
          setAttempt(i + 1);
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), LOGIN_PER_TRY_TIMEOUT_MS);
          try {
            const r = await fetch(backendUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
              signal: controller.signal,
            });
            clearTimeout(timeoutId);

            if (r.status === 429 && i < LOGIN_MAX_RETRIES - 1) {
              await new Promise((resolve) => setTimeout(resolve, 800 * (i + 1)));
              continue;
            }

            return r;
          } catch (err) {
            clearTimeout(timeoutId);
            if (i === LOGIN_MAX_RETRIES - 1) throw err;
            await new Promise((resolve) => setTimeout(resolve, 500 * (i + 1)));
          }
        }
      };

      const res = await loginWithRetry();

      let data = null;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = { message: text || "Unexpected server response." };
      }

      if (res.ok && data.token) {
        loginSucceeded = true;
        localStorage.setItem("access_token", data.token);
        // Login response carries only the lean profile fields needed above the fold;
        // the heavier fields are background-hydrated below after navigation kicks in.
        localStorage.setItem("user_data", JSON.stringify(data.user));
        Cookies.set("access_token", data.token, { expires: 1 });
        dispatch(setLogin({ user: data.user, token: data.token }));
        setStatusMessage("Login successful! Redirecting…");
        setLoadProgress(99);
        // Cover the login page with a transition overlay so the user immediately
        // sees a navigation state instead of a "stuck" login form while the
        // homepage bundle finishes loading on slower networks.
        setRedirecting(true);
        router.replace("/");

        // Background-hydrate the full profile (phone, district, institution, etc.)
        // without blocking navigation. Failures are silent — homepage already
        // has everything it needs from the lean login response.
        const tokenForHydrate = data.token;
        const userBaseline = data.user;
        Promise.resolve().then(async () => {
          try {
            const meRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${tokenForHydrate}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (!meRes.ok) return;
            const meData = await meRes.json();
            if (meData?.isAuthenticated && meData.user) {
              const merged = { ...userBaseline, ...meData.user };
              localStorage.setItem("user_data", JSON.stringify(merged));
              dispatch(setLogin({ user: merged, token: tokenForHydrate }));
            }
          } catch {
            // Silent — lean profile is enough for first render.
          }
        });
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      const aborted =
        err?.name === "AbortError" ||
        err?.name === "TimeoutError" ||
        (typeof err?.message === "string" &&
          err.message.toLowerCase().includes("abort"));
      if (aborted) {
        setError(
          "Your connection seems too slow. Please try a different network and try again."
        );
      } else {
        setError("Network issue. Please try a different network or try again later.");
      }
    } finally {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      setLoadProgress(100);
      if (finishLoginRef.current) clearTimeout(finishLoginRef.current);
      finishLoginRef.current = setTimeout(() => {
        setLoading(false);
        setLoadProgress(0);
        setAttempt(1);
        finishLoginRef.current = null;
      }, loginSucceeded ? 160 : 450);
    }
  };

  return (
    <>
      {redirecting && (
        <div
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-linear-to-br from-[#0F172A] via-[#1E293B] to-[#020617] text-white"
          aria-busy="true"
          aria-live="polite"
          role="status"
        >
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white/10 shadow-2xl backdrop-blur-sm">
            <span className="absolute inset-0 animate-ping rounded-full bg-white/10" />
            <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-white border-r-white/40" />
            <svg
              className="relative h-12 w-12 text-white drop-shadow-md"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="mt-8 text-2xl font-semibold tracking-wide">
            Login Successful
          </p>
        </div>
      )}
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4 sm:p-0 font-sans">
      <div className="bg-white w-full max-w-5xl h-auto md:h-[650px] shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
        
        <div className="w-full md:w-1/2 bg-[#0F172A] relative flex flex-col justify-center p-10 z-10 overflow-hidden">
          
          <div className="absolute top-6 left-6 z-30">
            <Link href="/">
              <button className="flex items-center cursor-pointer text-white/80 hover:text-white transition-colors font-medium text-sm">
                <MdOutlineArrowBackIos className="mr-1" />
                Back to Home
              </button>
            </Link>
          </div>

          <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-[#1E293B] rounded-full opacity-70"></div>
          <div className="absolute bottom-[-150px] right-[-50px] w-80 h-80 bg-[#1E293B] rounded-full opacity-70"></div>
          <div className="absolute top-[30%] right-[-80px] w-40 h-40 bg-[#334155] rounded-full opacity-60"></div>

          <div className="relative z-20 text-white md:ml-10 mt-16 md:mt-0">
            <h1 className="text-4xl font-bold mb-2 tracking-wide">WELCOME</h1>
            <h2 className="text-xl font-medium mb-4 text-Primary ">Zero Olympiad</h2>
            <p className="text-blue-100 text-sm max-w-xs leading-relaxed opacity-80">
              Challenge your knowledge, compete with the best, and rise to the top on the ultimate quiz competition platform.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-8 md:p-14 z-30">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              Sign in
            </h2>
            <p className="text-gray-500 text-sm mb-8 text-center">
              Log in to your account to continue.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
                <FiUser className="text-gray-500 mr-3" size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="User Name / Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent text-gray-800 outline-none placeholder-gray-500 font-medium"
                  required
                />
              </div>

              <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 relative">
                <FiLock className="text-gray-500 mr-3" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent text-gray-800 outline-none placeholder-gray-500 font-medium pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-500 hover:text-[#0F172A] transition-colors"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm font-medium">
                
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="text-[#0F172A] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

              <div className="flex flex-col gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0F172A] hover:bg-[#020617] cursor-pointer text-white font-bold py-3 rounded-lg shadow-md transition-transform active:scale-95 disabled:opacity-70 text-lg"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>

                {loading && (
                  <div
                    className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 shadow-inner"
                    aria-busy="true"
                    aria-live="polite"
                  >
                    <div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold text-slate-600">
                      <span className="tabular-nums text-[#0F172A]">{Math.round(loadProgress)}%</span>
                      <span className="text-right font-normal text-slate-500">
                        {statusMessage}
                      </span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-200/90">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-[#0F172A] to-[#334155] transition-[width] duration-150 ease-out"
                        style={{ width: `${Math.min(100, loadProgress)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center text-sm text-gray-500 mt-4 font-medium">
                Don't have an account?{" "}
                <Link href="/registration">
                  <span className="text-[#0F172A] font-bold hover:underline cursor-pointer">
                    Sign Up
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isModalOpen && <ForgotPasswordModal onClose={() => setIsModalOpen(false)} />}
    </div>
    </>
  );
}
