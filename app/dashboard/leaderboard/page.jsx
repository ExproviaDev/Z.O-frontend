"use client";

import React, { useState, useMemo } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { toast, Toaster } from 'react-hot-toast';
import { useQuery, keepPreviousData } from '@tanstack/react-query'; 
import {
  FiSearch, FiClock, FiUsers, FiChevronLeft, FiChevronRight, FiActivity
} from 'react-icons/fi';

// ইমেজ ইম্পোর্ট
import leaderboard1st from "../../../public/src/leaderboard1st.png";
import leaderboard2nd from "../../../public/src/leaderboard2nd.png";
const leaderboard3rd = leaderboard2nd; 

const SDG_NAMES = [
  "No Poverty", "Zero Hunger", "Good Health", "Quality Education", "Gender Equality",
  "Clean Water", "Clean Energy", "Decent Work", "Industry & Innovation", "Reduced Inequality",
  "Sustainable Cities", "Responsible Consumption", "Climate Action", "Life Below Water",
  "Life on Land", "Peace & Justice", "Partnerships"
];

// ১. ডাটা ফেচিং ফাংশন
const fetchAllLeaderboardData = async ({ queryKey }) => {
  const [_, round] = queryKey;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('access_token');
  
  const res = await axios.get(`${baseUrl}/api/leaderboard`, {
    params: { 
        page: 1, 
        limit: 4000, 
        round 
    },
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  return res.data.data || [];
};

// ২. স্ট্যাটাস ফেচিং ফাংশন
const fetchLeaderboardStatus = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = localStorage.getItem('access_token');
    
    const res = await axios.get(`${baseUrl}/api/leaderboard/status`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return res.data; 
};

export default function LeaderboardPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterSdg, setFilterSdg] = useState("");
  const [activeRound, setActiveRound] = useState("round_1");

  // 🔥 Query 1: স্ট্যাটাস চেক
  const { data: statusData, isLoading: isStatusLoading } = useQuery({
    queryKey: ['leaderboardStatus'],
    queryFn: fetchLeaderboardStatus,
    staleTime: 1000 * 60 * 30, 
  });

  const isPublic = statusData?.is_public;

  // 🔥 Query 2: মেইন ডাটা (আপনার সেট করা ৪৮ ঘণ্টা ক্যাশিং ঠিক রাখা হয়েছে)
  const { data: allStudents = [], isLoading } = useQuery({
    queryKey: ['userLeaderboard', activeRound], 
    queryFn: fetchAllLeaderboardData,
    enabled: !!isPublic, 
    
    staleTime: 1000 * 60 * 60 * 48, 
    gcTime: 1000 * 60 * 60 * 48,
    refetchOnWindowFocus: false, 
    placeholderData: keepPreviousData,
  });

  // 🔍 Improved Search & Filter Logic
  const filteredStudents = useMemo(() => {
    let result = allStudents;

    // ১. সার্চ ফিল্টার (Trimmed & Lowercase)
    if (search) {
      const searchLower = search.toLowerCase().trim();
      result = result.filter(student => 
        (student.name && student.name.toLowerCase().includes(searchLower)) ||
        (student.institution && student.institution.toLowerCase().includes(searchLower))
      );
    }

    // ২. SDG ফিল্টার
    if (filterSdg) {
      result = result.filter(student => 
        student.sdg === parseInt(filterSdg)
      );
    }

    return result;
  }, [allStudents, search, filterSdg]);

  // 📄 Pagination Logic
  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  
  const currentTableData = filteredStudents.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // 🔥 CONDITIONAL LOGIC: সার্চ বা ফিল্টার চালু থাকলে পডিয়াম দেখাবো না
  const isFiltering = search.length > 0 || filterSdg.length > 0;

  // Podium Data: যদি ফিল্টার না থাকে এবং ১ নম্বর পেজে থাকে, তবেই টপ ৩ জন আলাদা হবে
  const top3 = (!isFiltering && page === 1) ? currentTableData.slice(0, 3) : [];
  
  // List Data: যদি পডিয়াম দেখায়, তাহলে টেবিল থেকে ৩ জন বাদ যাবে। আর সার্চ করলে সবাই টেবিলে থাকবে।
  const listData = (!isFiltering && page === 1) ? currentTableData.slice(3) : currentTableData;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearch = (e) => { setSearch(e.target.value); setPage(1); };
  const handleFilter = (e) => { setFilterSdg(e.target.value); setPage(1); };

  // Loading UI
  if (isStatusLoading || (isPublic && isLoading)) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
        <p className="animate-pulse font-bold text-slate-400 tracking-widest text-xs uppercase">Fetching Leaderboard...</p>
    </div>
  );
  
  // Coming Soon UI
  if (!isPublic) {
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute top-10 right-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/2 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            </div>

            <div className="bg-white/80 backdrop-blur-lg p-12 rounded-[2.5rem] shadow-2xl border border-white/50 max-w-2xl w-full text-center relative z-10">
                <div className="relative w-24 h-24 mx-auto mb-8">
                    <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-75"></div>
                    <div className="relative bg-gradient-to-tr from-indigo-600 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center shadow-lg shadow-indigo-200">
                        <FiActivity className="text-4xl text-white animate-bounce" />
                    </div>
                </div>
                <h2 className="text-5xl font-black text-slate-800 mb-4 tracking-tight">
                    Coming <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Soon!</span>
                </h2>
                <p className="text-slate-500 text-lg font-medium mb-8 leading-relaxed">
                    We are currently calculating the scores and verifying the results. 
                    The official leaderboard will be published shortly. Stay tuned!
                </p>
                <div className="flex justify-center gap-2">
                    <span className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"></span>
                    <span className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce animation-delay-200"></span>
                    <span className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce animation-delay-400"></span>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-slate-800">
      <Toaster position="top-right" />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10 text-center md:text-left">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-3 items-center text-center tracking-tight italic uppercase">Leaderboard</h1>
        <p className="text-slate-500 text-lg text-center font-medium">Recognizing the top change-makers in the SDG challenge.</p>
      </div>

      {/* Filters Bar */}
      <div className="max-w-7xl mx-auto bg-white p-5 rounded-lg shadow-xl shadow-slate-200/50 border border-slate-100 mb-10 flex flex-col lg:flex-row gap-5 items-center justify-between">
        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full lg:w-auto">
          {['round_1', 'round_2', 'round_3'].map((round) => (
            <button
              key={round}
              onClick={() => { setActiveRound(round); setPage(1); setSearch(""); setFilterSdg(""); }}
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
              placeholder="Search by name..."
              value={search}
              onChange={handleSearch}
              className="w-full md:w-64 pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>
          <select 
            className="w-full md:w-64 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-600"
            value={filterSdg}
            onChange={handleFilter}
          >
            <option value="">All SDGs</option>
            {SDG_NAMES.map((name, i) => (
              <option key={i + 1} value={i + 1}>SDG {i + 1}: {name}</option>
            ))}
          </select>
        </div>
      </div>

      {allStudents.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 max-w-md mx-auto">
           <FiUsers className="mx-auto text-5xl text-slate-300 mb-4" />
           <p className="font-bold text-slate-400 italic">No participants found.</p>
        </div>
      ) : (
        <>
          {/* 🔥 Podium Section (Only shows if NOT searching/filtering) */}
         {page === 1 && top3.length > 0 && !isFiltering && (
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 items-end px-4">
                {/* Rank 2 */}
                <div className="order-2 md:order-1 relative group">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 bg-slate-100 text-slate-600 font-black px-4 py-1 rounded-full border-2 border-slate-200 shadow-sm">#2</div>
                    {top3[1] && <WinnerCard student={top3[1]} rank={2} frame={leaderboard2nd} height="h-80" color="bg-white border-slate-200" activeRound={activeRound} />}
                </div>

                {/* Rank 1 */}
                <div className="order-1 md:order-2 scale-110 relative group mt-8">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-black px-5 py-1.5 rounded-full border-2 border-white shadow-lg ">🏆 #1</div>
                    {top3[0] && <WinnerCard student={top3[0]} rank={1} frame={leaderboard1st} height="h-96" color="bg-amber-50/50 border-amber-200 shadow-amber-100" isFirst activeRound={activeRound} />}
                </div>

                {/* Rank 3 */}
                <div className="order-3 md:order-3 relative group">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 bg-orange-50 text-orange-700 font-black px-4 py-1 rounded-full border-2 border-orange-100 shadow-sm">#3</div>
                    {top3[2] && <WinnerCard student={top3[2]} rank={3} frame={leaderboard3rd} height="h-80" color="bg-white border-slate-200" activeRound={activeRound} />}
                </div>
            </div>
        )}

          {/* Table List */}
          <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden mb-10">
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
                {listData.length > 0 ? (
                    listData.map((student) => (
                    <tr key={student.rank} className="hover:bg-indigo-50/30 transition-all group">
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
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="p-10 text-center text-slate-400 font-bold italic">
                            No match found for your search.
                        </td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="max-w-7xl mx-auto flex justify-center items-center gap-4 pb-10">
                <button 
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                >
                    <FiChevronLeft /> Prev
                </button>

                <span className="text-sm font-black text-slate-400 bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-sm">
                    Page <span className="text-indigo-600 text-lg">{page}</span> of {totalPages}
                </span>

                <button 
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                >
                    Next <FiChevronRight />
                </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Avatar & WinnerCard Components (Same as before)
const Avatar = ({ image, name, size = "w-12 h-12", frame }) => (
  <div className={`relative ${size} flex items-center justify-center`}>
    <div className="absolute inset-[15%] rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className="font-black text-indigo-500 text-lg">{name?.charAt(0)}</span>
      )}
    </div>
    {frame && (
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none scale-125">
        <Image src={frame} alt="frame" fill style={{ objectFit: 'contain' }} />
      </div>
    )}
  </div>
);

const WinnerCard = ({ student, rank, frame, color, height, isFirst, activeRound }) => (
  <div className={`relative flex flex-col items-center justify-end p-8 rounded-2xl border-1 shadow-2xl transition-all duration-500 hover:-translate-y-4 ${color} ${height}`}>
    <div className="mb-auto py-4">
      <Avatar image={student.image} name={student.name} size={isFirst ? "w-36 h-36" : "w-28 h-28"} frame={frame} />
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