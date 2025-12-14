"use client"

export default function ContentManagement() {
  const categories = [
    {
      id: 1,
      name: "Mathematics Olympiad",
      description: "Advanced mathematics competition for grades 8-12",
      participants: 542,
      status: "Active",
    },
    {
      id: 2,
      name: "Physics Challenge",
      description: "Problem-solving competition for physics enthusiasts",
      participants: 387,
      status: "Active",
    },
    {
      id: 3,
      name: "Chemistry Quiz",
      description: "Periodic table and chemical reactions competition",
      participants: 294,
      status: "Inactive",
    },
  ]

  const awards = [
    { title: "Gold Medal", value: "₹50,000", recipients: 15 },
    { title: "Silver Medal", value: "₹30,000", recipients: 30 },
    { title: "Bronze Medal", value: "₹15,000", recipients: 50 },
    { title: "Certificate of Excellence", value: "Certificate", recipients: 200 },
  ]

  const timeline = [
    { phase: "Registration Opens", date: "Jan 15, 2025", status: "completed" },
    { phase: "Round 1 - Online Quiz", date: "Feb 10, 2025", status: "active" },
    { phase: "Round 2 - Written Test", date: "Mar 5, 2025", status: "upcoming" },
    { phase: "Final Round", date: "Apr 20, 2025", status: "upcoming" },
  ]

  const statusColors = {
    Active: "bg-green-100 text-green-800",
    Inactive: "bg-gray-100 text-gray-800",
  }

  const timelineColors = {
    completed: "bg-green-500",
    active: "bg-blue-500",
    upcoming: "bg-gray-300",
  }

  return (
    <div className="space-y-6 pb-10  overflow-hidden ">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
      </div>

      {/* Registration Categories */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Registration Categories</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            + Add Category
          </button>
        </div>

        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-base font-semibold text-gray-900">{category.name}</h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[category.status]}`}>
                      {category.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                  <p className="text-sm text-gray-500">{category.participants} participants enrolled</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded font-medium">Edit</button>
                  <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded font-medium">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Awards & Prizes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Awards & Prizes</h2>
            <button className="px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded font-medium">
              + Add Award
            </button>
          </div>

          <div className="space-y-3">
            {awards.map((award, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
              >
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{award.title}</h3>
                  <p className="text-sm text-gray-600">
                    {award.value} • {award.recipients} recipients
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competition Timeline */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Competition Timeline</h2>
            <button className="px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded font-medium">
              + Add Phase
            </button>
          </div>

          <div className="space-y-4">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${timelineColors[item.status]}`}></div>
                  {index < timeline.length - 1 && <div className="w-0.5 h-full bg-gray-300 mt-1"></div>}
                </div>
                <div className="flex-1 pb-6">
                  <h3 className="font-semibold text-gray-900 text-sm">{item.phase}</h3>
                  <p className="text-sm text-gray-600">{item.date}</p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${
                      item.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : item.status === "active"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
