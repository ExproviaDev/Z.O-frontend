"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image'; // Next.js Image component ব্যবহার করা ভালো
import { toast, Toaster } from 'react-hot-toast';
import {
  FiSearch, FiAward, FiChevronLeft, FiChevronRight, FiClock, FiUsers, FiFilter
} from 'react-icons/fi';

// আপনার ইমপোর্ট করা ফ্রেমগুলো
import leaderboard1st from "../../../public/src/leaderboard1st.png";
import leaderboard2nd from "../../../public/src/leaderboard2nd.png";
// ৩য় স্থানের জন্য যদি আলাদা ফ্রেম না থাকে তবে ২য় স্থানেরটি ব্যবহার করা যেতে পারে
const leaderboard3rd = leaderboard2nd; 

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
  const [search, setSearch] = useState("");
  const [filterSdg, setFilterSdg] = useState("");
  const [activeRound, setActiveRound] = useState("round_1");

  useEffect(() => {
    const timer = setTimeout(() => fetchLeaderboard(1), 500);
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
      setStats({ total: res.data.total || 0, page: page, limit: 20 });
    } catch (error) {
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
        <h1 className="text-5xl font-extrabold text-slate-900 mb-3 items-center text-center tracking-tight italic uppercase">Leaderboard</h1>
        <p className="text-slate-500 text-lg text-center  font-medium">Recognizing the top change-makers in the SDG challenge.</p>
      </div>

      {/* Filters Bar */}
      <div className="max-w-7xl mx-auto bg-white p-5 rounded-lg shadow-xl shadow-slate-200/50 border border-slate-100 mb-10 flex flex-col lg:flex-row gap-5 items-center justify-between">
        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full lg:w-auto">
          {['round_1', 'round_2', 'round_3'].map((round) => (
            <button
              key={round}
              onClick={() => setActiveRound(round)}
              className={`flex-1 lg:flex-none px-8 py-2.5 rounded-xl text-sm font-black transition-all duration-300 ${
                activeRound === round ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {round.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
          <div className="relative group flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-64 pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>
          <select 
            className="w-full md:w-64 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-600"
            value={filterSdg}
            onChange={(e) => setFilterSdg(e.target.value)}
          >
            <option value="">All SDGs</option>
            {SDG_NAMES.map((name, i) => (
              <option key={i + 1} value={i + 1}>SDG {i + 1}: {name}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 font-black text-indigo-600 animate-pulse text-xl">FETCHING CHAMPIONS...</div>
      ) : students.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 max-w-md mx-auto">
           <FiUsers className="mx-auto text-5xl text-slate-300 mb-4" />
           <p className="font-bold text-slate-400 italic">No participants found.</p>
        </div>
      ) : (
        <>
          {/* Podium Section with Frames */}
          {stats.page === 1 && top3.length > 0 && (
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 items-end px-4">
              {/* Rank 2 */}
              <div className="order-2 md:order-1">
                {top3[1] && <WinnerCard student={top3[1]} rank={2} frame={leaderboard2nd} height="h-80" color="bg-white border-slate-200" activeRound={activeRound} />}
              </div>
              {/* Rank 1 */}
              <div className="order-1 md:order-2 scale-110">
                {top3[0] && <WinnerCard student={top3[0]} rank={1} frame={leaderboard1st} height="h-96" color="bg-amber-50/50 border-amber-200 shadow-amber-100" isFirst activeRound={activeRound} />}
              </div>
              {/* Rank 3 */}
              <div className="order-3 md:order-3">
                {top3[2] && <WinnerCard student={top3[2]} rank={3} frame={leaderboard3rd} height="h-72" color="bg-white border-slate-200" activeRound={activeRound} />}
              </div>
            </div>
          )}

          {/* Table List */}
          <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Rank</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Participant</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">SDG</th>
                  <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {listData.map((student) => (
                  <tr key={student.id} className="hover:bg-indigo-50/30 transition-all group">
                    <td className="p-6"><span className="text-xl font-black text-slate-300 group-hover:text-indigo-600">#{student.rank}</span></td>
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <Avatar image={student.image} name={student.name} size="w-12 h-12" />
                        <div>
                          <h3 className="font-bold text-slate-800">{student.name}</h3>
                          <p className="text-[10px] text-slate-400 font-black uppercase">{student.institution}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase">SDG {student.sdg}</span>
                    </td>
                    <td className="p-6 text-right font-black text-slate-900">
                        {student.score} <small className="text-slate-400 text-[10px]">PTS</small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

// ফ্রেম সাপোর্টসহ অবতার কম্পোনেন্ট
const Avatar = ({ image, name, size = "w-12 h-12", frame }) => (
  <div className={`relative ${size} flex items-center justify-center`}>
    {/* মেইন ইমেজ বা ব্যাকআপ লেটার */}
    <div className="absolute inset-[15%] rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className="font-black text-indigo-500 text-lg">{name?.charAt(0)}</span>
      )}
    </div>

    {/* আপনার দেওয়া PNG ফ্রেম যা ইমেজের উপরে বসবে */}
    {frame && (
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none scale-125">
        <Image 
          src={frame} 
          alt="frame" 
          fill 
          style={{ objectFit: 'contain' }}
        />
      </div>
    )}
  </div>
);

const WinnerCard = ({ student, rank, frame, color, height, isFirst, activeRound }) => (
  <div className={`relative flex flex-col items-center justify-end p-8 rounded-2xl border-1 shadow-2xl transition-all duration-500 hover:-translate-y-4 ${color} ${height}`}>
    {/* ফ্রেমসহ অবতার */}
    <div className="mb-auto py-4">
      <Avatar 
        image={student.image} 
        name={student.name} 
        size={isFirst ? "w-36 h-36" : "w-28 h-28"} 
        frame={frame}
      />
    </div>

    <div className="text-center mt-5 mb-6">
      <h3 className={`font-black text-slate-900 leading-tight ${isFirst ? 'text-2xl' : 'text-lg'}`}>{student.name}</h3>
      <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{student.institution}</p>
    </div>

    <div className="flex flex-col items-center gap-2">
      <div className="bg-slate-900 px-6 py-2 rounded-2xl shadow-lg">
        <span className="font-black text-white text-lg">{student.score}</span>
        <span className="text-[10px] font-black text-indigo-300 ml-1.5 uppercase">PTS</span>
      </div>
      {activeRound === 'round_1' && student.time && (
        <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 italic">
          <FiClock /> {student.time}s
        </span>
      )}
    </div>
  </div>
);