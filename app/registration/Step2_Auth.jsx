"use client";
import React from "react";
import { FaArrowLeft, FaArrowRight, FaBookOpen, FaListAlt, FaRegCalendarAlt, FaRunning } from "react-icons/fa";

export default function Step2_Academic({ formData, updateFormData, nextStep, prevStep }) {
    const educationTypes = [
        "বাংলা মাধ্যম (বাংলা ও ইংরেজি ভার্সন)",
        "ইংরেজি মাধ্যম (IGCSE & IB)",
        "মাদ্রাসা (আলিয়া ও কওমি)",
        "উচ্চ শিক্ষা (বিশ্ববিদ্যালয় ও সমমান)",
        "ভোকেশনাল, ডিপ্লোমা ও অন্যান্য কারিগরি শিক্ষা",
        "একটি নয়",
    ];

    const gradeLevels = [
        "পঞ্চম শ্রেণী, Grade 5",
        "ষষ্ঠ শ্রেণী, Grade 6",
        "সপ্তম শ্রেণী, Grade 7",
        "অষ্টম শ্রেণী, Grade 8",
        "নবম শ্রেণী, Grade 9",
        "দশম শ্রেণী, Grade 10",
        "এসএসসি পরিক্ষার্থী, O Level Candidate",
        "একাদশ শ্রেণী, Grade 11",
        "দ্বাদশ শ্রেণী, Grade 12",
        "এইচএসসি পরিক্ষার্থী, A Level Candidate",
        "একটিও নয়",
    ];

    const currentLevels = [
        "১ম বর্ষ / 1st Year",
        "২য় বর্ষ / 2nd Year",
        "৩য় বর্ষ / 3rd Year",
        "৪র্থ বর্ষ / 4th Year",
        "Masters / মাষ্টার্স",
        "ডিপ্লোমা",
        "একটিও নয়",
    ];

    const activities = [
        "ক্যাম্পাস অ্যাম্বাসেডর হিসেবে রেজিস্ট্রেশন কালেক্ট করা, জাতিসংঘ থেকে প্রদত্ত কোর্সের উপর অনলাইন ও অফলাইনে পাঠচক্র পরিচালনা করা ইত্যাদি কাজ করতে চাই",
        "ঢাকায় গ্র্যান্ড ফিনালে অনুষ্ঠানে ইভেন্ট ম্যানেজমেন্টের কাজ করতে চাই",
        "জিরো অলিম্পিয়াডে শুধুমাত্র প্রতিযোগী হিসেবে অংশ নিতে চাই",
    ];

    const handleChange = (e) => {
        updateFormData({ [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={nextStep} className="space-y-6">
            {/* Education Type */}
            <div className="pb-4">
                <label className="block text-md font-medium text-Primary pb-2">Education Type *</label>
                <div className="flex items-center border border-Primary rounded-lg">
                    <FaBookOpen className="text-gray-600 ml-2" />
                    <select
                        name="educationType"
                        value={formData.educationType}
                        onChange={handleChange}
                        className="w-full p-2 text-md focus:outline-none"
                        required
                    >
                        <option value="" disabled>Select one</option>
                        {educationTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Grade Level */}
            <div className="pb-4">
                <label className="block text-md font-medium text-Primary pb-2">Grade Level *</label>
                <div className="flex items-center border border-Primary rounded-lg">
                    <FaListAlt className="text-gray-600 ml-2" />
                    <select
                        name="gradeLevel"
                        value={formData.gradeLevel}
                        onChange={handleChange}
                        className="w-full p-2 text-md  border-Primary focus:outline-none"
                        required
                    >
                        <option value="" disabled>Select one</option>
                        {gradeLevels.map((level, index) => (
                            <option key={index} value={level}>
                                {level}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Current Level */}
            {(formData.gradeLevel !== "পঞ্চম শ্রেণী, Grade 5" &&
                formData.gradeLevel !== "ষষ্ঠ শ্রেণী, Grade 6" &&
                formData.gradeLevel !== "সপ্তম শ্রেণী, Grade 7" &&
                formData.gradeLevel !== "অষ্টম শ্রেণী, Grade 8" &&
                formData.gradeLevel !== "নবম শ্রেণী, Grade 9" &&
                formData.gradeLevel !== "দশম শ্রেণী, Grade 10") && (
                    <div className="pb-4">
                        <label className="block text-md font-medium text-Primary pb-2">Current Level *</label>
                        <div className="flex items-center border border-Primary rounded-lg">
                            <FaRegCalendarAlt className="text-gray-600 ml-2" />
                            <select
                                name="currentLevel"
                                value={formData.currentLevel}
                                onChange={handleChange}
                                className="w-full p-2 text-md  border-Primary focus:outline-none"
                                required
                            >
                                <option value="" disabled>Select one</option>
                                {currentLevels.map((level, index) => (
                                    <option key={index} value={level}>
                                        {level}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

            {/* Activities for students in Grade 9 or above */}
            {(formData.gradeLevel === "নবম শ্রেণী, Grade 9" ||
                formData.gradeLevel === "দশম শ্রেণী, Grade 10" ||
                formData.gradeLevel === "একাদশ শ্রেণী, Grade 11" ||
                formData.gradeLevel === "দ্বাদশ শ্রেণী, Grade 12" ||
                formData.gradeLevel === "এসএসসি পরিক্ষার্থী, O Level Candidate" ||
                formData.gradeLevel === "এইচএসসি পরিক্ষার্থী, A Level Candidate") && (
                    <div className="pb-4">
                        <label className="block text-md font-medium text-Primary pb-2">Activities *</label>
                        <div className="flex items-center border border-Primary rounded-lg px-2">
                            <FaRunning className="text-primary-600" size={16} />
                            <select
                            name="activity"
                            value={formData.activity}
                            onChange={handleChange}
                            className="w-full p-2 text-md rounded-lg  focus:outline-none"
                            required
                        >
                            <option value="" disabled>Select one</option>
                            {activities.map((activity, index) => (
                                <option key={index} value={activity}>
                                    {activity} 
                                </option>
                            ))}

                        </select>

                        </div>
                        
                    </div>
                )}

            <div className="flex justify-between mt-6">
                <button
                    type="button"
                    onClick={prevStep}
                    className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 flex justify-center items-center gap-3"
                >
                    <FaArrowLeft className="text-primary-600" size={16} />  Back
                </button>
                <button type="submit" className="px-5 py-2 rounded-lg bg-Primary hover:bg-[#0A4F78] text-white flex justify-center items-center gap-3">
                    Next <FaArrowRight className="text-primary-600" size={16} />
                </button>
            </div>
        </form>
    );
}
