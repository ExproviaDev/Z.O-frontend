"use client"

export default function EventManagement() {
  const events = [
    {
      id: 1,
      name: "National Mathematics Olympiad 2025",
      round: "1st Round",
      date: "Feb 10, 2025",
      participants: 542,
      status: "Active",
    },
    {
      id: 2,
      name: "Physics Challenge Cup",
      round: "2nd Round",
      date: "Feb 15, 2025",
      participants: 387,
      status: "Active",
    },
    {
      id: 3,
      name: "Chemistry Quiz Competition",
      round: "Final",
      date: "Feb 20, 2025",
      participants: 294,
      status: "Upcoming",
    },
    {
      id: 4,
      name: "Biology Olympiad",
      round: "1st Round",
      date: "Feb 25, 2025",
      participants: 189,
      status: "Upcoming",
    },
  ]

  const leaderboard = [
    { rank: 1, name: "Rahul Sharma", school: "Delhi Public School", score: 98, badge: "🥇" },
    { rank: 2, name: "Priya Patel", school: "Kendriya Vidyalaya", score: 96, badge: "🥈" },
    { rank: 3, name: "Arjun Kumar", school: "DAV Public School", score: 94, badge: "🥉" },
    { rank: 4, name: "Sneha Reddy", school: "Ryan International", score: 92, badge: "🏅" },
    { rank: 5, name: "Vikram Singh", school: "Modern School", score: 90, badge: "🏅" },
  ]

  const statusColors = {
    Active: "bg-green-100 text-green-800",
    Upcoming: "bg-blue-100 text-blue-800",
    Completed: "bg-gray-100 text-gray-800",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Event Management</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          + Add New Event
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📅 {event.date}</span>
                  <span>•</span>
                  <span>Round: {event.round}</span>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[event.status]}`}>
                {event.status}
              </span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="text-sm">
                <span className="text-gray-600">Participants:</span>
                <span className="ml-2 font-semibold text-gray-900">{event.participants}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <button className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                View Details
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Edit
              </button>
              <button className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">🏆 Top Performers Leaderboard</h2>
          <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg font-medium">
            View Full Leaderboard
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  School
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaderboard.map((entry) => (
                <tr key={entry.rank} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{entry.badge}</span>
                      <span className="font-semibold text-gray-900">{entry.rank}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{entry.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{entry.school}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-blue-600">{entry.score}</span>
                      <span className="text-sm text-gray-500">/ 100</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
