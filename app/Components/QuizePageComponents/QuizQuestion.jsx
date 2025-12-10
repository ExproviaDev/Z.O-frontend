// components/QuizQuestion.jsx
"use client";

import React from "react";

const QuizQuestion = ({
  question,
  handleOptionChange,
  selectedAnswer,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{question.text}</h2>
      
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-3">
            <input
              type="radio"
              id={`question-${question.id}-option-${index}`}
              name={`question-${question.id}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => handleOptionChange(question.id, option)}
              className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
            />
            <label
              htmlFor={`question-${question.id}-option-${index}`}
              className="text-lg cursor-pointer"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
