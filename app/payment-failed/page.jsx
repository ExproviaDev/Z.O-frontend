"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { XCircle, RefreshCw, MessageCircle, Home, AlertTriangle } from 'lucide-react';

export default function PaymentFailed() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4 md:p-8 font-sans">
      {/* Main Container with 7xl max-width */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[40px] p-8 md:p-16 border border-gray-100 overflow-hidden relative">
        
        {/* Background Decorative Gradient */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-50/50 to-transparent pointer-events-none" />

        {/* Left Side: Illustration & Icon */}
        <div className="relative flex justify-center items-center order-2 lg:order-1">
          <div className="relative w-full max-w-md animate-float">
            <div className="absolute inset-0 bg-red-200 blur-[100px] opacity-30 rounded-full" />
            <div className="relative z-10 bg-white p-12 rounded-[30px] shadow-2xl border border-red-50 flex flex-col items-center">
                <XCircle size={120} className="text-red-500 mb-6 animate-pulse" />
                <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-200 rounded-full animate-bounce" />
                    <div className="w-3 h-3 bg-red-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="relative z-10 space-y-8 order-1 lg:order-2">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-bold tracking-wide uppercase">
              <AlertTriangle size={16} />
              Transaction Unsuccessful
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-[#1A2E5A] leading-tight">
              Oops! Payment <span className="text-red-500">Failed.</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-lg leading-relaxed font-light">
              We couldn't process your payment at this time. Don't worry, no money has been deducted from your account.
            </p>
            <p className='text-[18px] font-bold'>Please wait 30 minute, and try again later..</p>
          </div>

          {/* Action Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           
            
            <Link
              href="/"
              className="flex  items-center justify-center gap-3 bg-white border-2 border-gray-100 text-[#1A2E5A] font-bold py-5 rounded-2xl hover:border-blue-100 hover:bg-blue-50 transition-all active:scale-95"
            >
              <Home size={22} />
              Back to Home
            </Link>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center gap-6 border-t border-gray-100">
            <p className="text-sm text-gray-400">Need help with your payment?</p>
            <Link href="/contact-us" className="flex items-center gap-2 text-[#1A2E5A] font-bold hover:underline">
              <MessageCircle size={18} />
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}