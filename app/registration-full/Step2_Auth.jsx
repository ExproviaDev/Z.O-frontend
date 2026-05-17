// src/components/auth/Step2_Auth.jsx
"use client";
import React from "react";
import { FaArrowLeft, FaArrowRight, FaBookOpen, FaListAlt } from "react-icons/fa";

export default function Step2_Academic({ formData, updateFormData, nextStep, prevStep }) {
  const educationTypes = [
    "Bangla Medium (Bangla & English Version)",
    "English Medium (IGCSE & IB)",
    "Madrasha (Alia & Qawmi)",
    "Higher Education (University and Equivalent)",
    "Vocational, Diploma & Other Technical Education",
  ];

  // টেবিল অনুযায়ী ১৭টি লেভেল (SDG 1 to 17)
  const allLevels = [
"Class 5 / PYP 5 / Taisir",
  "Class 6 / MYP 1 / Mizan",
  "Class 7 / MYP 2 / Nahbemir",
  "Class 8 / MYP 3 / Hidayatunnah",
  "Class 9 / MYP 4 / Kafiya & Bekaya",
  "Class 10 / MYP 5",
  "SSC / O Level / Dakhil Candidate",
  "Class 11 / DP 1 / Jalalayn",
  "Class 12 / DP 2",
  "HSC / A Level / Alim Candidate",
  "University Admission Candidate / Musannif",
  "University 1st Year / Diploma 1st Year / Fazil / Mishkat",
  "University 2nd Year / Diploma 2nd Year",
  "University 3rd Year / Diploma 3rd Year",
  "University 4th Year / Diploma 4th Year",
  "University 5th Year & Intern / Kamil / Dawrah",
  "Postgraduate (Masters) and Above"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    // যেহেতু এখন একটি ড্রপডাউন, আমরা শুধু gradeLevel আপডেট করবো
    updateFormData({ [name]: value });
  };

  const handleNextSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={handleNextSubmit} className="space-y-6">
      <div className="pb-2">
        <label className="block text-lg font-bold text-black pb-2">Education Type*</label>
        <div className="flex items-center border border-black rounded-lg">
          <FaBookOpen className="text-gray-600 ml-2" />
          <select
            name="educationType"
            value={formData.educationType}
            onChange={handleChange}
            className="w-full p-2 focus:outline-none bg-transparent"
            required
          >
            <option value="" disabled>Select one</option>
            {educationTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="pb-2">
        <label className="block text-lg font-bold text-black pb-2">Your Current Level*</label>
        <div className="flex items-center border border-black rounded-lg">
          <FaListAlt className="text-gray-600 ml-2" />
          <select
            name="gradeLevel"
            value={formData.gradeLevel}
            onChange={handleChange}
            className="w-full p-2 focus:outline-none bg-transparent"
            required
          >
            <option value="" disabled>Select your class or year</option>
            {allLevels.map((level, index) => (
              <option key={index} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <button type="button" onClick={prevStep} className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition flex items-center gap-3">
          <FaArrowLeft /> Back
        </button>
        <button type="submit" className="px-8 py-2 rounded-lg bg-Primary hover:bg-[#084264] text-white font-semibold transition flex items-center gap-3 shadow-md">
          Next <FaArrowRight />
        </button>
      </div>
    </form>
  );
}