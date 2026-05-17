"use client";
import React, { useState } from "react";
import { 
  FaArrowLeft, 
  FaEnvelope, 
  FaKey, 
  FaPaperPlane, 
  FaEye, 
  FaEyeSlash, 
  FaExclamationTriangle 
} from "react-icons/fa";

export default function Step3_Auth({ 
  formData, 
  updateFormData, 
  prevStep, 
  handleSubmit, 
  isSubmitting,
  serverError, 
  setServerError 
}) {
  const [showPassword, setShowPassword] = useState(false);

  // শুধুমাত্র পাসওয়ার্ডের দৈর্ঘ্য ৬ ক্যারেক্টার বা তার বেশি কি না, তা চেক করা হচ্ছে
  const isPasswordValid = formData.password.length >= 6;

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
    if (serverError) setServerError("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Input */}
      <div className="pb-3">
        <label className="block text-md font-medium text-black pb-2">Email *</label>
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
        <label className="block text-md font-medium text-black pb-2">Password *</label>
        <div className="flex items-center border border-Primary rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-Primary/50">
          <FaKey className="text-gray-400 ml-3" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Minimum 6 characters"
            className="w-full p-2 text-md focus:outline-none"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="px-3 text-gray-500 hover:text-black transition-colors"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        
        {/* পাসওয়ার্ডের লেন্থ ৬ এর কম হলে ইউজারকে একটি ওয়ার্নিং দেখানো হবে */}
        {formData.password.length > 0 && !isPasswordValid && (
          <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
            <FaExclamationTriangle /> Password must be at least 6 characters long.
          </p>
        )}
      </div>

      {/* Server Error Message */}
      {serverError && (
        <div className="flex items-center gap-2 p-3 mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg animate-pulse">
          <FaExclamationTriangle className="flex-shrink-0" />
          <span className="font-medium">{serverError}</span>
        </div>
      )}

      {/* Buttons */}
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
            isSubmitting || !isPasswordValid ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting || !isPasswordValid}
        >
          {isSubmitting ? "Submitting..." : "Submit Registration"}
          <FaPaperPlane size={14} />
        </button>
      </div>
    </form>
  );
}