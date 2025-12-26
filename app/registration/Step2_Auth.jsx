"use client";
import React, { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBookOpen,
  FaListAlt,
  FaRegCalendarAlt,
} from "react-icons/fa";

export default function Step2_Academic({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) {
  const [stepError, setStepError] = useState("");

  const educationTypes = [
    "Bangla Medium (Bangla & English Version)",
    "English Medium (IGCSE & IB)",
    "Madrasha (Alia & Qawmi)",
    "Higher Education (University and Equivalent)",
    "Vocational, Diploma & Other Technical Education",
    "None of These",
  ];

  const gradeLevels = [
    "Class 5, Grade 5, PYP 5, Taysir, Equivalent",
    "Class 6, Grade 6, MYP 1, Mizan, Equivalent",
    "Class 7, Grade 7, MYP 2, Nahbameer",
    "Class 8, Grade 8, MYP 3, Hedayatun Nahu",
    "Class 9, Grade 9, MYP 4, Kafiya and Bekaya, Equivalent",
    "Class 10, Grade 10, MYP 5, Kafiya and Bekaya, Equivalent",
    "SSC Candidate, O Level Candidate, Kafiya and Bekaya Equivalent",
    "Class 11 (HSC), Grade 11, DP 1, Jalalayn, Equivalent",
    "Class 12 (HSC), Grade 12, DP 2, Jalalayn, Equivalent",
    "HSC Candidate, A Level Candidate, Jalalayn Equivalent",
    "None of These",
  ];

  const currentLevels = [
    "1st Year, Fazil, Mishkat",
    "2nd Year, Fazil, Mishkat",
    "3rd Year, Fazil, Mishkat",
    "4th Year, Fazil, Mishkat",
    "5th Year, Internship, Fazil, Mishkat",
    "Postgraduate (Masters), Kamil, Dawrah",
    "Diploma",
    "None of These",
  ];

  const activitiesOptions = [
    "Being a campus ambassador, I want to collect registrations, conduct online and offline study session of the course provided by the United Nations etc. | The best campus ambassador will be awarded",
    "I want to work in event management at the grand finale in Dhaka | The best event manager will be awarded",
    "I want only to participate in the Zero Olympiad as a competitor, I don't want to do any such work.",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "gradeLevel") {
      const isJunior = gradeLevels.slice(0, 6).includes(value);
      if (isJunior) {
        updateFormData({ 
          gradeLevel: value, 
          currentLevel: "N/A" 
        });
      } else {
        updateFormData({ [name]: value });
      }
    } else {
      updateFormData({ [name]: value });
    }
    
    if (stepError) setStepError("");
  };

  const handleCheckboxChange = (activity) => {
    let selectedActivities = formData.activities || [];
    if (selectedActivities.includes(activity)) {
      selectedActivities = selectedActivities.filter(
        (item) => item !== activity
      );
    } else {
      selectedActivities = [...selectedActivities, activity];
    }
    updateFormData({ activities: selectedActivities });
    if (stepError) setStepError("");
  };

  const handleNextSubmit = (e) => {
    e.preventDefault();
    if (!formData.activities || formData.activities.length === 0) {
      setStepError("Please select at least one activity to proceed.");
      return;
    }

    nextStep();
  };

  const isHigherThanClass10 = gradeLevels
    .slice(6)
    .includes(formData.gradeLevel);

  return (
    <form onSubmit={handleNextSubmit} className="space-y-6">
      <div className="pb-2">
        <label className="block text-lg font-bold text-Primary pb-2">
          Education Type*
        </label>
        <div className="flex items-center border border-Primary rounded-lg">
          <FaBookOpen className="text-gray-600 ml-2" />
          <select
            name="educationType"
            value={formData.educationType}
            onChange={handleChange}
            className="w-full p-2 focus:outline-none bg-transparent"
            required
          >
            <option value="" disabled>
              Select one
            </option>
            {educationTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="pb-2">
        <label className="block text-lg font-bold text-Primary pb-2">
          School/Madrasha Class (January 2026)*
        </label>
        <label className="block text-sm font-sm text-Primary pb-2 pt-2 italic">
          From 5th to 12th Grade - Choose Your Class
        </label>
        <div className="flex items-center border border-Primary rounded-lg">
          <FaListAlt className="text-gray-600 ml-2" />
          <select
            name="gradeLevel"
            value={formData.gradeLevel}
            onChange={handleChange}
            className="w-full p-2 focus:outline-none bg-transparent"
            required
          >
            <option value="" disabled>
              Select one
            </option>
            {gradeLevels.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isHigherThanClass10
            ? "grid-rows-[1fr] opacity-100 mb-4"
            : "grid-rows-[0fr] opacity-0 overflow-hidden"
        }`}
      >
        <div className="min-h-0">
          <label className="block text-lg font-bold text-Primary pb-2 pt-2">
            Higher Education Level*
          </label>
          <label className="block text-sm font-sm text-Primary pb-2 pt-2 italic">
            {`Degree Pass, Bachelor's Honours, Postgraduate, Medical, Engineering,
            Marine, Marine Fisheries, Diploma, Qawmi & Alia Madrasa, Other
            Students - Choose Your Class`}
          </label>
          <div className="flex items-center border border-Primary rounded-lg">
            <FaRegCalendarAlt className="text-gray-600 ml-2" />
            <select
              name="currentLevel"
              value={formData.currentLevel === "N/A" ? "" : formData.currentLevel}
              onChange={handleChange}
              className="w-full p-2 focus:outline-none bg-transparent"
              required={isHigherThanClass10}
            >
              <option value="" disabled>
                Select one
              </option>
              {currentLevels.map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="pb-4">
        <label className="block text-lg font-bold text-Primary pb-2">
          Activities (Multiple Select)*
        </label>
        <p className="text-sm text-gray-600 mb-3 italic">
          Which of the following activities would you like to do with Faatiha
          Aayat?
        </p>
        <div className={`grid grid-cols-1 gap-3 border p-4 rounded-lg bg-white transition-colors ${stepError ? 'border-red-500 shadow-sm' : 'border-Primary'}`}>
          {activitiesOptions.map((option, index) => (
            <label
              key={index}
              className="flex items-start space-x-3 cursor-pointer p-2 rounded hover:bg-blue-50 transition-colors duration-200"
            >
              <input
                type="checkbox"
                checked={formData.activities?.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="w-5 h-5 mt-1 accent-Primary cursor-pointer"
              />
              <span className="text-md text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        {stepError && <p className="text-red-500 text-sm mt-2 font-medium">{stepError}</p>}
      </div>
      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition flex items-center gap-3"
        >
          <FaArrowLeft /> Back
        </button>
        <button
          type="submit"
          className="px-8 py-2 rounded-lg bg-Primary hover:bg-[#084264] text-white font-semibold transition flex items-center gap-3 shadow-md"
        >
          Next <FaArrowRight />
        </button>
      </div>
    </form>
  );
}