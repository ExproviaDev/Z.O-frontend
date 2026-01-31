"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import {
  FiSearch, FiAward, FiChevronLeft, FiChevronRight, FiClock, FiUsers, FiFilter
} from 'react-icons/fi';

// SDG Names for better UX
const SDG_NAMES = [
  "No Poverty", "Zero Hunger", "Good Health", "Quality Education", "Gender Equality",
  "Clean Water", "Clean Energy", "Decent Work", "Industry & Innovation", "Reduced Inequality",
  "Sustainable Cities", "Responsible Consumption", "Climate Action", "Life Below Water",
  "Life on Land", "Peace & Justice", "Partnerships"
];

export default function LeaderboardPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, page: 1, limit: 20 });

  // Filters
  const [search, setSearch] = useState("");
  const [filterSdg, setFilterSdg] = useState("");
  const [activeRound, setActiveRound] = useState("round_1");

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeaderboard(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search, filterSdg, activeRound]);

  const fetchLeaderboard = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;

      const res = await axios.get(`${baseUrl}/api/leaderboard`, {
        params: { page, limit: 20, search, sdg: filterSdg, round: activeRound },
        headers: { Authorization: `Bearer ${token}` }
      });

      setStudents(res.data.data || []);
      setStats({
        total: res.data.total || 0,
        page: page,
        limit: 20
      });
    } catch (error) {
      console.error(error);
      toast.error("ডাটা লোড করা সম্ভব হয়নি");
    } finally {
      setLoading(false);
    }
  };

  const top3 = stats.page === 1 ? students.slice(0, 3) : [];
  const listData = stats.page === 1 ? students.slice(3) : students;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-slate-800">
      <Toaster position="top-right" />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10 text-center md:text-left">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">🏆 Leaderboard</h1>
        <p className="text-slate-500 text-lg font-medium">Recognizing the top change-makers in the SDG challenge.</p>
      </div>

      {/* Filters & Control Bar */}
      <div className="max-w-7xl mx-auto bg-white p-5 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 mb-10 flex flex-col lg:flex-row gap-5 items-center justify-between">
        
        {/* Round Switcher */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full lg:w-auto">
          {['round_1', 'round_2', 'round_3'].map((round) => (
            <button
              key={round}
              onClick={() => setActiveRound(round)}
              className={`flex-1 lg:flex-none px-8 py-2.5 rounded-xl text-sm font-black transition-all duration-300 ${
                activeRound === round 
                ? 'bg-white text-indigo-600 shadow-sm scale-100' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              {round.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>

        {/* Filter Inputs */}
        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
          <div className="relative group flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search participants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-72 pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-semibold"
            />
          </div>

          <div className="relative flex-1">
            <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select 
              className="w-full md:w-64 pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-slate-600 appearance-none cursor-pointer"
              value={filterSdg}
              onChange={(e) => setFilterSdg(e.target.value)}
            >
              <option value="">All SDG Categories</option>
              {SDG_NAMES.map((name, i) => (
                <option key={i + 1} value={i + 1}>SDG {i + 1}: {name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
          <p className="font-bold text-slate-400 animate-pulse">Fetching champions...</p>
        </div>
      ) : students.length === 0 ? (
        /* Empty State */
        <div className="max-w-md mx-auto text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiUsers className="text-slate-300 text-4xl" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">No Data Found</h2>
          <p className="text-slate-500 px-10">We couldn't find any participants for the selected filters. Try changing the SDG or search terms.</p>
          <button 
            onClick={() => {setSearch(""); setFilterSdg("");}}
            className="mt-6 text-indigo-600 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          {/* Podium (Only on Page 1) */}
          {stats.page === 1 && top3.length > 0 && (
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-end">
              {top3[1] && <WinnerCard student={top3[1]} rank={2} color="border-slate-300 bg-white" badge="🥈" height="h-72" activeRound={activeRound} />}
              {top3[0] && <WinnerCard student={top3[0]} rank={1} color="border-amber-400 bg-amber-50/50 shadow-amber-100" badge="🥇" height="h-80" isFirst activeRound={activeRound} />}
              {top3[2] && <WinnerCard student={top3[2]} rank={3} color="border-orange-300 bg-white" badge="🥉" height="h-64" activeRound={activeRound} />}
            </div>
          )}

          {/* List Table */}
          <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Rank</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Participant</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">SDG Category</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {listData.map((student) => (
                    <tr key={student.id} className="hover:bg-indigo-50/30 transition-all duration-300 group">
                      <td className="p-6">
                        <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 text-slate-500 font-black text-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          {student.rank}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <Avatar image={student.image} name={student.name} />
                          <div>
                            <h3 className="font-extrabold text-slate-800 text-base">{student.name}</h3>
                            <p className="text-xs text-slate-400 font-semibold uppercase">{student.institution}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black bg-indigo-100 text-indigo-700 uppercase tracking-tighter">
                          SDG {student.sdg}
                        </span>
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex flex-col items-end">
                          <span className="text-lg font-black text-slate-900 leading-none">{student.score} <small className="text-[10px] text-slate-400">PTS</small></span>
                          {activeRound === 'round_1' && (
                            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 mt-1">
                              <FiClock className="text-indigo-400" /> {student.time}s
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
              <button 
                disabled={stats.page === 1} 
                onClick={() => fetchLeaderboard(stats.page - 1)} 
                className="group flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-black text-slate-600 hover:border-indigo-500 hover:text-indigo-600 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Previous
              </button>
              <div className="hidden sm:block text-sm font-black text-slate-400 uppercase tracking-widest">
                Page <span className="text-indigo-600">{stats.page}</span>
              </div>
              <button 
                disabled={listData.length < stats.limit} 
                onClick={() => fetchLeaderboard(stats.page + 1)} 
                className="group flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-black text-slate-600 hover:border-indigo-500 hover:text-indigo-600 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                Next <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Reusable Components
const Avatar = ({ image, name, size = "w-12 h-12" }) => (
  <div className={`${size} rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 p-[2px] shadow-lg shadow-indigo-100`}>
    {image ? (
      <img src={image} alt={name} className="w-full h-full object-cover rounded-[14px]" />
    ) : (
      <div className="w-full h-full bg-white flex items-center justify-center rounded-[14px]">
        <span className="font-black text-indigo-600 text-lg uppercase">{name?.charAt(0)}</span>
      </div>
    )}
  </div>
);

const WinnerCard = ({ student, rank, color, badge, height, isFirst, activeRound }) => (
  <div className={`relative flex flex-col items-center justify-end p-8 rounded-[3rem] border-2 shadow-2xl transition-all duration-500 hover:-translate-y-4 ${color} ${height}`}>
    <div className={`absolute -top-8 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-4xl border border-slate-50 animate-bounce`}>
      {badge}
    </div>
    
    <Avatar image={student.image} name={student.name} size={isFirst ? "w-24 h-24" : "w-20 h-20"} />
    
    <div className="text-center mt-5 mb-6">
      <h3 className={`font-black text-slate-900 leading-tight mb-1 ${isFirst ? 'text-2xl' : 'text-lg'}`}>
        {student.name}
      </h3>
      <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest opacity-70">
        {student.institution}
      </p>
    </div>

    <div className="flex flex-col items-center gap-2">
      <div className="bg-slate-900 px-6 py-2 rounded-2xl shadow-lg">
        <span className="font-black text-white text-lg">{student.score}</span>
        <span className="text-[10px] font-black text-indigo-300 ml-1.5 tracking-widest">PTS</span>
      </div>
      {activeRound === 'round_1' && (
        <span className="text-xs font-black text-slate-400 flex items-center gap-1.5">
          <FiClock className="text-indigo-400" /> {student.time}s
        </span>
      )}
    </div>
    
    {isFirst && (
      <div className="absolute inset-0 border-[6px] border-amber-400/20 rounded-[3rem] pointer-events-none"></div>
    )}
  </div>
);