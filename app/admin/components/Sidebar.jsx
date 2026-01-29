"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiUsers,
  FiUserCheck,
  FiFileText,
  FiCalendar,
  FiVideo,
  FiSettings,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { IoMdHome } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { MdLeaderboard } from "react-icons/md";


const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: FiHome, href: "/admin" },
  {
    id: "quiz-management",
    label: "Quiz Management",
    icon: FiFileText,
    href: "/admin/quiz-management",
  },
  {
    id: "competition-control",
    label: "Competition Control",
    icon: FiCalendar,
    href: "/admin/competition-control",
  },{
    id:"video-evaluation",
    label:"Video Evaluation",
    icon:FiVideo,
    href:"/admin/video-evaluation",
  },
  {
    id: "role-management",
    label: "Role Management",
    icon: FiUsers,
    href: "/admin/role-management",
  },
  {
    id: "student-management",
    label: "Student Management",
    icon: FiUserCheck,
    href: "/admin/student-management",
  },
  {
    id: "event-management",
    label: "Event Management",
    icon: FiCalendar,
    href: "/admin/event-management",
  },
  { id: "video", label: "Video", icon: FiVideo, href: "/admin/video" },
  {
    id: "settings",
    label: "Settings",
    icon: FiSettings,
    href: "/admin/settings",
  },
  {
    id: "leaderboard-promotion",
    label: "Leaderboard",
    icon: MdLeaderboard,
    href: "/admin/leaderboard-and-promotion",
  },

];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (href) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile & Tablet Menu Button (up to 1024px) */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="xl:hidden fixed top-4 left-4 z-[60] p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition"
      >
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay (Mobile & Tablet) */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="xl:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed xl:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
      ${isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full xl:translate-x-0"
          }
    `}
      >
        <div className="h-full flex flex-col">

          {/* Logo */}
          <Link
            href="/"
            className="h-16 flex items-center justify-center xl:justify-start
                   border-b border-gray-200 px-6 pl-10 xl:px-6"
          >
            <h1 className="text-lg xl:text-xl flex items-center gap-2 font-bold text-gray-800">
              <IoMdHome />
              <span className="hidden sm:inline">Zero Olympiad</span>
            </h1>
          </Link>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto py-4 flex flex-col justify-between h-full">

            {/* Menu Items */}
            <div>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveLink(item.href);

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-6 py-3 transition-colors ${isActive
                      ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* User Info */}
            <div
              className={`flex items-center gap-3  pl-4 border-l border-gray-200 transition-all duration-300 ease-in-out
      ${isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20 xl:opacity-100 xl:translate-x-0"}
    `}
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                <FiUser size={20} />
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>

          </nav>


        </div>


      </aside>
    </>

  );
}
