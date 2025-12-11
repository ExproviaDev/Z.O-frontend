




"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import Link from "next/link";

import Lottie from "lottie-react";
import LoginIcon from "@/public/src/SecureLogin";   // <-- your Lottie file import

export default function LoginPage() {
  const initialValues = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logged in:", formData);
    setFormData(initialValues);
  };

  return (
    <div className="min-h-screen w-full flex items-center p-5 justify-center bg-white relative overflow-hidden">

      {/* === Background Layer === */}
      <div className="absolute inset-0">
        <Image
          src="/src/bannerForLogin.png"
          alt="Background"
          fill
          className="object-cover opacity-60"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-xs"></div>

      {/* === Main Content === */}
      <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/30 backdrop-blur-xs p-10 rounded-3xl shadow-2xl">

        {/* Left Section */}
        <div className="text-Secondary flex flex-col justify-center">

          <h1 className="text-4xl font-bold leading-tight">
            <p>Login</p>
          </h1>

          <p className="mt-6 text-sm leading-relaxed">
            Login to continue your journey, access your dashboard, track your progress, and unlock your achievements.
          </p>

          {/* ⭐ Lottie animation added here */}
          <div className="mt-6 ">
            <Lottie
              animationData={LoginIcon}
              loop={true}
              className="w-72 h-72 md:w-80 md:h-80 "
            />
          </div>
        </div>

        {/* === Login Card === */}
        <div className="bg-gray-200 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-lg">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="text-gray-700 text-sm">Email</label>
              <div className="flex items-center bg-gray-100 rounded-full px-4 mt-1">
                <AiOutlineMail className="text-gray-500 mr-2" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent py-2 text-gray-800 outline-none placeholder-gray-500"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-700 text-sm">Password</label>
              <div className="flex items-center bg-gray-100 rounded-full px-4 mt-1">
                <AiOutlineLock className="text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-transparent py-2 text-gray-800 outline-none placeholder-gray-500"
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-left">
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-3 rounded-lg font-bold hover:bg-indigo-600 transition"
            >
              Login
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
