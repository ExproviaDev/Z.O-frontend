

"use client";
import React, { useState } from "react";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi"; 
import { MdOutlineArrowBackIos } from "react-icons/md"; 
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/slices/authSlice"; 
import Cookies from "js-cookie";
import ForgotPasswordModal from "../Components/ForgotPasswordModal"; 

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;

    try {
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("user_data", JSON.stringify(data.user));
        Cookies.set("access_token", data.token, { expires: 1 });
        dispatch(setLogin({ user: data.user, token: data.token }));
        router.replace(callbackUrl);
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4 sm:p-0 font-sans">
      <div className="bg-white w-full max-w-5xl h-auto md:h-[650px] shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
        
        <div className="w-full md:w-1/2 bg-[#0F4C8A] relative flex flex-col justify-center p-10 z-10 overflow-hidden">
          
          <div className="absolute top-6 left-6 z-30">
            <Link href="/">
              <button className="flex items-center cursor-pointer text-white/80 hover:text-white transition-colors font-medium text-sm">
                <MdOutlineArrowBackIos className="mr-1" />
                Back to Home
              </button>
            </Link>
          </div>

          <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-[#1A5F9E] rounded-full opacity-70"></div>
          <div className="absolute bottom-[-150px] right-[-50px] w-80 h-80 bg-[#1A5F9E] rounded-full opacity-70"></div>
          <div className="absolute top-[30%] right-[-80px] w-40 h-40 bg-[#2672B8] rounded-full opacity-60"></div>

          <div className="relative z-20 text-white md:ml-10 mt-16 md:mt-0">
            <h1 className="text-4xl font-bold mb-2 tracking-wide">WELCOME</h1>
            <h2 className="text-xl font-semibold mb-4 opacity-90">YOUR HEADLINE NAME</h2>
            <p className="text-blue-100 text-sm max-w-xs leading-relaxed opacity-80">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet.
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
                  className="absolute right-4 text-gray-500 hover:text-[#0F4C8A] transition-colors"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm font-medium">
                <label className="flex items-center text-gray-600 cursor-pointer select-none">
                  <input type="checkbox" className="mr-2 accent-[#0F4C8A] w-4 h-4 rounded" />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="text-[#0F4C8A] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

              <div className="flex flex-col gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0F4C8A] hover:bg-[#0A3866] text-white font-bold py-3 rounded-lg shadow-md transition-transform active:scale-95 disabled:opacity-70 text-lg"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
                
              </div>

              <div className="text-center text-sm text-gray-500 mt-4 font-medium">
                Don't have an account?{" "}
                <Link href="/registration">
                  <span className="text-[#0F4C8A] font-bold hover:underline cursor-pointer">
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
  );
}