"use client";
import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaChartLine } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import StatsSection from "../components/ChartStatTable/StatCard";
import OverviewMetricsLineChart from "../components/ChartStatTable/OverviewMetricsLineChart";
import { AudienceFunnelGlassDonut } from "../components/ChartStatTable/DashboardDonuts";
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="h-4 w-24 rounded-full bg-slate-200" />
            <div className="mt-5 h-9 w-20 rounded-full bg-slate-200" />
            <div className="mt-4 h-3 w-32 rounded-full bg-slate-100" />
          </div>
        ))}
      </div>

      <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-4 h-6 w-56 rounded-full bg-slate-200" />
        <div className="h-3 w-full max-w-xl rounded-full bg-slate-100" />
        <div className="mt-8 h-[300px] w-full rounded-2xl bg-slate-100" />
      </div>

      <div className="rounded-[28px] border border-gray-100 bg-linear-to-br from-white to-slate-50 p-6 shadow-sm md:p-10">
        <div className="mb-6 space-y-3">
          <div className="h-3 w-28 rounded-full bg-slate-200" />
          <div className="h-7 w-52 max-w-full rounded-full bg-slate-200 md:h-8 md:w-64" />
          <div className="h-3 max-w-xl rounded-full bg-slate-100" />
        </div>
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-16">
          <div className="size-[min(22rem,calc(100vw-4rem))] shrink-0 rounded-full bg-slate-100 md:size-104" />
          <div className="grid w-full max-w-lg flex-1 gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 rounded-xl bg-slate-50" />
            ))}
          </div>
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

      {/* Stats cards */}
      <StatsSection stats={{
        totalEnrolment: data?.total_enrolment || 0,
        secondRound: data?.second_round_students || 0,
        totalFinalist: data?.total_finalists || 0
      }} />

      <OverviewMetricsLineChart sdgData={data?.sdg_registrations || []} />

      {/* System pipeline — full-width hero donut */}
      <div className="w-full">
        <AudienceFunnelGlassDonut
          centreEnrolment={data?.total_enrolment ?? 0}
          pies={[
            { key: "enrol", name: "Total users", value: data?.total_enrolment || 0 },
            { key: "r2", name: "2nd round", value: data?.second_round_students || 0 },
            { key: "fn", name: "Finalists", value: data?.total_finalists || 0 },
          ]}
        />
      </div>
    </div>
  );
}