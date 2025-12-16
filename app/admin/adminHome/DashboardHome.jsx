"use client"

import { useEffect, useState } from "react"
import { FiUsers, FiCalendar, FiClock } from "react-icons/fi"
// import StatCard from "./components/StatCard"
import StatCard from "../components/ChartStatTable/StatCard"

import Chart from "../components/ChartStatTable/Chart"

export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    ongoingEvents: 0,
    pendingApprovals: 0,
  })

  useEffect(() => {
    fetch("/dashboardStats.json")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error loading stats:", err))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Registrations"
          value={stats.totalRegistrations}
          icon={FiUsers}
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Ongoing Events"
          value={stats.ongoingEvents}
          icon={FiCalendar}
          bgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          title="Pending Approvals"
          value={stats.pendingApprovals}
          icon={FiClock}
          bgColor="bg-orange-100"
          iconColor="text-orange-600"
        />
      </div>

      {/* Chart */}
      <Chart />
    </div>
  )
}
