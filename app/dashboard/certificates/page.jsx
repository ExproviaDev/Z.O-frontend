"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import CertificateCard from './Components/CertificateCard'; 
import Link from 'next/link';
// 🔥 Next.js এর Image কম্পোনেন্ট ইমপোর্ট করা হলো
import Image from 'next/image'; 
import { FiAlertCircle, FiArrowRight } from 'react-icons/fi';

export default function CertificatePage() {
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

  const hasParticipated = user.is_participated;

  if (!hasParticipated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 max-w-lg w-full">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiAlertCircle className="text-4xl text-orange-500" />
            </div>
            
            <h2 className="text-3xl font-black text-slate-800 mb-3">Locked! 🔒</h2>
            
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                Hey <strong>{user?.name?.split(' ')[0] || 'Participant'}</strong>! You haven't participated in the quiz yet. 
                Complete your quiz to unlock this achievement certificate! 🚀
            </p>

            <Link href="/dashboard/quizzes">
                <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200">
                    Go to Quiz Arena <FiArrowRight />
                </button>
            </Link>
        </div>
      </div>
    );
  }

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

        {/* --- 🔥 Malaysia Bootcamp Promo Section --- */}
        <div className="mt-16 bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-slate-200 flex flex-col md:flex-row gap-8 items-center overflow-hidden relative">
            
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            {/* Left Side: Next.js Optimized Image */}
            <div className="w-full md:w-1/2 relative z-10">
                {/* 🔥 Next.js Image Component ব্যবহার করা হয়েছে */}
                <Image 
                    src="/bootcamp-poster.jpg" 
                    alt="Bootcamp in Malaysia" 
                    width={800} 
                    height={500} 
                    quality={90}
                    className="w-full h-auto rounded-2xl shadow-md object-cover border border-slate-100"
                />
            </div>

            {/* Right Side: Details & Button */}
            <div className="w-full md:w-1/2 flex flex-col justify-center relative z-10">
                <div className="inline-block bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 w-max">
                    Special Opportunity
                </div>
                
                <h2 className="text-3xl font-black text-slate-800 mb-2 leading-tight">
                    Bootcamp in Malaysia 🇲🇾
                </h2>
                
                <p className="text-slate-600 text-[15px] mb-5 font-medium leading-relaxed">
                    Join us at <span className="text-indigo-600 font-bold">Asia Pacific University (APU)</span> on 10-12 July. Only participants are eligible to apply!
                </p>

                <div className="flex flex-col gap-2 mb-8 text-sm text-slate-700 font-medium">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs">✓</span> 
                        Poster Presentation & Panel Discussion
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs">✓</span> 
                        Workshop, Seminar & Debate Competition
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs">✓</span> 
                        City Tour & Excursion
                    </div>
                </div>

                <a 
                    href="https://forms.gle/YOUR_GOOGLE_FORM_LINK_HERE" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-indigo-600 transition-colors active:scale-95 shadow-lg text-lg group"
                >
                    Apply Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
        </div>

      </div>
    </div>
  );
}