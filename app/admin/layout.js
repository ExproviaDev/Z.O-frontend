"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Sidebar from "./components/Sidebar" 
import Header from "./components/Header"  

export default function AdminLayout({ children }) {
  const [activeMenu, setActiveMenu] = useState("dashboard")
  const [loading, setLoading] = useState(true) // ১. Loading state add koro
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      const data = localStorage.getItem("user_data")
      const token = localStorage.getItem("access_token")

      if (!data || !token) {
        handleLogout()
        return
      }

      try {
        const user = JSON.parse(data)
        const role = user.role //

        // ২. Unauthorized user hole logout
        if (role !== "admin" && role !== "manager") {
          handleLogout()
          return
        }
        
        // ৩. Manager/Jury-r jonno specific route restriction
        const adminOnlyRoutes = ["/admin/quiz-management", "/admin/user-management", "/admin/mark-controller, /admin/video-submission-setting"];
        if (role === "manager" && adminOnlyRoutes.some(path => pathname.startsWith(path))) {
          router.push("/admin")
          return
        }

        // Shob thik thakle loading bondho koro
        setLoading(false)

      } catch (error) {
        handleLogout()
      }
    }

    checkAuth()
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.clear()
    router.push("/login")
  }

  // ৪. Joto khon check cholbe, toto khon children render hobe na
  if (loading) {
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