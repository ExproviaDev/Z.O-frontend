


"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai"; // <-- এই লাইনটি যোগ করুন
import LogoutButton from "../LogoutButton";

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
    <div className="fixed  top-0 right-0 h-full z-50 ">
      <div
        ref={modalRef}
        className="absolute top-0 right-0 w-[280px] pt-28   rounded-2xl transition-transform duration-300"
      >
        {/* Close Button */}
        {/* <div className="flex justify-end mb-8">
          <button onClick={onClose} className="text-white">
            <AiOutlineClose size={28} />
          </button>
        </div> */}

        {/* Profile Info */}
        <div className="flex flex-col items-center text-center">
          <div className="relative p-[2px] rounded-full ">
            <Image
              src={
                user?.profile_image_url ||
                "https://images.unsplash.com/photo-1517841905240-472988babdf9"
              }
              alt="profile"
              width={64}
              height={64}
              className="rounded-full w-20 h-20 object-cover "
            />
          </div>
          <h3 className="mt-3 font-semibold text-white">
            {user?.name || "Guest User"}
          </h3>
          <p className="text-sm text-gray-400">
            Student Role: {user?.sdg_role || "N/A"}
          </p>

          <Link
            href="/dashboard/profile"
            className="mt-3 w-full rounded-lg  py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
            onClick={onClose}
          >
            View Profile
          </Link>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-purple-800/30" />

        {/* Menu */}
        <ul className="space-y-1 text-sm">
          {[
            { label: "Dashboard", path: "/dashboard" },
            { label: "My Profile", path: "/dashboard/profile" },
            { label: "My Quizzes", path: "/dashboard/quizzes" },
            { label: "My Certificates", path: "/dashboard/certificates" },
            { label: "Payment History", path: "/dashboard/history" },
          ].map((item) => (
            <li
              key={item.label}
              className="cursor-pointer rounded-lg px-3 py-2 text-gray-300 hover:bg-white/5 hover:text-white transition-all border-b border-white/5 last:border-0"
            >
              <Link
                href={item.path}
                onClick={onClose}
                className="block w-full"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <div className="mt-4 border-t border-purple-800/30 pt-3">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
