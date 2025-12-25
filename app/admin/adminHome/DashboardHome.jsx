"use client"

import { useEffect, useState } from "react"
import { FiUsers, FiCalendar, FiClock } from "react-icons/fi"
// import { FaUsers, FaSearch } from "react-icons/fa";
// import StatCard from "./components/StatCard"
// import StatCard from "../components/ChartStatTable/StatCard"
import { FaUser } from "react-icons/fa";

import Chart from "../components/ChartStatTable/Chart"
import StatsSection from "../components/ChartStatTable/StatCard"
import ReviewsSection from "../components/ChartStatTable/StudentReview"

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
     

  <div className="w-full rounded-t-2xl bg-gradient-to-r from-[#0b1324] via-[#0e1a35] to-[#0b1324] px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-lg">
      
      {/* Left */}
      <div className="flex   items-start gap-3">
        <div className="w-10 h-10  bg-blue-500/20 flex items-center justify-center">
          <FaUser className="text-blue-400 text-lg" />
        </div>

        <div>
          <h2 className="text-white text-3xl font-bold">
           Dashboard
          </h2>
          
        </div>
      </div>

      
    </div>

      {/* Stats Cards */}
      <StatsSection></StatsSection>

      {/* Chart */}
      <Chart />

{/* review */}
      <ReviewsSection></ReviewsSection>
      
    </div>
  )
}
