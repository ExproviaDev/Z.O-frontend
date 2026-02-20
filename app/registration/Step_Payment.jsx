"use client";
import React, { useState } from "react";
import axios from "axios";
import { FaMoneyCheckAlt, FaExclamationTriangle, FaArrowRight, FaCheckCircle } from "react-icons/fa";

// ✅ props এ formData রিসিভ করুন
export default function Step_Payment({ amount, prevStep, formData }) {
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    // ✅ UPDATE: bKash এ যাওয়ার আগে ডাটা সেভ করা
    if (formData) {
      localStorage.setItem("reg_formData", JSON.stringify(formData));
    }

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/bkash/create`, { amount });
      if (res.data.bkashURL) {
        window.location.href = res.data.bkashURL;
      }
    } catch (err) {
      alert("Payment initiation failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center space-y-4 sm:space-y-5 animate-in fade-in duration-500">
      {/* উপরের টাইটেল মোবাইলে ছোট করা */}
      <FaMoneyCheckAlt className="mx-auto text-Primary w-8 h-8 sm:w-11 sm:h-11" />
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Registration Fee: {amount} BDT</h2>

      {/* ⚠️ গাইডলাইন বক্স (বাংলায় - স্পষ্ট এবং হাইলাইট করা) */}
      <div className="bg-orange-50 border-2 border-orange-300 text-left p-4 sm:p-5 rounded-xl text-gray-800 shadow-md mt-3">
        <h3 className="text-base sm:text-lg font-bold text-orange-700 flex items-center gap-2 mb-3 pb-2 border-b border-orange-200">
          <FaExclamationTriangle /> পেমেন্ট করার আগে অবশ্যই পড়ুন:
        </h3>

        <ul className="space-y-3 text-xs sm:text-sm font-medium leading-relaxed">
          <li className="flex gap-2">
            <FaCheckCircle className="text-orange-500 mt-1 flex-shrink-0 text-sm sm:text-base" />
            <span><span className="font-bold text-red-600 bg-red-50 px-1">কোনোভাবেই পেজ রিফ্রেশ বা ব্রাউজার বন্ধ করবেন না।</span> পেমেন্ট চলাকালীন ব্যাক বাটন চাপবেন না।</span>
          </li>
          <li className="flex gap-2">
            <FaCheckCircle className="text-orange-500 mt-1 flex-shrink-0 text-sm sm:text-base" />
            <span>পেমেন্ট সফল হওয়ার পর <span className="font-bold text-blue-700 bg-blue-50 px-1">৫ সেকেন্ড অপেক্ষা করুন</span>। আপনাকে স্বয়ংক্রিয়ভাবে ইমেইল ও পাসওয়ার্ড দেওয়ার পেজে নিয়ে যাওয়া হবে।</span>
          </li>
          <li className="flex gap-2">
            <FaCheckCircle className="text-orange-500 mt-1 flex-shrink-0 text-sm sm:text-base" />
            <span>পরবর্তী পেজে আপনার <span className="font-bold">সঠিক ইমেইল ও পাসওয়ার্ড</span> দিন। সাবমিট করার আগে ইমেইল বানান অবশ্যই দুবার চেক করে নিন।</span>
          </li>
          <li className="flex gap-2">
            <FaCheckCircle className="text-orange-500 mt-1 flex-shrink-0 text-sm sm:text-base" />
            <span>রেজিস্ট্রেশন শেষে আপনার ইমেইলে দুটি মেইল যাবে। <span className="font-bold text-Primary">Confirm Email</span> লেখা মেইলের লিংকে ক্লিক করে অ্যাকাউন্ট ভেরিফাই করুন।</span>
          </li>
          <li className="flex gap-2">
            <FaCheckCircle className="text-orange-500 mt-1 flex-shrink-0 text-sm sm:text-base" />
            <span>ভেরিফাই করার পর ওয়েবসাইটে এসে আপনার ইমেইল ও পাসওয়ার্ড দিয়ে <span className="font-bold">লগইন (Login)</span> করবেন।</span>
          </li>
        </ul>

        {/* 👉 চেকবক্স কনফার্মেশন হাইলাইট */}
        <div className="mt-5 pt-4 border-t-2 border-orange-200">
          <p className="text-xs sm:text-sm font-bold text-orange-600 mb-2 flex items-center gap-2">
            <span className="text-lg animate-pulse">👉</span> আপনি যদি উপরের নির্দেশনাগুলো বুঝে থাকেন, তাহলে এখানে ক্লিক করুন:
          </p>
          <label className="flex items-center gap-3 p-3 bg-orange-100 rounded-lg border border-orange-300 cursor-pointer select-none hover:bg-orange-200 transition">
            <input
              type="checkbox"
              className="w-6 h-6 accent-orange-600 cursor-pointer"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span className="text-sm sm:text-base font-bold text-orange-800">হ্যাঁ, আমি বুঝেছি এবং রাজি আছি।</span>
          </label>
        </div>
      </div>

      {/* নেভিগেশন বাটন */}
      <div className="flex justify-between mt-6 pt-3 pb-5">
        <button onClick={prevStep} className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition">
          Back
        </button>
        <button
          onClick={handlePayment}
          disabled={loading || !agreed}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition ${loading || !agreed
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-Primary text-white hover:bg-blue-800 shadow-md hover:shadow-lg scale-105'
            }`}
        >
          {loading ? "Processing..." : "Pay with bKash"} <FaArrowRight />
        </button>
      </div>
    </div>
  );
}