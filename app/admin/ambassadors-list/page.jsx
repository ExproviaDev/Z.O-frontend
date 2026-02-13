"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch, FiUser, FiCode, FiUsers, FiMail, FiCalendar } from "react-icons/fi";

// ক্যাশ কি (Key) এবং সময় (৫ মিনিট = ৩০০,০০০ মিলি-সেকেন্ড)
const CACHE_KEY = "ambassadors_data_cache";
const CACHE_DURATION = 5 * 60 * 1000;

export default function AdminAmbassadorPage() {
  const [ambassadors, setAmbassadors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
    const fetchAmbassadors = async () => {
      const now = new Date().getTime();
      
      // ১. ক্যাশ চেক করা
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        
        // যদি ৫ মিনিট পার না হয়, তবে ক্যাশ থেকে ডাটা নেবে
        if (now - timestamp < CACHE_DURATION) {
          console.log("Serving from cache...");
          setAmbassadors(data);
          setLoading(false);
          return; // এপিআই কল করার দরকার নেই
        }
      }

      // ২. ক্যাশ না থাকলে বা সময় শেষ হলে এপিআই কল করা
      try {
        console.log("Fetching new data from server...");
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const token = localStorage.getItem("access_token");

        const res = await axios.get(`${API_URL}/api/ambassadors/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setAmbassadors(res.data.data);
          
          // ৩. ডাটা ক্যাশে সেভ করা
          const cachePayload = {
            data: res.data.data,
            timestamp: now,
          };
          localStorage.setItem(CACHE_KEY, JSON.stringify(cachePayload));
        }
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAmbassadors();
  }, []);
  
  const filteredData = ambassadors.filter(amb => 
    amb.user_profiles?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    amb.promo_code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-800">Ambassadors</h1>
            <p className="text-slate-500">Track affiliate performance and promo usage.</p>
          </div>
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search Name or Code..." 
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-600 text-sm">
                  <th className="p-5 font-bold">Ambassador</th>
                  <th className="p-5 font-bold">Promo Code</th>
                  <th className="p-5 font-bold text-center">Referrals</th>
                  <th className="p-5 font-bold">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr><td colSpan="4" className="p-10 text-center animate-pulse">Loading...</td></tr>
                ) : filteredData.map((amb) => (
                  <tr key={amb.id} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600"><FiUser size={20}/></div>
                        <div>
                          <p className="font-bold text-slate-700">{amb.user_profiles?.name}</p>
                          <p className="text-xs text-slate-400 flex items-center gap-1"><FiMail size={12}/> {amb.user_profiles?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="bg-slate-100 px-3 py-1 rounded-lg font-mono font-bold text-indigo-600 uppercase border border-slate-200">
                        <FiCode className="inline mr-1" /> {amb.promo_code}
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1 rounded-full font-black text-sm">
                        <FiUsers size={14}/> {amb.total_referrals}
                      </div>
                    </td>
                    <td className="p-5 text-slate-400 text-sm">
                      <FiCalendar className="inline mr-1" /> {new Date(amb.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}