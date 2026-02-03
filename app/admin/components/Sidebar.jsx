"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiUsers,
  FiUserCheck,
  FiFileText,
  FiCalendar,
  FiVideo,
  FiMenu,
  FiX,

} from "react-icons/fi";
import { IoMdHome } from "react-icons/io";
import { MdLeaderboard, MdCampaign  } from "react-icons/md";

// ১. Access Level onujayi Menu Items
const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: FiHome, href: "/admin", access: ["admin", "manager"] },
  { id: "video-evaluation", label: "Video Evaluation", icon: FiVideo, href: "/admin/video-evaluation", access: ["admin", "manager"] },
  { id: "leaderboard", label: "Leaderboard", icon: MdLeaderboard, href: "/admin/leaderboard", access: ["admin", "manager"] },
  { id: "Announcement", label: "Announcement", icon: MdCampaign , href: "/admin/announcement", access: ["admin", "manager"] },

  // Admin Only Access
  { id: "quiz-management", label: "Quiz Management", icon: FiFileText, href: "/admin/quiz-management", access: ["admin"] },
  { id: "competition-control", label: "Competition Control", icon: FiCalendar, href: "/admin/competition-control", access: ["admin"] },
  { id: "mark-controller", label: "Mark Controller", icon: FiUserCheck, href: "/admin/mark-controller", access: ["admin"] },
  { id: "role-management", label: "User Management", icon: FiUsers, href: "/admin/user-management", access: ["admin"] },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    // LocalStorage theke user_data object parse koro
    const data = localStorage.getItem("user_data");
    if (data) {
      try {
        setUser(JSON.parse(data));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // User role ber kora (Admin/Manager/User)
  const userRole = user?.role || "user";

  const isActiveLink = (href) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
<button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="xl:hidden fixed top-4 left-4 z-[60] p-2 bg-white rounded-lg shadow-md text-gray-800">
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {isMobileMenuOpen && <div onClick={() => setIsMobileMenuOpen(false)} className="xl:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm" />}

      <aside className={`fixed xl:static inset-y-0 left-0 z-40 w-64 bg-[#0f172a] text-gray-400 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"}`}>
        <div className="h-full flex flex-col p-4">
          {/* Brand Logo */}
         <Link href={"/"}>
               <div className="flex items-center gap-3 px-4 mb-10 h-16">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
              <FiHome size={20} />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Zero Olympiad</span>
          </div>
         </Link>

          <nav className="flex-1 space-y-1">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[2px] px-4 mb-4">Main Menu</p>
            {menuItems.filter(item => item.access.includes(userRole)).map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link key={item.id} href={item.href} onClick={() => setIsMobileMenuOpen(false)} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? "bg-white/10 text-white font-semibold" : "hover:bg-white/5 hover:text-gray-200"}`}>
                  <item.icon size={20} className={isActive ? "text-emerald-400" : ""} />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer User Profile (Shiptrack Style) */}
          <div className="mt-auto border-t border-white/5 pt-4 px-2">
            <div className="flex items-center gap-3 p-2 bg-white/5 rounded-2xl border border-white/5">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">{userRole}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}