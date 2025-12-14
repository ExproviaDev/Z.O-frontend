



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
          <div className="">
            <StatsCards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentActivities />
              <PendingTasks />
            </div>
          </div>
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
    // 🔒 BODY SCROLL LOCK
    <div className="h-screen overflow-y-hidden  bg-gray-50">
      
      {/* SIDEBAR (FIXED) */}
      <aside className="fixed left-0 top-0 h-screen w-64 z-40">
        <Sidebar
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </aside>

      {/* RIGHT SIDE (OFFSET BY SIDEBAR WIDTH) */}
      <div className="ml-64 flex h-screen flex-col">
        
        {/* TOP NAVBAR (FIXED HEIGHT) */}
        <div className="h-16 flex-shrink-0">
          <TopNavbar setSidebarOpen={setSidebarOpen} />
        </div>

        {/* ✅ ONLY CONTENT SCROLLS */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>

      </div>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
