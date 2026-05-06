"use client";
import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaSpinner, FaRedo } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

// page.jsx থেকে props হিসেবে email পাঠানো হয়েছে
export default function Step4_VerifyOTP({ email }) {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [countdown, setCountdown] = useState(60); 

    // Resend Timer Logic
    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    // OTP Verify Function
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        
        // Supabase-এর ডিফল্ট OTP ৬ ডিজিটের হয়
        if (otp.length !== 6) {
            Swal.fire("Error", "Please enter the valid 6-digit verification code.", "warning");
            return;
        }

        setLoading(true);

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            const response = await axios.post(
                `${API_URL}/api/user/verify-otp`,
                { email: email, token: otp },
                { timeout: 35000 }
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'অভিনন্দন!',
                    text: 'আপনার রেজিস্ট্রেশন এবং ইমেইল ভেরিফিকেশন সফলভাবে সম্পন্ন হয়েছে।',
                    confirmButtonText: 'লগইন করুন',
                    confirmButtonColor: '#4F46E5',
                    allowOutsideClick: false
                }).then(() => {
                    // ভেরিফিকেশন সফল হলে সোজা লগইন পেজে পাঠিয়ে দেবে
                    window.location.href = '/login';
                });
            }
        } catch (error) {
            const msg =
                error.code === "ECONNABORTED"
                    ? "সার্ভার থেকে দেরি হচ্ছে। একটু পরে আবার চেষ্টা করুন।"
                    : error.response?.data?.message ||
                      "Invalid or expired OTP. Please try again.";
            Swal.fire("Verification Failed", msg, "error");
        } finally {
            setLoading(false);
        }
    };

    // Resend OTP Function
    const handleResendOTP = async () => {
        if (!email) return;
        setResendLoading(true);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            await axios.post(
                `${API_URL}/api/user/resend-otp`,
                { email },
                { timeout: 35000 }
            );
            Swal.fire("Success", "A new 6-digit verification code has been sent to your email.", "success");
            setCountdown(60); 
        } catch (error) {
            const msg =
                error.code === "ECONNABORTED"
                    ? "সার্ভার ব্যস্ত থাকতে পারে। কিছুক্ষণ পর আবার চেষ্টা করুন।"
                    : "Failed to resend code. Please try again later.";
            Swal.fire("Error", msg, "error");
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="text-center animate-in fade-in zoom-in duration-500">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <FaCheckCircle className="text-green-500 text-5xl" />
                </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                রেজিস্ট্রেশন প্রায় সম্পন্ন!
            </h2>

            <p className="text-gray-600 text-sm md:text-base mb-8">
                আপনার অ্যাকাউন্টটি পুরোপুরি চালু করতে <strong>{email}</strong> ঠিকানায় একটি <strong>৬-ডিজিটের ভেরিফিকেশন কোড</strong> পাঠানো হয়েছে। অনুগ্রহ করে কোডটি নিচে প্রবেশ করান।
            </p>

            {/* OTP Form Box */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-6">
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <div className="text-left">
                        <label className="block text-sm font-bold text-indigo-900 mb-2 uppercase tracking-wide text-center">
                            Verification Code (6-Digits)
                        </label>
                        <input
                            type="text"
                            maxLength={6}  // 🔥 এখানে ম্যাক্স লেন্থ ৬ করে দেওয়া হয়েছে
                            value={otp}
                            // শুধুমাত্র সংখ্যা এবং অক্ষর ইনপুট নেওয়া হবে
                            onChange={(e) => setOtp(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
                            placeholder="Enter 6-digit code"
                            className="w-full p-4 text-center text-xl md:text-2xl font-bold tracking-[0.3em] md:tracking-[0.5em] border-2 border-indigo-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all bg-white"
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loading || otp.length !== 6} // ৬ ডিজিট না হওয়া পর্যন্ত বাটন ডিসেবল থাকবে
                        className={`w-full py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                            loading || otp.length !== 6 
                            ? 'bg-indigo-400 cursor-not-allowed' 
                            : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 active:scale-[0.98]'
                        }`}
                    >
                        {loading ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />}
                        {loading ? 'Verifying...' : 'Verify Email'}
                    </button>
                </form>
            </div>

            {/* Resend Logic */}
            <div className="mt-4 text-center">
                <button 
                    onClick={handleResendOTP}
                    disabled={countdown > 0 || resendLoading}
                    className={`flex items-center justify-center gap-2 mx-auto text-sm font-bold transition-all ${
                        countdown > 0 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-indigo-600 hover:text-indigo-800'
                    }`}
                >
                    <FaRedo className={resendLoading ? 'animate-spin' : ''} />
                    {countdown > 0 ? `Resend Code in ${countdown}s` : 'Resend Code'}
                </button>
            </div>
        </div>
    );
}