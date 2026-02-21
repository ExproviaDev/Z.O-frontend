import React from 'react';
import { FaEnvelopeOpenText, FaCheckCircle } from 'react-icons/fa';

const RegistrationSuccess = () => {
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
                    অভিনন্দন! রেজিস্ট্রেশন সফল হয়েছে
                </h1>

                <p className="text-gray-600 text-lg mb-8">
                    আপনার অ্যাকাউন্টটি পুরোপুরি চালু করতে আর মাত্র একটি ধাপ বাকি! অনুগ্রহ করে নিচের নির্দেশনাগুলো অনুসরণ করুন:
                </p>

                {/* Instructions Box */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-left space-y-4">

                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                            ১
                        </div>
                        <p className="text-gray-700 font-medium pt-1">
                            প্রথমে আপনার <span className="font-bold text-indigo-700">ইমেইল ইনবক্স</span> চেক করুন।
                        </p>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                            ২
                        </div>
                        <p className="text-gray-700 font-medium pt-1">
                            আমাদের পাঠানো ইমেইলটি ওপেন করে <span className="font-bold text-indigo-700">"Confirm your mail"</span> লেখা লিঙ্কে ক্লিক করুন।
                        </p>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                            ৩
                        </div>
                        <p className="text-gray-700 font-medium pt-1">
                            লিঙ্কটিতে ক্লিক করলেই আপনাকে হোমপেজে নিয়ে যাওয়া হবে। উপরের মেনুতে থাকা তিন লাইনের ☰ আইকনে ক্লিক করলে একটি লগইন বাটন দেখতে পাবেন। সেখানে ক্লিক করে আপনার ইমেইল এবং পাসওয়ার্ড দিয়ে লগইন করে নিন</p>
                </div>

            </div>

            {/* Spam Warning */}
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-100 py-3 px-4 rounded-lg">
                <FaEnvelopeOpenText className="text-gray-400 text-lg" />
                <p>
                    ইনবক্সে ইমেইলটি না পেলে অনুগ্রহ করে <span className="font-bold text-gray-600">'Spam'</span> বা <span className="font-bold text-gray-600">'Junk'</span> ফোল্ডার চেক করুন।
                </p>
            </div>

        </div>
    </div >
  );
};

export default RegistrationSuccess;