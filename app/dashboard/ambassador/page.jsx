"use client";
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FiUsers, FiCopy, FiCheckCircle } from "react-icons/fi";
import { toast, Toaster } from "react-hot-toast";

// ১. ডাটা ফেচিং ফাংশন (Query Function)
const fetchAmbassadorStats = async () => {
  const token = localStorage.getItem("access_token");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // টোকেন না থাকলে এরর থ্রো করবে, যাতে কুয়েরি রান না হয় বা এরর হ্যান্ডেল হয়
  if (!token) throw new Error("No access token found");

  const res = await axios.get(`${API_URL}/api/ambassadors/my-stats`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.data;
};

export default function AmbassadorDashboard() {
  
  // ২. useQuery হুক ব্যবহার করে ডাটা ফেচ এবং ক্যাশিং
  const { data: stats, isLoading, isError, error } = useQuery({
    queryKey: ["ambassador-stats"], // ইউনিক কি (Unique Key)
    queryFn: fetchAmbassadorStats,
    staleTime: 5 * 60 * 1000, // 🔥 ৫ মিনিট পর্যন্ত ডাটা ফ্রেশ থাকবে (সার্ভার কল হবে না)
    gcTime: 10 * 60 * 1000,   // ১০ মিনিট পর্যন্ত মেমোরিতে ক্যাশ ধরে রাখবে
    refetchOnWindowFocus: false, // ট্যাব পাল্টালে অটো রিফ্রেশ বন্ধ রাখা হয়েছে
    retry: 1, // ফেইল করলে ১ বার রিট্রাই করবে
  });

  const copyCode = () => {
    if (stats?.myPromoCode) {
      navigator.clipboard.writeText(stats.myPromoCode);
      toast.success("Promo code copied!");
    }
  };

  // ৩. লোডিং স্টেট
  if (isLoading) {
    return <div className="p-10 text-center animate-pulse text-gray-500">Loading your stats...</div>;
  }

  // ৪. এরর স্টেট (যদি টোকেন না থাকে বা সার্ভার এরর দেয়)
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
      <div className="bg-[#0f172a] rounded-[2.5rem] p-8 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-black">Ambassador Panel</h1>
          <p className="text-gray-400 mt-2">Grow your network and track your influence.</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-center w-full md:w-auto z-10">
          <p className="text-[10px] uppercase font-bold tracking-widest text-blue-300 mb-2">Your Unique Code</p>
          <div className="flex items-center justify-center gap-4">
            <span className="text-3xl font-black tracking-tighter uppercase">{stats?.myPromoCode || "N/A"}</span>
            <button onClick={copyCode} className="p-2 hover:bg-white/20 rounded-xl transition-all">
              <FiCopy size={20} />
            </button>
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