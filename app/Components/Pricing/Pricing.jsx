"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiStar, FiAward, FiZap } from "react-icons/fi";
import Link from "next/link";

const plans = [
  {
    title: "SDG Defender",
    grade: "Class 5 – 8",
    prize: "499", // You can update price if needed
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
    title: "SDG Leader",
    grade: "Class 9 – 12",
    prize: "499",
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
    title: "SDG Pioneer",
    grade: "University & Higher Ed",
    prize: "499",
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
    <section className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Registration <span className="text-blue-600">Categories</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose your grade-wise category and participate in the biggest 
            SDG-based Olympiad to win exciting prizes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative bg-white rounded-[2.5rem] p-8 border-2 transition-all duration-300 hover:shadow-2xl ${plan.shadow} ${
                plan.popular ? "border-blue-500 scale-105 z-10" : "border-transparent"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                  Most Popular
                </div>
              )}

              <div className="mb-6 flex justify-between items-start">
                <div className={`p-4 rounded-2xl bg-${plan.color}-50`}>
                  {plan.icon}
                </div>
                <span className="text-gray-400 text-sm font-medium">{plan.grade}</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.title}</h3>
              <p className="text-gray-500 text-sm mb-6">Registration Fee</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className={`text-4xl font-black text-gray-900`}>{plan.prize}</span>
                <span className="text-lg font-bold text-gray-400">BDT</span>
              </div>

              {/* Added a small title for the list to explain it contains the specific classes */}
              <p className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Eligible Classes</p>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                    <FiCheckCircle size={18} className={`text-${plan.color}-500 mt-0.5 shrink-0`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

             <Link prefetch={false} href={"/registration"}>
              <button
                className={`w-full py-4 cursor-pointer rounded-2xl text-white font-bold text-lg transition-all duration-300 shadow-lg ${plan.btnBg} active:scale-95`}
              >
                Register Now
              </button>
             </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}