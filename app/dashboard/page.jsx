"use client";

import React from "react";
import Head from "next/head";
import {
  FaBookOpen,
  FaChartLine,
  FaClock,
  FaUsers,
  FaPlay,
  FaExclamationTriangle, // নতুন ইম্পোর্ট
  FaBan,                 // নতুন ইম্পোর্ট
  FaShieldAlt,           // নতুন ইম্পোর্ট
  FaFlag                 // নতুন ইম্পোর্ট
} from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Link from "next/link";

const UserDashboard = () => {
  const authState = useSelector((state) => state.auth);
  const { user = null } = authState || {};
  const userName = user?.name || "User";

  // স্ট্যাটিক ইনস্ট্রাকশন ডাটা
  const examRules = [
    {
      id: 1,
      title: "Time Management",
      desc: "You have strictly 30 minutes. The quiz will auto-submit when the time is up.",
      icon: <FaClock size={24} className="text-blue-600" />,
      bg: "bg-blue-50",
      border: "border-blue-100"
    },
    {
      id: 2,
      title: "Navigation Restricted",
      desc: "Do not refresh the page or use the back button. It will terminate your session.",
      icon: <FaBan size={24} className="text-red-600" />,
      bg: "bg-red-50",
      border: "border-red-100"
    },
    {
      id: 3,
      title: "Security Protocols",
      desc: "Switching tabs or minimizing the window will trigger a security warning.",
      icon: <FaShieldAlt size={24} className="text-indigo-600" />,
      bg: "bg-indigo-50",
      border: "border-indigo-100"
    },
    {
      id: 4,
      title: "Disqualification Policy",
      desc: "After 3 security warnings, you will be automatically disqualified from the quiz.",
      icon: <FaFlag size={24} className="text-orange-600" />,
      bg: "bg-orange-50",
      border: "border-orange-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-Secondary p-8 text-white shadow-xl mb-10"
      >
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome back, {userName}
          </h1>
          <p className="mt-2 text-blue-100 max-w-md">
            This is your space to practice, learn from mistakes, and grow
            smarter every day.{" "}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link prefetch={false} href={"/dashboard/quizzes"}>
              <button className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-opacity-90 active:scale-95 shadow-lg">
                <FaPlay className="text-xs" /> Continue Quiz
              </button>
            </Link>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white opacity-10" />
      </motion.div>

      {/* --- Static Instructions Section --- */}
      <div className="max-w-full mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                <FaExclamationTriangle size={20} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Important Exam Instructions
            </h2>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {examRules.map((rule) => (
                <motion.div 
                    key={rule.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: rule.id * 0.1 }}
                    className={`flex items-start gap-4 p-6 rounded-2xl border ${rule.bg} ${rule.border} hover:shadow-md transition-all`}
                >
                    <div className="mt-1 bg-white p-3 rounded-xl shadow-sm">
                        {rule.icon}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-lg mb-1">{rule.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
                            {rule.desc}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Warning Note */}
        <div className="mt-8 p-5 bg-white border-l-4 border-red-500 rounded-r-xl shadow-sm flex items-start gap-4">
            <div className="text-red-500 mt-1">
                <FaShieldAlt size={22} />
            </div>
            <div>
                <h4 className="font-bold text-gray-800">Strict Monitoring Active</h4>
                <p className="text-sm text-gray-500 mt-1">
                    Our system uses AI detection to monitor screen activity. Any attempt to switch tabs, take screenshots, or use external tools will be recorded and may lead to an immediate ban.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;