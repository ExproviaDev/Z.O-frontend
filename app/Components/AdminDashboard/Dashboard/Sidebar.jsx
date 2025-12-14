"use client"

export default function Sidebar({ activeMenu, setActiveMenu, sidebarOpen, setSidebarOpen }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "users", label: "User Management", icon: "👥" },
    { id: "content", label: "Content Management", icon: "📝" },
    { id: "events", label: "Events / Competitions", icon: "🏆" },
    { id: "analytics", label: "Analytics & Reports", icon: "📈" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ]

  return (
    <aside
      className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Logo / Brand */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <span className="font-bold text-lg text-gray-900">Olympiad Admin</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveMenu(item.id)
                setSidebarOpen(false)
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg
                text-left font-medium transition-colors
                ${activeMenu === item.id ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer Info */}
        
      </div>
    </aside>
  )
}
