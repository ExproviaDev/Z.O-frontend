"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserQuizzes } from "../store/slices/userQuizSlice";
import QuizForm from "../Components/QuizePageComponents/QuizForm";

export default function QuizPage() {
  const dispatch = useDispatch();
  const { availableQuizzes, loading } = useSelector((state) => state.userQuiz);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.sdg_role) {
      dispatch(fetchUserQuizzes(user.sdg_role));
    }
  }, [dispatch, user]);

  if (loading) return <div className="text-center py-20 font-bold">Loading your specific quiz...</div>;
  const currentQuiz = availableQuizzes[0];

  return (
    <div className="space-y-16 overflow-hidden content-center ">
      <section className=" w-full content-center mx-5">
        <div className="bg-white p-10">
          {currentQuiz ? (
            <QuizForm questions={currentQuiz.questions} />
          ) : (
            <p className="text-center py-10">No quiz available for your role.</p>
          )}
        </div>
      </section>
    </div>
  );
}