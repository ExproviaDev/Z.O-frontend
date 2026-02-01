"use client";
import React from "react";
import { AiOutlineCheck } from "react-icons/ai";

const QuizQuestion = ({ question, handleOptionChange, selectedAnswer, isTimeUp }) => {
  const optionsEntries = Object.entries(question.options || {});

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 leading-snug">
        {question.question_text}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {optionsEntries.map(([key, value], index) => {
          const isSelected = selectedAnswer === key;

          return (
            <div
              key={key}
              className={`group flex items-center justify-between p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 
                ${isSelected
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-gray-100 bg-gray-50 hover:border-primary/40 hover:bg-white"
                } ${isTimeUp ? "pointer-events-none opacity-60" : ""}`}
              onClick={() => !isTimeUp && handleOptionChange(question.id, key)}
            >
              <div className="flex items-center gap-4">
                {/* অপশনের লেটার (A, B, C, D) দেখানোর জন্য */}
                <span className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold transition-colors
                  ${isSelected ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-500 group-hover:text-primary"}`}>
                  {key}
                </span>
                <span className={`text-lg font-medium ${isSelected ? "text-primary" : "text-gray-700"}`}>
                  {value}
                </span>
              </div>

              {isSelected && (
                <div className="bg-primary rounded-full p-1">
                  <AiOutlineCheck className="text-white w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestion;