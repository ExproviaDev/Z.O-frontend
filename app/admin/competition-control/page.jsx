"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { FiSettings, FiSave, FiClock, FiCheckSquare, FiVideo, FiLayers, FiActivity } from 'react-icons/fi';

const CompetitionControl = () => {
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
                toast.error("সেটিংস লোড করতে সমস্যা হয়েছে!");
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

            await axios.put(`${baseUrl}/api/admin/update-settings`, settings, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("সব রাউন্ডের সেটিংস সফলভাবে সেভ হয়েছে!");
        } catch (err) {
            console.error("Update error:", err);
            toast.error("আপডেট করা সম্ভব হয়নি!");
        } finally {
            setLoading(false);
        }
    };

    const formatDateTime = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toISOString().slice(0, 16);
    };

    // Card Component with Highlight Logic
    const RoundCard = ({ title, quizKey, videoKey, startKey, endKey, roundNumber }) => {
        const isActive = settings.current_active_round === roundNumber;

        return (
            <div className={`relative bg-white rounded-[32px] p-8 transition-all duration-500 border-2 ${
                isActive 
                ? 'border-blue-500 shadow-2xl shadow-blue-100 scale-105 z-10' 
                : 'border-gray-100 shadow-sm opacity-80 grayscale-[0.3]'
            }`}>
                
                {/* Active Badge */}
                {isActive && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-2 shadow-lg animate-bounce">
                        <FiActivity size={12} /> Currently Active
                    </div>
                )}

                <div className="flex items-center gap-3 mb-8 pb-3 border-b border-gray-50">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                        <FiLayers size={20} />
                    </div>
                    <h3 className={`font-black text-lg uppercase tracking-tight ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                        {title}
                    </h3>
                </div>
                
                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-5 text-left">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Start Date & Time</label>
                            <input 
                                type="datetime-local"
                                value={formatDateTime(settings[startKey])}
                                onChange={(e) => setSettings({...settings, [startKey]: e.target.value})}
                                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">End Date & Time</label>
                            <input 
                                type="datetime-local"
                                value={formatDateTime(settings[endKey])}
                                onChange={(e) => setSettings({...settings, [endKey]: e.target.value})}
                                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="pt-4 space-y-3">
                        <div className={`flex items-center justify-between p-4 rounded-2xl transition-colors ${settings[quizKey] ? 'bg-emerald-50' : 'bg-gray-50'}`}>
                            <div className="flex items-center gap-3">
                                <FiCheckSquare className={settings[quizKey] ? 'text-emerald-600' : 'text-gray-400'} size={20} />
                                <span className={`text-xs font-bold ${settings[quizKey] ? 'text-emerald-900' : 'text-gray-500'}`}>Quiz Module</span>
                            </div>
                            <button 
                                onClick={() => setSettings({...settings, [quizKey]: !settings[quizKey]})}
                                className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${settings[quizKey] ? 'bg-emerald-500' : 'bg-gray-300'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${settings[quizKey] ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        <div className={`flex items-center justify-between p-4 rounded-2xl transition-colors ${settings[videoKey] ? 'bg-indigo-50' : 'bg-gray-50'}`}>
                            <div className="flex items-center gap-3">
                                <FiVideo className={settings[videoKey] ? 'text-indigo-600' : 'text-gray-400'} size={20} />
                                <span className={`text-xs font-bold ${settings[videoKey] ? 'text-indigo-900' : 'text-gray-500'}`}>Video Submission</span>
                            </div>
                            <button 
                                onClick={() => setSettings({...settings, [videoKey]: !settings[videoKey]})}
                                className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${settings[videoKey] ? 'bg-indigo-500' : 'bg-gray-300'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${settings[videoKey] ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (fetching) return (
        <div className="flex h-[80vh] items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="p-6 lg:p-12 bg-[#f8fafc] min-h-screen">
            <Toaster position="top-center" reverseOrder={false} />
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest">
                        <FiSettings /> Master Configuration
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Competition Control</h1>
                    <p className="text-gray-500 font-medium">Configure timelines and module access for all rounds</p>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Active State</p>
                        <p className="text-sm font-bold text-gray-700">Set Current Round</p>
                    </div>
                    <select 
                        value={settings.current_active_round}
                        onChange={(e) => setSettings({...settings, current_active_round: parseInt(e.target.value)})}
                        className="p-3 bg-blue-600 text-white font-bold border-none rounded-xl outline-none cursor-pointer text-sm shadow-lg shadow-blue-100"
                    >
                        <option value={1}>Round 1</option>
                        <option value={2}>Round 2</option>
                        <option value={3}>Round 3</option>
                    </select>
                </div>
            </div>

            {/* Grid with Zoom and Border Effects */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                <RoundCard 
                    title="Round 01: Initial" 
                    quizKey="round_1_has_quiz"
                    videoKey="round_1_has_video"
                    startKey="round_1_start"
                    endKey="round_1_end"
                    roundNumber={1}
                />
                <RoundCard 
                    title="Round 02: Selection" 
                    quizKey="round_2_has_quiz"
                    videoKey="round_2_has_video"
                    startKey="round_2_start"
                    endKey="round_2_end"
                    roundNumber={2}
                />
                <RoundCard 
                    title="Round 03: Finale" 
                    quizKey="round_3_has_quiz"
                    videoKey="round_3_has_video"
                    startKey="round_3_start"
                    endKey="round_3_end"
                    roundNumber={3}
                />
            </div>

            {/* Footer Save Bar */}
            <div className="mt-20 flex flex-col md:flex-row items-center justify-between p-8 bg-gray-900 rounded-[32px] gap-6 shadow-2xl">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-amber-400">
                        <FiClock size={24} />
                    </div>
                    <div>
                        <p className="text-white font-bold text-lg">Confirm Changes</p>
                        <p className="text-gray-400 text-xs">All round settings will be updated instantly across the platform.</p>
                    </div>
                </div>
                <button 
                    onClick={handleUpdate}
                    disabled={loading}
                    className="w-full md:w-auto flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-400 text-white px-16 py-5 rounded-2xl font-black text-lg transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-blue-500/20"
                >
                    {loading ? 'SYNCING DATA...' : <><FiSave size={22} /> Update Competition</>}
                </button>
            </div>
        </div>
    );
};

export default CompetitionControl;