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
    <section className="py-10 md:py-20 bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
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
              className={`relative bg-white rounded-[2.5rem] p-5 md:p-8 border transition-all duration-300 hover:shadow-2xl `}
            >
              

              <div className="mb-6 flex justify-between items-start">
                <div className={`p-4 rounded-2xl bg-${plan.color}-50`}>
                  {plan.icon}
                </div>
                <span className="text-gray-400 text-sm font-medium">{plan.grade}</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.title}</h3>
              <p className="text-gray-500 text-md mb-6">Ramadan Rewards</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className={`text-xl font-black text-gray-900`}>{plan.prize}</span>
                <span className="text-xl font-bold text-gray-400">BDT</span>
                <span class="line-through">400</span>BDT
              </div>


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