"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaUser,
  FaHome,
  FaBook,
  FaRegBookmark,
  FaStar,
  FaSignOutAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { GrAnnounce } from "react-icons/gr";
import Swal from "sweetalert2";
import LogoutButton from "../../Components/LogoutButton";

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, href: "/dashboard" },
    { name: "My Profile", icon: <FaUser />, href: "/dashboard/profile" },
    { name: "My Quizzes", icon: <FaBook />, href: "/dashboard/quizzes" },
    {
      name: "My Certificates",
      icon: <FaRegBookmark />,
      href: "/dashboard/certificates",
    },
    { name: "Payment History", icon: <FaStar />, href: "/dashboard/history" },
    {
      name: "Announcement",
      icon: <GrAnnounce />,
      href: "/dashboard/announcement",
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
          title: "লগআউট হয়েছে!",
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
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium 
                  ${
                    isActive
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
            <Link
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
