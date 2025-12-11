"use client";

import React from "react";
import { AiOutlineCheck } from "react-icons/ai"; // tick icon

const QuizQuestion = ({ question, handleOptionChange, selectedAnswer, isTimeUp }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-Primary">{question.text}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          return (
            <div
              key={index}
              className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 
                ${isSelected ? "border-Primary bg-Primary/10" : "border-gray-300 hover:border-Primary hover:bg-Primary/5"}`}
              onClick={() => !isTimeUp && handleOptionChange(question.id, option)}
            >
              <span className="text-lg font-medium">{option}</span>
              {isSelected && <AiOutlineCheck className="text-primary w-6 h-6" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestion;
