"use client";

import React, { useState, useRef } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import Image from "next/image";

const FaqContent = ({ faqs }) => {
  const [open, setOpen] = useState(null);
  const contentRefs = useRef([]);

  const toggleFAQ = (index) => setOpen(open === index ? null : index);

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Banner Section */}
      <div className="relative w-full h-60 sm:h-[300px] md:h-[450px] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dsga4gyw9/image/upload/v1770033230/IMG_8691_zgkos5.jpg"
          alt="FAQ Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40"></div>
        <h1 className="absolute inset-0 flex justify-center items-center text-white text-3xl md:text-5xl font-extrabold tracking-wide px-4 text-center">
          Frequently Asked <span className="text-orange-500 ml-3">Questions</span>
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">General inquiries</h2>
          <div className="w-20 h-1.5 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = open === index;

            return (
              <div
                key={index}
                className={`transition-all duration-300 border rounded-2xl overflow-hidden ${
                  isOpen
                    ? "border-indigo-500 shadow-md"
                    : "border-gray-200 hover:border-orange-500"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center py-5 px-6 text-left"
                >
                  <p className="text-lg font-semibold text-gray-800">{item.q}</p>
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen ? "bg-slate-800 text-white rotate-180" : "bg-orange-500 text-white"
                    }`}
                  >
                    {isOpen ? <FiMinus /> : <FiPlus />}
                  </div>
                </button>

                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  style={{
                    maxHeight: isOpen ? contentRefs.current[index]?.scrollHeight : 0,
                  }}
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                >
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed border-t pt-4">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FaqContent;