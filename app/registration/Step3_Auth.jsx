"use client";
import React from "react";
import { FaArrowLeft, FaEnvelope, FaKey, FaPaperPlane } from "react-icons/fa"; // React Icons

export default function Step3_Auth({ formData, updateFormData, prevStep, handleSubmit, isSubmitting }) {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div className="pb-3">
        <label className="block text-md font-medium text-Primary pb-2">Email *</label>
        <div className="flex items-center border border-Primary rounded-lg">
          <FaEnvelope className="text-gray-600 ml-2" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 text-md rounded-lg focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="pb-3">
        <label className="block text-md font-medium text-Primary pb-2">Password *</label>
        <div className="flex items-center border border-Primary rounded-lg">
          <FaKey className="text-gray-600 ml-2" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 text-md rounded-lg focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        {/* Back Button */}
        <button
          type="button"
          onClick={prevStep}
          className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 flex justify-center items-center gap-3"
        >
          <FaArrowLeft className="text-primary-600" size={16} />  Back
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className={`px-5 py-2 rounded-lg flex justify-center items-center gap-3 bg-Primary text-white hover:bg-gray-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >

          {isSubmitting ? "Submitting..." : "Submit Registration"}
          <FaPaperPlane className="text-primary-600" size={16} />
        </button>
      </div>
    </form>
  );
}
