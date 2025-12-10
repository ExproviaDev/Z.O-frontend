// components/QuizForm.jsx
"use client"; // Client Component
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import QuizQuestion from "./QuizQuestion";
import NextButton from "./NextButton";

const QuizForm = ({ questions }) => {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({}); // To store answers

  const onSubmit = (data) => {
    console.log("Submitted Answers:", answers); // Log all the answers
    // Calculate marks
  };

  const handleNext = () => {
    if (answers[questions[currentStep].id]) {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, questions.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  useEffect(() => {
    // Enable Next button only if answer is selected
  }, [answers]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl text-black mx-auto p-4 bg-white rounded-lg shadow-md">
      <QuizQuestion
        question={questions[currentStep]}
        control={control}
        errors={errors}
        setValue={setValue}
        handleOptionChange={handleOptionChange}
        selectedAnswer={answers[questions[currentStep].id]}
      />
      
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={handlePrevious}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
          disabled={currentStep === 0}
        >
          Previous
        </button>
        
        <NextButton
          onNext={handleNext}
          onSubmit={onSubmit}
          isLastQuestion={currentStep === questions.length - 1}
          isAnswered={Boolean(answers[questions[currentStep].id])}
        />
      </div>
    </form>
  );
};

export default QuizForm;
