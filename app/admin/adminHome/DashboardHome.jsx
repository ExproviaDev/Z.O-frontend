"use client";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaChartLine } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import StatsSection from "../components/ChartStatTable/StatCard";
import SDGChart from "../components/ChartStatTable/Chart";
import DistributionPieChart from "../components/ChartStatTable/PieChart";
import LoadFailedFallback from "../../Components/Fallbacks/LoadFailedFallback";

// ডাটা ফেচিং ফাংশন
const fetchDashboardStats = async () => {
  const token = localStorage.getItem("access_token");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await axios.get(`${API_URL}/api/admin/dashboard-stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

function DashboardStatsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="w-full rounded-[32px] bg-[#0f172a] px-8 py-10 shadow-xl">
        <div className="h-8 w-56 rounded-full bg-white/15" />
        <div className="mt-4 h-4 w-72 rounded-full bg-white/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="h-4 w-24 rounded-full bg-slate-200" />
            <div className="mt-5 h-9 w-20 rounded-full bg-slate-200" />
            <div className="mt-4 h-3 w-32 rounded-full bg-slate-100" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 rounded-[30px] border border-gray-50 bg-white p-8 shadow-sm">
          <div className="h-5 w-56 rounded-full bg-slate-200" />
          <div className="mt-8 h-72 rounded-3xl bg-slate-100" />
        </div>
        <div className="lg:col-span-4 rounded-[32px] border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mx-auto h-5 w-36 rounded-full bg-slate-200" />
          <div className="mx-auto mt-8 h-52 w-52 rounded-full bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardHome() {
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: fetchDashboardStats,
    staleTime: 2 * 60 * 1000,   // 2 minutes — fresh enough for live admin use
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,  // refetch when admin switches back to this tab
    placeholderData: (previousData) => previousData,
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
  };

  if (isLoading) {
    return <DashboardStatsSkeleton />;
  }

  if (error) {
    return (
      <LoadFailedFallback
        error={error}
        title="Couldn't load dashboard stats"
        description="We couldn't fetch the latest dashboard data. You can retry, or sign in again if your session has expired."
        onRetry={handleRefresh}
      />
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
        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={handleRefresh}
            disabled={isFetching}
            title="Refresh stats"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold rounded-xl transition-all disabled:opacity-50"
          >
            <FiRefreshCw className={isFetching ? "animate-spin" : ""} size={14} />
            {isFetching ? "Refreshing…" : "Refresh"}
          </button>
          <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
            <FaChartLine className="text-blue-400 text-2xl" />
          </div>
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
        <div className="lg:col-span-8 bg-white p-4 md:p-8 rounded-[30px] shadow-sm border border-gray-50">
          <div className="flex justify-between items-center ">
            <h3 className="font-bold text-gray-800 text-lg">SDG Participation (Total 17)</h3>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter">Real-time Data</span>
          </div>
          <SDGChart graphData={data?.sdg_registrations || []} />
        </div>

        {/* Distribution Pie Chart (Right) */}
        <div className="lg:col-span-4 bg-white p-4 md:p-8 rounded-[32px] shadow-sm border border-gray-100">
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