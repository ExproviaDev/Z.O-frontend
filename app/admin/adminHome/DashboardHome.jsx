"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaChartLine } from "react-icons/fa";
import StatsSection from "../components/ChartStatTable/StatCard";
import SDGChart from "../components/ChartStatTable/Chart";
import DistributionPieChart from "../components/ChartStatTable/PieChart";

// ডাটা ফেচিং ফাংশন
const fetchDashboardStats = async () => {
  const token = localStorage.getItem("access_token");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await axios.get(`${API_URL}/api/admin/dashboard-stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export default function DashboardHome() {
  // TanStack Query এর মাধ্যমে ডাটা লোড এবং ৩০ মিনিটের ক্যাশিং
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: fetchDashboardStats,
    staleTime: 30 * 60 * 1000, // ৩০ মিনিট পর্যন্ত ডাটা ফ্রেশ থাকবে
    gcTime: 35 * 60 * 1000,    // ৩০ মিনিটের একটু বেশি সময় মেমোরিতে ডাটা ক্যাশ থাকবে
    refetchOnWindowFocus: false, // উইন্ডো ফোকাস করলে বারবার লোড হওয়া বন্ধ করবে
  });

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 font-bold">
        Error loading dashboard data. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="w-full rounded-[32px] bg-[#0f172a] px-8 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-white text-3xl font-extrabold tracking-tight">System Overview</h2>
          <p className="text-blue-300/60 text-sm font-medium mt-1">Tracking enrollment and SDG participation</p>
        </div>
        <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 relative z-10">
          <FaChartLine className="text-blue-400 text-2xl" />
        </div>
      </div>

      {/* 4 Stats Cards */}
      <StatsSection stats={{
        totalEnrolment: data?.total_enrolment || 0,
        totalParticipant: data?.total_participant || 0,
        secondRound: data?.second_round_students || 0,
        totalFinalist: data?.total_finalists || 0
      }} />

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SDG Bar Chart (Left) */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[32px] shadow-sm border border-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-lg">SDG Participation (Total 17)</h3>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter">Real-time Data</span>
          </div>
          <SDGChart graphData={data?.sdg_registrations || []} />
        </div>

        {/* Distribution Pie Chart (Right) */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 text-lg mb-4 text-center">Enrolment Split</h3>
          <DistributionPieChart 
            pieData={[
              { name: 'Participants', value: data?.total_participant || 0 },
              { name: '2nd Round', value: data?.second_round_students || 0 },
              { name: 'Finalists', value: data?.total_finalists || 0 }
            ]} 
          />
        </div>
      </div>
    </div>
  );
}