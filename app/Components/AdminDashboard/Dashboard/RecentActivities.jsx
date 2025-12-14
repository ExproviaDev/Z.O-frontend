"use client"

export default function RecentActivities() {
  const activities = [
    {
      user: "Rahul Sharma",
      action: "Registered for National Math Olympiad",
      date: "2 hours ago",
      avatar: "RS",
    },
    {
      user: "Priya Patel",
      action: "Completed Round 1 Quiz",
      date: "4 hours ago",
      avatar: "PP",
    },
    {
      user: "Arjun Kumar",
      action: "Updated profile information",
      date: "6 hours ago",
      avatar: "AK",
    },
    {
      user: "Sneha Reddy",
      action: "Submitted payment for Physics Quiz",
      date: "8 hours ago",
      avatar: "SR",
    },
    {
      user: "Vikram Singh",
      action: "Downloaded admit card",
      date: "12 hours ago",
      avatar: "VS",
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {activity.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.user}</p>
              <p className="text-sm text-gray-600 truncate">{activity.action}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
        View All Activities
      </button>
    </div>
  )
}
