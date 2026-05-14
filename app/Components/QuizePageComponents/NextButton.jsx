"use client";
import React from "react";
import { AiOutlineRight, AiOutlineCheck } from "react-icons/ai";

const NextButton = ({ onNext, onSubmit, isLastQuestion, isAnswered, isLoading }) => {
  return isLastQuestion ? (
    <button
      onClick={onSubmit}
      disabled={isLoading}
      className="flex items-center gap-1.5 md:gap-2 bg-Primary text-white px-4 py-2 md:px-8 md:py-4 rounded-lg md:rounded-2xl font-bold text-xs md:text-base hover:bg-Primary/90 transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <AiOutlineCheck className="text-sm md:text-base" /> {isLoading ? "Submitting..." : "Submit"}
    </button>
  ) : (
    <button
      onClick={onNext}
      disabled={!isAnswered}
      className={`flex items-center gap-1.5 md:gap-2 bg-Primary/90 text-white px-4 py-2 md:px-8 md:py-4 rounded-lg md:rounded-2xl font-bold text-xs md:text-base hover:bg-Primary transition shadow-md hover:shadow-lg ${!isAnswered ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      Next <AiOutlineRight className="text-sm md:text-base" />
    </button>
  );
};

export default NextButton;
