"use client";
import React, { useState } from "react";
import { AiOutlineUser, AiOutlinePhone, AiOutlineHome, AiOutlineTags } from "react-icons/ai";
import { FaArrowRight, FaUniversity, FaArrowLeft, FaMagic } from "react-icons/fa";

export default function Step1_Auth({ formData, updateFormData, nextStep, prevStep }) {
  const [phoneError, setPhoneError] = useState("");
  const [promoInputName, setPromoInputName] = useState(""); // প্রোমো কোডের জন্য ইউজারের দেওয়া নাম

  // প্রোমো কোড জেনারেট করার ফাংশন
  const handleGenerateCode = (e) => {
    e.preventDefault();
    if (!promoInputName) {
      alert("Please enter a name to generate the code.");
      return;
    }
    // নামকে বড় হাতের করা এবং মাঝের স্পেস বা স্পেশাল ক্যারেক্টার বাদ দেওয়া
    const cleanName = promoInputName.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const finalCode = `${cleanName}${randomNumber}`;
    
    // formData তে myPromoCode হিসেবে সেভ করা
    updateFormData({ myPromoCode: finalCode });
  };

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
    
    // অ্যাম্বাসেডর হলে কোড জেনারেট করা বাধ্যতামূলক
    if (formData.role === "ambassador" && !formData.myPromoCode) {
      alert("Please generate your promo code first.");
      return;
    }
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

      {/* --- AMBASSADOR SPECIFIC SECTION --- */}
      {formData.role === "ambassador" && (
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-4">
          <label className="block text-sm font-bold text-black italic">
            Create Your Custom Promo Code
          </label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center border border-black rounded-lg bg-white">
              <AiOutlineTags className="text-gray-600 ml-2" />
              <input
                type="text"
                value={promoInputName}
                onChange={(e) => setPromoInputName(e.target.value)}
                placeholder="Ex: RAKIB or RU_ZO"
                className="w-full p-2 text-sm rounded-lg focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleGenerateCode}
              className="px-4 py-2 bg-black text-white rounded-lg font-bold flex items-center gap-2 hover:bg-gray-800 transition-all active:scale-95"
            >
              <FaMagic /> Generate
            </button>
          </div>

          {/* জেনারেটেড কোড ডিসপ্লে */}
          {formData.myPromoCode && (
            <div className="mt-3 flex items-center justify-between p-3 bg-white border-2 border-dashed border-Primary rounded-xl">
              <span className="text-xs font-medium text-gray-500">Your Code:</span>
              <span className="text-xl font-black text-Primary tracking-widest uppercase">
                {formData.myPromoCode}
              </span>
            </div>
          )}
        </div>
      )}

      {/* --- CONTESTOR SPECIFIC SECTION --- */}
      {formData.role === "contestor" && (
        <div className="pb-4">
          <label className="block text-md pb-2 font-bold text-black">
            Enter Referral Promo Code <span className="text-gray-400 text-xs">(If you have any)</span>
          </label>
          <div className="flex items-center border border-black rounded-lg">
            <AiOutlineTags className="text-gray-600 ml-2" />
            <input
              type="text"
              name="promoCode" // contestor অন্য কারো কোড ব্যবহার করবে
              value={formData.promoCode || ""}
              onChange={handleChange}
              placeholder="e.g. ZEROU123"
              className="w-full p-2 text-md rounded-lg focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Phone, District, Institution (As Usual) */}
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
        <button
          type="button"
          onClick={prevStep}
          className="flex-1 py-3 rounded-xl border-2 border-gray-200 font-bold hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <FaArrowLeft /> Role Selection
        </button>
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