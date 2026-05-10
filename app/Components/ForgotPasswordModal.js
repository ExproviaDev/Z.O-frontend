"use client";
import React, { useState } from 'react';
import { AiOutlineMail, AiOutlineClose } from 'react-icons/ai';
import { FaExclamationCircle } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { FaPaperPlane, FaSpinner, FaEnvelopeOpenText } from 'react-icons/fa';

export default function ForgotPasswordModal({ onClose }) {
    const [resetEmail, setResetEmail] = useState("");
    const [submittedEmail, setSubmittedEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);


    const handleResetSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!resetEmail) {
            setError("Email is required.");
            setLoading(false);
            return;
        }

        const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/user/forgot-password`;

        try {

            const res = await fetch(backendUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: resetEmail }),
                signal: AbortSignal.timeout(35000),
            });

            const data = await res.json();

            if (res.ok) {
                setSubmittedEmail(resetEmail);
                setSubmitted(true);
                setResetEmail("");
            } else {
                setError(data.message || "Couldn't send reset link. Please try again.");
            }
        } catch (err) {
            console.error("Forgot Password Network Error:", err);
            setError("Something went wrong. Check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 md:p-12 transform transition-all scale-100 opacity-100">
                <div className="flex justify-between items-center ">
                    <h3 className="text-xl  font-bold text-gray-800">
                        {submitted ? "Check your email" : "Forgot password?"}
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        <AiOutlineClose size={25} className='hover:text-red-600 '/>
                    </button>
                </div>
                <hr className='my-5 border-dashed'/>
                {submitted ? (
                    <div className="text-center">
                        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
                            <FaEnvelopeOpenText className="text-emerald-600" size={40} />
                        </div>
                        <p className="text-gray-800 font-semibold mb-2">
                            We&apos;ve sent a password reset link to
                        </p>
                        <p className="text-[#0F172A] font-bold mb-4 break-all">
                            {submittedEmail}
                        </p>
                        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                            Please check your inbox and click the link to reset your password.
                            If you don&apos;t see it within a minute, check your spam or junk folder.
                        </p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full bg-[#0F172A] hover:bg-[#020617] text-white py-2.5 rounded-lg font-semibold transition"
                        >
                            Got it
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleResetSubmit} className="space-y-5">
                        <p className=" text-gray-600 text-center">Enter your registered email address.</p>

                        <div className="flex items-center bg-gray-100 rounded-full px-4 mt-1 border border-gray-300">
                            <AiOutlineMail className="text-gray-500 mr-2" size={20} />
                            <input
                                type="email"
                                placeholder="Your email"
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
                            className="w-full flex justify-center items-center bg-[#0F172A] text-white py-2 rounded-lg font-bold hover:bg-[#020617] transition disabled:bg-slate-400"
                            disabled={loading}
                        >
                            {loading ? (
                                <FaSpinner className="animate-spin mr-2" />
                            ) : (
                                <FaPaperPlane className="mr-2" />
                            )}
                            {loading ? "Sending…" : "Send reset link"}
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full flex justify-center items-center gap-3 border py-2 text-sm text-gray-500 hover:text-white hover:bg-[#0F172A] mt-2 rounded-xl transition"
                        > <FiLogIn className="text-base" />
                            Back to login
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
