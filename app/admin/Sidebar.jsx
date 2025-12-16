"use client"

import { useState } from "react"
import { FiHome, FiUsers, FiUserCheck, FiFileText, FiCalendar, FiVideo, FiSettings, FiMenu, FiX } from "react-icons/fi"

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: FiHome },
  { id: "role-management", label: "Role Management", icon: FiUsers },
  { id: "student-management", label: "Student Management", icon: FiUserCheck },
  { id: "quiz-management", label: "Quiz Management", icon: FiFileText },
  { id: "event-management", label: "Event Management", icon: FiCalendar },
  { id: "video", label: "Video", icon: FiVideo },
  { id: "settings", label: "Settings", icon: FiSettings },
]

export default function Sidebar({ activeMenu, onMenuClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMenuClick = (menuId) => {
    onMenuClick(menuId)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
      >
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
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
              const isActive = activeMenu === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center gap-3 px-6 py-3 text-left transition-colors ${
                    isActive ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
