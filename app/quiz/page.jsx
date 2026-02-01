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

  // ২. এটেম্পট চেক লজিক
  useEffect(() => {
    const checkUserAttempt = async () => {
      const userId = user?.id || user?.user_id;
      const quizId = availableQuizzes[0]?.id;

      if (userId && quizId) {
        try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL;
          const response = await axios.get(`${API_URL}/api/admin/check-attempt/${userId}/${quizId}`);

          if (response.data.hasAttempted) {
            setHasAttempted(true);

            // ইউজারকে কুইজ পেজে রেখেই অ্যালার্ট দিন
            Swal.fire({
              title: "Already Participated!",
              text: "You have already completed this quiz. Multiple attempts are not allowed.",
              icon: "warning",
              confirmButtonText: "Go to Dashboard", // বাটন টেক্সট পরিবর্তন
              confirmButtonColor: "#3B82F6",
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then((result) => {
              if (result.isConfirmed) {
                // বাটন ক্লিক করার পর ড্যাশবোর্ডে পাঠাবে
                router.replace("/dashboard");
              }
            });
          } else {
            setHasAttempted(false);
          }
        } catch (error) {
          console.error("Attempt check failed", error);
        } finally {
          // এপিআই কল সফল হোক বা ব্যর্থ, চেক শেষ
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
  if (hasAttempted) return null;

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