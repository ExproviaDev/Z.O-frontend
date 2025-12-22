"use client";

import Link from "next/link";
import { FiBell, FiUser } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex-1 pl-12">
        <button className="btn btn-primary">
          <Link className="flex items-center gap-2" href={"/"}>
            <FaArrowLeft />
            Home
          </Link>
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <FiBell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
            <FiUser size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
