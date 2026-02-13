"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  FiVideo, FiStar, FiMessageSquare, FiFilter,
  FiExternalLink, FiCheckCircle, FiClock, FiChevronLeft, FiChevronRight, FiEdit
} from 'react-icons/fi';

const MySwal = withReactContent(Swal);

const CRITERIA_LIST = [
  "Content Relevance",
  "Creativity and Innovation",
  "Clarity and Communication",
  "Impact and Call to Action",
  "Presentation and Visual Appeal",
  "Technical Quality",
  "Research and Data Usage",
  "Engagement and Storytelling",
  "Inclusivity and Diversity",
  "Overall Learning and Execution"
];

const VideoEvaluation = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Pagination State
  const [filterSdg, setFilterSdg] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchSubmissions();
    
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

  const openEvaluationModal = (submission) => {
    let initialScores = {};
    if (submission.score_details) {
      initialScores = typeof submission.score_details === 'string' 
        ? JSON.parse(submission.score_details) 
        : submission.score_details;
    } else {
      CRITERIA_LIST.forEach(c => initialScores[c] = 0);
    }

    let currentComment = submission.jury_comments || "";

    MySwal.fire({
      title: <h3 className="text-xl font-bold text-gray-800">Evaluate Submission</h3>,
      html: (
        <EvaluationForm 
          initialScores={initialScores} 
          initialComment={currentComment}
          onSubmit={(scores, total, comment) => handleFinalSubmit(submission.id, scores, total, comment)}
        />
      ),
      showConfirmButton: false, 
      showCloseButton: true,
      width: '800px',
      padding: '2em',
      background: '#fff',
      backdrop: `rgba(0,0,123,0.4)`
    });
  };

  const EvaluationForm = ({ initialScores, initialComment, onSubmit }) => {
    const [scores, setScores] = useState(initialScores);
    const [comment, setComment] = useState(initialComment);
    const [total, setTotal] = useState(0);

    useEffect(() => {
      const sum = Object.values(scores).reduce((a, b) => parseFloat(a || 0) + parseFloat(b || 0), 0);
      setTotal(sum);
    }, [scores]);

    const handleChange = (criteria, value) => {
      let val = parseFloat(value);
      if (val > 10) val = 10;
      if (val < 0) val = 0;
      setScores({ ...scores, [criteria]: val });
    };

    return (
      <div className="text-left mt-4">
        <p className="mb-4 text-sm text-gray-500 bg-blue-50 p-3 rounded-lg border border-blue-100">
          ℹ️ <strong>Instructions for Jury:</strong> Please rate each criterion out of 10. Total score (out of 100) will be calculated automatically.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {CRITERIA_LIST.map((criteria, index) => (
            <div key={index} className="flex flex-col gap-1 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">{criteria}</label>
              <input
                type="number"
                min="0" max="10"
                value={scores[criteria] || ''}
                onChange={(e) => handleChange(criteria, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 ring-indigo-200 outline-none text-sm font-bold"
                placeholder="0-10"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
           <label className="block text-sm font-bold text-gray-700 mb-2">Feedback / Comments</label>
           <textarea
             rows="3"
             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 ring-indigo-200 outline-none text-sm"
             placeholder="Write constructive feedback for the participant..."
             value={comment}
             onChange={(e) => setComment(e.target.value)}
           ></textarea>
        </div>

        <div className="flex items-center justify-between mt-6 bg-gray-100 p-4 rounded-xl">
          <div>
            <span className="text-gray-500 text-sm font-bold">Total Score</span>
            <div className="text-3xl font-black text-indigo-600">{total} <span className="text-base text-gray-400">/ 100</span></div>
          </div>
          <button
            onClick={() => onSubmit(scores, total, comment)}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95"
          >
            Confirm & Submit
          </button>
        </div>
      </div>
    );
  };

  // --- ফাইনাল সাবমিট হ্যান্ডলার (API Call) ---
  const handleFinalSubmit = async (id, scores, total, comment) => {
    try {
      // লোডিং এলার্ট
      MySwal.fire({
        title: 'Submitting...',
        didOpen: () => Swal.showLoading(),
        allowOutsideClick: false
      });

      const token = localStorage.getItem('access_token');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;

      await axios.put(`${baseUrl}/api/admin/submit-score`, {
        submission_id: id,
        score_details: scores, 
        total_score: total,     
        comments: comment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // সাকসেস এলার্ট
      MySwal.fire({
        icon: 'success',
        title: activeTab === 'pending' ? 'Evaluation Submitted!' : 'Evaluation Updated!',
        text: `Total Score: ${total}/100`,
        confirmButtonColor: '#4F46E5',
        timer: 2000
      });

      fetchSubmissions(); 
    } catch (err) {
      console.error(err);
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while submitting marks.',
      });
    }
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => { setActiveTab(id); setPage(1); }}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === id
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
          : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
        }`}
    >
      <Icon size={26} />
      {label}
    </button>
  );

  return (
    <div className="p-4 bg-[#f8f9fa] min-h-screen">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Video Evaluation</h1>
          <p className="text-gray-500 font-medium mt-1">Review round 2 submissions and assign detailed scores.</p>
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
      <div className="flex flex-col items-start gap-4 mb-6 text-xs">
        <TabButton id="pending" label="Pending Review" icon={FiClock}  />
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
                <th className="p-6 text-[11px] font-black text-gray-400 uppercase tracking-widest w-32 text-center">Total Score</th>
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
                    <td className="p-6 text-center">
                       {row.jury_score ? (
                         <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-sm font-black border border-amber-100">
                           <FiStar className="fill-amber-500 text-amber-500" /> {row.jury_score}
                         </span>
                       ) : (
                         <span className="text-gray-300 font-bold text-2xl">-</span>
                       )}
                    </td>
                    <td className="p-6">
                      <p className="text-sm text-gray-500 line-clamp-2 italic">
                        {row.jury_comments || "No feedback given yet..."}
                      </p>
                    </td>
                    <td className="p-6 text-right">
                      <button
                        onClick={() => openEvaluationModal(row)}
                        className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all active:scale-95 ${activeTab === 'pending'
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
                          }`}
                      >
                        {activeTab === 'pending' ? (
                            <>Evaluate <FiChevronRight /></>
                        ) : (
                            <><FiEdit /> Edit Score</>
                        )}
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