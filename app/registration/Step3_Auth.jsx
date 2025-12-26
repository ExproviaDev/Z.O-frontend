"use client";
import React, { useState } from "react";
import { 
  FaArrowLeft, 
  FaEnvelope, 
  FaKey, 
  FaPaperPlane, 
  FaEye, 
  FaEyeSlash, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaExclamationTriangle 
} from "react-icons/fa";

export default function Step3_Auth({ 
  formData, 
  updateFormData, 
  prevStep, 
  handleSubmit, 
  isSubmitting,
  serverError, // page.jsx থেকে পাঠানো এরর
  setServerError // এরর রিসেট করার জন্য
}) {
  const [showPassword, setShowPassword] = useState(false);

  // পাসওয়ার্ড ভ্যালিডেশন চেক
  const checks = {
    length: formData.password.length >= 8,
    upper: /[A-Z]/.test(formData.password),
    lower: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
  };

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
    // ইউজার যখনই ইনপুট পরিবর্তন করবে, ব্যাকএন্ড এররটি স্ক্রিন থেকে মুছে যাবে
    if (serverError) setServerError("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Input */}
      <div className="pb-3">
        <label className="block text-md font-medium text-Primary pb-2">Email *</label>
        <div className="flex items-center border border-Primary rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-Primary/50">
          <FaEnvelope className="text-gray-400 ml-3" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@mail.com"
            className="w-full p-2 text-md focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="pb-1">
        <label className="block text-md font-medium text-Primary pb-2">Password *</label>
        <div className="flex items-center border border-Primary rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-Primary/50">
          <FaKey className="text-gray-400 ml-3" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full p-2 text-md focus:outline-none"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="px-3 text-gray-500 hover:text-Primary transition-colors"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <p className={`flex items-center gap-1 ${checks.length ? "text-green-600" : "text-gray-400"}`}>
            {checks.length ? <FaCheckCircle /> : <FaTimesCircle />} At least 8 characters
          </p>
          <p className={`flex items-center gap-1 ${checks.upper ? "text-green-600" : "text-gray-400"}`}>
            {checks.upper ? <FaCheckCircle /> : <FaTimesCircle />} One uppercase letter
          </p>
          <p className={`flex items-center gap-1 ${checks.lower ? "text-green-600" : "text-gray-400"}`}>
            {checks.lower ? <FaCheckCircle /> : <FaTimesCircle />} One lowercase letter
          </p>
          <p className={`flex items-center gap-1 ${checks.number ? "text-green-600" : "text-gray-400"}`}>
            {checks.number ? <FaCheckCircle /> : <FaTimesCircle />} One number
          </p>
        </div>
      </div>
      {serverError && (
        <div className="flex items-center gap-2 p-3 mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg animate-pulse">
          <FaExclamationTriangle className="flex-shrink-0" />
          <span className="font-medium">{serverError}</span>
        </div>
      )}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 flex justify-center items-center gap-3 transition"
        >
          <FaArrowLeft size={14} /> Back
        </button>

        <button
          type="submit"
          className={`px-5 py-2 rounded-lg flex justify-center items-center gap-3 bg-Primary text-white hover:bg-opacity-90 transition ${
            isSubmitting || !Object.values(checks).every(Boolean) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting || !Object.values(checks).every(Boolean)}
        >
          {isSubmitting ? "Submitting..." : "Submit Registration"}
          <FaPaperPlane size={14} />
        </button>
      </div>
    </form>
  );
}