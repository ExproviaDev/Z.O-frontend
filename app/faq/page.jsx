"use client";

import React, { useState, useRef } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import bannerImg from "@/public/src/faq.jpg"; // <-- YOUR FAQ BANNER IMAGE

export default function FAQPage() {
  const [open, setOpen] = useState(null);
  const [activeCategory, setActiveCategory] = useState("intro");
  const contentRefs = useRef([]);

  // ====================== QUIZ DATA ============================
  const quizData = {
    intro: [
      { q: "Zero Olympiad-এর মূল উদ্দেশ্য কী?", a: "“Reducing to Zero, Rising as Hero” – সামাজিক সমস্যা সমাধানে শিশুদের উদ্বুদ্ধ করা।" },
      { q: "Zero Olympiad কারা আয়োজন করেছে?", a: "Faatihha Aayat।" },
      { q: "পরিচিতিমূলক ভিডিও কোন সেকশনে পাওয়া যায়?", a: "“Zero Olympiad নির্দেশিকা” সেকশনে।" },
      { q: "Zero Olympiad কী ধরনের প্রতিযোগিতা?", a: "শিশু-কেন্দ্রিক গ্লোবাল এডুকেশন ও সচেতনতা-ভিত্তিক প্রতিযোগিতা।" },
      { q: "Zero Olympiad-এর মূল থিম কী?", a: "Reducing To Zero — সমাজের সমস্যা শূন্যে নামিয়ে আনা।" },
    ],

    participate: [
      { q: "অংশ নিলে শিশুদের কী অর্জন হয়?", a: "গ্লোবাল ইস্যু সম্পর্কে জ্ঞান ও নেতৃত্ব গুণ বৃদ্ধি পায়।" },
      { q: "Zero Olympiad কি আন্তর্জাতিক সনদ দেয়?", a: "হ্যাঁ, Certificate of Completion দেওয়া হয়।" },
      { q: "কেন শিক্ষার্থীদের এই প্রোগ্রামে অংশ নেওয়া উচিত?", a: "সৃজনশীলতা, আত্মবিশ্বাস ও সামাজিক দায়িত্ববোধ বাড়ানোর জন্য।" },
      { q: "Zero Olympiad কি বয়সভিত্তিক?", a: "হ্যাঁ, নির্দিষ্ট বয়সভিত্তিক ক্যাটেগরি আছে।" },
      { q: "কী ধরনের কার্যক্রম থাকে?", a: "কুইজ, গবেষণা, ভিডিও প্রতিযোগিতা, প্রেজেন্টেশন ইত্যাদি।" },
    ],

    category: [
      { q: "Registration Category কতটি?", a: "৩টি (Junior, Intermediate, Senior)।" },
      { q: "Junior Category কারা?", a: "বয়সে ছোট অংশগ্রহণকারীরা।" },
      { q: "Intermediate Category-এর লক্ষ্য কী?", a: "গবেষণা ও বিশ্লেষণ দক্ষতা উন্নয়ন।" },
      { q: "Senior Category-তে কী করা হয়?", a: "উন্নত গবেষণা, সমস্যা বিশ্লেষণ, ভিডিও তৈরি ইত্যাদি।" },
      { q: "Categories কোথায় দেখানো হয়েছে?", a: "Registration Categories সেকশনে তিনটি কার্ডে।" },
    ],

    awards: [
      { q: "পুরস্কার কত ধরনের?", a: "৩টি (1st Delegate, 1st Leader, 1st Pioneer)।" },
      { q: "1st Delegate কিভাবে দেওয়া হয়?", a: "পারফরম্যান্স ও উপস্থাপনার ভিত্তিতে।" },
      { q: "1st Leader কারা পায়?", a: "নেতৃত্ব ও যোগাযোগ দক্ষতায় সেরা শিক্ষার্থী।" },
      { q: "1st Pioneer কারা পায়?", a: "সৃজনশীলতা ও উদ্ভাবনী কাজে সেরা অংশগ্রহণকারী।" },
      { q: "Award সেকশনের পর কী আছে?", a: "গুরুত্বপূর্ণ প্রতিযোগিতা নোটিশ।" },
    ],

    timeline: [
      { q: "Registration Deadline কবে?", a: "January 15, 2025।" },
      { q: "1st Round (MCQ) কবে?", a: "January 18, 2025।" },
      { q: "2nd Round Video Contest কবে?", a: "January 31, 2025।" },
      { q: "Grand Finale কবে?", a: "February 08, 2025।" },
      { q: "Timeline কিভাবে দেখানো হয়েছে?", a: "Vertical timeline with date, day & event details।" },
    ],
  };

  const toggleFAQ = (index) => setOpen(open === index ? null : index);

  const categories = [
    { id: "intro", name: "Introduction" },
    { id: "participate", name: "Participation" },
    { id: "category", name: "Registration Categories" },
    { id: "awards", name: "Awards" },
    { id: "timeline", name: "Timeline" },
  ];

  return (
    <div className="bg-white text-black pt-16">

      {/* ===================== TOP BANNER ===================== */}
     <div className="relative w-full h-[240px] sm:h-[300px] md:h-[380px] lg:h-[420px] overflow-hidden">

  {/* Banner Image */}
  <img
    src={bannerImg.src}
    alt="FAQ Banner"
    className="w-full h-full object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Title */}
  <h1
    className="absolute inset-0 flex justify-center items-center 
    text-white text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-wide px-2 text-center"
  >
    Frequently Asked Questions
  </h1>

</div>


      {/* ===================== MAIN CONTENT ===================== */}
      <div className="  px-6 py-12 flex flex-col lg:flex-row gap-10 justify-center">

        {/* ---------- LEFT CATEGORY SIDEBAR ---------- */}
        <div className="lg:w-1/4  bg-gray-50 rounded-sm  p-5 h-fit sticky top-10">
          <h2 className="text-xl font-bold mb-4">Quiz Categories</h2>

          <div className="space-y-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setOpen(null); }}
                className={`w-full text-left px-4 py-2 rounded-xl border transition ${
                  activeCategory === cat.id
                    ? "bg-indigo-400 text-white border-indigo-400"
                    : "bg-white text-black border-gray-300 hover:border-indigo-400"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* ---------- RIGHT FAQ CONTENT ---------- */}
        <div className="lg:w-2/4 w-full">
          <p className="text-gray-600 mb-8">
            Category: <strong>{categories.find(c => c.id === activeCategory)?.name}</strong>
          </p>

          <div className="space-y-5">
            {quizData[activeCategory].map((item, index) => {
              const isOpen = open === index;

              return (
                <div key={index} className="bg-white border border-gray-200 rounded-xl py-3 px-6 shadow-sm hover:border-indigo-300">

                  <button onClick={() => toggleFAQ(index)} className="w-full flex justify-between items-center">
                    <p className="text-lg font-semibold">{item.q}</p>

                    <div
                      className={`w-9 h-9 flex items-center justify-center rounded-full transition-transform duration-500 ${
                        isOpen ? "bg-indigo-600 text-white rotate-180" : "bg-indigo-100 text-indigo-400"
                      }`}
                    >
                      {isOpen ? <FiMinus /> : <FiPlus />}
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
        </div>
      </div>
    </div>
  )
}
