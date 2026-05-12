"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuizEntrance,
  clearQuizEntrance,
} from "../store/slices/userQuizSlice";
import QuizForm from "../Components/QuizePageComponents/QuizForm";
import { useRouter } from "next/navigation";
import { useUserProfile } from "../lib/hooks/useUserProfile";

export default function QuizPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { availableQuizzes, loading, hasAttemptedFirst, error } = useSelector(
    (state) => state.userQuiz,
  );
  const { data: user } = useUserProfile();

  const resolveQuizCategory = (profile) => {
    const level = String(
      profile?.grade_level || profile?.current_level || profile?.gradeLevel || "",
    );
    if (level.includes("Admission Candidate") || level.includes("Musannif")) {
      return "SDG Ambassador";
    }
    return profile?.sdg_role;
  };

  useEffect(() => {
    const quizCategory = resolveQuizCategory(user);
    if (!quizCategory) {
      dispatch(clearQuizEntrance());
      return;
    }
    dispatch(fetchQuizEntrance(quizCategory));
  }, [dispatch, user]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 font-bold text-gray-600">Verifying session...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
        <p className="text-red-600 font-semibold mb-4">{String(error)}</p>
        <button
          type="button"
          onClick={() => router.replace("/dashboard")}
          className="rounded-xl bg-slate-800 px-6 py-3 text-white font-bold"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const currentQuiz = availableQuizzes[0];

  if (hasAttemptedFirst) {
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
