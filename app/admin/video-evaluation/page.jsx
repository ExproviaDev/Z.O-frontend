"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import {
  FiVideo, FiStar, FiMessageSquare, FiFilter,
  FiExternalLink, FiCheckCircle, FiClock, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';

const VideoEvaluation = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Pagination State
  const [filterSdg, setFilterSdg] = useState('');
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'evaluated'
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatingId, setUpdatingId] = useState(null);

  // ডাটা রি-ফেচ হবে যখনই কোনো ফিল্টার বা পেজ চেঞ্জ হবে
  useEffect(() => {
    fetchSubmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSdg, activeTab, page]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;

      const res = await axios.get(`${baseUrl}/api/admin/round2-submissions`, {
        params: {
          sdg_number: filterSdg,
          status: activeTab,
          page: page,
          limit: 10
        },
        headers: { Authorization: `Bearer ${token}` }
      });

      setSubmissions(res.data.data);
      setTotalPages(Math.ceil(res.data.total / 10));
    } catch (err) {
      console.error(err);
      toast.error("ডাটা লোড করতে সমস্যা হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  const handleScoreUpdate = async (id, score, comments) => {
    if (!score) return toast.error("অনুগ্রহ করে স্কোর দিন");
    if (score > 100 || score < 0) return toast.error("স্কোর ০-১০০ এর মধ্যে হতে হবে");

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

      toast.success(activeTab === 'pending' ? "মার্ক সাবমিট হয়েছে!" : "মার্ক আপডেট হয়েছে!");
      fetchSubmissions(); // লিস্ট রিফ্রেশ
    } catch (err) {
      toast.error("আপডেট করা সম্ভব হয়নি!");
    } finally {
      setUpdatingId(null);
    }
  };

  // Tab Button Component
  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => { setActiveTab(id); setPage(1); }} // ট্যাব চেঞ্জ হলে পেজ ১ এ যাবে
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === id
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
          : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
        }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="p-4 md:p-8 bg-[#f8f9fa] min-h-screen">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Video Evaluation</h1>
          <p className="text-gray-500 font-medium mt-1">Review round 2 submissions and assign scores.</p>
        </div>

        {/* SDG Filter */}
        <div className="bg-white p-1 rounded-xl border border-gray-200 shadow-sm flex items-center">
          <div className="px-3 text-gray-400"><FiFilter /></div>
          <select
            className="bg-transparent outline-none text-sm font-bold text-gray-700 py-2 pr-4 cursor-pointer"
            value={filterSdg}
            onChange={(e) => { setFilterSdg(e.target.value); setPage(1); }}
          >
            <option value="">All SDG Categories</option>
            {[...Array(17)].map((_, i) => (
              <option key={i + 1} value={i + 1}>SDG {i + 1}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 mb-6">
        <TabButton id="pending" label="Pending Review" icon={FiClock} />
        <TabButton id="evaluated" label="Marked & Completed" icon={FiCheckCircle} />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="p-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Participant</th>
                <th className="p-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">Submission</th>
                <th className="p-6 text-[11px] font-black text-gray-400 uppercase tracking-widest w-32">Score (0-100)</th>
                <th className="p-6 text-[11px] font-black text-gray-400 uppercase tracking-widest w-1/3">Feedback</th>
                <th className="p-6 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="5" className="p-12 text-center text-indigo-600 font-bold animate-pulse">Loading Submissions...</td></tr>
              ) : submissions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center opacity-50">
                      <FiVideo size={48} className="mb-4 text-gray-300" />
                      <p className="font-bold text-gray-500">No videos found in this category.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                submissions.map((row) => (
                  <tr key={row.id} className="group hover:bg-blue-50/30 transition-colors">
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800 text-sm">{row.user_profiles?.name}</span>
                        <span className="text-xs text-gray-400 mb-1">{row.user_profiles?.institution}</span>
                        <span className="inline-flex w-fit items-center px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase tracking-wide">
                          SDG {row.user_profiles?.assigned_sdg_number}
                        </span>
                      </div>
                    </td>
                    <td className="p-6">
                      <a
                        href={row.video_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-colors"
                      >
                        <FiExternalLink /> Watch Video
                      </a>
                    </td>
                    <td className="p-6">
                      <div className="relative flex items-center bg-white rounded-xl border border-gray-200 focus-within:border-indigo-500 focus-within:ring-2 ring-indigo-100 transition-all">
                        <FiStar className="absolute left-3 text-amber-400" />
                        <input
                          type="number"
                          defaultValue={row.jury_score || ''}
                          // আমরা অন-চেঞ্জ হ্যান্ডলার ব্যবহার করছি না, সরাসরি সাবমিটে পাঠাবো অথবা onBlur এ টেম্প ডাটা রাখব
                          onBlur={(e) => row.temp_score = e.target.value}
                          className="w-full pl-9 p-2.5 bg-transparent outline-none text-sm font-bold text-gray-700 rounded-xl"
                          placeholder="00"
                          min="0" max="100"
                        />
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="relative flex items-center bg-white rounded-xl border border-gray-200 focus-within:border-indigo-500 focus-within:ring-2 ring-indigo-100 transition-all">
                        <FiMessageSquare className="absolute left-3 text-gray-400" />
                        <input
                          type="text"
                          defaultValue={row.jury_comments || ''}
                          onBlur={(e) => row.temp_comments = e.target.value}
                          className="w-full pl-9 p-2.5 bg-transparent outline-none text-sm text-gray-600 rounded-xl"
                          placeholder="Write constructive feedback..."
                        />
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <button
                        onClick={() => handleScoreUpdate(row.id, row.temp_score || row.jury_score, row.temp_comments || row.jury_comments)}
                        disabled={updatingId === row.id}
                        className={`px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all active:scale-95 ${activeTab === 'pending'
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                          }`}
                      >
                        {updatingId === row.id ? 'Saving...' : activeTab === 'pending' ? 'Submit' : 'Update'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
          <p className="text-xs font-bold text-gray-400">
            Showing Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              <FiChevronLeft className="text-gray-600" />
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              <FiChevronRight className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoEvaluation;