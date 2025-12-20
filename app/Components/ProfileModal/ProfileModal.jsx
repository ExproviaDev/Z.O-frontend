"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function ProfileModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const authState = useSelector((state) => state.user);
  const { user = null, isLoggedIn = false, loading = true } = authState || {};
  // Outside click close
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
    <div className="absolute right-0 top-full mt-1 z-50">
      <div
        ref={modalRef}
        className="w-72 rounded-2xl border border-purple-600/40 bg-gradient-to-b from-[#1a0b2e] to-[#0b0418] p-4 shadow-2xl"
      >
        {/* Profile Info */}
        <div className="flex flex-col items-center text-center">
          <Image
            src={user.profile_image_url}
            alt="profile"
            width={64}
            height={64}
            className="rounded-full border-2 border-purple-500 w-20 h-20 object-cover"
          />
          <h3 className="mt-3 font-semibold text-white">{user.name}</h3>
          <p className="text-sm text-gray-400">Student Role: {user.sdg_role}</p>

          <Link
            href="/dashboard/profile"
            className="mt-3 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
            onClick={onClose}
          >
            View Profile
          </Link>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-purple-800/40" />

        {/* Menu */}
        <ul className="space-y-1 text-sm">
          {[
            { label: "Dashboard", path: "/dashboard" },
            { label: "My Profile", path: "/dashboard/profile" },
            { label: "My Quizzes", path: "/dashboard/quizzes" },
            { label: "My Certificates", path: "/dashboard/certificates" },
            { label: "Payment History", path: "/dashboard/history" },
            // { label: "Settings", path: "/account/settings" },
          ].map((item) => (
            <li
              key={item.label}
              className="cursor-pointer rounded-lg px-3 py-2 text-gray-300 hover:bg-purple-700/20 hover:text-white transition-colors"
            >
              <Link href={item.path} onClick={onClose} className="block w-full">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <div className="mt-4 border-t border-purple-800/40 pt-3">
          <button className="flex items-center gap-2 text-purple-400 hover:text-purple-300 cursor-pointer">
            Logout <span className="text-lg">↩</span>
          </button>
        </div>
      </div>
    </div>
  );
}
