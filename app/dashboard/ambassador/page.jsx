"use client";
import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FiUsers, FiCopy, FiCheckCircle, FiPlusCircle, FiAlertCircle } from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast";

// ১. ডাটা ফেচিং ফাংশন (Query Function)
const fetchAmbassadorStats = async () => {
  const token = localStorage.getItem("access_token");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!token) throw new Error("No access token found");

  const res = await axios.get(`${API_URL}/api/ambassadors/my-stats`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.data;
};

export default function AmbassadorDashboard() {
  const queryClient = useQueryClient();
  const [newPromoInput, setNewPromoInput] = useState("");
  
  // ২. useQuery হুক ব্যবহার করে ডাটা ফেচ
  const { data: stats, isLoading, isError, error } = useQuery({
    queryKey: ["ambassador-stats"],
    queryFn: fetchAmbassadorStats,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // ৩. প্রোমো কোড আপডেট করার মিউটেশন (Mutation)
  const updateMutation = useMutation({
    mutationFn: async (code) => {
      const token = localStorage.getItem("access_token");
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      return axios.put(`${API_URL}/api/ambassadors/update-code`, { newPromoCode: code }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
    onSuccess: () => {
      // ডাটা রিফ্রেশ করা
      queryClient.invalidateQueries(["ambassador-stats"]);
      toast.success("Promo code set successfully!");
      setNewPromoInput("");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to set promo code");
    }
  });

  const handleSetCode = () => {
    if (!newPromoInput.trim()) return toast.error("Please enter a code");
    if (newPromoInput.length < 4) return toast.error("Code must be at least 4 characters");
    updateMutation.mutate(newPromoInput);
  };

  const copyCode = () => {
    if (stats?.myPromoCode) {
      navigator.clipboard.writeText(stats.myPromoCode);
      toast.success("Promo code copied!");
    }
  };

  if (isLoading) {
    return <div className="p-10 text-center animate-pulse text-gray-500">Loading your stats...</div>;
  }

  if (isError) {
    return (
      <div className="p-10 text-center text-red-500">
        <p>Failed to load data. Please try again later.</p>
        <p className="text-xs text-gray-400 mt-2">{error?.message}</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <Toaster />
      
      {/* Promo Code Section */}
      <div className="bg-[#0f172a] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <h1 className="text-3xl font-black text-white">Ambassador Panel</h1>
            <p className="text-gray-400 mt-2">Grow your network and track your influence.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-center w-full md:w-auto min-w-[300px]">
            {stats?.myPromoCode ? (
              // যদি প্রোমো কোড অলরেডি থাকে
              <>
                <p className="text-[10px] uppercase font-bold tracking-widest text-blue-300 mb-2">Your Unique Code</p>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-3xl font-black tracking-tighter uppercase">{stats.myPromoCode}</span>
                  <button onClick={copyCode} className="p-2 hover:bg-white/20 rounded-xl transition-all">
                    <FiCopy size={20} />
                  </button>
                </div>
              </>
            ) : (
              // যদি প্রোমো কোড না থাকে (NULL থাকে)
              <div className="space-y-3 text-center">
                <p className="text-[10px] uppercase font-bold tracking-widest text-orange-400 mb-1 flex items-center justify-center gap-1">
                  <FiAlertCircle size={12} /> Set Your Custom Code
                </p>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={newPromoInput}
                    onChange={(e) => setNewPromoInput(e.target.value.toUpperCase().replace(/\s/g, ""))}
                    placeholder="Ex: ZO_RAKIB"
                    className="bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-sm focus:outline-none w-full uppercase placeholder:text-gray-500"
                  />
                  <button 
                    onClick={handleSetCode}
                    disabled={updateMutation.isPending}
                    className="bg-blue-600 hover:bg-blue-700 p-2.5 rounded-xl transition-all disabled:opacity-50"
                  >
                    {updateMutation.isPending ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <FiPlusCircle size={22} />
                    )}
                  </button>
                </div>
                <p className="text-[9px] text-gray-400 italic">
                  * একবার সেট করলে আর পরিবর্তন করা যাবে না।
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
            <FiUsers size={32} />
          </div>
          <div>
            <p className="text-4xl font-black text-gray-800">{stats?.totalReferrals || 0}</p>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Referrals</p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
            <FiCheckCircle size={32} />
          </div>
          <div>
            <p className="text-2xl font-black text-gray-800 uppercase">Active</p>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Ambassador Status</p>
          </div>
        </div>
      </div>

      {/* Referral Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="font-black text-gray-800 uppercase tracking-tight">Recent Joins</h2>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">Real-time</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-[10px] uppercase tracking-widest">
                <th className="p-6">Name</th>
                <th className="p-6">Institution</th>
                <th className="p-6 text-right">Join Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats?.referralList?.length > 0 ? (
                stats.referralList.map((ref, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-6 font-bold text-gray-700">{ref.name}</td>
                    <td className="p-6 text-gray-500 text-sm">{ref.institution}</td>
                    <td className="p-6 text-right text-gray-400 text-xs">
                      {new Date(ref.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-10 text-center text-gray-400 italic">No referrals yet. Start sharing your code!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}