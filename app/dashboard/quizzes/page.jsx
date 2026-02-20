"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaSearch, FaClock, FaCalendarAlt, FaCheckCircle, FaPlayCircle, FaBan, FaCalendarDay } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyQuizzes = () => {
  const router = useRouter();

  const [userCategory, setUserCategory] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user_data'));
        const token = localStorage.getItem('access_token');

        if (!storedUser || !token) {
          router.push('/login');
          return;
        }

        // ✅ 2. Category Mapping Logic
        let categoryToFetch = "SDG Activist"; // Default (Round 1)

        if (storedUser.round_type === "round_2") {
          categoryToFetch = "SDG Ambassador";
        } else if (storedUser.round_type === "round_3") {
          categoryToFetch = "SDG Achiever";
        }

        if (storedUser.sdg_role) {
          categoryToFetch = storedUser.sdg_role;
        }

        setUserCategory(categoryToFetch);

        // ✅ 3. API Call
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/public-quizzes`, {
          params: { category: categoryToFetch },
          headers: { Authorization: `Bearer ${token}` }
        });

        let fetchedQuizzes = res.data.data || [];

        // ✅ 4. Attempt Check
        const quizzesWithStatus = await Promise.all(
          fetchedQuizzes.map(async (quiz) => {
            try {
              const attemptRes = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/admin/check-attempt/${storedUser.user_id}/${quiz.id}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              return { ...quiz, hasAttempted: attemptRes.data.hasAttempted };
            } catch (err) {
              console.error("Attempt check error for quiz:", quiz.id);
              return { ...quiz, hasAttempted: false };
            }
          })
        );

        setQuizzes(quizzesWithStatus);

      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [router]);

  // টাইম ফরম্যাটিং
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
    if (category === "SDG Activist") return "May 7th";
    if (category === "SDG Ambassador") return "May 8th";
    if (category === "SDG Achiever") return "May 9th";
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
          [1, 2, 3].map(i => <div key={i} className="h-48 bg-gray-200 rounded-2xl animate-pulse"></div>)
        ) : filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col justify-between h-full">

              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[11px] font-bold rounded-full border border-indigo-100 uppercase tracking-wide">
                    {quiz.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-gray-500">
                    <FaClock /> {quiz.time_limit} Mins
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                  {quiz.title}
                </h3>

                <div className="space-y-2 mt-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400" />
                    <span>Starts: <span className="font-medium text-gray-700">{formatDate(quiz.start_at)}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaBan className="text-gray-400" />
                    <span>Ends: <span className="font-medium text-gray-700">{formatDate(quiz.ends_at)}</span></span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-50">
                {quiz.hasAttempted ? (
                  <button disabled className="w-full py-2.5 rounded-xl bg-emerald-50 text-emerald-600 font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed opacity-80">
                    <FaCheckCircle /> Completed
                  </button>
                ) : (
                  <button
                    onClick={() => handleStartQuiz(quiz)}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-200"
                  >
                    <FaPlayCircle /> Start Quiz
                  </button>
                )}
              </div>

            </div>
          ))
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