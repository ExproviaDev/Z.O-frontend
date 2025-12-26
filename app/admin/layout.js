

"use client"

import { useState } from "react"

import Sidebar from "./components/Sidebar" 
import Header from "./components/Header"  
export default function AdminLayout({ children }) {

  const [activeMenu, setActiveMenu] = useState("dashboard")

  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem)
  }

  return (
    <div className="flex h-screen overflow-hidden">

      <Sidebar activeMenu={activeMenu} onMenuClick={handleMenuClick} />

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
