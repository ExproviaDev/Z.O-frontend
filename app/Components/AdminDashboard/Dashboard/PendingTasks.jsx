"use client"

export default function PendingTasks() {
  const tasks = [
    {
      title: "Approve payment for Amit Verma",
      category: "Payment",
      status: "pending",
      priority: "high",
    },
    {
      title: "Review content submission by Neha",
      category: "Content",
      status: "pending",
      priority: "medium",
    },
    {
      title: "Verify user document - ID: 2547",
      category: "Verification",
      status: "approved",
      priority: "low",
    },
    {
      title: "Update event leaderboard rankings",
      category: "Event",
      status: "pending",
      priority: "high",
    },
    {
      title: "Send email notification to participants",
      category: "Communication",
      status: "approved",
      priority: "medium",
    },
  ]

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
  }

  const priorityColors = {
    high: "text-red-600",
    medium: "text-orange-600",
    low: "text-blue-600",
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Tasks</h2>

      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-sm font-medium text-gray-900 flex-1">{task.title}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[task.status]}`}>
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-gray-600">{task.category}</span>
              <span className="text-gray-400">•</span>
              <span className={`font-medium ${priorityColors[task.priority]}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
        View All Tasks
      </button>
    </div>
  )
}
