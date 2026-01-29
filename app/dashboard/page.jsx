

"use client"

import React from 'react';
import Head from 'next/head';
import { FaBookOpen, FaChartLine, FaClock, FaUsers, FaPlay } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

// নাম পরিবর্তন করে UserDashboard করা হয়েছে যেন কোনো ক্যাশ কনফ্লিক্ট না হয়
const UserDashboard = () => {
  
  const handleContinue = () => {
    Swal.fire({
      title: 'Ready to Start?',
      text: "You are about to resume your React course!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#6366f1',
      confirmButtonText: 'Yes, let\'s go!'
    });
  };

  const stats = [
    { id: 1, label: 'Quizzes Completed', value: '48', trend: '+ 12% vs last month', icon: <FaBookOpen />, color: 'bg-blue-500' },
    { id: 2, label: 'Avg. Score', value: '85%', trend: '+ 5% vs last week', icon: <FaChartLine />, color: 'bg-purple-500' },
    { id: 3, label: 'Study Hours', value: '124h', trend: '- 2h vs yesterday', icon: <FaClock />, color: 'bg-orange-500' },
    { id: 4, label: 'Community Rank', value: '#1,204', trend: 'Top 5%', icon: <FaUsers />, color: 'bg-red-500' },
  ];

  const quizzes = [
    { title: 'Advanced React Patterns 1', score: '82%', date: 'COMPLETED 2 DAYS AGO' },
    { title: 'Advanced React Patterns 2', score: '82%', date: 'COMPLETED 2 DAYS AGO' },
    { title: 'Advanced React Patterns 3', score: '82%', date: 'COMPLETED 2 DAYS AGO' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <Head>
        <title>Learning Dashboard</title>
      </Head>

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white shadow-xl mb-8"
      >
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold">Welcome back, Alex! 👋</h1>
          <p className="mt-2 text-blue-100 max-w-md">
            You have 3 quizzes pending for this week. Your current learning streak is 12 days. Keep it up!
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <button 
              onClick={handleContinue}
              className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-opacity-90 active:scale-95"
            >
              <FaPlay className="text-xs" /> Continue Learning
            </button>
            <button className="rounded-full bg-white bg-opacity-20 px-6 py-3 font-semibold text-blue-600 backdrop-blur-md transition hover:bg-opacity-30">
              View Progress
            </button>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white opacity-10" />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl text-white ${stat.color}`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${stat.id === 3 ? 'text-red-500 bg-red-50' : 'text-green-500 bg-green-50'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="mt-4 text-gray-500 text-sm">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Quizzes</h2>
            <button className="text-blue-600 font-semibold text-sm">View all</button>
          </div>
          <div className="space-y-4">
            {quizzes.map((quiz, index) => (
              <motion.div 
                whileHover={{ x: 5 }}
                key={index} 
                className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-gray-200 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${index}`} alt="icon" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{quiz.title}</h4>
                    <p className="text-xs text-gray-400">React Core Concepts • 24 questions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">{quiz.score}</p>
                  <p className="text-[10px] text-gray-400 uppercase">{quiz.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Learning Goals</h2>
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-gray-700">Weekly Quiz Target</span>
                <span className="text-blue-600 font-bold">4/5</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '80%' }}
                  className="h-full bg-blue-500"
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-gray-700">Course Completion</span>
                <span className="text-purple-600 font-bold">62%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '62%' }}
                  className="h-full bg-purple-500"
                />
              </div>
            </div>
            <button className="w-full rounded-xl border-2 border-dashed border-gray-200 py-3 text-sm font-semibold text-gray-400 hover:border-blue-300 hover:text-blue-400 transition">
              + Add New Goal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;