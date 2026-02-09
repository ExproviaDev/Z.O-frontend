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
      {/* Responsive Height: Mobile a kom, Desktop a beshi */}
      <div className="relative w-full h-[40vh] md:h-[60vh] lg:h-[70vh] overflow-hidden flex justify-center items-center">
        <Image
          src="https://res.cloudinary.com/dsga4gyw9/image/upload/v1770033230/IMG_8691_zgkos5.jpg"
          alt="FAQ Banner"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-900/70"></div>
        
        {/* Text Responsive Sizes */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-xl leading-tight">
            Frequently Asked <br className="md:hidden" />
            <span className="text-Primary block md:inline mt-2 md:mt-0">Questions</span>
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">General inquiries</h2>
          <div className="w-16 md:w-20 h-1.5 bg-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-4">
          {faqs && faqs.map((item, index) => {
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
                  // Mobile a padding komano hoyeche, Desktop a barano hoyeche
                  // gap-4 deya hoyeche jate text r icon lege na jay
                  className="w-full flex justify-between items-center py-4 px-4 md:py-5 md:px-6 text-left gap-4"
                >
                  {/* Font size responsive kora hoyeche */}
                  <p className="text-base md:text-lg font-semibold text-gray-800 flex-1">
                    {item.q}
                  </p>
                  
                  {/* flex-shrink-0 deya hoyeche jate icon chapa na khay */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
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
                  <div className="px-4 md:px-6 pb-5">
                    {/* Text size adjust kora hoyeche readability er jonno */}
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed border-t pt-4">
                      {item.a}
                    </p>
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