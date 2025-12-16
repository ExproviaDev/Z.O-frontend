"use client"

import { useState } from "react"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import DashboardHome from "./components/DashboardHome"
import RoleManagement from "./components/RoleManagement"
import StudentManagement from "./components/StudentManagement"
import QuizManagement from "./components/QuizManagement"
import EventManagement from "./components/EventManagement"
import Video from "./components/Video"
import Settings from "./components/Settings"

export default function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState("dashboard")

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <DashboardHome />
      case "role-management":
        return <RoleManagement />
      case "student-management":
        return <StudentManagement />
      case "quiz-management":
        return <QuizManagement />
      case "event-management":
        return <EventManagement />
      case "video":
        return <Video />
      case "settings":
        return <Settings />
      default:
        return <DashboardHome />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeMenu={activeMenu} onMenuClick={setActiveMenu} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}
