"use client";
import React, { useState } from "react";
import Step1_Personal from "./Step1_Auth";
import Step2_Academic from "./Step2_Auth";
import Step3_Auth from "./Step3_Auth";
import { FaRegClipboard } from "react-icons/fa";
import Link from "next/link";
import { MdOutlineArrowBackIos } from "react-icons/md";

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
    currentLevel: "N/A",
    activities: [],
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
    setError("");

    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/user/register`;

    try {
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
        window.location.href = "/login";


      } else {
        setError(data.message || "Registration failed. Please try again.");
      }

    } catch (err) {
      setIsSubmitting(false);
      setError("Network error. Please check your connection.");

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
            serverError={error}
            setServerError={setError}
          />
        );
      default:
        return <div>Something went wrong.</div>;
    }
  };

  return (
    <div className="hero min-h-screen py-10">
      <div className="container card bg-white max-w-2xl shadow-2xl p-8 rounded-2xl">
        <div className="text-center gap-4 pb-12 grid">
          <h1 className="text-4xl font-bold text-Primary flex justify-center items-center gap-4"> <FaRegClipboard className="text-Primary" size={38} /> Zero Olympiad Registration</h1>
          <p className="text-md text-Primary mt-2">Please fill out the registration details to join.</p>
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

          <p className="mt-2 text-center">
            Already Have An Account Please !{" "}
            <Link href="/login" className="underline cursor-pointer text-Primary hover:text-gray-600 font-bold">
              Login
            </Link>
          </p>
        </div>
         {/* back button */}
            <div className="pt-7">
                  <Link href={'/'} className="">
                    <button className="flex items-center btn btn-active btn-primary">
                      <MdOutlineArrowBackIos />  back
                    </button>
                  </Link>
            </div>
      </div>
    </div>
  );
}
