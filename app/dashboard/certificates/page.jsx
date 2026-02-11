"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import CertificateCard from './Components/CertificateCard'; 
import Link from 'next/link';
import { FiAlertCircle, FiArrowRight } from 'react-icons/fi';

export default function CertificatePage() {
  // Redux থেকে ইউজার ডাটা আনা হচ্ছে
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
            <span className="loading loading-spinner loading-lg text-indigo-600"></span>
            <p className="animate-pulse font-bold text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] text-center p-6">
        <h2 className="text-2xl font-bold text-slate-400 mb-4">User data not found</h2>
        <Link href="/login" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Please Login Again
        </Link>
      </div>
    );
  }

  // 🔥 আপনার নতুন যোগ করা কলাম 'is_participated' দিয়ে চেক
  const hasParticipated = user.is_participated;

  // ❌ যদি কুইজ না দিয়ে থাকে (এই পার্টটি ইউজার দেখবে)
  if (!hasParticipated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 max-w-lg w-full">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiAlertCircle className="text-4xl text-orange-500" />
            </div>
            
            <h2 className="text-3xl font-black text-slate-800 mb-3">Locked! 🔒</h2>
            
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                Hey <strong>{user.name.split(' ')[0]}</strong>! You haven't participated in the quiz yet. 
                Complete your quiz to unlock this achievement certificate! 🚀
            </p>

            <Link href="/dashboard/quiz">
                <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200">
                    Go to Quiz Arena <FiArrowRight />
                </button>
            </Link>
        </div>
      </div>
    );
  }

  // ✅ যদি কুইজ দিয়ে থাকে (সার্টিফিকেট শো করবে)
  const userId = user.user_id || "0000";
  const shortId = userId.toString().length > 8 ? userId.toString().slice(-6).toUpperCase() : userId.toString().padStart(4, '0');
  const certificateId = `ZO-26-R1-${shortId}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 font-sans">
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
            <h1 className="text-3xl font-black text-slate-800 mb-2">My Certificates</h1>
            <p className="text-slate-500">You've successfully completed the challenge. Well done!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CertificateCard 
                userName={user.name || "Participant"} 
                date={new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} 
                validationId={certificateId} 
            />
        </div>
      </div>
    </div>
  );
}