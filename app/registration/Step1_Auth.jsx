"use client";
import React, { useState } from "react";
import { AiOutlineUser, AiOutlinePhone, AiOutlineHome, AiOutlineTags } from "react-icons/ai";
import { FaArrowRight, FaUniversity, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export default function Step1_Auth({ formData, updateFormData, nextStep }) {
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const cleanValue = value.replace(/\D/g, "");
      if (cleanValue.length <= 11) {
        updateFormData({ [name]: cleanValue });
      }
      setPhoneError(cleanValue.length > 0 && cleanValue.length < 11 ? "Must be 11 digits." : "");
    } else {
      updateFormData({ [name]: value });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (formData.phone.length !== 11) return;
    nextStep();
  };

  return (
    <form onSubmit={handleNext} className="space-y-4 font-sans">
      {/* Full Name */}
      <div className="pb-4">
        <label className="block text-md pb-2 font-bold text-black">Full Name *</label>
        <div className="flex items-center border border-black rounded-lg">
          <AiOutlineUser className="text-gray-600 ml-2" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your official name"
            className="w-full p-2 text-md rounded-lg focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Referral Code (সবার জন্য এখন একই অপশন) */}
      <div className="pb-4">
        <label className="block text-md pb-2 font-bold text-black">
          Enter Referral Promo Code <span className="text-gray-400 text-xs">(Optional)</span>
        </label>
        <div className="flex items-center border border-black rounded-lg">
          <AiOutlineTags className="text-gray-600 ml-2" />
          <input
            type="text"
            name="promoCode"
            value={formData.promoCode || ""}
            onChange={handleChange}
            placeholder="e.g. ZEROU123"
            className="w-full p-2 text-md rounded-lg focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="pb-2">
          <label className="block text-sm font-bold text-black pb-1">Phone *</label>
          <div className={`flex items-center border rounded-lg ${phoneError ? 'border-red-500' : 'border-black'}`}>
            <AiOutlinePhone className="text-gray-600 ml-2" />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="11 digits"
              className="w-full p-2 text-md rounded-lg focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="pb-2">
          <label className="block text-sm font-bold text-black pb-1">District / City *</label>
          <div className="flex items-center border border-black rounded-lg">
            <AiOutlineHome className="text-gray-600 ml-2" />
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full p-2 text-md rounded-lg focus:outline-none"
              required
            />
          </div>
        </div>
      </div>

      <div className="pb-4">
        <label className="block text-sm font-bold text-black pb-1">Institution *</label>
        <div className="flex items-center border border-black rounded-lg">
          <FaUniversity className="text-gray-600 ml-2" />
          <input
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            className="w-full p-2 text-md rounded-lg focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4 pt-4">
        <Link href="/" className="flex-1">
          <button
            type="button"
            className="w-full py-3 rounded-xl border-2 border-gray-200 font-bold hover:bg-gray-50 flex items-center justify-center gap-2"
          >
            <FaArrowLeft /> Cancel
          </button>
        </Link>
        <button
          type="submit"
          disabled={formData.phone.length !== 11}
          className={`flex-1 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
            formData.phone.length !== 11 ? "bg-gray-300" : "bg-Primary shadow-lg shadow-blue-200 hover:scale-[1.02]"
          }`}
        >
          Next Step <FaArrowRight />
        </button>
      </div>
    </form>
  );
}