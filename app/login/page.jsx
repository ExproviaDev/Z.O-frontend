"use client";
import React, { useState } from "react";
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ForgotPasswordModal from "../Components/ForgotPasswordModal";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setLogin } from "../store/slices/authSlice";
import { MdOutlineArrowBackIos } from "react-icons/md";

import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imdodalOpen, setImdodalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        const token = data.token;
        const user = data.user;
        localStorage.setItem("access_token", token);
        localStorage.setItem("user_data", JSON.stringify(user));
        Cookies.set("access_token", token, { expires: 1 });
        dispatch(setLogin({ user: user, token: token }));
        // router.replace("/dashboard");
        router.replace(callbackUrl);
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Network or Login Error:", err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center p-5 justify-center bg-white relative overflow-hidden">
      
      <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/30 backdrop-blur-xs p-10 rounded-3xl shadow-2xl">
     
        <div className="text-Primary flex flex-col justify-center">
          <h1 className="text-4xl font-bold leading-tight ">
            Login To Zero Olympiad
          </h1>
          <p className="mt-6 text-md leading-relaxed">
            Login to continue your journey, access your dashboard, track your
            progress, and unlock your achievements.
          </p>
          {/* back button */}
            <div className="pt-7">
                  <Link href={'/'} className="">
                    <button className="flex items-center btn btn-active btn-primary">
                      <MdOutlineArrowBackIos />  back
                    </button>
                  </Link>
            </div>
        </div>
        
        <div className="bg-gray-200 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-lg">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-700 text-md pb-2">Email</label>
              <div className="flex items-center bg-gray-100 rounded-full px-4 mt-1">
                <AiOutlineMail className="text-gray-500 mr-2" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2 text-gray-800 outline-none placeholder-gray-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-gray-700 text-md">Password</label>
              <div className="flex items-center bg-gray-100 rounded-full px-4 mt-1 relative">
                <AiOutlineLock className="text-gray-500 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2 text-gray-800 outline-none placeholder-gray-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 text-gray-500 hover:text-indigo-600 transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="h-5 w-5" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-left">
              <button
                type="button"
                onClick={() => setImdodalOpen(true)}
                className="text-md text-blue-600 hover:text-blue-800"
              >
                Forgot Password?
              </button>
            </div>

            {error && <p className="text-md text-red-600 font-semibold text-center mt-2">{error}</p>}

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 rounded-lg font-bold hover:bg-indigo-600 transition disabled:bg-indigo-300 flex justify-center items-center gap-4"
              disabled={loading}
            >
              <FaSignInAlt className="h-5 w-5 text-white" />
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="mt-2 text-center text-sm">
              If you Don't Have Any Account!{" "}
              <Link href="/registration" className="underline text-indigo-700 font-bold">Register</Link>
            </p>
          </form>
        </div>
      </div>
      {imdodalOpen && <ForgotPasswordModal onClose={() => setImdodalOpen(false)} />}
    </div>
  );
}