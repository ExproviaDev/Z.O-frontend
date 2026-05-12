"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import { useUserProfile } from "../lib/hooks/useUserProfile"

export default function AdminLayout({ children }) {
  const [activeMenu, setActiveMenu] = useState("dashboard")
  const router = useRouter()
  const pathname = usePathname()
  const { data: user, isLoading, isError } = useUserProfile()

  const handleLogout = () => {
    if (typeof window !== "undefined") localStorage.clear()
    router.push("/login")
  }

  useEffect(() => {
    if (typeof window === "undefined") return
    const token = localStorage.getItem("access_token")
    if (!token) {
      handleLogout()
      return
    }
    if (isLoading) return

    if (isError || !user) {
      handleLogout()
      return
    }

    const role = user.role
    if (role !== "admin" && role !== "manager") {
      handleLogout()
      return
    }

    const adminOnlyRoutes = [
      "/admin/quiz-management",
      "/admin/user-management",
      "/admin/mark-controller",
      "/admin/video-submission-setting",
    ]
    if (role === "manager" && adminOnlyRoutes.some((p) => pathname.startsWith(p))) {
      router.push("/admin")
    }
  }, [user, isLoading, isError, pathname, router])

  const role = user?.role
  const allowed = role === "admin" || role === "manager"

  if (isLoading || !allowed) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600">Verifying access...</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeMenu={activeMenu} onMenuClick={(m) => setActiveMenu(m)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}