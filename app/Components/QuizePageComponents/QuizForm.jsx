"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import QuizQuestion from "./QuizQuestion";
import NextButton from "./NextButton";
import StartModal from "./StartModal";  
import TimeUpModal from "./TimeUpModal";
import FinalSubmitModal from "./FinalSubmitModal";

const QuizForm = ({ questions }) => {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1 * 6);
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);
  const [showFinalSubmitModal, setShowFinalSubmitModal] = useState(false);
  const [showStartModal, setShowStartModal] = useState(true); 
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  // Start the quiz (timer starts here)
  const handleStartQuiz = () => {
    setShowStartModal(false);  
    setIsQuizStarted(true);   
  };

  // Format time to mm:ss
  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Handle the option selection (updating answers)
  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  // Submit answers when timer is up or user clicks submit
  const handleSubmitAnswers = () => {
    console.log("Submitted Answers:", answers);
    setShowFinalSubmitModal(true); // Show final submit modal after submission
  };

  // Handle quit (when user decides to quit the quiz)
  const handleQuitQuiz = () => {
    console.log("Quiz Exited");
    // Redirect to any page, e.g., /home or /dashboard
  };

  // Timer logic: start only when quiz starts
  useEffect(() => {
    if (!isQuizStarted) return; 

    if (timeLeft <= 0) {
      setShowTimeUpModal(true);  
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isQuizStarted]);

  return (
    <div>
      {/* Show Start Modal */}
      {showStartModal && <StartModal onStart={handleStartQuiz} />}

      {/* TimeUpModal shows when timer reaches 0 */}
      <TimeUpModal show={showTimeUpModal} onSubmit={handleSubmitAnswers} onQuit={handleQuitQuiz} />

      {/* FinalSubmitModal shows when user submits */}
      <FinalSubmitModal show={showFinalSubmitModal} timeSpent={formatTime(timeLeft)} />

      <div className="max-w-4xl mx-auto p-6">
        {/* Timer will be displayed only after quiz starts */}
        {!showStartModal && (
          <div className="text-right text-xl font-semibold mb-6">
            Time Left: <span>{formatTime(timeLeft)}</span>
          </div>
        )}

        <QuizQuestion
          question={questions[currentStep]}
          handleOptionChange={handleOptionChange}
          selectedAnswer={answers[questions[currentStep]?.id]}
        />

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            className="bg-gray-500 text-white px-6 py-2 rounded-md"
            disabled={currentStep === 0}
          >
            Previous
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
