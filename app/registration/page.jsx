"use client";
import React, { useState, useEffect } from "react";
import Step0_RoleSelection from "./Step0_RoleSelection"; // Step 0 ইমপোর্ট করুন
import Step1_Personal from "./Step1_Auth";
import Step2_Academic from "./Step2_Auth";
import Step3_Auth from "./Step3_Auth";
import Step_Payment from "./Step_Payment";
import { FaRegClipboard } from "react-icons/fa";
import Link from "next/link";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useSearchParams } from "next/navigation";

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(0); // ০ থেকে শুরু হবে
  const [paymentToken, setPaymentToken] = useState(null);
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    role: "contestor",     // ডিফল্ট রোল
    myPromoCode: "",       // অ্যাম্বাসেডররা নিজের জন্য যেটা বানাবে
    promoCode: "",     // প্রতিযোগীরা অন্যের যেটা ব্যবহার করবে
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

  // ✅ পেমেন্ট থেকে ফিরে আসলে ডাটা রিকভার করার অরিজিনাল লজিক
  useEffect(() => {
    const token = searchParams.get("token");
    const savedData = localStorage.getItem("reg_formData");

    if (token) {
      setPaymentToken(token);
      setCurrentStep(4); // পেমেন্ট শেষে সরাসরি ফাইনাল স্টেপে
      
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backendData),
      });

      const data = await res.json();
      setIsSubmitting(false);

      if (res.ok) {
        localStorage.removeItem("reg_formData"); // সফল হলে লোকাল স্টোরেজ ক্লিয়ার
        alert("রেজিস্ট্রেশন সফল!");
        window.location.href = "/login";
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setIsSubmitting(false);
      setError("Network error.");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step0_RoleSelection formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
      case 1:
        return <Step1_Personal formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 2:
        return <Step2_Academic formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        if (!paymentToken) {
          return <Step_Payment amount={300} prevStep={prevStep} formData={formData} />;
        }
        return nextStep(); 
      case 4:
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
    <div className="hero min-h-screen py-10">
      <div className="container card bg-white max-w-2xl shadow-2xl p-8 rounded-2xl">
        <div className="text-center gap-4 pb-12 grid">
          <h1 className="text-4xl font-bold text-black flex justify-center items-center gap-4"> 
            <FaRegClipboard className="text-black" size={38} /> Zero Olympiad Registration
          </h1>
          <p className="text-md text-black mt-2">
            Joining as: <span className="font-bold text-Primary uppercase">{formData.role}</span>
          </p>
        </div>

        <div className="space-y-6">{renderStep()}</div>

        <div className="mt-6">
          <div className="h-1 bg-gray-300 rounded-full">
            <div
              className="h-full bg-Primary rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">Step {currentStep} of 4</p>
          <p className="mt-2 text-center text-sm">
            Already Have An Account?{" "}
            <Link prefetch={false} href="/login" className="underline text-black font-bold">Login</Link>
          </p>
        </div>
        <div className="pt-7">
          <Link href={'/'}>
            <button className="flex items-center btn btn-primary">
              <MdOutlineArrowBackIos /> back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}