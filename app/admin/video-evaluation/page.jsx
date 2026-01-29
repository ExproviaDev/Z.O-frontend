"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { FiVideo, FiStar, FiMessageSquare, FiSearch, FiFilter, FiExternalLink } from 'react-icons/fi';

const VideoEvaluation = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterSdg, setFilterSdg] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  // ১. ডাটা লোড করা
  useEffect(() => {
    fetchSubmissions();
  }, [filterSdg]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;

      const res = await axios.get(`${baseUrl}/api/admin/round2-submissions?sdg_number=${filterSdg}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubmissions(res.data);
    } catch (err) {
      toast.error("ডাটা লোড করতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  // ২. স্কোর এবং কমেন্ট আপডেট করা
  const handleScoreUpdate = async (id, score, comments) => {
    setUpdatingId(id);
    try {
      const token = localStorage.getItem('access_token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;

      await axios.put(`${baseUrl}/api/admin/submit-score`, {
        submission_id: id,
        score,
        comments
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("মার্ক সফলভাবে সেভ হয়েছে!");
      fetchSubmissions(); // রিফ্রেশ ডাটা
    } catch (err) {
      toast.error("আপডেট করা সম্ভব হয়নি!");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-[#f8f9fa] min-h-screen">
      <Toaster position="top-right" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600 rounded-xl shadow-lg text-white">
            <FiVideo size={24} />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-gray-800">Video Evaluation</h1>
            <p className="text-xs text-gray-500 font-medium">রাউন্ড ২-এর ভিডিওগুলো যাচাই ও মার্কিং করুন</p>
          </div>
        </div>

        {/* SDG ফিল্টার */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
          <FiFilter className="text-gray-400 ml-2" />
          <select
            className="bg-transparent outline-none text-sm font-semibold text-gray-600 pr-4"
            value={filterSdg}
            onChange={(e) => setFilterSdg(e.target.value)}
          >
            <option value="">All SDGs</option>
            {[...Array(17)].map((_, i) => (
              <option key={i + 1} value={i + 1}>SDG {i + 1}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ডাটা টেবিল */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Participant Info</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Video Link</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Score (Out of 100)</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Comments</th>
                <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="5" className="p-10 text-center font-medium text-gray-500">ডাটা লোড হচ্ছে...</td></tr>
              ) : submissions.length === 0 ? (
                <tr><td colSpan="5" className="p-10 text-center font-medium text-gray-500">কোনো ভিডিও সাবমিশন পাওয়া যায়নি।</td></tr>
              ) : (
                submissions.map((row) => (
                  <tr key={row.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-5">
                      <p className="font-bold text-gray-800">{row.user_profiles?.name}</p>
                      <p className="text-xs text-gray-400 font-medium">{row.user_profiles?.institution}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">
                        SDG {row.user_profiles?.assigned_sdg_number}
                      </span>
                    </td>
                    <td className="p-5">
                      <a
                        href={row.video_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:underline"
                      >
                        <FiExternalLink /> Watch Video
                      </a>
                    </td>
                    <td className="p-5">
                      <div className="relative flex items-center bg-gray-50 rounded-lg border border-gray-100">
                        <FiStar className="ml-3 text-amber-400" />
                        <input
                          type="number"
                          defaultValue={row.jury_score || ''}
                          onBlur={(e) => row.temp_score = e.target.value}
                          className="w-20 p-2 bg-transparent outline-none text-sm font-bold text-gray-700"
                          placeholder="00"
                        />
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center bg-gray-50 rounded-lg border border-gray-100">
                        <FiMessageSquare className="ml-3 text-gray-400" />
                        <input
                          type="text"
                          defaultValue={row.jury_comments || ''}
                          onBlur={(e) => row.temp_comments = e.target.value}
                          className="w-full p-2 bg-transparent outline-none text-sm text-gray-600"
                          placeholder="Add feedback..."
                        />
                      </div>
                    </td>
                    <td className="p-5">
                      <button
                        onClick={() => handleScoreUpdate(row.id, row.temp_score || row.jury_score, row.temp_comments || row.jury_comments)}
                        disabled={updatingId === row.id}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md disabled:opacity-50 transition-all"
                      >
                        {updatingId === row.id ? 'Saving...' : 'Submit'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VideoEvaluation;