"use client";
import React, { useState } from 'react';
import { AiOutlineMail, AiOutlineClose } from 'react-icons/ai';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';

export default function ForgotPasswordModal({ onClose }) {
    const [resetEmail, setResetEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


    const handleResetSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        setLoading(true);

        if (!resetEmail) {
            setError("ইমেল অ্যাড্রেস আবশ্যক।");
            setLoading(false);
            return;
        }

        const backendUrl = "https://zero-olympiad-server.vercel.app/api/auth/forgot-password";

        try {

            const res = await fetch(backendUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: resetEmail }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccessMessage(data.message || "আপনার ইমেলের ইনবক্সে পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে।");
                setResetEmail("");
            } else {
                setError(data.message || "পাসওয়ার্ড রিসেট অনুরোধে ত্রুটি হয়েছে।");
            }
        } catch (err) {
            console.error("Forgot Password Network Error:", err);
            setError("পাসওয়ার্ড রিসেট করার সময় একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 md:p-12 transform transition-all scale-100 opacity-100">
                <div className="flex justify-between items-center ">
                    <h3 className="text-xl  font-bold text-gray-800">পাসওয়ার্ড ভুলে গেছেন?</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        <AiOutlineClose size={25} className='hover:text-red-600 '/>
                    </button>
                </div>
                <hr className='my-5 border-dashed'/>
                {successMessage ? (
                    <div className="text-center">
                        <FaCheckCircle className="text-green-600 mx-auto mb-4" size={48} />
                        <p className="text-green-600 font-medium mb-4">{successMessage}</p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300"
                        >
                            বন্ধ করুন
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleResetSubmit} className="space-y-5">
                        <p className=" text-gray-600 text-center">আপনার রেজিস্টার্ড ইমেল অ্যাড্রেস দিন</p>

                        <div className="flex items-center bg-gray-100 rounded-full px-4 mt-1 border border-gray-300">
                            <AiOutlineMail className="text-gray-500 mr-2" size={20} />
                            <input
                                type="email"
                                placeholder="আপনার ইমেল"
                                name="resetEmail"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                className="w-full bg-transparent py-2 text-Primary font-IBM outline-none placeholder-gray-500"
                                required
                            />
                        </div>

                        {error && (
                            <div className="text-sm text-red-600 font-semibold text-center mt-2">
                                <FaExclamationCircle className="inline-block mr-2" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full flex justify-center items-center bg-indigo-500 text-white py-2 rounded-lg font-bold hover:bg-indigo-600 transition disabled:bg-indigo-300"
                            disabled={loading}
                        >
                            {/* Show spinner icon when loading */}
                            {loading ? (
                                <FaSpinner className="animate-spin mr-2" />
                            ) : (
                                <FaPaperPlane className="mr-2" />
                            )}
                            {loading ? "পাঠানো হচ্ছে..." : "রিসেট ইমেল পাঠান"}
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full flex justify-center items-center gap-3 border py-2 text-sm text-gray-500 hover:text-white hover:bg-Primary mt-2 rounded-xl"
                        > <FiLogIn className="text-base" />
                            লগইন পেজে ফিরে যান
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
