"use client";

import React, { useState } from "react";
import { AiOutlinePlayCircle, AiOutlineClose, AiOutlineAlert } from "react-icons/ai";
import { MdSecurity } from "react-icons/md";

export default function StartModal({ onStart }) {
  const [agreed, setAgreed] = useState(false);

  const instructions = [
    {
      title: "Time Management",
      desc: "You have 30 minutes. The quiz will auto-submit when the time is up.",
      icon: "⏳"
    },
    {
      title: "Page Reload & Navigation",
      desc: "Refreshing the page or navigating back is strictly forbidden. Progress will be lost.",
      icon: "🚫"
    },
    {
      title: "Security & Tab Switching",
      desc: "Switching tabs or taking screenshots will trigger security warnings.",
      icon: "🛡️"
    },
    {
      title: "Disqualification Limit",
      desc: "You will be automatically disqualified after 3 warnings. The 4th violation ends the quiz.",
      icon: "🚩"
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-start md:items-center justify-center overflow-y-auto bg-slate-900/60 backdrop-blur-md p-4">

      <div className="min-h-full w-full flex items-center justify-center py-8">

        <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl border border-gray-100 overflow-hidden transform transition-all flex flex-col">

          <div className="bg-red-50 p-6 flex items-center justify-between border-b border-red-100 shrink-0">
            <div className="flex items-center gap-3">
              <AiOutlineAlert className="text-red-600 text-3xl animate-pulse" />
              <h2 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight uppercase">Important Rules</h2>
            </div>
            <button
              onClick={() => window.location.href = "/"}
              className="p-2 hover:bg-white text-gray-400 hover:text-red-500 rounded-full transition-colors shadow-sm"
            >
              <AiOutlineClose className="text-xl" />
            </button>
          </div>
          <div className="p-6 md:p-8 overflow-y-auto overflow-x-hidden">
            <p className="text-gray-400 font-bold text-center mb-6 uppercase tracking-[0.2em] text-[10px] md:text-xs border-b pb-4">
              Academic Integrity Protocol Active
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
              {instructions.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="text-sm font-black text-gray-800 uppercase leading-tight">{item.title}</h3>
                    <p className="text-xs text-gray-600 mt-1 font-bold italic leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Warning Box */}
            <div className="mb-8 p-5 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-4">
              <MdSecurity className="text-amber-600 text-2xl shrink-0 mt-0.5" />
              <p className="text-xs md:text-sm text-amber-900 font-black leading-snug">
                WARNING: AI detection and screenshot monitoring are active. Any violation attempt will result in an immediate ban.
              </p>
            </div>

            {/* Agreement Section */}
            <div
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 mb-8 ${agreed ? "border-green-500 bg-green-50/30" : "border-gray-200 bg-gray-50 hover:border-red-200"
                }`}
              onClick={() => setAgreed(!agreed)}
            >
              <input
                type="checkbox"
                checked={agreed}
                readOnly
                className="w-6 h-6 accent-green-600 cursor-pointer shrink-0"
              />
              <label className="text-sm md:text-base font-black text-gray-800 cursor-pointer select-none leading-tight">
                I have read the rules and accept the disqualification policy.
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => window.location.href = "/"}
                className="w-full sm:w-1/3 py-4 rounded-2xl font-bold border-2 border-gray-100 text-gray-400 hover:bg-gray-50 transition-all text-sm uppercase tracking-wider"
              >
                Cancel
              </button>

              <button
                onClick={onStart}
                disabled={!agreed}
                className={`w-full sm:w-2/3 py-4 rounded-2xl font-black flex items-center gap-3 justify-center transition-all shadow-xl text-sm uppercase tracking-widest ${agreed
                    ? "bg-gray-900 text-white hover:bg-black hover:scale-[1.02] active:scale-95 shadow-gray-200"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
              >
                <AiOutlinePlayCircle className="text-xl" /> Start Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}