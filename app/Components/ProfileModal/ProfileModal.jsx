"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";

export default function ProfileModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const authState = useSelector((state) => state.user);
  const { user = null, isLoggedIn = false, loading = true } = authState || {};

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="absolute md:right-5 lg:right-0 top-full mt-2 z-50">
      <div
        ref={modalRef}
        className="relative p-[2px] rounded-2xl bg-gradient-to-b from-purple-500 via-purple-800 to-transparent shadow-[0_0_20px_rgba(168,85,247,0.4)]"
      >
        <div className="w-72 rounded-[14px] bg-[#0b0418] p-5">
          <div className="flex flex-col items-center text-center">
            <div className="relative p-[2.5px] rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 shadow-lg">
              {user.profile_image_url ? (
                <Image
                  src={user.profile_image_url}
                  alt="Profile"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400 font-medium">
                  <FaUserCircle size={100}></FaUserCircle>
                </div>
              )}
            </div>
            <h3 className="mt-3 font-bold text-white tracking-wide">
              {user?.name || "Md Shoriful Islam"}
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              Student ID: {user?.student_id || "WEB10-1166"}
            </p>

            <Link
              href="/dashboard/profile"
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-2.5 text-sm font-semibold text-white hover:shadow-[0_0_15px_rgba(147,51,234,0.5)] transition-all duration-300"
              onClick={onClose}
            >
              View Profile
            </Link>
          </div>

          <div className="my-5 h-[1px] bg-gradient-to-r from-transparent via-purple-800/50 to-transparent" />

          <ul className="space-y-1 text-sm font-medium">
            {[
              { label: "My Classes", path: "/dashboard/classes" },
              { label: "Bookmark", path: "/dashboard/bookmarks" },
              { label: "Helpdesk", path: "/dashboard/helpdesk" },
              { label: "Actionable Dashboard", path: "/dashboard" },
              { label: "Leaderboard", path: "/leaderboard" },
            ].map((item) => (
              <li key={item.label} className="group">
                <Link
                  href={item.path}
                  onClick={onClose}
                  className="flex items-center px-3 py-2.5 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-all border-b border-white/5 group-last:border-0"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-purple-900/40 pt-3">
            <button className="flex w-full items-center justify-between text-purple-400 hover:text-purple-300 transition-colors font-semibold group">
              Logout
              <span className="text-xl group-hover:translate-x-1 transition-transform">
                ↩
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
