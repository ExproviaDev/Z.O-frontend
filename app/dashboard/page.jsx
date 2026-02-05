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

     
    </div>
  );
};

export default UserDashboard;
