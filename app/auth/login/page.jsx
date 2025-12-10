


"use client";

import React from "react";
import Link from "next/link";
import { BsGoogle } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";

export default function LoginPage() {
  const handleLogin = (e) => {
    e.preventDefault(); 
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 text-black bg-transparent">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT SECTION */}
        <div className="relative bg-[#11142518] text-black bg-gray-50 border border-gray-200 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08)] rounded-2xl p-10 flex flex-col justify-center group">
          <div className="relative z-10">
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight drop-shadow">
              WELCOME <br /> BACK TO THE <br />
              <span className="text-green-400">ART COMMUNITY</span>
            </h1>

            <p className="mt-5 max-w-sm text-black font-medium">
              Discover creative works, connect with artists & grow your talent.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <span className="text-sm font-bold uppercase tracking-wide">Login with</span>
              <button className="text-2xl pl-2 bg-gradient-to-r from-[#4285F4] w-10 h-10 bg-white text-black rounded-full font-bold shadow-md">
                <BsGoogle />
              </button>
              <button className="text-2xl pl-2 bg-gradient-to-r from-[#4286f4ab] w-10 h-10  text-blue-600 w-10 h-10 bg-white rounded-full font-bold shadow-md">
                <FaFacebook />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="text-black rounded-2xl p-10 bg-gray-50 border border-gray-200 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08)]">
          <h2 className="text-3xl font-bold">Log In</h2>
          <p className="mt-1 text-sm text-gray-500">
            New here? <Link href="/register" className="text-blue-600 cursor-pointer hover:underline">Join Now</Link>
          </p>

          {/* FORM (fixed) */}
          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
            />

            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <span className="text-sm">Keep me logged in</span>
            </div>

            {/* LOGIN BUTTON (form এর ভিতরে) */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
            >
              Log In
            </button>
          </form>

          <p className="mt-5 text-sm">
            Forgot your <Link href="/forgot-password" className="font-semibold cursor-pointer text-blue-600">password?</Link>
          </p>

          <p className="mt-6 text-xs text-gray-500 leading-relaxed">
            By clicking Login, you agree to our  
            <Link className="text-blue-400 underline" href="/tramsAndCondition"> Terms of Service </Link> 
            & 
            <Link className="text-blue-400 underline" href="/privacyPolicy"> Privacy Policy </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
