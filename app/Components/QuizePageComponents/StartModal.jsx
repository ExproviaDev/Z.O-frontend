"use client";
import React, { useState, useEffect } from "react";
import { AiOutlinePlayCircle, AiOutlineClose, AiOutlineAlert, AiOutlineClockCircle } from "react-icons/ai";
import { MdSecurity } from "react-icons/md";

export default function StartModal({ onStart, startTime, endTime }) {
  const [agreed, setAgreed] = useState(false);
  const [timeLeftToStart, setTimeLeftToStart] = useState("");
  const [canStart, setCanStart] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!startTime) {
      setCanStart(true);
      return;
    }

    const calculateTime = () => {
      const now = new Date().getTime();
      const start = new Date(startTime).getTime();
      const end = endTime ? new Date(endTime).getTime() : null;

      // ১. কুইজের সময় কি শেষ হয়ে গেছে? (আপনার রাতের ডেডলাইন চেক)
      if (end && now > end) {
        setIsExpired(true);
        setCanStart(false);
        setTimeLeftToStart("");
        return;
      }

      const diff = start - now;

      if (diff > 0) {
        // ২. কুইজ শুরু হতে এখনো সময় বাকি (সকাল ১০টার আগের অবস্থা)
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeftToStart(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
        setCanStart(false);
        setIsExpired(false);
      } else {
        // ৩. কুইজ এখন লাইভ (সকাল ১০টা থেকে রাতের ডেডলাইন পর্যন্ত)
        setTimeLeftToStart("");
        setCanStart(true);
        setIsExpired(false);
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [startTime, endTime]);

  const instructions = [
    { title: "Time Management", desc: "You have 30 minutes. The quiz will auto-submit when the time is up.", icon: "⏳" },
    { title: "Page Reload & Navigation", desc: "Refreshing the page or navigating back is strictly forbidden.", icon: "🚫" },
    { title: "Security & Tab Switching", desc: "Switching tabs or taking screenshots will trigger security warnings.", icon: "🛡️" },
    { title: "Disqualification Limit", desc: "Auto-disqualification after 3 warnings. The 4th violation ends the quiz.", icon: "🚩" }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-start md:items-center justify-center overflow-y-auto bg-slate-900/60 backdrop-blur-md p-2 sm:p-4">
      <div className="min-h-full w-full flex items-center justify-center py-3 md:py-8">
        <div className="bg-white rounded-2xl md:rounded-[2rem] shadow-2xl w-full max-w-2xl border border-gray-100 overflow-hidden transform transition-all flex flex-col">

          <div className="bg-red-50 px-4 py-3 md:p-6 flex items-center justify-between border-b border-red-100 shrink-0">
            <div className="flex items-center gap-2 md:gap-3">
              <AiOutlineAlert className="text-red-600 text-xl md:text-3xl animate-pulse" />
              <h2 className="text-base md:text-2xl font-black text-gray-800 tracking-tight uppercase">Important Rules</h2>
            </div>
            <button
              onClick={() => window.location.href = "/dashboard"}
              className="p-1.5 md:p-2 hover:bg-white text-gray-400 hover:text-red-500 rounded-full transition-colors shadow-sm"
            >
              <AiOutlineClose className="text-base md:text-xl" />
            </button>
          </div>

          <div className="p-4 md:p-8 overflow-y-auto">

            {!canStart && (
              <div className={`mb-5 md:mb-8 p-4 md:p-6 border-2 rounded-2xl md:rounded-[24px] flex flex-col items-center justify-center text-center shadow-inner ${isExpired ? "bg-red-50 border-red-100" : "bg-indigo-50 border-indigo-100"}`}>
                <div className={`flex items-center gap-2 mb-1 ${isExpired ? "text-red-600" : "text-indigo-600"}`}>
                  <AiOutlineClockCircle className="text-base md:text-lg" />
                  <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                    {isExpired ? "Registration Closed" : "Upcoming Quiz Time"}
                  </span>
                </div>
                <div className={`text-2xl md:text-4xl font-black font-mono tracking-wider ${isExpired ? "text-red-700" : "text-indigo-700"}`}>
                  {isExpired ? "EXPIRED" : timeLeftToStart}
                </div>
                <p className={`mt-1.5 md:mt-2 text-[10px] md:text-xs font-bold ${isExpired ? "text-red-500" : "text-indigo-500"}`}>
                  {isExpired ? "The time limit for this quiz has ended." : `Starts at: ${new Date(startTime).toLocaleString([], { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}`}
                </p>
              </div>
            )}

            <p className="text-gray-400 font-bold text-center mb-4 md:mb-6 uppercase tracking-[0.2em] text-[9px] md:text-xs border-b pb-3 md:pb-4">
              Academic Integrity Protocol Active
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-4 mb-5 md:mb-8">
              {instructions.map((item, index) => (
                <div key={index} className="flex gap-2.5 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-gray-50 border border-gray-100 transition-all">
                  <span className="text-lg md:text-2xl shrink-0">{item.icon}</span>
                  <div className="min-w-0">
                    <h3 className="text-[11px] md:text-sm font-black text-gray-800 uppercase leading-tight">{item.title}</h3>
                    <p className="text-[10px] md:text-xs text-gray-600 mt-0.5 md:mt-1 font-bold italic leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-5 md:mb-8 p-3 md:p-5 bg-amber-50 rounded-xl md:rounded-2xl border border-amber-200 flex items-start gap-2.5 md:gap-4">
              <MdSecurity className="text-amber-600 text-lg md:text-2xl shrink-0 mt-0.5" />
              <p className="text-[11px] md:text-sm text-amber-900 font-black leading-snug">
                WARNING: AI detection and screenshot monitoring are active. Any violation attempt will result in an immediate ban.
              </p>
            </div>

            <div
              className={`p-3 md:p-5 rounded-xl md:rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-2.5 md:gap-4 mb-5 md:mb-8 ${agreed ? "border-green-500 bg-green-50/30" : "border-gray-200 bg-gray-50 hover:border-red-200"}`}
              onClick={() => setAgreed(!agreed)}
            >
              <input type="checkbox" checked={agreed} readOnly className="w-5 h-5 md:w-6 md:h-6 accent-green-600 cursor-pointer shrink-0" />
              <label className="text-xs md:text-base font-black text-gray-800 cursor-pointer select-none leading-snug">
                I have read the rules and accept the disqualification policy.
              </label>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 md:gap-4">
              <button
                onClick={() => window.location.href = "/dashboard"}
                className="w-full sm:w-1/3 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold border-2 border-gray-100 text-gray-400 hover:bg-gray-50 transition-all text-xs md:text-sm uppercase tracking-wider"
              >
                Cancel
              </button>

              <button
                onClick={onStart}
                disabled={!agreed || !canStart || isExpired}
                className={`w-full sm:w-2/3 py-3 md:py-4 rounded-xl md:rounded-2xl font-black flex items-center gap-2 md:gap-3 justify-center transition-all shadow-xl text-xs md:text-sm uppercase tracking-widest ${agreed && canStart && !isExpired
                  ? "bg-gray-900 text-white hover:bg-black hover:scale-[1.02] active:scale-95 shadow-gray-200"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
              >
                {canStart ? <AiOutlinePlayCircle className="text-base md:text-xl" /> : <AiOutlineClockCircle className="text-base md:text-xl animate-spin-slow" />}
                {isExpired ? "Exam Ended" : canStart ? "Start Exam" : `Starts in ${timeLeftToStart}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}