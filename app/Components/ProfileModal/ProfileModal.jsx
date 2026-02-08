"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import LogoutButton from "../LogoutButton";

export default function ProfileModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const authState = useSelector((state) => state.auth);
  const { user = null } = authState || {};


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
    <div className="absolute md:right-5 lg:right-0 top-full mt-3 z-50">

      <div
        ref={modalRef}
        className="relative p-[1px] rounded-2xl bg-Secondary shadow-2xl"
      >

        <div className="w-72 rounded-2xl bg-[#2b2e5c] p-5">

          <div className="flex flex-col items-center text-center">
            <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-purple-500 to-blue-500">
              <Image
                src={user?.profile_image_url || "https://i.ibb.co.com/cSVq7Mpd/Profile-avatar-placeholder-large-1.png"}
                alt="profile"
                width={80}
                height={80}
                className="rounded-full w-20 h-20 object-cover bg-[#0b0418]"
              />
            </div>
            <h3 className="mt-3 font-semibold text-white">
              {user?.name || "Guest User"}
            </h3>
            <p className="text-sm text-gray-400">
              Student Role: {user?.sdg_role || "N/A"}
            </p>

            <Link prefetch={false}
              href="/dashboard/profile"
              className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity text-center"
              onClick={onClose}
            >
              View Profile
            </Link>
          </div>


          <div className="my-4 h-px bg-purple-800/30" />


          <ul className="space-y-1 text-sm">
            {[
              { label: "My Quizzes", path: "/dashboard/quizzes" },
              { label: "My Certificates", path: "/dashboard/certificates" },
              { label: "Payment History", path: "/dashboard/history" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                prefetch={false}
                  href={item.path}
                  onClick={onClose}
                  className="block cursor-pointer rounded-lg px-3 py-2 text-gray-300 hover:bg-white/5 hover:text-white transition-all border-b border-white/5 last:border-0"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>


          <div className="mt-4 border-t border-purple-800/30 pt-3">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}