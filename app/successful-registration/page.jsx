"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaEnvelopeOpenText, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

const RegistrationSuccess = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // আগের পেজ (Step 3) থেকে ইমেইলটা URL প্যারামিটার হিসেবে নিয়ে আসা ভালো
    // যেমন: router.push(`/success?email=${formData.email}`)
    const email = searchParams.get('email') || ''; 

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        
        if (!email) {
            Swal.fire("Error", "Email not found. Please login normally.", "error");
            return router.push('/login');
        }

        if (otp.length < 6) {
            Swal.fire("Error", "Please enter the 6-digit code.", "warning");
            return;
        }

        setLoading(true);

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            const response = await axios.post(`${API_URL}/api/user/verify-otp`, {
                email: email,
                token: otp
            });

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Verification Successful!',
                    text: 'Your email has been verified. Please log in now.',
                    confirmButtonText: 'Go to Login',
                    confirmButtonColor: '#2563eb'
                }).then(() => {
                    router.push('/login');
                });
            }
        } catch (error) {
            Swal.fire(
                "Verification Failed", 
                error.response?.data?.message || "Invalid or expired OTP. Please try again.", 
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
            <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl overflow-hidden text-center p-8 md:p-12">

                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <FaCheckCircle className="text-green-500 text-5xl" />
                    </div>
                </div>

                {/* Headline */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    রেজিস্ট্রেশন প্রায় সম্পন্ন!
                </h1>

                <p className="text-gray-600 text-[15px] mb-8">
                    আপনার অ্যাকাউন্টটি পুরোপুরি চালু করতে আপনার ইমেইলে একটি <strong>৬-ডিজিটের ভেরিফিকেশন কোড</strong> পাঠানো হয়েছে। অনুগ্রহ করে কোডটি নিচে প্রবেশ করান।
                </p>

                {/* OTP Form Box */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-8">
                    <form onSubmit={handleVerifyOTP} className="space-y-4">
                        <div className="text-left">
                            <label className="block text-sm font-bold text-indigo-900 mb-2 uppercase tracking-wide">
                                Verification Code
                            </label>
                            <input
                                type="text"
                                maxLength={8}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))} // Allow alphanumeric just in case
                                placeholder="Enter 8-digit code"
                                className="w-full p-4 text-center text-2xl font-bold tracking-[0.5em] border-2 border-indigo-200 rounded-xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all bg-white"
                                required
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={loading || otp.length < 6}
                            className={`w-full py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                                loading || otp.length < 6 
                                ? 'bg-indigo-400 cursor-not-allowed' 
                                : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 active:scale-[0.98]'
                            }`}
                        >
                            {loading ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />}
                            {loading ? 'Verifying...' : 'Verify Email'}
                        </button>
                    </form>
                </div>

                {/* Instructions Box */}
                <div className="text-left space-y-3 mt-6 border-t pt-6 border-gray-100">
                    <p className="font-bold text-gray-800 text-sm">💡 কোডটি খুঁজে পাচ্ছেন না?</p>
                    <ul className="text-sm text-gray-600 space-y-2 ml-5 list-disc">
                        <li>আপনার ইনবক্সে ইমেইলটি না পেলে অনুগ্রহ করে <strong>'Spam'</strong> বা <strong>'Junk'</strong> ফোল্ডার চেক করুন।</li>
                        <li>আপনার দেওয়া ইমেইল <span className="text-indigo-600 font-semibold">{email || 'অ্যাড্রেস'}</span> সঠিক আছে কি না নিশ্চিত করুন।</li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default RegistrationSuccess;