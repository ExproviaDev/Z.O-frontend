"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser, FaHome, FaBook, FaRegBookmark, FaStar } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import LogoutButton from "../LogoutButton";

export default function Sidebar() {
  const pathname = usePathname();

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
  ];

  return (
    <aside className="lg:w-64 border-2 border-green-600 rounded-xl p-6 shadow-sm bg-white">
      {/* Welcome text */}
      <h2 className="text-sm font-semibold text-gray-500 mb-4">
        WELCOME, JONE DUE
      </h2>
      {/* Main menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all 
              ${
                isActive
                  ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      {/* Divider */}
      <hr className="my-6" />
      {/* Section title */}
      {/* <p className="text-sm font-semibold text-gray-500 mb-2">USER</p>

      {/* User menu */}
      <nav className="space-y-1">
        <LogoutButton />
      </nav>
    </aside>
  );
}
