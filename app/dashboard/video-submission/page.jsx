"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaVideo, FaLink, FaCheckCircle, FaClock, FaExclamationTriangle } from "react-icons/fa";
import { useSelector } from "react-redux";

const UserVideoSubmission = () => {
  const { user } = useSelector((state) => state.auth);
  const [videoLink, setVideoLink] = useState("");
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ১. বর্তমান স্ট্যাটাস চেক করা (আগে সাবমিট করেছে কি না)
  useEffect(() => {
    if (user?.id) {
      fetchStatus();
    }
  }, [user]);

  const fetchStatus = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/video/status/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatusData(res.data);
      if (res.data?.video_link) setVideoLink(res.data.video_link);
    } catch (error) {
      console.error("Status fetch error", error);
    }
  };

  // ২. ভিডিও সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoLink) return Swal.fire("Error", "Please enter a valid video link", "warning");

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/video/submit`,
        { user_id: user.id, video_link: videoLink },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({
        title: "Success!",
        text: res.data.message,
        icon: "success",
        confirmButtonColor: "#4F46E5",
      });
      fetchStatus(); // রিফ্রেশ ডাটা
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      Swal.fire("Failed", msg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-[24px] shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-10 -translate-y-10">
            <FaVideo size={150} />
          </div>
          <h2 className="text-3xl font-bold mb-2">Video Submission Round</h2>
          <p className="text-blue-100">Submit your project video link before the deadline.</p>
        </div>

        <div className="p-8">
          {/* Status Alert */}
          {statusData?.status === "pending" && (
            <div className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 mb-6">
              <FaCheckCircle size={20} />
              <div>
                <p className="font-bold">Submission Received!</p>
                <p className="text-sm">You can update the link until the deadline.</p>
              </div>
            </div>
          )}

          {statusData?.jury_score ? (
            // যদি রেজাল্ট দিয়ে দেয়
            <div className="text-center py-10">
               <div className="inline-block p-4 bg-indigo-50 rounded-full mb-4">
                 <FaCheckCircle size={40} className="text-indigo-600" />
               </div>
               <h3 className="text-2xl font-bold text-gray-800">Evaluation Completed!</h3>
               <p className="text-gray-500 mt-2">Your video has been reviewed by the jury.</p>
               <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-200 inline-block text-left w-full">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">Jury Feedback</p>
                  <p className="text-gray-700 mt-1 italic">"{statusData.jury_comments || "No comments"}"</p>
                  <div className="mt-4 flex justify-between items-center border-t border-gray-200 pt-4">
                     <span className="font-bold text-gray-600">Score Achieved:</span>
                     <span className="text-2xl font-black text-indigo-600">{statusData.jury_score}/100</span>
                  </div>
               </div>
            </div>
          ) : (
            // সাবমিশন ফর্ম
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Video URL (YouTube/Drive)</label>
                <div className="relative group">
                  <FaLink className="absolute left-4 top-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="url"
                    placeholder="https://youtu.be/..."
                    required
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium text-gray-700 placeholder-gray-400"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2 ml-1 flex items-center gap-1">
                  <FaExclamationTriangle /> Ensure the link is publicly accessible.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    {statusData?.video_link ? "Update Submission" : "Submit Video"} <FaClock />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserVideoSubmission;