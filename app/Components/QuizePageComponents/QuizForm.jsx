"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import QuizQuestion from "./QuizQuestion";
import NextButton from "./NextButton";
import StartModal from "./StartModal";
import TimeUpModal from "./TimeUpModal";
import FinalSubmitModal from "./FinalSubmitModal";
import { AiOutlineClockCircle, AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const QuizForm = ({ questions }) => {
  const { control } = useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);
  const [showFinalSubmitModal, setShowFinalSubmitModal] = useState(false);
  const [showStartModal, setShowStartModal] = useState(true);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    setShowStartModal(false);
    setIsQuizStarted(true);
  };

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleSubmitAnswers = () => {
    setShowFinalSubmitModal(true);
  };

  const handleQuitQuiz = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    if (!isQuizStarted) return;
    if (timeLeft <= 0) {
      setShowTimeUpModal(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isQuizStarted]);

  return (
    <div className="flex px-5 flex-col items-center py-10">
      {/* Start Modal */}
      {showStartModal && <StartModal onStart={handleStartQuiz} />}

      {/* TimeUp & Final Modals */}
      <TimeUpModal show={showTimeUpModal} onSubmit={handleSubmitAnswers} onQuit={handleQuitQuiz} />
      <FinalSubmitModal show={showFinalSubmitModal} timeSpent={formatTime(timeLeft)} />

      {/* Quiz Container */}
      <div className="w-full max-w-7xl bg-amber-50 rounded-2xl shadow-xl py-10 px-10 space-y-6">
        {/* Timer */}
        {!showStartModal && (
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-semibold text-primary flex items-center gap-2">
              <AiOutlineClockCircle className="w-6 h-6" /> Time Left: {formatTime(timeLeft)}
            </div>
            <div className="text-gray-500 font-medium">
              Question {currentStep + 1} / {questions.length}
            </div>
          </div>
        )}

        {/* Question Card */}
        <div className="bg-gray-50 rounded-2xl shadow-md p-6 transition-transform hover:scale-[1.01]">
          <QuizQuestion
            question={questions[currentStep]}
            handleOptionChange={handleOptionChange}
            selectedAnswer={answers[questions[currentStep]?.id]}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition ${
              currentStep === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            <AiOutlineArrowLeft /> Previous
          </button>

          <NextButton
            onNext={() => setCurrentStep((prev) => Math.min(prev + 1, questions.length - 1))}
            onSubmit={handleSubmitAnswers}
            isLastQuestion={currentStep === questions.length - 1}
            isAnswered={Boolean(answers[questions[currentStep]?.id])}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizForm;
