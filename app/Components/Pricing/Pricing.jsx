"use client";

import React from "react";

const PricingSection = () => {
  const pricingData = [
    {
      id: 1,
      plan: "Junior Level",
      category: "Class 3 - Class 5",
      price: "499",
      features: ["UN Courses Access", "Round 1 MCQ Exam", "Digital Certificate", "SDG Tutorials"],
      popular: false,
      bgColor: "bg-[#F97316]", // Primary Orange
      textColor: "text-[#F97316]",
    },
    {
      id: 2,
      plan: "Secondary Level",
      category: "Class 6 - Class 10",
      price: "499",
      features: ["All Junior Features", "Round 2 Video Contest", "Jury Evaluation", "Grand Finale Chance"],
      popular: true,
      bgColor: "bg-[#266D9A]", // Secondary Blue
      textColor: "text-[#266D9A]",
    },
    {
      id: 3,
      plan: "Higher Secondary",
      category: "Class 11 - Class 12",
      price: "499",
      features: ["Full Course Access", "Advanced SDG Topics", "Round 2 Certificate", "Dhaka Residential Round"],
      popular: false,
      bgColor: "bg-[#1E293B]", // Dark Slate
      textColor: "text-[#1E293B]",
    },
  ];

  return (
    <section 
      className="py-24 relative overflow-hidden bg-fixed bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url('https://i.ibb.co/99HFrKfK/speaker-bg.png')`,
      }}
    >
      {/* Dark Overlay for better text visibility */}
      <div className="absolute inset-0 bg-Secondary/90 pointer-events-none"></div>

      {/* Background Dot Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundSize: "30px 30px",
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1.5px)",
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl text-white font-bold tracking-tight">
            Registration <span className="text-Primary">Pricing</span>
          </h1>
          <p className="text-gray-300 mt-4 font-medium italic">Choose your category and start your journey in February 2026</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {pricingData.map((item) => (
            <div
              key={item.id}
              className={`relative bg-white rounded-3xl shadow-2xl transition-all duration-500 hover:-translate-y-4 flex flex-col overflow-hidden ${
                item.popular ? "md:scale-110 z-20 border-t-8 border-Primary" : "z-10"
              }`}
            >
              {/* Card Content */}
              <div className="p-8 pb-10 text-center flex-grow">
                <h3 className={`text-2xl font-bold mb-1 uppercase ${item.textColor}`}>{item.plan}</h3>
                <p className="text-slate-500 font-semibold text-sm mb-6">{item.category}</p>
                
                <ul className="space-y-4 text-left inline-block mx-auto">
                  {item.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-slate-600 font-medium text-sm">
                      <svg className={`w-5 h-5 mr-3 ${item.textColor}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Zig-Zag Bottom Section */}
              <div className={`relative ${item.bgColor} pt-12 pb-8 text-center text-white`}>
                {/* SVG Zig-Zag Shape */}
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
                  <svg className="relative block w-[calc(100%+1.3px)] h-[25px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M37.5,102.5L75,17.5L112.5,102.5L150,17.5L187.5,102.5L225,17.5L262.5,102.5L300,17.5L337.5,102.5L375,17.5L412.5,102.5L450,17.5L487.5,102.5L525,17.5L562.5,102.5L600,17.5L637.5,102.5L675,17.5L712.5,102.5L750,17.5L787.5,102.5L825,17.5L862.5,102.5L900,17.5L937.5,102.5L975,17.5L1012.5,102.5L1050,17.5L1087.5,102.5L1125,17.5L1162.5,102.5L1200,17.5V0H0V17.5L37.5,102.5Z" fill="#ffffff"></path>
                  </svg>
                </div>

                <div className="relative z-10">
                  <p className="text-4xl font-black italic">৳{item.price}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-70 mt-1">Registration Fee</p>
                  
                  <button className="mt-6 px-10 py-2.5 bg-white text-slate-900 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg active:scale-95">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;