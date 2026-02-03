"use client";

import React from "react";
import Head from "next/head";
import {
  FaBookOpen,
  FaChartLine,
  FaClock,
  FaUsers,
  FaPlay,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Link from "next/link";

const UserDashboard = () => {
  const authState = useSelector((state) => state.auth);
  const { user = null } = authState || {};
  const userName = user?.name || "User";

  const stats = [
    {
      id: 1,
      label: "Quizzes Completed",
      value: "48",
      trend: "+ 12% vs last month",
      icon: <FaBookOpen />,
      color: "bg-blue-500",
    },
    {
      id: 2,
      label: "Avg. Score",
      value: "85%",
      trend: "+ 5% vs last week",
      icon: <FaChartLine />,
      color: "bg-purple-500",
    },
    {
      id: 3,
      label: "Study Hours",
      value: "124h",
      trend: "- 2h vs yesterday",
      icon: <FaClock />,
      color: "bg-orange-500",
    },
    {
      id: 4,
      label: "Community Rank",
      value: "#1,204",
      trend: "Top 5%",
      icon: <FaUsers />,
      color: "bg-red-500",
    },
  ];

  const quizzes = [
    {
      title: "Advanced React Patterns 1",
      score: "82%",
      date: "COMPLETED 2 DAYS AGO",
    },
    {
      title: "Advanced React Patterns 2",
      score: "82%",
      date: "COMPLETED 2 DAYS AGO",
    },
    {
      title: "Advanced React Patterns 3",
      score: "82%",
      date: "COMPLETED 2 DAYS AGO",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-Secondary p-8 text-white shadow-xl mb-8"
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
              <button className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-opacity-90 active:scale-95">
                <FaPlay className="text-xs" /> Continue Quiz
              </button>
            </Link>
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
              <span
                className={`text-xs font-bold px-2 py-1 rounded-md ${stat.id === 3 ? "text-red-500 bg-red-50" : "text-green-500 bg-green-50"}`}
              >
                {stat.trend}
              </span>
            </div>
            <p className="mt-4 text-gray-500 text-sm">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
