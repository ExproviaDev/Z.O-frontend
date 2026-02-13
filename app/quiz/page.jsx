"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserQuizzes } from "../store/slices/userQuizSlice";
import QuizForm from "../Components/QuizePageComponents/QuizForm";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function QuizPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { availableQuizzes, loading } = useSelector((state) => state.userQuiz);
  const { user } = useSelector((state) => state.auth);

  const [hasAttempted, setHasAttempted] = useState(false);
  const [checkingAttempt, setCheckingAttempt] = useState(true);

  // ১. ইউজার ডাটা এবং কুইজ লিস্ট ফেচ করা
  useEffect(() => {
    if (user?.sdg_role) {
      dispatch(fetchUserQuizzes(user.sdg_role));
    }
  }, [dispatch, user]);

  useEffect(() => {
    const checkUserAttempt = async () => {
      const userId = user?.id || user?.user_id;
      const quizId = availableQuizzes[0]?.id;

      if (userId && quizId) {
        try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL;
          const response = await axios.get(`${API_URL}/api/admin/check-attempt/${userId}/${quizId}`);

          if (response.data.hasAttempted) {
            setHasAttempted(true); // শুধু স্টেট আপডেট হবে, কোনো পপআপ আসবে না
          } else {
            setHasAttempted(false);
          }
        } catch (error) {
          console.error("Attempt check failed", error);
        } finally {
          setCheckingAttempt(false);
        }
      } else if (!loading && availableQuizzes.length === 0) {
        setCheckingAttempt(false);
      }
    };

    if (!loading && availableQuizzes.length > 0) {
      checkUserAttempt();
    }
  }, [user, availableQuizzes, loading]);
  // ৩. রেন্ডারিং কন্ডিশন (সবচেয়ে গুরুত্বপূর্ণ অংশ)

  // যতক্ষণ ডেটা লোড হচ্ছে বা এটেম্পট চেক হচ্ছে, ততক্ষণ কুইজ ফর্ম হাইড থাকবে
  if (loading || checkingAttempt) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 font-bold text-gray-600">Verifying session...</p>
      </div>
    );
  }

  const currentQuiz = availableQuizzes[0];

  // যদি অলরেডি পরীক্ষা দিয়ে থাকে, তবে কুইজ ফর্ম দেখাবে না
  // যদি অলরেডি পরীক্ষা দিয়ে থাকে, তবে কুইজ ফর্মের বদলে এই মেসেজটি দেখাবে
  if (hasAttempted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 max-w-lg">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Already Participated!</h2>
          <p className="text-gray-600 mb-8 text-lg">
            আপনি এই কুইজটি সফলভাবে সম্পন্ন করেছেন। আমরা আপনার উত্তর গ্রহণ করেছি।
          </p>
          <button
            onClick={() => router.replace("/dashboard")}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 overflow-hidden">
      <section className="w-full mx-auto max-w-7xl px-4">
        <div className="bg-white">
          {currentQuiz ? (
            <QuizForm questions={currentQuiz.questions} quizInfo={currentQuiz} />
          ) : (
            <div className="text-center py-20 text-gray-500 font-bold text-2xl">
              No quiz available.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}