"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import LogoutButton from "../LogoutButton";
import { FiUser } from "react-icons/fi";
import { useUserProfile } from "../../lib/hooks/useUserProfile";

function getInitials(source) {
  if (!source || typeof source !== "string") return "U";
  const trimmed = source.trim();
  if (!trimmed) return "U";
  const parts = trimmed.split(/[\s.@_-]+/).filter(Boolean);
  if (parts.length === 0) return trimmed[0].toUpperCase();
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function nProfileModal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  const { data: user } = useUserProfile({ enabled: isOpen });

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

  const menuItems = [
    { label: "My Courses", path: "/dashboard/mycourses" },
    { label: "Certificates and Achievement", path: "/dashboard/certificates" },
    { label: "Announcements", path: "/dashboard/announcement" },
  ];

  return (
    <div className="absolute right-0 top-full z-50 mt-2 w-[min(calc(100vw-2rem),17.5rem)] md:w-72">
      <div
        ref={modalRef}
        className="overflow-hidden rounded-lg border border-white/10 bg-[#0F172A] shadow-xl shadow-black/35"
      >
        <div className="border-b border-white/8 bg-black/20 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white font-bold ring-2 ring-white/15">
              {getInitials(user?.name || user?.email)}
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-[15px] font-semibold text-white">
                {user?.name || "Guest User"}
              </p>
              <p className="mt-0.5 truncate text-xs leading-snug text-slate-400">
                Student · Role:{" "}
                <span className="text-slate-300">{user?.sdg_role || "N/A"}</span>
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/profile"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-center text-sm font-semibold text-[#0F172A] transition hover:bg-slate-100 active:scale-[0.99]"
            onClick={onClose}
          >
            <FiUser className="text-base opacity-80" />
            View Profile
          </Link>
        </div>

        <nav className="px-2 py-2">
          <ul className="space-y-0.5 text-sm">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.path}
                  onClick={onClose}
                  className="block rounded-md px-3 py-2.5 text-slate-300 transition-colors hover:bg-white/6 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/8 px-2 pb-2 pt-1">
          <LogoutButton className="justify-center rounded-md py-2.5 hover:bg-red-500/10" />
        </div>
      </div>
    </div>
  );
}
