"use client";
import React from "react";
import { AiOutlineRight, AiOutlineCheck } from "react-icons/ai";

const NextButton = ({ onNext, onSubmit, isLastQuestion, isAnswered }) => {
  return isLastQuestion ? (
    <button
      onClick={onSubmit}
      className="flex items-center gap-2 bg-Primary text-white px-6 py-2 rounded-lg hover:bg-Primary/90 transition"
    >
      <AiOutlineCheck /> Submit
    </button>
  ) : (
    <button
      onClick={onNext}
      disabled={!isAnswered}
      className={`flex items-center gap-2 bg-Primary/80 text-white px-6 py-2 rounded-lg hover:bg-Primary transition ${!isAnswered ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      Next <AiOutlineRight />
    </button>
  );
};

export default NextButton;
