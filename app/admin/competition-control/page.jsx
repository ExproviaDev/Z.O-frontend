"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { FiSettings, FiSave, FiClock, FiCheckSquare, FiVideo, FiLayers } from 'react-icons/fi';

const CompetitionControl = () => {
    // ডাটাবেস কলাম অনুযায়ী স্টেট কীগুলো (keys) আপডেট করা হয়েছে
    const [settings, setSettings] = useState({
        current_active_round: 1,
        round_1_start: '',
        round_1_end: '',
        round_1_has_quiz: false,
        round_1_has_video: false,
        round_2_start: '',
        round_2_end: '',
        round_2_has_quiz: false,
        round_2_has_video: false,
        round_3_start: '',
        round_3_end: '',
        round_3_has_quiz: false,
        round_3_has_video: false,
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const baseUrl = process.env.NEXT_PUBLIC_API_URL;
                
                const res = await axios.get(`${baseUrl}/api/admin/settings`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                if (res.data) {
                    // ডাটাবেস থেকে আসা ভ্যালুগুলো নিশ্চিতভাবে Boolean এ কনভার্ট করা
                    const formattedData = {
                        ...res.data,
                        round_1_has_quiz: !!res.data.round_1_has_quiz,
                        round_1_has_video: !!res.data.round_1_has_video,
                        round_2_has_quiz: !!res.data.round_2_has_quiz,
                        round_2_has_video: !!res.data.round_2_has_video,
                        round_3_has_quiz: !!res.data.round_3_has_quiz,
                        round_3_has_video: !!res.data.round_3_has_video,
                    };
                    setSettings(formattedData);
                }
            } catch (err) {
                console.error("Fetch error:", err);
                toast.error("সেটিংস লোড করতে সমস্যা হয়েছে! [401/404]");
            } finally {
                setFetching(false);
            }
        };
        fetchSettings();
    }, []);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('access_token');
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;

            // ISO স্ট্রিং ফরম্যাটে টাইম পাঠানো হচ্ছে জাতে ডাটাবেসে ঠিকমতো সেভ হয়
            await axios.put(`${baseUrl}/api/admin/update-settings`, settings, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("সব রাউন্ডের সেটিংস সফলভাবে সেভ হয়েছে!");
        } catch (err) {
            console.error("Update error:", err);
            toast.error("আপডেট করা সম্ভব হয়নি! পারমিশন চেক করুন।");
        } finally {
            setLoading(false);
        }
    };

    // ইনপুট ফিল্ডে টাইম দেখানোর জন্য ফরম্যাটিং ফাংশন
    const formatDateTime = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toISOString().slice(0, 16);
    };

    const RoundCard = ({ title, quizKey, videoKey, startKey, endKey }) => (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-50">
                <FiLayers className="text-blue-600" />
                <h3 className="font-bold text-gray-800 uppercase tracking-wider">{title}</h3>
            </div>
            
            <div className="space-y-5">
                <div className="grid grid-cols-1 gap-4 text-left">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Start Date & Time</label>
                        <input 
                            type="datetime-local"
                            value={formatDateTime(settings[startKey])}
                            onChange={(e) => setSettings({...settings, [startKey]: e.target.value})}
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">End Date & Time</label>
                        <input 
                            type="datetime-local"
                            value={formatDateTime(settings[endKey])}
                            onChange={(e) => setSettings({...settings, [endKey]: e.target.value})}
                            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-xl">
                    <div className="flex items-center gap-2">
                        <FiCheckSquare className="text-blue-600" />
                        <span className="text-xs font-bold text-gray-700">Quiz Active</span>
                    </div>
                    <button 
                        onClick={() => setSettings({...settings, [quizKey]: !settings[quizKey]})}
                        className={`w-10 h-5 rounded-full p-1 transition-colors ${settings[quizKey] ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                        <div className={`bg-white w-3 h-3 rounded-full shadow-sm transform transition ${settings[quizKey] ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-indigo-50/50 rounded-xl">
                    <div className="flex items-center gap-2">
                        <FiVideo className="text-indigo-600" />
                        <span className="text-xs font-bold text-gray-700">Video Upload</span>
                    </div>
                    <button 
                        onClick={() => setSettings({...settings, [videoKey]: !settings[videoKey]})}
                        className={`w-10 h-5 rounded-full p-1 transition-colors ${settings[videoKey] ? 'bg-indigo-500' : 'bg-gray-300'}`}
                    >
                        <div className={`bg-white w-3 h-3 rounded-full shadow-sm transform transition ${settings[videoKey] ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                </div>
            </div>
        </div>
    );

    if (fetching) return <div className="p-20 text-center font-bold text-blue-600">সার্ভার থেকে ডাটা লোড হচ্ছে...</div>;

    return (
        <div className="p-4 md:p-8 bg-[#fbfbfb] min-h-screen">
            <Toaster position="top-right" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-100 text-white">
                        <FiSettings size={24} />
                    </div>
                    <div className="text-left">
                        <h1 className="text-2xl font-bold text-gray-800">Competition Control</h1>
                        <p className="text-xs text-gray-500 font-medium tracking-tight">Manage timeline and features for each round</p>
                    </div>
                </div>

                <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                    <label className="text-[10px] font-bold text-gray-400 pl-2 uppercase">Current Active Round:</label>
                    <select 
                        value={settings.current_active_round}
                        onChange={(e) => setSettings({...settings, current_active_round: parseInt(e.target.value)})}
                        className="p-2 bg-blue-50 text-blue-700 font-bold border-none rounded-lg outline-none cursor-pointer text-sm"
                    >
                        <option value={1}>Round 1</option>
                        <option value={2}>Round 2</option>
                        <option value={3}>Round 3</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <RoundCard 
                    title="Round 1: Initial" 
                    quizKey="round_1_has_quiz"
                    videoKey="round_1_has_video"
                    startKey="round_1_start"
                    endKey="round_1_end"
                />
                <RoundCard 
                    title="Round 2: Selection" 
                    quizKey="round_2_has_quiz"
                    videoKey="round_2_has_video"
                    startKey="round_2_start"
                    endKey="round_2_end"
                />
                <RoundCard 
                    title="Round 3: Finale" 
                    quizKey="round_3_has_quiz"
                    videoKey="round_3_has_video"
                    startKey="round_3_start"
                    endKey="round_3_end"
                />
            </div>

            <div className="mt-10 flex flex-col md:flex-row items-center justify-between p-6 bg-white border border-gray-100 rounded-2xl gap-4">
                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-3 rounded-xl border border-amber-100">
                    <FiClock size={18} />
                    <p className="text-[10px] font-bold leading-tight text-left">
                        সাবধান: ডাটাবেস কলামের নাম ও ডাটা টাইপ নিশ্চিত করুন।
                    </p>
                </div>
                <button 
                    onClick={handleUpdate}
                    disabled={loading}
                    className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-xl font-bold shadow-xl shadow-blue-100 transition-all active:scale-95 disabled:opacity-50"
                >
                    {loading ? 'Processing...' : <><FiSave /> Save All Settings</>}
                </button>
            </div>
        </div>
    );
};

export default CompetitionControl;