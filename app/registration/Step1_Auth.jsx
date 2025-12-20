"use client";
import React, { useState } from "react";
import { AiOutlineUser, AiOutlinePhone, AiOutlineHome } from "react-icons/ai";
import { FaArrowRight, FaUniversity } from "react-icons/fa";

export default function Step1_Auth({ formData, updateFormData, nextStep }) {
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const cleanValue = value.replace(/\D/g, "");
      if (cleanValue.length <= 11) {
        updateFormData({ [name]: cleanValue });
      }
      if (cleanValue.length > 0 && cleanValue.length < 11) {
        setPhoneError("Phone number must be exactly 11 digits.");
      } else {
        setPhoneError("");
      }
    } else {
      updateFormData({ [name]: value });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (formData.phone.length !== 11) {
      setPhoneError("Please enter a valid 11-digit phone number.");
      return;
    }
    nextStep();
  };

  return (
    <form onSubmit={handleNext} className="space-y-4">
      {/* Full Name */}
      <div className="pb-4">
        <label className="block text-md pb-2 font-medium text-Primary">Full Name *</label>
        <div className="flex items-center border border-Primary rounded-lg">
          <AiOutlineUser className="text-gray-600 ml-2" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-2 text-md rounded-lg focus:outline-none"
            required
          />
        </div>
      </div>
      <div className="pb-4">
        <label className="block text-md font-medium text-Primary pb-2">Phone *</label>
        <div className={`flex items-center border rounded-lg transition-colors ${phoneError ? 'border-red-500' : 'border-Primary'}`}>
          <AiOutlinePhone className="text-gray-600 ml-2" />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="017XXXXXXXX"
            className="w-full p-2 text-md rounded-lg focus:outline-none bg-transparent"
            required
          />
        </div>
        {phoneError && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{phoneError}</p>}
      </div>
      <div className="pb-4">
        <label className="block text-md font-medium text-Primary pb-2">District *</label>
        <div className="flex items-center border border-Primary rounded-lg">
          <AiOutlineHome className="text-gray-600 ml-2" />
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="District"
            className="w-full p-2 text-md rounded-lg focus:outline-none"
            required
          />
        </div>
      </div>
      <div className="pb-4">
        <label className="block text-md font-medium text-Primary pb-2">Institution *</label>
        <div className="flex items-center border border-Primary rounded-lg">
          <FaUniversity className="text-gray-600 ml-2" />
          <input
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            placeholder="Institution"
            className="w-full p-2 text-md rounded-lg focus:outline-none"
            required
          />
        </div>
      </div>
      <button 
        type="submit" 
        disabled={formData.phone.length !== 11}
        className={`btn bg-Primary hover:bg-[#0A4F78] text-gray-200 hover:text-white rounded-md w-full mt-4 flex items-center justify-center gap-2 transition-all ${formData.phone.length !== 11 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Next
        <FaArrowRight size={16} />
      </button>
    </form>
  );
}