"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function MyCourses() {
  const [activeTab, setActiveTab] = useState("course");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Local Storage থেকে ইউজারের ডাটা নেওয়া হচ্ছে
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("user_data");
      if (storedData) {
        setUserData(JSON.parse(storedData));
      }
    }
  }, []);

  // ইউজারের sdg_role অনুযায়ী কোর্সের তথ্য বের করার লজিক
  const getCourseDetails = (role) => {
    if (role === "SDG Activist") {
      return {
        title: "A Participant Guide of the UN Climate Change Process",
        link: "https://unccelearn.org/course/view.php?id=174&page=overview",
        desc: "Class 5 to Class 8 (or equivalent) - (SDG 1 to SDG 4)",
      };
    } else if (role === "SDG Ambassador") {
      return {
        title: "Convention on Long-range Transboundary Air Pollution",
        link: "https://unccelearn.org/course/view.php?id=150&page=overview",
        desc: "Class 9 to University Admission Candidate (or equivalent) - (SDG 5 to SDG 10)",
      };
    } else if (role === "SDG Achiever") {
      return {
        title: "Climate Change International Legal Regime",
        link: "https://unccelearn.org/course/view.php?id=68&page=overview&lang=en",
        desc: "University & Diploma (or equivalent) - (SDG 11 to SDG 17)",
      };
    }
    return null;
  };

  const courseDetails = userData ? getCourseDetails(userData.sdg_role) : null;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Learning</h2>

      {/* Tabs */}
      <div role="tablist" className="tabs tabs-boxed bg-gray-50 p-1 mb-6 inline-flex">
        <a
          role="tab"
          className={`tab px-6 py-2 rounded-lg font-medium transition-all ${
            activeTab === "course" ? "bg-Primary text-white" : "text-gray-600 hover:text-Primary"
          }`}
          onClick={() => setActiveTab("course")}
        >
          My Course
        </a>
        <a
          role="tab"
          className={`tab px-6 py-2 rounded-lg font-medium transition-all ${
            activeTab === "guide" ? "bg-Primary text-white" : "text-gray-600 hover:text-Primary"
          }`}
          onClick={() => setActiveTab("guide")}
        >
          Video Guide
        </a>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "course" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {courseDetails ? (
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
                
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold tracking-wide mb-4">
                  {userData?.sdg_role || "Participant"}
                </span>
                
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  {courseDetails.title}
                </h3>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                  {courseDetails.desc}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link prefetch={false} href={courseDetails.link} target="_blank" rel="noopener noreferrer">
                    <button className="btn-primary w-full sm:w-auto">
                      Start Course Now
                    </button>
                  </Link>
                </div>
                
                <p className="text-xs text-gray-500 mt-6">
                  * Note: Your Round 1 MCQ exam questions will be based on this course. Upon completion, you will receive a UN certificate.
                </p>
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-xl">
                <span className="loading loading-spinner text-Primary"></span>
                <p className="text-gray-500 mt-2">Loading your course details...</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "guide" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How to Complete the UN Course</h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                If you face any difficulties registering or navigating the UN CC:Learn platform, please watch this detailed step-by-step guide video.
              </p>
              
              {/* Responsive YouTube Video */}
              <div className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg border border-gray-200 aspect-video bg-black">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/zOmotLWToLY?si=nxs-4nFw-BWxEkgO"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}