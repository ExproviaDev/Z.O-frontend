"use client";

import React from 'react';
import { Toaster, toast } from 'react-hot-toast';
import CertificateCard from './Components/CertificateCard';
import Link from 'next/link';
import { FiAlertCircle, FiArrowRight } from 'react-icons/fi';
import { useUserProfile } from "../../lib/hooks/useUserProfile";

export default function CertificatePage() {
  const { data: user, isLoading: loading } = useUserProfile();

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

  const hasParticipated = !!user.is_participated;
  const normalizedRoundType = String(user?.round_type || "").toLowerCase().replace(/\s+/g, "_");
  const isRound2OrAbove = normalizedRoundType.includes("round_2") || normalizedRoundType.includes("round_3");

  // Show locked page only when the user has no certificates at all
  if (!hasParticipated && !isRound2OrAbove) {
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
  const round1CertificateId = `ZO-26-R1-${shortId}`;
  const fellowshipCertificateId = `ZO-26-FEL-${shortId}`;
  const promotionCertificateId = `ZO-26-R2P-${shortId}`;
  const gltsPromoCode = "ZOPART";

  const copyPromoCode = async () => {
    try {
      await navigator.clipboard.writeText(gltsPromoCode);
      toast.success("Promo code copied!");
    } catch (error) {
      toast.error("Could not copy promo code.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-10 font-sans">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
            <h1 className="text-3xl font-black text-slate-800 mb-2">Certificates and Achievement</h1>
            <p className="text-slate-500">
              You've successfully completed the challenge. You can collect your participation certificates here.
            </p>
        </div>

        {/* GLTS Participant Voucher Card — top of page */}
        <div className="mb-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
          <div className="grid grid-cols-1 items-stretch md:grid-cols-[1fr_1.4fr]">
            {/* GLTS image */}
            <div className="relative min-h-[240px] md:min-h-[300px]">
              <img
                src="/src/image/glts.jpeg"
                alt="GLTS Program"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center gap-5 p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-red-50 px-4 py-1.5 text-[11px] font-black uppercase tracking-wider text-red-600">
                  Exclusive Offer
                </span>
                <span className="rounded-full bg-emerald-50 px-4 py-1.5 text-[11px] font-black uppercase tracking-wider text-emerald-600">
                  80% OFF
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-800 md:text-[26px] leading-tight">GLTS Promo Benefit</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                  As a Zero Olympiad participant, you are eligible for an exclusive GLTS discount voucher.
                  Use the promo code below while enrolling in GLTS.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">Your Promo Code</p>
                  <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3">
                    <p className="text-2xl font-black tracking-[0.2em] text-indigo-700">{gltsPromoCode}</p>
                  </div>
                </div>
                <button
                  onClick={copyPromoCode}
                  className="mt-5 self-end rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-600 active:scale-95"
                >
                  Copy Code
                </button>
              </div>

              <a
                href="https://glts.faatihaaayat.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F172A] py-3 text-sm font-bold text-white transition hover:bg-indigo-700 active:scale-95"
              >
                Visit GLTS Platform <FiArrowRight />
              </a>
            </div>
          </div>
        </div>

        {/* Global Leadership Summit — registration */}
        <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
          <div className="relative grid grid-cols-1 items-stretch md:grid-cols-[0.95fr_1.05fr]">
            <div className="h-[280px] md:h-full min-h-[220px]">
              <img
                src="/src/image/malaysia-summit.jpg"
                alt="Global Leadership Summit"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-5 md:p-7">
              <div className="mb-3 inline-block w-max rounded-full bg-red-50 px-4 py-1.5 text-[11px] font-black uppercase tracking-wider text-red-600">
                Global Leadership Summit
              </div>
              <h2 className="text-2xl font-black leading-tight text-slate-800 md:text-[28px]">
                Global Leadership Summit
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                Exclusive for Zero Olympiad participants. Attend the most prestigious Global Leadership Summit.
              </p>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSc8ZMkQnp0Lm57wW2TRSmX7vd1uSB1o7BGFBWHG1rXEhvE9fA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white transition hover:bg-indigo-600 active:scale-95"
              >
                Register for Global Leadership Summit{" "}
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Round 1 & Fellowship — condition: is_participated = true only */}
        {hasParticipated && (
          <div className="space-y-6">
            <CertificateCard 
                userName={user.name || "Participant"} 
                date={new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} 
                validationId={round1CertificateId}
                title="Participation Certificate"
                subtitle="Round 1: Quiz Olympiad"
                templatePath="/certificates_round_1.pdf"
                accentClass="bg-indigo-600"
                description="Awarded for successfully participating in the Zero Olympiad Round 1 quiz."
            />
            <CertificateCard 
                userName={user.name || "Participant"} 
                date={new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} 
                validationId={fellowshipCertificateId}
                title="Fellowship Certificate"
                subtitle="Zero Olympiad Fellowship"
                templatePath="/fellowship_certificates.pdf"
                accentClass="bg-emerald-600"
                description="Awarded for joining the fellowship participation track of Zero Olympiad."
            />
          </div>
        )}

        {/* Round 2 — condition: round_type = 2 only */}
        {isRound2OrAbove && (
          <div className="mt-6">
            <CertificateCard
              userName={user.name || "Participant"}
              date={new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              validationId={promotionCertificateId}
              title="Promotion Certificate"
              subtitle="Qualified for Round 2"
              templatePath="/certificates_round_2.pdf"
              accentClass="bg-amber-600"
              description="This certifies that you successfully completed the Round 1 quiz and were promoted to Round 2."
            />
          </div>
        )}

      </div>
    </div>
  );
}