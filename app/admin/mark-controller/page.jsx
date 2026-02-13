"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function LeaderboardPage() {
    const [round, setRound] = useState(1);
    const [category, setCategory] = useState("All");


    const [page, setPage] = useState(1);
    const [limit] = useState(50);
    const [totalUsers, setTotalUsers] = useState(0);


    const [promotionLimit, setPromotionLimit] = useState(200);
    const [isPromoting, setIsPromoting] = useState(false);
    const [progress, setProgress] = useState(0);

    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchLeaderboard = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("access_token");
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/mark/view?roundNumber=${round}&category=${category}&page=${page}&limit=${limit}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.success) {
                setLeaderboardData(res.data.data);
                setTotalUsers(res.data.total || 0);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };


    const handlePromoteUsers = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `You are about to promote Top ${promotionLimit} users from EACH of the 17 SDG categories!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4F46E5',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Promote Them! 🚀',
            background: '#fff',
            customClass: {
                popup: 'rounded-2xl shadow-xl'
            }
        });

        if (!result.isConfirmed) return;


        setIsPromoting(true);
        setProgress(0);

        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 95) return 95;
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 95);
            });
        }, 500);

        try {
            const token = localStorage.getItem("access_token");
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/mark/promote-users`,
                { roundNumber: parseInt(round), limit: parseInt(promotionLimit) },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            clearInterval(interval);
            setProgress(100);

            if (res.data.success) {
                setTimeout(() => {
                    setIsPromoting(false);
                    Swal.fire({
                        title: 'Promotion Successful! 🎉',
                        html: `<b>${res.data.message}</b><br/><span style="font-size:12px; color:gray">All users have been moved to the next round table.</span>`,
                        icon: 'success',
                        confirmButtonColor: '#4F46E5',
                        confirmButtonText: 'Awesome!'
                    });
                    fetchLeaderboard();
                }, 500);
            }
        } catch (err) {
            clearInterval(interval);
            setIsPromoting(false);
            Swal.fire({
                title: 'Error!',
                text: err.response?.data?.error || "Promotion failed due to server error.",
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    };

    useEffect(() => {
        setPage(1);
    }, [round, category]);

    useEffect(() => {
        fetchLeaderboard();
    }, [page, round, category]);

    const totalPages = Math.ceil(totalUsers / limit);

    return (
        <div className="p-4 bg-gray-50 min-h-screen font-sans relative">
            <Toaster position="top-right" />

            {/* ✅ Custom Full Screen Loader Overlay */}
            {isPromoting && (
                <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300">
                    <div className="bg-white p-10 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-full animate-bounce-slow">
                        {/* Spinner */}
                        <div className="relative w-24 h-24 mb-6">
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-100 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                        </div>

                        {/* Counting Text */}
                        <h2 className="text-4xl font-black text-indigo-600 mb-2 font-mono">
                            {Math.round(progress)}%
                        </h2>

                        <h3 className="text-xl font-bold text-slate-700 animate-pulse">Processing Data...</h3>
                        <p className="text-slate-400 text-xs mt-2 text-center px-4">
                            Analyzing scores, ranking participants, and migrating to Round {parseInt(round) + 1}...
                        </p>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col justify-center items-center gap-10 mb-8">
                <div className="flex flex-col gap-5 justify-center items-center">
                    <h1 className="text-3xl font-black text-center text-slate-800 uppercase tracking-tighter">
                        Competition Leaderboard
                    </h1>
                    <p className="text-slate-500 text-sm font-bold mt-1">
                        Showing {leaderboardData.length} of {totalUsers} Participants
                    </p>
                </div>

                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                    <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-sm font-bold text-slate-600">
                        Live View: Round <span className="text-indigo-600 text-lg">{round}</span>
                    </span>
                </div>
            </div>

            {/* Controls Section */}
            <div className="flex flex-wrap items-end gap-6 mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="form-control w-full md:w-48">
                    <label className="label font-bold text-gray-400 text-[10px] uppercase tracking-wider mb-1">Select Round</label>
                    <select value={round} onChange={(e) => setRound(e.target.value)} className="select select-bordered font-bold bg-gray-50">
                        <option value={1}>Round 1: Quiz</option>
                        <option value={2}>Round 2: Video</option>
                        <option value={3}>Grand Finale</option>
                    </select>
                </div>

                <div className="form-control w-full md:w-64">
                    <label className="label font-bold text-gray-400 text-[10px] uppercase tracking-wider mb-1">Filter by SDG</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="select select-bordered font-bold text-indigo-600 bg-indigo-50 border-indigo-100">
                        <option value="All">All 17 Categories</option>
                        <option value="No Poverty">1. No Poverty</option>
                        <option value="Zero Hunger">2. Zero Hunger</option>
                        {/* Add others */}
                    </select>
                </div>

                {/* Admin Promotion Button */}
                <div className="form-control w-full md:w-auto ml-auto pl-6 border-l border-dashed border-gray-200">
                    <label className="label font-bold text-rose-500 text-[10px] uppercase tracking-wider mb-1">
                        🚀 Admin Action
                    </label>
                    <div className="flex gap-3 items-center bg-rose-50 p-2 rounded-xl border border-rose-100">
                        <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-rose-400 uppercase">Limit/SDG</span>
                            <input
                                type="number"
                                value={promotionLimit}
                                onChange={(e) => setPromotionLimit(e.target.value)}
                                className="input input-xs w-16 font-bold text-center bg-white border-rose-200 text-rose-600 focus:outline-none"
                            />
                        </div>

                        <button
                            onClick={handlePromoteUsers}
                            className="h-9 px-6 rounded-lg font-bold text-white text-xs shadow-md transition-all flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:shadow-lg hover:scale-105 active:scale-95"
                        >
                            Promote All SDGs
                        </button>
                    </div>
                </div>
            </div>

            {/* Leaderboard Table */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 mb-6">
                {/* wrapper for horizontal scroll */}
                <div className="w-full overflow-x-auto">
                    <table className="min-w-[600px] w-full border-collapse">

                        {/* Header */}
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] sm:text-[11px] uppercase tracking-widest">
                                <th className="py-3 sm:py-5 px-2 text-center w-16 sm:w-20">Rank</th>
                                <th className="py-3 sm:py-5 text-left pl-3 sm:pl-6">Participant Info</th>
                                <th className="py-3 sm:py-5 text-center">Score</th>
                                <th className="py-3 sm:py-5 text-center pr-2">Status</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody className="divide-y divide-slate-50 text-sm sm:text-base">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-16 font-bold text-slate-400 animate-pulse">
                                        Loading data...
                                    </td>
                                </tr>
                            ) : leaderboardData.length > 0 ? (
                                leaderboardData.map((user, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-indigo-50/30 transition-all group duration-300"
                                    >
                                        {/* Rank */}
                                        <td className="text-center font-black text-slate-300 group-hover:text-indigo-500 text-base sm:text-lg">
                                            #{(page - 1) * limit + index + 1}
                                        </td>

                                        {/* User */}
                                        <td className="py-3 sm:py-4 pl-3 sm:pl-6">
                                            <div className="flex items-center gap-3 sm:gap-4">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl ring-4 ring-slate-50 group-hover:ring-indigo-100 overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={
                                                            user.user_profiles?.profile_image_url ||
                                                            `https://ui-avatars.com/api/?name=${user.user_profiles?.name}&background=random`
                                                        }
                                                        alt="avatar"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="font-bold text-slate-700 text-sm sm:text-base truncate group-hover:text-indigo-700">
                                                        {user.user_profiles?.name}
                                                    </p>

                                                    <span className="text-[9px] sm:text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md uppercase tracking-wider border border-indigo-100">
                                                        {user.sdg_category ||
                                                            `SDG ${user.user_profiles?.assigned_sdg_number}`}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Score */}
                                        <td className="text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="text-lg sm:text-xl font-black text-slate-700">
                                                    {parseInt(round) === 1
                                                        ? user.quiz_score
                                                        : user.total_calculated_score}
                                                </span>

                                                {parseInt(round) === 1 && (
                                                    <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold bg-slate-100 px-2 rounded-full mt-1">
                                                        ⏱️ {user.time_taken}s
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="text-center pr-2">
                                            {user.is_promoted ? (
                                                <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-bold bg-emerald-100 text-emerald-600 border border-emerald-200 whitespace-nowrap">
                                                    ✅ QUALIFIED
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-bold bg-slate-100 text-slate-400 border border-slate-200 whitespace-nowrap">
                                                    PENDING
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-16 text-slate-400 italic">
                                        No participants found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


            {/* Pagination */}
            {totalUsers > 0 && (
                <div className="flex justify-center items-center gap-4 py-8">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="btn btn-sm bg-white border-gray-200 hover:bg-gray-100 disabled:opacity-50"
                    >
                        « Prev
                    </button>
                    <span className="font-bold text-slate-600 text-sm">
                        Page <span className="text-indigo-600">{page}</span> of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className="btn btn-sm bg-white border-gray-200 hover:bg-gray-100 disabled:opacity-50"
                    >
                        Next »
                    </button>
                </div>
            )}
        </div>
    );
}