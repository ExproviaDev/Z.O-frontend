"use client";

import React, { useState, useRef } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function FAQPage() {
  const [open, setOpen] = useState(null);
  const contentRefs = useRef([]);

  const faqs = [
    { q: "What is this Quiz Platform about?", a: "It is an online quiz system to test your knowledge." },
    { q: "Do I need to sign up to take a quiz?", a: "No, you can take quizzes without signing up unless required by a specific quiz." },
    { q: "Are the quizzes free?", a: "Yes, most quizzes are free to use." },
    { q: "Can I track my progress?", a: "Yes, signed-in users can track their scores and progress." },
    { q: "How many times can I attempt a quiz?", a: "You can attempt quizzes unlimited times unless limited by the creator." },
    { q: "Will I get a certificate after completing a quiz?", a: "Some quizzes provide certificates after completion." },
    { q: "Can I share my results on social media?", a: "Yes you can easily share your results." },
    { q: "Does the quiz have a timer?", a: "Some quizzes include timers depending on rules." },
    { q: "Can I take quizzes on mobile?", a: "Yes, it is fully mobile-friendly." },
    { q: "Are the questions updated regularly?", a: "Yes, content is updated frequently." },
  ];

  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center px-4 py-14">
      <h1 className="text-4xl font-extrabold text-center mb-2 tracking-tight">Frequently Asked Questions</h1>
      <p className="text-gray-600 text-center mb-12">Find answers to the most common questions</p>

      <div className="w-full max-w-2xl space-y-5">
        {faqs.map((item, index) => {
          const isOpen = open === index;

          return (
            <div key={index} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md transition-all duration-300 hover:border-indigo-400">
              <button onClick={() => toggleFAQ(index)} className="w-full flex justify-between items-center">
                <p className="text-lg font-semibold">{item.q}</p>
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-full transition-transform duration-500 ${
                    isOpen ? "bg-indigo-600 text-white rotate-180" : "bg-indigo-100 text-indigo-700"
                  }`}
                >
                  {isOpen ? <FiMinus className="text-[20px]" /> : <FiPlus className="text-[20px]" />}
                </div>
              </button>

              <div
                ref={(el) => (contentRefs.current[index] = el)}
                style={{ maxHeight: isOpen ? contentRefs.current[index]?.scrollHeight : 0 }}
                className={`overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(.19,1,.22,1)] ${
                  isOpen ? "opacity-100 mt-3" : "opacity-0"
                }`}
              >
                <p className="text-gray-700 text-sm leading-relaxed">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-14 text-center">
        <p className="text-gray-600 text-sm mb-3">Still have questions?</p>
        <button className="px-6 py-2.5 rounded-full bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition shadow-lg">Contact Support</button>
      </div>
    </div>
  );
}
