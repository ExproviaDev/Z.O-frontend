


"use client"

import React, { useState } from 'react';
import {  FaChevronDown, FaBars } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

import Link from 'next/link';
import { RxDashboard } from "react-icons/rx";


const DashboardHeader = ({ onMenuClick }) => { // Sidebar টগল করার জন্য props
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 py-3 px-4 md:px-6 flex items-center justify-between sticky top-0 z-40 h-16">
      
      {/* Left Section: Logo & Mobile Toggle */}
      <div className="flex items-center gap-4">
        {/* মোবাইল বাটন: এটি শুধুমাত্র মোবাইলে (lg:hidden) দেখা যাবে */}
        <button 
          onClick={onMenuClick} 
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
        >
          <FaBars size={20} />
        </button>

        {/* Logo Section - Sidebar এর সাথে এলাইন করা */}
        <Link href={'/'} className="flex gap-2 items-center transition-opacity hover:opacity-80">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <RxDashboard  size={22} />
          </div>
          <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 hidden sm:block">
            User Dashboard
          </h3>
        </Link>
      </div>

      {/* Right Section: Notifications & Profile */}
      <div className="flex items-center gap-2 md:gap-5">
        
     

        <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 md:pr-3 hover:bg-gray-50 rounded-full md:rounded-xl transition-all border border-transparent hover:border-gray-100"
          >
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
              A
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-bold text-gray-800 leading-none">Alex Shatter</p>
              <p className="text-[10px] text-gray-500 font-semibold mt-1 uppercase tracking-wider">Pro Member</p>
            </div>
            <FaChevronDown className={`text-gray-400 text-[10px] hidden md:block transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[60] overflow-hidden"
              >
                <div className="px-4 py-2 border-b border-gray-50 mb-1">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Account</p>
                </div>
                <Link href="/dashboard/profile" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">My Profile</Link>
                <Link href="/dashboard/settings" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Settings</Link>
                <hr className="my-1 border-gray-100" />
                <button className="w-full text-left block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition font-bold">Logout</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;