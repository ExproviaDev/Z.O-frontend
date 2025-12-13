"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ App Router-এর জন্য ইমপোর্ট

import Lottie from "lottie-react";
import LoginIcon from "@/public/src/SecureLogin"; // <-- your Lottie file import

export default function LoginPage() {
  const router = useRouter(); 

  const initialValues = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const backendUrl = "http://localhost:4000/api/auth/login";

    try {
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.session) {
        const token = data.session.access_token;
        localStorage.setItem("access_token", token);
        
        console.log("Login successful! Redirecting to dashboard."); 
        router.push("/dashboard"); 

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
      <div className="absolute inset-0">
        <Image
          src="/src/bannerForLogin.png"
          alt="Background"
          fill
          className="object-cover opacity-60"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-black/55 backdrop-blur-xs"></div>

      <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/30 backdrop-blur-xs p-10 rounded-3xl shadow-2xl">

        <div className="text-Secondary flex flex-col justify-center">
          <h1 className="text-4xl font-bold leading-tight">
            <p>Login</p>
          </h1>
          <p className="mt-6 text-sm leading-relaxed">
            Login to continue your journey, access your dashboard, track your progress, and unlock your achievements.
          </p>

          <div className="mt-6 ">
            <Lottie
              animationData={LoginIcon}
              loop={true}
              className="w-72 h-72 md:w-80 md:h-80 "
            />
          </div>
        </div>

        <div className="bg-gray-200 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-lg">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-gray-700 text-sm">Email</label>
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
              <label className="text-gray-700 text-sm">Password</label>
              <div className="flex items-center bg-gray-100 rounded-full px-4 mt-1">
                <AiOutlineLock className="text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent py-2 text-gray-800 outline-none placeholder-gray-500"
                  required
                />
              </div>
            </div>

            <div className="text-left">
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot Password?
              </button>
            </div>
            
            {error && (
                <p className="text-sm text-red-600 font-semibold text-center mt-2">{error}</p>
            )}

           
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 rounded-lg font-bold hover:bg-indigo-600 transition disabled:bg-indigo-300"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="mt-2 text-center">
              If you Don't Have Any Account!{" "}
              <Link href="/register" className="underline cursor-pointer text-indigo-700 hover:text-indigo-600 font-bold">
                Register
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}