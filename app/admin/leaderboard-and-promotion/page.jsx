"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function LeaderboardPage() {
    const [round, setRound] = useState(1);
    const [category, setCategory] = useState("All");
    const [passMark, setPassMark] = useState("");
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(false);

    // 1. Data Fetch korar function
    const fetchLeaderboard = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("access_token");
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard/view?roundNumber=${round}&category=${category}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.success) {
                setLeaderboardData(res.data.data);
            }
        } catch (err) {
            toast.error("Failed to load leaderboard");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // 2. Pass Mark set ebong Auto-Promote korar function
    const handleSetPassMark = async () => {
        if (!passMark || category === "All") {
            return toast.error("Please select a specific category and enter pass mark");
        }
        try {
            const token = localStorage.getItem("access_token");
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard/set-pass-mark`,
                { roundNumber: round, category: category, passMark: parseInt(passMark) },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                fetchLeaderboard(); // List refresh korar jonno
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Promotion failed");
        }
    };

    // Filter change hole auto fetch hobe
    useEffect(() => {
        fetchLeaderboard();
    }, [round, category]);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <Toaster />

            <h1 className="text-2xl font-black text-slate-800 mb-8 uppercase tracking-tighter">
                Competition Leaderboard
            </h1>

            {/* Filter Section */}
            <div className="flex flex-wrap items-end gap-6 mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

                <div className="form-control w-full md:w-48">
                    <label className="label font-bold text-gray-500 text-[10px] uppercase">Select Round</label>
                    <select value={round} onChange={(e) => setRound(e.target.value)} className="select select-bordered font-bold">
                        <option value={1}>Round 1: Quiz</option>
                        <option value={2}>Round 2: Video</option>
                        <option value={3}>Grand Finale</option>
                    </select>
                </div>

                <div className="form-control w-full md:w-56">
                    <label className="label font-bold text-gray-500 text-[10px] uppercase">SDG Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="select select-bordered font-bold text-indigo-600">
                        <option value="All">All Categories</option>
                        <option value="SDG Activist">SDG Activist</option>
                        <option value="SDG Achiever">SDG Achiever</option>
                        <option value="SDG Ambassador">SDG Ambassador</option>
                    </select>
                </div>

                {/* Admin Only: Pass Mark Section */}
                <div className="form-control w-full md:w-64">
                    <label className="label font-bold text-gray-500 text-[10px] uppercase">Set Pass Mark & Promote</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={passMark}
                            onChange={(e) => setPassMark(e.target.value)}
                            className="input input-bordered w-full font-bold"
                            placeholder="Mark"
                        />
                        <button onClick={handleSetPassMark} className="btn btn-primary font-bold px-6">Apply</button>
                    </div>
                </div>
            </div>

            {/* Leaderboard Table */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <table className="table w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-slate-500 text-[11px] uppercase tracking-widest">
                            <th className="py-5 text-center">Rank</th>
                            <th className="py-5 text-left">Participant</th>
                            <th className="py-5 text-center">Total Score</th>
                            <th className="py-5 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {leaderboardData.length > 0 ? (
                            leaderboardData.map((user, index) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-all">
                                    <td className="text-center font-black text-slate-300">#{index + 1}</td>
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="w-10 h-10 rounded-xl ring-2 ring-slate-100">
                                                    <img src={user.user_profiles?.profile_image_url || `https://ui-avatars.com/api/?name=${user.user_profiles?.name}`} alt="avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-700 leading-none mb-1">{user.user_profiles?.name}</p>
                                                <p className="text-[9px] font-bold text-indigo-400 uppercase">{user.sdg_category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <span className="text-lg font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                                            {user.total_calculated_score}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        {user.is_promoted ? (
                                            <span className="badge badge-success text-white font-bold py-3 px-4">QUALIFIED</span>
                                        ) : (
                                            <span className="badge badge-ghost opacity-40 font-bold">PENDING</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-20 text-slate-400 italic">No data found for this selection.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}