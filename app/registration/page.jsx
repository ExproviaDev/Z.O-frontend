"use client";
import React, { useState, useEffect } from "react";
import Step1_Personal from "./Step1_Auth";
import Step2_Academic from "./Step2_Auth";
import Step3_Auth from "./Step3_Auth";
import Step_Payment from "./Step_Payment";
import { FaRegClipboard } from "react-icons/fa";
import Link from "next/link";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentToken, setPaymentToken] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    role: "contestor",
    promoCode: "",
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

  useEffect(() => {
    const token = searchParams.get("token");
    const savedData = localStorage.getItem("reg_formData");

    if (token) {
      setPaymentToken(token);
      setCurrentStep(4);

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

    const source = typeof window !== "undefined" ? localStorage.getItem("lead_source") || "organic" : "organic";

    const backendData = {
      ...formData,
      paymentToken: paymentToken,
      signup_source: source
    };

    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/user/register`;

    try {
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backendData),
        signal: AbortSignal.timeout(45000),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.removeItem("reg_formData");
        localStorage.removeItem("lead_source");

        // 🔥 Registration success hole direct Verify OTP page e pathano hocche
        router.push(`/successful-registration?email=${encodeURIComponent(formData.email)}`);

      } else {
        setError(data.message || "Registration failed.");
        Swal.fire({
          title: "দুঃখিত!",
          text: data.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      const timedOut =
        err?.name === "AbortError" ||
        err?.name === "TimeoutError" ||
        (typeof err?.message === "string" &&
          err.message.toLowerCase().includes("abort"));
      setError(timedOut ? "Request timed out." : "Network error.");
      Swal.fire({
        title: timedOut ? "সার্ভার ব্যস্ত / দেরি হচ্ছে" : "নেটওয়ার্ক এরর!",
        text: timedOut
          ? "অনুগ্রহ করে একটু পরে আবার চেষ্টা করুন। খুব বেশি মানুষ একসাথে রেজিস্টার করলে আগের মতই দেখাতে পারে।"
          : "দয়া করে আপনার ইন্টারনেট কানেকশন চেক করে আবার চেষ্টা করুন।",
        icon: "warning",
        confirmButtonColor: "#f59e0b",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1_Personal formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 2:
        return <Step2_Academic formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        if (!paymentToken) {
          return <Step_Payment amount={300} prevStep={prevStep} formData={formData} />;
        }
        return null;
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

  // 🔥 Return Statement টি যোগ করা হলো
  return (
    <div className="hero min-h-screen py-10">
      <div className="container card bg-white max-w-2xl shadow-2xl p-8 rounded-2xl">
        <div className="text-center gap-4 pb-12 grid">
          <div className="text-center flex items-center justify-center">
            <Link href={'/'}>
              <button className="flex items-center underline">
                <MdOutlineArrowBackIos /> Back to Home
              </button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-black flex justify-center items-center gap-4">
            <FaRegClipboard className="text-black" size={38} /> Zero Olympiad Registration
          </h1>
          <div className="">
            <p className="text-md text-black mt-2">
              Joining as: <span className="font-bold text-Primary uppercase">Participant</span>
            </p>
          </div>
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
      </div>
    </div>
  );
}