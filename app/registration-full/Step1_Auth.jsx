"use client";
import React, { useState } from "react";
import { AiOutlineUser, AiOutlineHome, AiOutlineTags } from "react-icons/ai";
import { FaArrowRight, FaUniversity, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Step1_Auth({ formData, updateFormData, nextStep }) {
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  // কান্ট্রি চেঞ্জ বা নাম্বার টাইপ হ্যান্ডলার
  const handlePhoneChange = (value, country, e, formattedValue) => {
    // যদি ইউজার আগের নাম্বার থাকা অবস্থায় শুধু কান্ট্রি ড্রপডাউন চেঞ্জ করে
    // তাহলে আমরা চেক করব ইভেন্ট টাইপ 'country-change' কি না
    if (e?.type === 'click' || (value && country.dialCode === value)) {
      // কান্ট্রি চেঞ্জ হলে নাম্বার রিসেট হবে (শুধু কান্ট্রি কোড থাকবে)
      updateFormData({ phone: country.dialCode });
    } else {
      updateFormData({ phone: value });
    }

    // ভ্যালিডেশন: কান্ট্রি কোডের চেয়ে বেশি ডিজিট দিলে এরর চেক শুরু হবে
    if (value.length > country.dialCode.length && value.length < 8) {
      setPhoneError("Invalid phone number");
    } else {
      setPhoneError("");
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (phoneError || !formData.phone || formData.phone.length < 8) return;
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

      {/* Referral Code */}
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
        {/* Phone Input */}
        <div className="pb-2">
          <label className="block text-sm font-bold text-black pb-1">Phone *</label>
          <div className="phone-input-container">
            <PhoneInput
              country={"bd"}
              value={formData.phone}
              onChange={handlePhoneChange}
              inputProps={{
                name: "phone",
                required: true,
              }}
              // এই সেটিংসগুলো পতাকার সাথে নাম্বার উল্টাপাল্টা হওয়া রোধ করবে
              countryCodeEditable={false} 
              enableSearch={true}
              containerStyle={{ width: "100%" }}
              inputStyle={{
                width: "100%",
                height: "42px",
                border: "1px solid black",
                borderRadius: "8px",
                fontSize: "16px",
              }}
              buttonStyle={{
                border: "1px solid black",
                borderRight: "none",
                borderRadius: "8px 0 0 8px",
                backgroundColor: "white"
              }}
            />
          </div>
          {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
        </div>

        {/* District / City */}
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

      {/* Institution */}
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
          <button type="button" className="w-full py-3 rounded-xl border-2 border-gray-200 font-bold hover:bg-gray-50 flex items-center justify-center gap-2">
            <FaArrowLeft /> Cancel
          </button>
        </Link>
        <button
          type="submit"
          disabled={!!phoneError || !formData.phone || formData.phone.length < 8}
          className={`flex-1 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
            (phoneError || !formData.phone || formData.phone.length < 8) ? "bg-gray-300" : "bg-Primary shadow-lg shadow-blue-200 hover:scale-[1.02]"
          }`}
        >
          Next Step <FaArrowRight />
        </button>
      </div>
    </form>
  );
}