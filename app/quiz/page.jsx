"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuizEntrance,
  clearQuizEntrance,
} from "../store/slices/userQuizSlice";
import QuizForm from "../Components/QuizePageComponents/QuizForm";
import { useRouter } from "next/navigation";
import { useUserProfile } from "../lib/hooks/useUserProfile";

// Google Translate (header dropdown) leaves a `googtrans` cookie that translates
// every page on the site. When the quiz page is translated, option text / answer
// values / submitted payloads can get corrupted, so we explicitly opt this page
// out of translation. If a non-English translation is active, we clear the
// cookie and reload once so the quiz always renders in its original language.
const getGoogTransLang = () => {
  if (typeof document === "undefined") return null;
  const cookie = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("googtrans="));
  if (!cookie) return null;
  const lang = cookie.split("/").pop();
  return lang ? lang.replace(/"|;$/g, "") : null;
};

const clearGoogTransCookies = () => {
  if (typeof window === "undefined") return;
  const expire = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  const hostname = window.location.hostname;
  document.cookie = `googtrans=; path=/; ${expire}`;
  document.cookie = `googtrans=; ${expire}`;
  if (hostname && hostname !== "localhost") {
    document.cookie = `googtrans=; path=/; domain=${hostname}; ${expire}`;
    document.cookie = `googtrans=; path=/; domain=.${hostname}; ${expire}`;
  }
};

export default function QuizPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { availableQuizzes, loading, hasAttemptedFirst, error } = useSelector(
    (state) => state.userQuiz,
  );
  const { data: user } = useUserProfile();
  const [translationReady, setTranslationReady] = useState(false);

  const resolveQuizCategory = (profile) => {
    const level = String(
      profile?.grade_level || profile?.current_level || profile?.gradeLevel || "",
    );
    if (level.includes("Admission Candidate") || level.includes("Musannif")) {
      return "SDG Achiever";
    }
    return profile?.sdg_role;
  };

  // Disable Google Translate on the quiz page (runs before anything else renders).
  useEffect(() => {
    if (typeof window === "undefined") return;

    const activeLang = getGoogTransLang();

    if (activeLang && activeLang !== "en") {
      try {
        sessionStorage.setItem("quiz_prev_lang", activeLang);
      } catch (_) {}
      clearGoogTransCookies();
      window.location.reload();
      return;
    }

    document.documentElement.classList.add("notranslate");
    document.documentElement.setAttribute("translate", "no");
    setTranslationReady(true);

    return () => {
      document.documentElement.classList.remove("notranslate");
      document.documentElement.removeAttribute("translate");
    };
  }, []);

  useEffect(() => {
    const quizCategory = resolveQuizCategory(user);
    if (!quizCategory) {
      dispatch(clearQuizEntrance());
      return;
    }
    dispatch(fetchQuizEntrance(quizCategory));
  }, [dispatch, user]);

  // Avoid rendering anything until we've confirmed Google Translate is disabled,
  // otherwise the cookie-driven translator could mutate the quiz DOM before the
  // forced reload happens.
  if (!translationReady || loading) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen notranslate"
        translate="no"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 font-bold text-gray-600">Verifying session...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center notranslate"
        translate="no"
      >
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
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 notranslate"
        translate="no"
      >
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
    <div className="overflow-hidden notranslate" translate="no">
      <section className="w-full mx-auto max-w-7xl px-0 sm:px-4">
        <div className="bg-white">
          {currentQuiz ? (
            <QuizForm questions={currentQuiz.questions} quizInfo={currentQuiz} />
          ) : (
            <div className="text-center py-12 md:py-20 text-gray-500 font-bold text-lg md:text-2xl">
              No quiz available.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
