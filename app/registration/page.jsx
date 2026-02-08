"use client";
import React, { useState, useEffect } from "react";
import Step1_Personal from "./Step1_Auth";
import Step2_Academic from "./Step2_Auth";
import Step3_Auth from "./Step3_Auth";
import Step_Payment from "./Step_Payment";
import { FaRegClipboard } from "react-icons/fa";
import Link from "next/link";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useSearchParams } from "next/navigation";

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentToken, setPaymentToken] = useState(null);
  const searchParams = useSearchParams();
  
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
  const [error, setError] = useState("");

  // ✅ UPDATE 1: পেমেন্ট থেকে ফিরে আসলে ডাটা রিকভার করা
  useEffect(() => {
    const token = searchParams.get("token");
    
    // লোকাল স্টোরেজ থেকে ডাটা চেক করা
    const savedData = localStorage.getItem("reg_formData");

    if (token) {
      setPaymentToken(token);
      setCurrentStep(3); // টোকেন থাকলে সরাসরি ফাইনাল স্টেপে
      
      // যদি সেভ করা ডাটা থাকে, তা স্টেটে সেট করা
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
    }
  }, [searchParams]);

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

    const backendData = {
      ...formData,
      paymentToken: paymentToken 
    };

    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/user/register`;

    try {
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backendData),
      });

      const data = await res.json();
      setIsSubmitting(false);

      if (res.ok) {
        // ✅ UPDATE 2: সফল হলে লোকাল স্টোরেজ ক্লিয়ার করা
        localStorage.removeItem("reg_formData");
        
        alert("রেজিস্ট্রেশন সফল!");
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
        return <Step1_Personal formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
      case 2:
        return <Step2_Academic formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        if (!paymentToken) {
          // ✅ UPDATE 3: Step_Payment এ formData পাস করা (যাতে সেভ করা যায়)
          return <Step_Payment amount={300} prevStep={prevStep} formData={formData} />;
        }
        return (
          <Step3_Auth
            formData={formData}
            updateFormData={updateFormData}
            prevStep={prevStep}
            handleSubmit={handleSignup}
            isSubmitting={isSubmitting}
            serverError={error}
            setServerError={setError}
            paymentToken={paymentToken}
          />
        );
      default:
        return null;
    }
  };

  return (
    // ... আপনার বাকি JSX কোড ঠিক আছে ...
    <div className="hero min-h-screen py-10">
      <div className="container card bg-white max-w-2xl shadow-2xl p-8 rounded-2xl">
        <div className="text-center gap-4 pb-12 grid">
          <h1 className="text-4xl font-bold text-Primary flex justify-center items-center gap-4"> 
            <FaRegClipboard className="text-Primary" size={38} /> Zero Olympiad Registration
          </h1>
          <p className="text-md text-Primary mt-2">Please fill out the registration details to join.</p>
        </div>

        <div className="space-y-6">{renderStep()}</div>

        <div className="mt-6">
          <div className="h-1 bg-gray-300 rounded-full">
            <div
              className="h-full bg-Primary rounded-full"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">Step {currentStep} of 3</p>
          <p className="mt-2 text-center text-sm">
            Already Have An Account?{" "}
            <Link prefetch={false} href="/login" className="underline text-Primary font-bold">Login</Link>
          </p>
        </div>
        <div className="pt-7">
          <Link prefetch={false} href={'/'}>
            <button className="flex items-center btn btn-primary">
              <MdOutlineArrowBackIos /> back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}