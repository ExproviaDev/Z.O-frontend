"use client";
import { motion } from "framer-motion";
import { FiStar, FiAward, FiZap } from "react-icons/fi";
import Link from "next/link";

const plans = [
  {
    title: "SDG Activist",
    grade: "Class 5 – 8",
    prize: "300",
    icon: <FiStar className="text-emerald-500" size={24} />,
    features: [
      "Bengali & Alia: Class 5 - 8",
      "English: Grade 5 - 8 / PYP-MYP",
      "Qawmi: Taisir - Hidayatunnah"
    ],
    color: "emerald",
    btnBg: "bg-Primary hover:bg-Secondary",
    shadow: "shadow-emerald-100",
  },
  {
    title: "SDG Ambassador",
    grade: "Class 9 – 12",
    prize: "300",
    icon: <FiAward className="text-blue-500" size={24} />,
    features: [
      "SSC & HSC / Dakhil & Alim",
      "O Level & A Level / MYP-DP",
      "Qawmi: Kafiya, Bekaya & Jalalayn"
    ],
    color: "blue",
    btnBg: "bg-Primary hover:bg-Secondary",
    shadow: "shadow-blue-100",
    popular: true,
  },
  {
    title: "SDG Achiever",
    grade: "University & Higher Ed",
    prize: "300",
    icon: <FiZap className="text-purple-500" size={24} />,
    features: [
      "Honors, Medical, Engineering",
      "Diploma, Marine & Fisheries",
      "Madrasa: Fazil, Kamil, Mishkat, Dawra"
    ],
    color: "purple",
    btnBg: "bg-Primary hover:bg-Secondary",
    shadow: "shadow-purple-100",
  },
];

export default function PricingSection() {
  return (
    <section className="py-12 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
            Registration <span className="text-blue-600">Categories</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg px-2">
            Choose your grade-wise category and participate in the biggest
            SDG-based Olympiad to win exciting prizes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6 md:mb-8">
                  <div className={`p-4 rounded-2xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform duration-300`}>
                    {plan.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                    {plan.grade}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
                  {plan.title}
                </h3>
                <p className="text-blue-500 font-semibold text-xs md:text-sm mb-6 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Ramadan Special Rewards
                </p>

                <div className="bg-slate-50 rounded-2xl p-4 md:p-5 mb-8">
                  <div className="flex items-end gap-2">
                    <span className="text-2xl md:text-3xl font-black text-slate-900 leading-none">
                      ৳{plan.prize}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xl text-slate-400 line-through font-bold leading-tight">
                        ৳400
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Link prefetch={false} href="/registration" className="w-full">
                <button
                  className={`w-full py-4 rounded-xl text-white font-bold text-base md:text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg active:scale-95 ${plan.btnBg}`}
                >
                  Register Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}