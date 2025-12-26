"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import QuizQuestion from "./QuizQuestion";
import NextButton from "./NextButton";
import StartModal from "./StartModal";
import TimeUpModal from "./TimeUpModal";
import { AiOutlineClockCircle, AiOutlineArrowLeft } from "react-icons/ai";
import { MdSecurity } from "react-icons/md";
import { clearActiveQuiz } from "../../store/slices/userQuizSlice";

const QuizForm = ({ questions, quizInfo }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { activeQuiz } = useSelector((state) => state.userQuiz);

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);
  const [showStartModal, setShowStartModal] = useState(true);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [isBlurred, setIsBlurred] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ১. টাইম লিমিট সেট করা (কুইজের নিজস্ব সময়সীমা)
  useEffect(() => {
    if (quizInfo?.time_limit) {
      setTimeLeft(quizInfo.time_limit * 60);
    } else if (questions && questions.length > 0) {
      setTimeLeft(30 * 60);
    }
  }, [quizInfo, questions]);

  // ২. কুইজ চলাকালীন 'Ends At' বা ডেডলাইন চেক করার লজিক
  useEffect(() => {
    if (!isQuizStarted || isSubmitting) return;

    const checkDeadline = () => {
      const now = new Date().getTime();
      const deadline = new Date(quizInfo?.ends_at).getTime();

      // যদি কুইজের শেষ সময় (ডেডলাইন) পার হয়ে যায়
      if (deadline && now > deadline) {
        setIsQuizStarted(false);
        Swal.fire({
          title: "Exam Period Over!",
          text: "The overall quiz time for today has ended. Auto-submitting your answers.",
          icon: "warning",
          timer: 3000,
          showConfirmButton: false,
          allowOutsideClick: false
        }).then(() => {
          handleSubmitAnswers(); // ডেডলাইন শেষ হলে অটো সাবমিট
        });
      }
    };

    const deadlineTimer = setInterval(checkDeadline, 5000); // প্রতি ৫ সেকেন্ডে ডেডলাইন চেক করবে
    return () => clearInterval(deadlineTimer);
  }, [isQuizStarted, isSubmitting, quizInfo]);

  const handleSubmitAnswers = async () => {
    if (isSubmitting) return;
    const finalUserId = user?.user_id || user?.id;
    const finalQuizSetId = quizInfo?.id || questions[0]?.quiz_set_id;
    const totalTimeInSeconds = (quizInfo?.time_limit || 30) * 60;
    const timeSpent = totalTimeInSeconds - timeLeft;

    if (!finalUserId || !finalQuizSetId) {
      Swal.fire({
        title: "Session Lost!",
        text: "User or Quiz information is missing. Please restart.",
        icon: "error",
        confirmButtonText: "Go Back"
      }).then(() => router.push("/dashboard"));
      return;
    }

    setIsSubmitting(true);
    setIsQuizStarted(false);
    setIsBlurred(false);
    
    const submissionData = {
      user_id: finalUserId,
      quiz_set_id: finalQuizSetId,
      answers: answers,
      time_taken: Math.max(timeSpent, 1),
    };

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(`${API_URL}/api/admin/submit-quiz`, submissionData);

      if (response.data.success) {
        localStorage.removeItem("quiz_time");
        dispatch(clearActiveQuiz());
        Swal.fire({
          title: "Quiz Submitted!",
          text: "Thank you for participating. You can check your ranking on the leaderboard soon.",
          icon: "success",
          confirmButtonText: "Return to Dashboard",
          confirmButtonColor: "#10B981",
          allowOutsideClick: false
        }).then(() => {
          router.push("/dashboard");
        });
      }
    } catch (error) {
      console.error("Submission Error:", error.response?.data || error.message);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.error || "Failed to submit. Please try again.",
        icon: "error",
      });
      setIsQuizStarted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reportViolation = (reason) => {
    if (!isQuizStarted || isSubmitting || Swal.isVisible()) return;
    setIsBlurred(true);
    setWarningCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 4) {
        Swal.fire({
          title: "Terminated!",
          text: `Violation: ${reason}. Auto-submitting.`,
          icon: "error",
          timer: 3000,
          showConfirmButton: false,
          allowOutsideClick: false
        }).then(() => handleSubmitAnswers());
      } else {
        Swal.fire({
          title: "Security Warning!",
          html: `<p class="text-red-600 font-bold underline">${reason}</p><p>Attempt ${newCount} of 4</p>`,
          icon: "warning",
          confirmButtonText: "Continue Quiz",
          allowOutsideClick: false,
        }).then(() => setIsBlurred(false));
      }
      return newCount;
    });
  };

  useEffect(() => {
    if (!isQuizStarted) return;
    const handleBlur = () => reportViolation("Tab switching detected!");
    const handleKey = (e) => {
      if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && e.keyCode === 73)) {
        e.preventDefault();
        reportViolation("DevTools attempt!");
      }
    };
    window.addEventListener("blur", handleBlur);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("keydown", handleKey);
    };
  }, [isQuizStarted]);

  useEffect(() => {
    if (!isQuizStarted || timeLeft <= 0) {
      if (timeLeft <= 0 && isQuizStarted) {
        setShowTimeUpModal(true);
        handleSubmitAnswers();
      }
      return;
    }
    const timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isQuizStarted]);

  const handleStartQuiz = () => {
    setShowStartModal(false);
    setIsQuizStarted(true);
  };

  const handleOptionChange = (questionId, optionKey) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
  };

  const formatTime = (time) => {
    const min = String(Math.floor(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <>
      <style jsx global>{`
        @media print { body { display: none !important; } }
        .no-select { user-select: none; -webkit-user-select: none; }
      `}</style>

      <div className={`transition-all duration-700 min-h-screen ${isBlurred ? "blur-3xl grayscale" : "blur-0"}`}>
        <div className="flex px-3 flex-col items-center py-4 no-select" onContextMenu={(e) => e.preventDefault()}>

          {/* ৩. StartModal এ endTime পাস করা হয়েছে */}
          {showStartModal && (
            <StartModal 
              onStart={handleStartQuiz} 
              startTime={quizInfo?.start_at} 
              endTime={quizInfo?.ends_at} 
            />
          )}

          <TimeUpModal show={showTimeUpModal} />

          <div className="w-full max-w-5xl bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col">

            {!showStartModal && (
              <div className="p-4 md:p-8 border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-20">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-2 md:gap-4">
                    <div className={`flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 ${timeLeft < 60 ? 'text-red-600 animate-pulse' : 'text-primary'}`}>
                      <AiOutlineClockCircle className="text-xl md:text-2xl" />
                      <span className="text-lg md:text-xl font-black font-mono">{formatTime(timeLeft)}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
                      <MdSecurity className="text-red-600 text-xl" />
                      <span className="text-[10px] text-red-700 font-black uppercase">Secure Mode</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {warningCount > 0 && (
                      <span className="bg-red-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase">
                        {warningCount}/4 Warnings
                      </span>
                    )}
                    <div className="text-gray-500 font-black bg-gray-50 px-5 py-3 rounded-xl border border-gray-200">
                      Q: {currentStep + 1} / {questions.length}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="p-6 md:p-12 min-h-[400px]">
              {questions && questions[currentStep] && (
                <QuizQuestion
                  question={questions[currentStep]}
                  handleOptionChange={handleOptionChange}
                  selectedAnswer={answers[questions[currentStep]?.id]}
                  isTimeUp={timeLeft <= 0 || isSubmitting}
                />
              )}
            </div>

            <div className="p-6 md:p-10 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep((p) => Math.max(p - 1, 0))}
                disabled={currentStep === 0 || isSubmitting}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold border-2 border-gray-200 text-gray-400 hover:border-primary hover:text-primary transition-all disabled:opacity-20"
              >
                <AiOutlineArrowLeft /> Back
              </button>

              <NextButton
                onNext={() => setCurrentStep((p) => Math.min(p + 1, questions.length - 1))}
                onSubmit={handleSubmitAnswers}
                isLastQuestion={currentStep === questions.length - 1}
                isAnswered={Boolean(questions[currentStep] && answers[questions[currentStep].id])}
                isLoading={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizForm;