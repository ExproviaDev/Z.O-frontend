"use client";
import React from "react";
import { AiOutlineCheck } from "react-icons/ai";

const QuizQuestion = ({ question, handleOptionChange, selectedAnswer, isTimeUp }) => {
  const optionsEntries = Object.entries(question.options || {});

  return (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-base md:text-2xl font-bold text-gray-800 leading-snug">
        {question.question_text}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-4">
        {optionsEntries.map(([key, value]) => {
          const isSelected = selectedAnswer === key;

          return (
            <div
              key={key}
              className={`group flex items-center justify-between p-3 md:p-5 border-2 rounded-xl md:rounded-2xl cursor-pointer transition-all duration-300
                ${isSelected
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-gray-100 bg-gray-50 hover:border-primary/40 hover:bg-white"
                } ${isTimeUp ? "pointer-events-none opacity-60" : ""}`}
              onClick={() => !isTimeUp && handleOptionChange(question.id, key)}
            >
              <div className="flex items-center gap-2.5 md:gap-4 min-w-0 flex-1">
                <span className={`flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-md md:rounded-lg font-bold text-sm md:text-base shrink-0 transition-colors
                  ${isSelected ? "bg-primary text-white" : "bg-white border border-gray-200 text-gray-500 group-hover:text-primary"}`}>
                  {key}
                </span>
                <span className={`text-sm md:text-lg font-medium leading-snug ${isSelected ? "text-primary" : "text-gray-700"}`}>
                  {value}
                </span>
              </div>

              {isSelected && (
                <div className="bg-primary rounded-full p-0.5 md:p-1 shrink-0 ml-2">
                  <AiOutlineCheck className="text-white w-3 h-3 md:w-4 md:h-4" />
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