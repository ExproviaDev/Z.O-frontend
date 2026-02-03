



"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiStar, FiAward, FiZap } from "react-icons/fi";
import Link from "next/link";

const plans = [
  {
    title: "Junior Delegate",
    grade: "Grade 1 - 5",
    prize: "499",
    icon: <FiStar className="text-emerald-500" size={24} />,
    features: ["Digital Certificate", "Winner Crests", "SDG Learning Kit"],
    color: "emerald", // Greenish
    btnBg: "bg-emerald-600 hover:bg-emerald-700",
    shadow: "shadow-emerald-100",
  },
  {
    title: "Intermediate Leader",
    grade: "Grade 6 - 10",
    prize: "499",
    icon: <FiAward className="text-blue-500" size={24} />,
    features: ["Global Mentorship", "Medals & Prizes", "Leadership Training"],
    color: "blue",
    btnBg: "bg-blue-600 hover:bg-blue-700",
    shadow: "shadow-blue-100",
    popular: true, // মাঝখানেরটিকে হাইলাইট করার জন্য
  },
  {
    title: "Senior Pioneer",
    grade: "Grade 11 - University",
    prize: "499",
    icon: <FiZap className="text-purple-500" size={24} />,
    features: ["Project Incubation", "Networking", "High-Value Rewards"],
    color: "purple",
    btnBg: "bg-purple-600 hover:bg-purple-700",
    shadow: "shadow-purple-100",
  },
];

export default function PricingSection() {
  return (
    <section className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Registration <span className="text-blue-600">Categories</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose your grade-wise category and participate in the biggest 
            SDG-based Olympiad to win exciting prizes.
          </p>
        </div>

        {/* Pricing Cards Grid */}
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
                 
                </div>
              )}

              <div className="mb-6 flex justify-between items-start">
                <div className={`p-4 rounded-2xl bg-${plan.color}-50`}>
                  {plan.icon}
                </div>
                <span className="text-gray-400 text-sm font-medium">{plan.grade}</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.title}</h3>
              <p className="text-gray-500 text-sm mb-6">Total Prize Pool</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className={`text-4xl font-black text-gray-900`}>{plan.prize}</span>
                <span className="text-lg font-bold text-gray-400">BDT</span>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600 text-sm">
                    <FiCheckCircle size={18} className={`text-${plan.color}-500`} />
                    {feature}
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