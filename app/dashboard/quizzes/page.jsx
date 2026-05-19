"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch, FaClock, FaCalendarAlt, FaCheckCircle, FaPlayCircle, FaBan, FaCalendarDay } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useUserProfile } from "../../lib/hooks/useUserProfile";
import {
  resolveCategoryFromUser,
  loadQuizzesWithSubmissionCoverage,
  fetchAttemptsWithFallback,
  resolveUserIdForQuizApi,
} from "../../lib/quizUserData";

const MyQuizzes = () => {
  const router = useRouter();
  const { data: profileUser, isLoading: profileLoading } = useUserProfile();

  const [userCategory, setUserCategory] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (profileLoading) return;

    const token = typeof window !== "undefined" ? localStorage.getItem('access_token') : null;
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchQuizData = async () => {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL;
        const categoryToFetch = resolveCategoryFromUser(profileUser);
        setUserCategory(categoryToFetch);

        const userId = resolveUserIdForQuizApi(profileUser);
        const attemptsPkg = userId
          ? await fetchAttemptsWithFallback(API_BASE, userId)
          : { attempts: [], details: {} };

        const { quizzes: mergedQuizzes } =
          await loadQuizzesWithSubmissionCoverage({
            apiBase: API_BASE,
            category: categoryToFetch,
            attemptsPkg,
          });

        setQuizzes(mergedQuizzes);
      } catch (error) {
        console.error("Error fetching quizzes:", error?.response?.status, error?.response?.data || error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [router, profileUser, profileLoading]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleStartQuiz = (quiz) => {
    const now = new Date();
    const start = new Date(quiz.start_at);
    const end = new Date(quiz.ends_at);

    if (now < start) {
      Swal.fire('Upcoming', `This quiz starts at ${formatDate(quiz.start_at)}`, 'info');
      return;
    }
    if (now > end) {
      Swal.fire('Closed', 'This quiz submission time is over.', 'warning');
      return;
    }

    // কুইজ পেজে যাওয়া
    router.push(`/quiz`);
  };

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔥 ইউজারের ক্যাটাগরি অনুযায়ী ডাইনামিক ডেট বের করার ফাংশন
  const getExamDate = (category) => {
    if (category === "SDG Activist") return "14 May";
    if (category === "SDG Ambassador") return "15 May";
    if (category === "SDG Achiever") return "16 May";
    return "the scheduled date";
  };

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-50">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Quiz Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Category: <span className="font-bold text-indigo-600">{userCategory}</span>
          </p>
        </div>

        <div className="relative flex-1 md:w-72">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search quiz..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
          ))
        ) : filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => {
            const now = Date.now();
            const startMs = quiz.start_at ? new Date(quiz.start_at).getTime() : 0;
            const endMs = quiz.ends_at ? new Date(quiz.ends_at).getTime() : Infinity;
            // Only show Upcoming/Closed for quizzes the user has NOT attempted
            const isUpcoming = !quiz.hasAttempted && startMs > now;
            const isExpired = !quiz.hasAttempted && endMs < now;

            return (
              <div
                key={quiz.id}
                className={`relative bg-white rounded-2xl shadow-sm border transition-all flex flex-col h-full overflow-hidden
                  ${quiz.hasAttempted
                    ? 'border-emerald-100 hover:shadow-emerald-100/60 hover:shadow-md'
                    : 'border-gray-100 hover:shadow-md hover:-translate-y-0.5'}`}
              >
                {/* Top colour strip */}
                <div className={`h-1.5 w-full ${quiz.hasAttempted ? 'bg-linear-to-r from-emerald-400 to-teal-500' : 'bg-linear-to-r from-indigo-500 to-violet-500'}`} />

                <div className="p-5 flex flex-col flex-1">
                  {/* Category & time */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full border border-indigo-100 uppercase tracking-wide">
                      {quiz.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-400">
                      <FaClock className="text-[10px]" /> {quiz.time_limit} Mins
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-gray-800 leading-snug line-clamp-2 mb-3">
                    {quiz.title}
                  </h3>

                  {/* Dates */}
                  <div className="space-y-1.5 text-[11px] text-gray-400 mb-4">
                    <div className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-[10px] shrink-0" />
                      <span>Starts: <span className="font-semibold text-gray-600">{formatDate(quiz.start_at)}</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaBan className="text-[10px] shrink-0" />
                      <span>Ends: <span className="font-semibold text-gray-600">{formatDate(quiz.ends_at)}</span></span>
                    </div>
                  </div>

                  {/* Action button — pushed to bottom */}
                  <div className="mt-auto pt-3 border-t border-gray-50 flex flex-col gap-2">
                    {quiz.hasAttempted ? (
                      <div className="w-full py-2 rounded-xl bg-emerald-50/90 text-emerald-600 font-bold text-xs flex items-center justify-center gap-2 border border-emerald-100">
                        <FaCheckCircle /> Submitted
                      </div>
                    ) : isUpcoming ? (
                      <div className="w-full py-2.5 rounded-xl bg-amber-50 text-amber-600 font-bold text-sm flex items-center justify-center gap-2 border border-amber-100">
                        <FaClock /> Upcoming
                      </div>
                    ) : isExpired ? (
                      <div className="w-full py-2.5 rounded-xl bg-red-50 text-red-400 font-bold text-sm flex items-center justify-center gap-2 border border-red-100">
                        <FaBan /> Closed
                      </div>
                    ) : (
                      <button
                        onClick={() => handleStartQuiz(quiz)}
                        className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-200"
                      >
                        <FaPlayCircle /> Start Quiz
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          // 🔥 সুন্দর নো-কুইজ মেসেজ ডিজাইন
          <div className="col-span-full py-16 px-6 text-center bg-indigo-50/40 rounded-3xl border border-indigo-100 shadow-sm flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-indigo-100 text-indigo-500 rounded-full flex items-center justify-center mb-5">
              <FaCalendarDay size={36} />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-800 mb-3">No Quizzes Available Yet!</h3>
            <p className="text-gray-600 text-md max-w-lg mx-auto leading-relaxed">
              Mark your calendar! The <span className="font-bold text-indigo-600 px-1">{userCategory}</span> exam is scheduled to begin on <span className="font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-md text-lg">{getExamDate(userCategory)}</span>. Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyQuizzes;