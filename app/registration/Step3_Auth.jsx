"use client";
import React from "react";
import { FaEnvelope, FaKey } from "react-icons/fa"; // React Icons

export default function Step3_Auth({ formData, updateFormData, prevStep, handleSubmit, isSubmitting }) {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-Primary">Email *</label>
        <div className="flex items-center border border-Primary rounded-lg">
          <FaEnvelope className="text-gray-600 ml-2" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 text-sm rounded-lg focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-Primary">Password *</label>
        <div className="flex items-center border border-Primary rounded-lg">
          <FaKey className="text-gray-600 ml-2" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 text-sm rounded-lg focus:outline-none"
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
          className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Back
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className={`px-5 py-2 rounded-lg bg-Primary text-white hover:bg-gray-800 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Registration"}
        </button>
      </div>
    </form>
  );
}
