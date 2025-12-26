"use client"

import React, { useState } from 'react'; // useState ইম্পোর্ট করা হয়েছে
import { FaSearch, FaFilter, FaCheckCircle, FaPlayCircle } from 'react-icons/fa';

const MyQuizzes = () => {
  const [searchTerm, setSearchTerm] = useState(""); // সার্চের জন্য স্টেট

  const quizzes = [
    {
      id: 1,
      title: "Mastering Typescript Part 3",
      level: "Level Easy",
      desc: "Dive deep into advanced types, generics, and utility helpers for better code quality.",
      status: "Passed",
      score: "92%",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&q=80",
    },
    {
      id: 2,
      title: "Mastering Typescript Part 2",
      level: "Level Medium",
      desc: "Dive deep into advanced types, generics, and utility helpers for better code quality.",
      status: "Passed",
      score: "92%",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80",
    },
    {
      id: 3,
      title: "Mastering Typescript Part 1",
      level: "Level Hard",
      desc: "Dive deep into advanced types, generics, and utility helpers for better code quality.",
      status: "Passed",
      score: "92%",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80",
    },
    {
      id: 4,
      title: "React Fundamental 101", // নাম পরিবর্তন করা হয়েছে টেস্টের জন্য
      level: "Level Medium",
      desc: "Basic concepts of React.js including JSX, Components, and Props.",
      status: "In Progress",
      image: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=400&q=80",
    },
    // ... আরও কুইজ ডেটা এখানে থাকতে পারে
  ];

  // সার্চ লজিক: কুইজের নাম অনুযায়ী ফিল্টার করবে
  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Quizzes</h1>
          <p className="text-gray-500 text-sm mt-1">Track and manage your assessment history</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-72">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm} // ইনপুট ভ্যালু স্টেট থেকে আসছে
              onChange={(e) => setSearchTerm(e.target.value)} // টাইপ করলে স্টেট আপডেট হবে
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
            />
          </div>
          <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <FaFilter className="text-gray-500 text-sm" />
          </button>
        </div>
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={quiz.image}
                  alt={quiz.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[11px] font-bold rounded-full border border-white/30 tracking-wide">
                    {quiz.level}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 leading-tight">
                  {quiz.title}
                </h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  {quiz.desc}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  {quiz.status === "Passed" ? (
                    <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                      <FaCheckCircle />
                      <span>Passed ({quiz.score})</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                      <FaPlayCircle />
                      <span>In Progress</span>
                    </div>
                  )}

                  <button className={`px-5 py-1.5 rounded-full font-bold text-xs transition-all ${
                    quiz.status === "Passed" 
                    ? "bg-gray-100 text-gray-600 hover:bg-gray-200" 
                    : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-100"
                  }`}>
                    {quiz.status === "Passed" ? "Review" : "Resume"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* কুইজ না পাওয়া গেলে এই মেসেজ দেখাবে */
          <div className="col-span-full py-20 text-center">
            <p className="text-gray-400 text-lg">No quizzes found with name "<span className="text-gray-600 font-bold">{searchTerm}</span>"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyQuizzes;