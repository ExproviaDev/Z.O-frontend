// components/NextButton.jsx
"use client"; // Client Component

import React from "react";

const NextButton = ({ onNext, onSubmit, isLastQuestion, isAnswered }) => {
  return isLastQuestion ? (
    <button
      onClick={onSubmit}
      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
    >
      Submit
    </button>
  ) : (
    <button
      onClick={onNext}
      disabled={!isAnswered}  // Disable Next button until an option is selected
      className={`bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 ${!isAnswered ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      Next
    </button>
  );
};

export default NextButton;
