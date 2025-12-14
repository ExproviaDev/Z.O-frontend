"use client";
import React from "react";
import { AiOutlineUser, AiOutlinePhone, AiOutlineHome } from "react-icons/ai";

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
      <div>
        <label className="block text-sm font-medium text-Primary">Full Name *</label>
        <div className="flex items-center border border-Primary rounded-lg">
          <AiOutlineUser className="text-gray-600 ml-2" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-2 text-sm rounded-lg focus:outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-Primary">Phone *</label>
        <div className="flex items-center border border-Primary rounded-lg">
          <AiOutlinePhone className="text-gray-600 ml-2" />
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 text-sm rounded-lg focus:outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-Primary">District *</label>
        <div className="flex items-center border border-Primary rounded-lg">
          <AiOutlineHome className="text-gray-600 ml-2" />
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="District"
            className="w-full p-2 text-sm rounded-lg focus:outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-Primary">Institution *</label>
        <input
          type="text"
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          placeholder="Institution"
          className="w-full p-2 text-sm rounded-lg border border-Primary focus:outline-none"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-full mt-4">
        Next
      </button>
    </form>
  );
}
