"use client"

import { useEffect, useState } from "react"

export default function Chart() {
  const [userData, setUserData] = useState([])

  useEffect(() => {
    fetch("/users.json")
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.error("Error loading users:", err))
  }, [])

  // Calculate group distribution
  const groupCounts = userData.reduce((acc, user) => {
    acc[user.group] = (acc[user.group] || 0) + 1
    return acc
  }, {})

  const chartData = Object.entries(groupCounts).map(([group, count]) => ({
    group: group.split("(")[0].trim(),
    count,
  }))

  const maxCount = Math.max(...chartData.map((d) => d.count), 1)

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">User Distribution by Group</h3>

      <div className="space-y-4">
        {chartData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">{item.group}</span>
              <span className="text-gray-600">{item.count} users</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {chartData.length === 0 && <div className="text-center py-8 text-gray-500">No data available</div>}
    </div>
  )
}
