"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaVideo, FaLink, FaCheckCircle, FaClock, FaExclamationTriangle, FaEdit, FaLock, FaCalendarAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const UserVideoSubmission = () => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  
  // States
  const [videoLink, setVideoLink] = useState("");
  const [statusData, setStatusData] = useState(null);
  const [roundSettings, setRoundSettings] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [submissionState, setSubmissionState] = useState("loading");
  
  // 🔥 ১. ইউজারের রাউন্ড চেক করার জন্য নতুন স্টেট
  const [isRound2, setIsRound2] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
        router.push('/login');
        return;
    }

    // 🔥 ২. লোকাল স্টোরেজ থেকে ডাটা নিয়ে রাউন্ড ২ চেক করা
    const storedUser = JSON.parse(localStorage.getItem("user_data") || "{}");
    if (storedUser?.round_type === "round_2" || user?.round_type === "round_2") {
        setIsRound2(true);
    }

    // ইউজার আইডি পাওয়ার পর ডাটা ফেচ
    const userId = user?.id || user?.user_id || storedUser?.user_id;
    if (userId) {
      fetchData(userId, token);
    }
  }, [user, router]);

  // ২. ডাটা ফেচিং ফাংশন (🔥 Promise.all এর বদলে আলাদা কল করা হয়েছে যাতে একটি ফেইল করলে অন্যটি ক্র্যাশ না করে)
  const fetchData = async (userId, token) => {
    try {
      const API = process.env.NEXT_PUBLIC_API_URL;
      
      // প্রথমে সেটিংস ফেচ
      const settingsRes = await axios.get(`${API}/api/video/settings`, { headers: { Authorization: `Bearer ${token}` } });
      const settings = settingsRes.data.data;
      setRoundSettings(settings);
      checkTimeStatus(settings);

      // এরপর স্ট্যাটাস ফেচ
      try {
        const statusRes = await axios.get(`${API}/api/video/status/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
        setStatusData(statusRes.data);
        if (statusRes.data?.video_link) {
          setVideoLink(statusRes.data.video_link);
        }
      } catch (err) {
        console.log("No previous submission found."); // 404 আসলে ক্র্যাশ করবে না
      }

      setLoading(false);

    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // ৩. সময় চেক করার লজিক
  const checkTimeStatus = (settings) => {
    if (!settings || !settings.is_enabled) {
        setSubmissionState("disabled");
        return;
    }

    const now = new Date(); // ক্লায়েন্ট টাইম
    const start = new Date(settings.start_time);
    const end = new Date(settings.end_time);

    if (now < start) {
      setSubmissionState("upcoming");
    } else if (now > end) {
      setSubmissionState("expired");
    } else {
      setSubmissionState("active");
    }
  };

  // ৪. সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoLink) return Swal.fire("Error", "Please enter a valid video link", "warning");

    setIsSubmitting(true);
    const userId = user?.id || user?.user_id || JSON.parse(localStorage.getItem("user_data"))?.user_id;

    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/video/submit`,
        { user_id: userId, video_link: videoLink },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({
        title: "Success!",
        text: res.data.message,
        icon: "success",
        confirmButtonColor: "#4F46E5",
      });
      
      setIsEditing(false); // এডিট মোড অফ
      fetchData(userId, token); // ডাটা রিফ্রেশ

    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      Swal.fire("Failed", msg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ডেট ফরম্যাটার
  const formatDate = (dateString) => {
    if (!dateString) return "TBA";
    return new Date(dateString).toLocaleString('en-US', { 
      month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true 
    });
  };

  // ইনপুট কি এনাবল থাকবে? 
  const isInputEnabled = submissionState === "active" && (!statusData?.video_link || isEditing);

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-[24px] shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-10 -translate-y-10">
            <FaVideo size={150} />
          </div>
          <h2 className="text-3xl font-bold mb-2">Video Submission Round</h2>
          
          <div className="flex flex-wrap gap-4 mt-4 text-sm font-medium bg-white/10 p-3 rounded-xl backdrop-blur-sm inline-flex">
             <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-emerald-300" />
                <span>Starts: {formatDate(roundSettings?.start_time)}</span>
             </div>
             <div className="w-[1px] bg-white/30 hidden sm:block"></div>
             <div className="flex items-center gap-2">
                <FaClock className="text-red-300" />
                <span>Ends: {formatDate(roundSettings?.end_time)}</span>
             </div>
          </div>
        </div>

        <div className="p-8">
          
          {/* Status Messages */}
          {submissionState === "disabled" && (
             <div className="mb-6 p-4 bg-gray-100 text-gray-600 border border-gray-200 rounded-xl flex items-center gap-3">
                <FaLock />
                <span className="font-bold">Submission is currently disabled.</span>
             </div>
          )}
          
          {submissionState === "upcoming" && (
             <div className="mb-6 p-4 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl flex items-center gap-3">
                <FaLock />
                <span className="font-bold">Submission has not started yet.</span>
             </div>
          )}

          {submissionState === "expired" && (
             <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center gap-3">
                <FaLock />
                <span className="font-bold">Submission deadline has passed.</span>
             </div>
          )}

          {/* 🔥 ৩. Main Logic Block - রাউন্ড ২ না হলে ওয়ার্নিং, নাহলে ফর্ম */}
          {!isRound2 ? (
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 md:p-6 flex flex-col items-center text-center shadow-sm mt-4">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                <FaLock size={24} />
              </div>
              <h3 className="text-lg font-bold text-amber-800 mb-2">
                Submission Not Available
              </h3>
              <p className="text-sm text-amber-700 leading-relaxed max-w-lg font-medium">
                আপনার জন্য ভিডিও সাবমিশন এখনো এভেইলেবল না। দয়া করে আগে নির্দিষ্ট সময়ে কুইজ দিন এবং ২য় রাউন্ডের জন্য ভিডিও সাবমিট করার তারিখ আসা পর্যন্ত অপেক্ষা করুন।
              </p>
              <p className="text-xs text-amber-600 mt-3 max-w-lg">
                (Your video submission is not yet available. Please take the quiz first and wait until the video submission date arrives.)
              </p>
            </div>

          ) : statusData?.jury_score ? (
            
            <div className="text-center py-10">
              <div className="inline-block p-4 bg-indigo-50 rounded-full mb-4">
                <FaCheckCircle size={40} className="text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Evaluation Completed!</h3>
              <p className="text-gray-500 mt-2">Score: <span className="font-bold text-indigo-600 text-xl">{statusData.jury_score}/100</span></p>
              <p className="text-gray-600 mt-4 italic bg-gray-50 p-4 rounded-xl border border-gray-200 inline-block">"{statusData.jury_comments}"</p>
            </div>

          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-gray-700">Video URL (YouTube/FaceBook)</label>
                  {statusData?.video_link && submissionState === "active" && !isEditing && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="text-xs flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1 rounded-full transition border border-indigo-100"
                    >
                      <FaEdit /> Edit Link
                    </button>
                  )}
                </div>

                <div className="relative group">
                  <FaLink className={`absolute left-4 top-4 transition-colors ${isInputEnabled ? 'text-gray-400 group-focus-within:text-indigo-500' : 'text-gray-300'}`} />
                  <input
                    type="url"
                    placeholder={submissionState === "active" ? "https://youtu.be/..." : "Submission closed"}
                    required
                    disabled={!isInputEnabled}
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3.5 border rounded-xl outline-none transition-all font-medium ${isInputEnabled ? 'bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 text-gray-700' : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed select-none'}`}
                  />
                </div>

                {submissionState === "active" && (
                  <p className="text-xs text-gray-400 mt-2 ml-1 flex items-center gap-1">
                    <FaExclamationTriangle /> Ensure the link is publicly accessible.
                  </p>
                )}
              </div>

              {(submissionState === "active" && (!statusData?.video_link || isEditing)) ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Processing..." : statusData?.video_link ? "Update Submission" : "Submit Video"}
                </button>
              ) : (
                statusData?.video_link && (
                  <div className="w-full py-4 bg-emerald-50 text-emerald-600 font-bold rounded-xl border border-emerald-100 flex items-center justify-center gap-2">
                    <FaCheckCircle /> Submitted Successfully
                  </div>
                )
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserVideoSubmission;