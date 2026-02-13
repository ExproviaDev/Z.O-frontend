"use client";

import React, { useState } from "react";
import { FaChevronDown, FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import LogoutButton from "../../Components/LogoutButton";
import { useSelector } from "react-redux";
import Image from "next/image";

const DashboardHeader = ({ onMenuClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const authState = useSelector((state) => state.auth);
  const { user = null } = authState || {};
  const userName = user?.name || "User";
  const userImg = user?.profile_image_url;

  return (
    <header className="bg-Secondary border-b border-gray-100 py-3 px-4 md:px-6 flex items-center justify-between sticky top-0 z-40 h-16">
        <div prefetch={false} className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <FaBars size={20} />
          </button>

          <Link href={"/dashboard"}>
          <div className="bg-secondary p-2 rounded-lg text-white">
            <RxDashboard size={22} />
          </div>
          </Link>

          <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-secondary hidden sm:block">
            Dashboard
          </h3>
        </div>

      <div className="flex items-center gap-2 md:gap-5">
        <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-2 md:pr-3 hover:bg-gray-500 rounded-full md:rounded-xl transition-all border border-transparent hover:border-gray-500"
          >
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md overflow-hidden">
              {userImg ? (
                <Image
                  src={userImg}
                  alt={userName}
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              ) : (
                userName.charAt(0).toUpperCase()
              )}
            </div>

            <div className="hidden md:block text-left">
              <p className="text-sm font-bold text-secondary leading-none">
                {userName}
              </p>
              <p className="text-[10px] text-white font-semibold mt-1 uppercase tracking-wider">
                {user?.role || "Member"}
              </p>
            </div>
            <FaChevronDown
              className={`text-Primary text-[10px] hidden md:block transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
            />
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
                <Link prefetch={false}
                  href="/dashboard/profile"
                  className="block px-8 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  My Profile
                </Link>
                <div className="w-full text-left block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition font-bold">
                  <LogoutButton />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
