"use client";

import React from "react";

const PricingSection = () => {
  const pricingData = [
    {
      id: 1,
      plan: "Junior Level",
      category: "Class 3 - Class 5",
      price: "499",
      features: [
        "UN Courses Access",
        "Round 1 MCQ Exam",
        "Digital Certificate",
        "SDG Tutorials",
      ],
      popular: false,
      bgColor: "bg-[#F97316]",
      textColor: "text-[#F97316]",
    },
    {
      id: 2,
      plan: "Secondary Level",
      category: "Class 6 - Class 10",
      price: "499",
      features: [
        "All Junior Features",
        "Round 2 Video Contest",
        "Jury Evaluation",
        "Grand Finale Chance",
      ],
      popular: true,
      bgColor: "bg-[#266D9A]",
      textColor: "text-[#266D9A]",
    },
    {
      id: 3,
      plan: "Higher Secondary",
      category: "Class 11 - Class 12",
      price: "499",
      features: [
        "Full Course Access",
        "Advanced SDG Topics",
        "Round 2 Certificate",
        "Dhaka Residential Round",
      ],
      popular: false,
      bgColor: "bg-[#1E293B]",
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
      <div className="absolute inset-0 bg-Secondary/90 pointer-events-none"></div>

      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundSize: "30px 30px",
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1.5px)",
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl text-white font-bold tracking-tight">
            Registration <span className="text-Primary">Pricing</span>
          </h1>
          <p className="text-gray-300 mt-4 font-medium italic">
            Choose your category and start your journey in February 2026
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {pricingData.map((item) => (
            <div
              key={item.id}
              className={`relative bg-white rounded-3xl shadow-2xl transition-all duration-500 hover:-translate-y-4 flex flex-col overflow-hidden ${
                item.popular
                  ? "md:scale-110 z-20 border-t-8 border-Primary"
                  : "z-10"
              }`}
            >
              <div className="p-8 pb-10 text-center flex-grow">
                <h3
                  className={`text-2xl font-bold mb-1 uppercase ${item.textColor}`}
                >
                  {item.plan}
                </h3>
                <p className="text-slate-500 font-semibold text-sm mb-6">
                  {item.category}
                </p>

                <ul className="space-y-4 text-left inline-block mx-auto">
                  {item.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-slate-600 font-medium text-sm"
                    >
                      <svg
                        className={`w-5 h-5 mr-3 ${item.textColor}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`relative ${item.bgColor} pt-12 pb-8 text-center text-white`}
              >
               

                <div className="relative z-10">
                  <p className="text-4xl font-black italic">৳{item.price}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-70 mt-1">
                    Registration Fee
                  </p>

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
