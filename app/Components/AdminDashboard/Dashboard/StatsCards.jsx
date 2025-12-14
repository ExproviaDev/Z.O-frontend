"use client"

export default function StatsCards() {
  const stats = [
    {
      title: "Total Registrations",
      value: "2,547",
      change: "+12.5%",
      icon: "📝",
      color: "blue",
    },
    {
      title: "Active Users",
      value: "1,892",
      change: "+8.2%",
      icon: "👤",
      color: "green",
    },
    {
      title: "Ongoing Events",
      value: "15",
      change: "+3",
      icon: "🏆",
      color: "purple",
    },
    {
      title: "Pending Approvals",
      value: "43",
      change: "-5",
      icon: "⏳",
      color: "orange",
    },
  ]

  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${colorClasses[stat.color]}`}
            >
              {stat.icon}
            </div>
            <span className={`text-sm font-medium ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
              {stat.change}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
          <p className="text-sm text-gray-600">{stat.title}</p>
        </div>
      ))}
    </div>
  )
}
