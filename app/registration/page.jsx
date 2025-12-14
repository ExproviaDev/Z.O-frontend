"use client";
import React, { useState } from "react";
import Step1_Personal from "./Step1_Auth";
import Step2_Academic from "./Step2_Auth";
import Step3_Auth from "./Step3_Auth";

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    district: "",
    institution: "",
    educationType: "",
    gradeLevel: "",
    currentLevel: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [error, setError] = useState(""); // Error message state

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);


  const handleSignup = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; 
    setIsSubmitting(true); 

    const backendUrl = 'http://localhost:4000/api/auth/register'; 

    const res = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setIsSubmitting(false); 

    if (res.ok && data.user) { 
      alert("রেজিস্ট্রেশন সফল! আপনার ইমেল যাচাইকরণের জন্য একটি মেইল পাঠানো হয়েছে।");
      
    } else {
      setError(data.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে।");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1_Personal
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <Step2_Academic
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <Step3_Auth
            formData={formData}
            updateFormData={updateFormData}
            prevStep={prevStep}
            handleSubmit={handleSignup}  
            isSubmitting={isSubmitting}  
          />
        );
      default:
        return <div>Something went wrong.</div>;
    }
  };

  return (
    <div className="hero min-h-screen py-10">
      <div className="container card bg-white max-w-6xl shadow-2xl p-6 rounded-xl">
        <div className="text-center gap-4 pb-12 grid">
          <h1 className="text-5xl font-bold text-gray-900">Zero Olympiad Registration</h1>
          <p className="text-sm text-Primary mt-2">Please fill out the registration details to join.</p>
        </div>

        <div className="space-y-6">
          {/* Step Content */}
          {renderStep()}
        </div>

        {/* Progress Indicator */}
        <div className="mt-6">
          <div className="h-1 bg-gray-300 rounded-full">
            <div
              className="h-full bg-Primary rounded-full"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">Step {currentStep} of 3</p>
        </div>
      </div>
    </div>
  );
}
