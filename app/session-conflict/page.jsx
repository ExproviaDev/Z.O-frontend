"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiShield, FiLogOut, FiRefreshCw } from "react-icons/fi";

export default function SessionConflictPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleLogoutAll = async () => {
    setErr("");
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      if (token) {
        await fetch(`${API_URL}/api/auth/logout-all`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
    } catch (e) {
      setErr("Could not complete the request. Please try again.");
    } finally {
      // Always clear local session on this screen.
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_data");
      localStorage.removeItem("active_quiz");
      localStorage.removeItem("session_id");

      const next = localStorage.getItem("session_conflict_next") || "/";
      localStorage.removeItem("session_conflict_next");
      router.replace(`/login?callbackUrl=${encodeURIComponent(next)}`);
      setLoading(false);
    }
  };

  const handleLoginAgain = () => {
    const next = localStorage.getItem("session_conflict_next") || "/";
    localStorage.removeItem("session_conflict_next");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_data");
    localStorage.removeItem("active_quiz");
    localStorage.removeItem("session_id");
    router.replace(`/login?callbackUrl=${encodeURIComponent(next)}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
        <div className="p-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">
              <FiShield className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">
                একাধিক ডিভাইসে লগইন অনুমোদিত নয়
              </h1>
              <p className="mt-2 text-sm text-white/80 leading-relaxed">
                নিরাপত্তা ও ন্যায্যতা বজায় রাখতে একই অ্যাকাউন্ট একসাথে শুধুমাত্র ১টি ডিভাইসে লগইন থাকতে পারে।
                আপনার অ্যাকাউন্টটি অন্য একটি ডিভাইসে লগইন হওয়ায় এই ডিভাইসের সেশনটি বন্ধ করে দেওয়া হয়েছে।
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-4">
          {err && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {err}
            </div>
          )}

          <button
            onClick={handleLoginAgain}
            disabled={loading}
            className="w-full rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-4 transition disabled:opacity-60"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <FiRefreshCw /> আবার লগইন করুন
            </span>
          </button>

          <button
            onClick={handleLogoutAll}
            disabled={loading}
            className="w-full rounded-2xl border-2 border-slate-200 hover:border-slate-300 bg-white text-slate-800 font-extrabold py-4 transition disabled:opacity-60"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <FiLogOut /> সব ডিভাইস থেকে লগআউট করুন
            </span>
          </button>

          <p className="text-xs text-slate-500 text-center pt-2">
            টিপস: আপনি যদি অন্য ফোন/ব্রাউজারে লগইন করে থাকেন, আগে সেখানে লগআউট করুন—তারপর এখানে আবার লগইন করুন।
          </p>
        </div>
      </div>
    </div>
  );
}

