"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaUser, FaHome, FaBook, FaRegBookmark, FaStar,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { GrAnnounce } from "react-icons/gr";
import Swal from "sweetalert2";
import LogoutButton from "../../Components/LogoutButton";
import { MdLeaderboard } from "react-icons/md";

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);

  // ১. পেজ লোড হলে লোকাল স্টোরেজ থেকে রোল চেক করা
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("user_data");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserRole(parsedData?.role || "user");
      } else {
        setUserRole("user"); 
      }
    }
  }, []);

  // ২. মেনু আইটেমগুলোতে 'allowedRoles' যোগ করা হলো
  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, href: "/dashboard", allowedRoles: ["user", "ambassador", "admin"] },
    { name: "My Profile", icon: <FaUser />, href: "/dashboard/profile", allowedRoles: ["user", "ambassador", "admin"] },
    { name: "My Quizzes", icon: <FaBook />, href: "/dashboard/quizzes", allowedRoles: ["user", "ambassador"] },
    { name: "My Certificates", icon: <FaRegBookmark />, href: "/dashboard/certificates", allowedRoles: ["user", "ambassador"] },
    { name: "Payment History", icon: <FaStar />, href: "/dashboard/history", allowedRoles: ["user", "ambassador"] },
    { name: "Announcement", icon: <GrAnnounce />, href: "/dashboard/announcement", allowedRoles: ["user", "ambassador"] },
    { name: "Video Submission", icon: <FaRegBookmark />, href: "/dashboard/video-submission", allowedRoles: ["user", "ambassador"] },
    { name: "Leaderboard", icon: <MdLeaderboard />, href: "/dashboard/leaderboard", allowedRoles: ["user", "ambassador"] },

    
    {
      name: "Ambassador Panel",
      icon: <FaUser />,
      href: "/dashboard/ambassador",
      allowedRoles: ["ambassador"]
    },
  ];

  const handleLogout = () => {
    Swal.fire({
      title: "Are You Sure?",
      text: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "লগআউট হয়েছে!",
          text: "আপনাকে হোম পেজে পাঠানো হচ্ছে।",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          onClose();
          router.push("/");
        }, 1500);
      }
    });
  };

  return (
    <>
      <aside
        className={`
          fixed inset-y-0 left-0 z-[40] w-64 bg-Secondary border-r border-gray-100
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:fixed lg:top-16 lg:h-[calc(100vh-64px)]
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          flex flex-col overflow-hidden
        `}
      >
        <div className="flex flex-col h-full p-5">
          <div className="pb-4 px-2 hidden lg:block"></div>

          <nav className="flex-1 space-y-1 mt-2 overflow-y-auto no-scrollbar">
            {menuItems.map((item) => {
              
              if (item.allowedRoles && userRole && !item.allowedRoles.includes(userRole)) {
                return null;
              }

              const isActive = pathname === item.href;

              return (
                <Link prefetch={false}
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium 
                  ${isActive
                      ? "text-white bg-Primary border-r-4 border-white "
                      : "text-white hover:bg-gray-500 hover:text-white"
                    }
                `}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-gray-100 space-y-2">
            <Link prefetch={false}
              href="/"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white font-medium text-sm hover:bg-gray-500 transition-all"
            >
              <FaHome className="text-xl" />
              <span>Back to Home</span>
            </Link>

            <LogoutButton></LogoutButton>
          </div>
        </div>
      </aside>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[30] lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}