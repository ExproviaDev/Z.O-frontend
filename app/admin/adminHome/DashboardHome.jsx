"use client"

import { useEffect, useState } from "react"
import { FiUsers, FiCalendar, FiClock } from "react-icons/fi"
// import StatCard from "./components/StatCard"
// import StatCard from "../components/ChartStatTable/StatCard"

import Chart from "../components/ChartStatTable/Chart"
import StatsSection from "../components/ChartStatTable/StatCard"

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
      <StatsSection></StatsSection>

      {/* Chart */}
      <Chart />
      
    </div>
  )
}
