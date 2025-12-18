"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiHome, FiUsers, FiUserCheck, FiFileText, FiCalendar, FiVideo, FiSettings, FiMenu, FiX } from "react-icons/fi"


const menuItems = [{ id: "dashboard", label: "Dashboard", icon: FiHome, href: "/admin" },
{ id: "role-management", label: "Role Management", icon: FiUsers, href: "/admin/role-management" },
{ id: "student-management", label: "Student Management", icon: FiUserCheck, href: "/admin/student-management" },
{ id: "quiz-management", label: "Quiz Management", icon: FiFileText, href: "/admin/quiz-management" },
{ id: "event-management", label: "Event Management", icon: FiCalendar, href: "/admin/event-management" },
{ id: "video", label: "Video", icon: FiVideo, href: "/admin/video" },
{ id: "settings", label: "Settings", icon: FiSettings, href: "/admin/settings" },
]

// 3. props: activeMenu এবং onMenuClick বাদ দেওয়া
export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname() // বর্তমান পাথ নেওয়া

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  // Active Link check function
  const isActiveLink = (href) => {
    // ড্যাশবোর্ড রুটের জন্য (exact match)
    if (href === "/admin") {
      return pathname === "/admin"
    }
    // অন্যান্য রুটের জন্য (starts with match)
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* ... (Mobile Menu Button and Overlay code remains the same) ... */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
      >
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* ... (Mobile Overlay code remains the same) ... */}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              // 4. activeMenu প্রপের বদলে URL পাথ ব্যবহার করে isActive চেক করা
              const isActive = isActiveLink(item.href)

              return (
                <Link // 5. <button> এর বদলে <Link> ব্যবহার করা
                  key={item.id}
                  href={item.href} // 6. href ব্যবহার করা
                  onClick={handleLinkClick} // 7. Link-এ ক্লিক হ্যান্ডেলার
                  className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors ${isActive ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}