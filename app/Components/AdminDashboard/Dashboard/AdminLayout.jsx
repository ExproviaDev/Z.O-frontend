



"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import TopNavbar from "./TopNavbar"
import StatsCards from "./StatsCards"
import RecentActivities from "./RecentActivities"
import PendingTasks from "./PendingTasks"
import UserManagement from "./UserManagement"
import ContentManagement from "./ContentManagement"
import EventManagement from "./EventManagement"
import AnalyticsReports from "./AnalyticsReforts"
import Settings from "./Settings"

export default function AdminLayout() {
  const [activeMenu, setActiveMenu] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return (
          <>
            <StatsCards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <RecentActivities />
              <PendingTasks />
            </div>
          </>
        )
      case "users":
        return <UserManagement />
      case "content":
        return <ContentManagement />
      case "events":
        return <EventManagement />
      case "analytics":
        return <AnalyticsReports />
      case "settings":
        return <Settings />
      default:
        return null
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-gray-50 flex">
      
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <Sidebar
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="flex flex-col flex-1 lg:ml-64 h-screen">
        
        {/* TOP NAVBAR */}
        <div className="h-16 flex-shrink-0 border-b bg-white">
          <TopNavbar setSidebarOpen={setSidebarOpen} />
        </div>

        {/* CONTENT (ONLY THIS SCROLLS) */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {renderContent()}
        </main>

      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
