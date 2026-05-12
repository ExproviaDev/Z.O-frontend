"use client";
import React, { useEffect, useRef, useState } from "react";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { MdOutlineArrowBackIos } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { setLogin } from "../store/slices/authSlice";
import Cookies from "js-cookie";
import ForgotPasswordModal from "../Components/ForgotPasswordModal";
import FullPageLoader from "../Components/FullPageLoader";
import { removeAllProfileQueries } from "../lib/hooks/useUserProfile";

/** One round-trip attempt; after this we stop waiting and show a clear network message. */
const LOGIN_ATTEMPT_TIMEOUT_MS = 15_000;
/** Limits hammering Try again after a slow-connection timeout vs quick typo retries. */
const MIN_MS_AFTER_QUICK_FINISH = 1_600;
const MIN_MS_AFTER_SLOW_TIMEOUT_FINISH = 8_000;

const SLOW_OR_BLOCKED_CONNECTION_MESSAGE =
  "This is taking longer than usual. It usually means your connection is slow, unstable, or restricted. Try switching to another Wi‑Fi network or mobile data, or use a VPN you trust, then try signing in again.";

async function readLoginPayload(res) {
  const ctype = res.headers.get("content-type") || "";
  if (ctype.includes("application/json")) {
    try {
      return { json: await res.json(), text: "" };
    } catch {
      return { json: null, text: "" };
    }
  }
  const text = await res.text();
  return { json: null, text: text.trim() };
}

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  /** True when the last failure was our client-side login timeout (15s). */
  const [showSlowConnectionRetry, setShowSlowConnectionRetry] =
    useState(false);

  const slowTimerRef = useRef(null);
  const abortRef = useRef(null);
  const lastAttemptEndedAtRef = useRef(0);
  const prevAttemptWasSlowTimeoutRef = useRef(false);
  const suppressAbortErrorUiRef = useRef(false);

  useEffect(() => {
    return () => {
      suppressAbortErrorUiRef.current = true;
      if (slowTimerRef.current) {
        clearTimeout(slowTimerRef.current);
        slowTimerRef.current = null;
      }
      abortRef.current?.abort();
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setShowSlowConnectionRetry(false);
  };

  const beginLoginAttempt = () => {
    const now = Date.now();
    const endedAt = lastAttemptEndedAtRef.current;
    if (endedAt > 0) {
      const minGap = prevAttemptWasSlowTimeoutRef.current
        ? MIN_MS_AFTER_SLOW_TIMEOUT_FINISH
        : MIN_MS_AFTER_QUICK_FINISH;
      if (now - endedAt < minGap) {
        const sec = Math.ceil((minGap - (now - endedAt)) / 1000);
        setError(
          sec <= 1
            ? "Please wait a moment before trying again."
            : `Please wait about ${sec} seconds before trying again.`,
        );
        return false;
      }
    }
    return true;
  };

  const clearSlowLoginTimer = () => {
    if (slowTimerRef.current) {
      clearTimeout(slowTimerRef.current);
      slowTimerRef.current = null;
    }
  };

  const runLoginAttempt = async () => {
    if (!beginLoginAttempt()) return;

    suppressAbortErrorUiRef.current = false;

    /** Set in catch when our 15s timer aborts the request. */
    let attemptHitSlowTimeout = false;

    setLoading(true);
    setError("");
    setShowSlowConnectionRetry(false);

    const controller = new AbortController();
    abortRef.current = controller;

    slowTimerRef.current = setTimeout(() => {
      controller.abort();
    }, LOGIN_ATTEMPT_TIMEOUT_MS);

    let loginSucceeded = false;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          signal: controller.signal,
        },
      );

      clearSlowLoginTimer();

      const { json, text } = await readLoginPayload(res);
      const data = json ?? {};

      if (res.ok && data.token) {
        loginSucceeded = true;
        removeAllProfileQueries(queryClient);
        localStorage.setItem("access_token", data.token);
        Cookies.set("access_token", data.token, { expires: 1 });
        dispatch(setLogin({ user: data.user, token: data.token }));
        router.replace("/");
        return;
      }

      const serverMsg =
        (typeof data.message === "string" && data.message) ||
        (typeof data.error === "string" && data.error) ||
        (typeof text === "string" && text) ||
        null;

      if (res.status === 401 || res.status === 400) {
        setError(serverMsg || "Invalid email or password.");
      } else if (res.status >= 500) {
        setError(serverMsg || "Server error. Please try again later.");
      } else {
        setError(
          serverMsg || `Something went wrong (HTTP ${res.status}).`,
        );
      }
    } catch (err) {
      console.error("Login Error:", err);
      if (err?.name === "AbortError") {
        if (!suppressAbortErrorUiRef.current) {
          attemptHitSlowTimeout = true;
          setError(SLOW_OR_BLOCKED_CONNECTION_MESSAGE);
          setShowSlowConnectionRetry(true);
        }
      } else {
        const m = typeof err?.message === "string" ? err.message : "";
        if (/failed to fetch|network/i.test(m)) {
          setError(
            "Could not reach the server. Check your internet and API URL.",
          );
        } else {
          setError(m || "Login failed unexpectedly. Try again.");
        }
      }
    } finally {
      clearSlowLoginTimer();
      abortRef.current = null;
      lastAttemptEndedAtRef.current = Date.now();
      prevAttemptWasSlowTimeoutRef.current = attemptHitSlowTimeout;
      // Keep overlay until navigation on success so the UX matches header dashboard entry.
      if (!loginSucceeded) setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await runLoginAttempt();
  };

  return (
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

              {error && (
                <p className="text-red-500 text-sm font-medium text-center leading-relaxed">
                  {error}
                </p>
              )}

              {showSlowConnectionRetry && !loading ? (
                <div className="flex justify-center pt-1">
                  <button
                    type="button"
                    onClick={() => runLoginAttempt()}
                    className="rounded-lg border-2 border-[#0F172A] bg-white px-6 py-2.5 text-sm font-bold text-[#0F172A] transition-colors hover:bg-slate-50 active:scale-[0.99]"
                  >
                    Try again
                  </button>
                </div>
              ) : null}

              <div className="flex flex-col gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0F172A] hover:bg-[#020617] cursor-pointer text-white font-bold py-3 rounded-lg shadow-md transition-transform active:scale-95 disabled:opacity-70 text-lg"
                >
                  Sign in
                </button>
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

      <FullPageLoader
        open={loading}
        title="Signing you in"
        subtitle="Verifying your credentials…"
      />
    </div>
  );
}
