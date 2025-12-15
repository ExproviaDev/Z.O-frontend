"use client";
import React from "react";
import { AiOutlineUser, AiOutlinePhone, AiOutlineHome } from "react-icons/ai";
import { FaArrowRight, FaUniversity } from "react-icons/fa";

export default function Step1_Auth({ formData, updateFormData, nextStep }) {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleNext} className="space-y-4">
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
        <div className="flex items-center border border-Primary rounded-lg">
          <AiOutlinePhone className="text-gray-600 ml-2" />
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 text-md rounded-lg focus:outline-none"
            required
          />
        </div>
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

      <button type="submit" className="btn bg-Primary hover:bg-[#0A4F78] text-gray-200 hover:text-white rounded-md w-full mt-4 ">
        Next
         <FaArrowRight className="text-primary-600" size={16} />
      </button>
    </form>
  );
}
