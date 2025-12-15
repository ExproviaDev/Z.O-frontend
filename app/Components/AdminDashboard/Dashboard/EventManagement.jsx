



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
    Active: "bg-green-100 text-green-700",
    Upcoming: "bg-blue-100 text-blue-700",
    Completed: "bg-gray-100 text-gray-700",
  }

  return (
    <div className="space-y-6 px-2 sm:px-4">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Event Management
        </h1>
        <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium">
          + Add New Event
        </button>
      </div>

      {/* ================= EVENTS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white border rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    {event.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    📅 {event.date} • {event.round}
                  </p>
                </div>
                <span
                  className={`self-start px-3 py-1 text-xs rounded-full font-medium ${statusColors[event.status]}`}
                >
                  {event.status}
                </span>
              </div>

              <p className="mt-4 text-sm">
                <span className="text-gray-500">Participants:</span>{" "}
                <span className="font-semibold">{event.participants}</span>
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button className="px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                Details
              </button>
              <button className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                Edit
              </button>
              <button className="px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= LEADERBOARD ================= */}
      <div className="bg-white border rounded-2xl shadow-sm p-4 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold">
            🏆 Top Performers Leaderboard
          </h2>
          <button className="text-blue-600 text-sm font-medium hover:bg-blue-50 px-3 py-1 rounded-lg">
            View Full Leaderboard
          </button>
        </div>

        {/* TABLE (SCROLL ON SMALL DEVICES) */}
        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Rank</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Name</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">School</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {leaderboard.map((entry) => (
                <tr key={entry.rank} className="hover:bg-gray-50">
                  <td className="px-4 py-3 flex items-center gap-2">
                    <span className="text-lg">{entry.badge}</span>
                    <span className="font-semibold">{entry.rank}</span>
                  </td>
                  <td className="px-4 py-3">{entry.name}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {entry.school}
                  </td>
                  <td className="px-4 py-3 font-bold text-blue-600">
                    {entry.score}
                    <span className="text-xs text-gray-500"> /100</span>
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
