"use client";

import { useState, useRef } from "react";
import {
    FaVideo,
    FaTrophy,
    FaCalendarAlt,
    FaAward,
    FaUpload,
    FaFileAlt,
    FaUserPlus,
    FaBirthdayCake,
    FaArrowDown,
    FaFlagCheckered
} from "react-icons/fa";



export default function RamadanZeroPage() {
    const [isRegOpen, setIsRegOpen] = useState(false);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileSelect = (file) => {
        if (!file) return;
        if (file.type === "video/mp4" || file.type === "video/quicktime") {
            if (file.size <= 500 * 1024 * 1024) setSelectedFile(file);
            else alert("ফাইল সাইজ খুব বড়! সর্বোচ্চ ৫০০MB অনুমোদিত।");
        } else {
            alert("শুধুমাত্র MP4 বা MOV ফরম্যাট গ্রহণযোগ্য।");
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFileSelect(file);
    };

    const timelineData = [
        { date: "১৮ ফেব্রুয়ারি", title: "রেজিস্ট্রেশন শুরু", description: "উভয় প্রতিযোগিতার জন্য", icon: FaUserPlus, color: "bg-yellow-400" },
        { date: "১৭ মার্চ", title: "রমাদান রেজিস্ট্রেশন শেষ", description: "ভিডিও জমা দেওয়ার শেষ দিন", icon: FaFileAlt, color: "bg-purple-400" },
        { date: "১৭ এপ্রিল", title: "অলিম্পিয়াড রেজিস্ট্রেশন শেষ", description: "Zero Olympiad এ অংশগ্রহণের শেষ সুযোগ", icon: FaCalendarAlt, color: "bg-blue-400" },
        { date: "১৮ এপ্রিল", title: "প্রথম রাউন্ড পরীক্ষা", description: "অনলাইন পরীক্ষা শুরু", icon: FaAward, color: "bg-green-400" },
        { date: "২ মে", title: "দ্বিতীয় রাউন্ড ফলাফল", description: "ফাইনালে অংশগ্রহণকারীদের ঘোষণা", icon: FaTrophy, color: "bg-red-400" },
        { date: "৯ মে", title: "গ্র্যান্ড ফিনালে", description: "চূড়ান্ত প্রতিযোগিতা ও পুরস্কার বিতরণ", icon: FaFlagCheckered, color: "bg-orange-400" },
    ];

    const markingCriteria = [
        { category: "Content Depth", marks: 30, description: "বিষয়বস্তুর গভীরতা" },
        { category: "Presentation", marks: 25, description: "উপস্থাপনা" },
        { category: "Creativity", marks: 20, description: "সৃজনশীলতা" },
        { category: "Language", marks: 15, description: "ভাষা" },
        { category: "Technical", marks: 10, description: "প্রযুক্তিগত দক্ষতা" },
    ];

    return (
        <div className="w-full">

            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-green-50 px-4 py-20">
                <div className="relative z-10 mx-auto text-center space-y-6 max-w-7xl px-5">
                    <h1 className="text-2xl md:text-7xl font-bold leading-tight">এক রেজিস্ট্রেশনে দুই প্রতিযোগিতা</h1>
                    <p className="text-lh md:text-2xl text-gray-600 max-w-3xl mx-auto">
                        রমাদান রিফ্লেকশন্স এবং জিরো অলিম্পিয়াডে অংশগ্রহণ করুন মাত্র ৩০০ টাকায়
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        <button
                            className="lg:text-lg text-xs  px-5 py-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-blue-500 text-white rounded"
                            onClick={() => setIsRegOpen(true)}
                        >
                            রেজিস্ট্রেশন শুরু করুন
                        </button>
                        <button
                            className="lg:text-lg text-xs px-5 py-3 border-2 border-gray-300 rounded hover:bg-gray-100 flex items-center justify-center gap-2"
                            onClick={() => document.getElementById("competitions")?.scrollIntoView({ behavior: "smooth" })}
                        >
                            আরও জানুন <FaArrowDown />
                        </button>
                    </div>
                </div>
            </section>

            {/* Competitions Overview */}
            <section id="competitions" className="lg:py-20 py-10 max-w-7xl px-5 mx-auto">
                <div className=" mx-auto text-center flex flex-col gap-6 mb-16">
                    <h2 className="text-2xl md:text-5xl font-bold">দুইটি প্রতিযোগিতা, এক প্ল্যাটফর্ম</h2>
                    <p className="text-sm text-gray-600 max-w-2xl mx-auto">আপনার প্রতিভা প্রদর্শন এবং মূল্যবান পুরস্কার জেতার সুযোগ</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8  mx-auto">
                    <div className="border-2 p-6 rounded-lg shadow-lg hover:scale-105 transition-all bg-white">
                        <div className="flex items-center justify-center mb-4 w-16 h-16 bg-yellow-100 rounded-full mx-auto">
                            <FaVideo className="w-8 h-8 text-yellow-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-center mb-2">রমাদান রিফ্লেকশন্স</h3>
                        <p className="text-gray-600 text-center mb-4">রমাদান আমাকে যা শেখালো</p>
                        <ul className="mb-4 text-gray-700">
                            <li>• চিন্তা, ঈমান, আত্মবিশ্লেষণ প্রকাশ</li>
                            <li>• ভিডিও ফরম্যাট: ১-৩ মিনিট</li>
                            <li>• Storytelling, Slideshow, Animation</li>
                        </ul>
                        <button
                            className="w-full py-3 mt-4 bg-green-500 text-white rounded hover:scale-105 transition-all"
                            onClick={() => setIsVideoOpen(true)}
                        >
                            ভিডিও জমা দিন
                        </button>
                    </div>

                    <div className="border-2 p-6 rounded-lg shadow-lg hover:scale-105 transition-all bg-white">
                        <div className="flex items-center justify-center mb-4 w-16 h-16 bg-blue-100 rounded-full mx-auto">
                            <FaTrophy className="w-8 h-8 text-blue-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-center mb-2">জিরো অলিম্পিয়াড</h3>
                        <p className="text-gray-600 text-center mb-4">প্রতিযোগিতায় অংশ নিন</p>
                        <p className="text-center text-xl font-bold mb-2">মাত্র ৩০০ টাকা</p>
                        <p className="text-center text-gray-600 mb-4">দুটি প্রতিযোগিতার জন্য</p>
                        <button
                            className="w-full py-3 mt-4 bg-blue-500 text-white rounded hover:scale-105 transition-all"
                        >
                            রেজিস্ট্রেশন করুন
                        </button>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-20 md:py-32 bg-gray-50 ">
                <div className="container max-w-7xl px-5 mx-auto">
                    {/* Section header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            গুরুত্বপূর্ণ তারিখ
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            প্রতিযোগিতার সময়সূচি অনুসরণ করুন
                        </p>
                    </div>

                    {/* Desktop Timeline */}
                    <div className="hidden lg:block relative max-w-6xl mx-auto">
                        {/* Center line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 -translate-x-1/2" />

                        {timelineData.map((item, index) => {
                            const Icon = item.icon;
                            const isLeft = index % 2 === 0;

                            return (
                                <div
                                    key={index}
                                    className={`relative flex items-center mb-12 ${isLeft ? "flex-row" : "flex-row-reverse"
                                        }`}
                                >
                                    {/* Content */}
                                    <div className={`w-5/12 ${isLeft ? "text-right pr-3" : "text-left pl-3"}`}>
                                        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
                                            <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold mb-2">
                                                {item.date}
                                            </span>
                                            <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                                            <p className="text-gray-600">{item.description}</p>
                                        </div>
                                    </div>

                                    {/* Center icon */}
                                    <div className="absolute left-1/2 -translate-x-1/2 z-10">
                                        <div className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center shadow-md`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                    </div>

                                    {/* Empty space */}
                                    <div className="w-5/12" />
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile/Tablet Timeline */}
                    <div className="lg:hidden relative max-w-lg mx-auto">
                        {/* Left line */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300" />

                        {timelineData.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div key={index} className="relative flex items-start mb-8 pl-16">
                                    {/* Icon */}
                                    <div className="absolute left-0 z-10">
                                        <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center shadow-md`}>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="bg-white p-5 rounded-xl shadow-md flex-1">
                                        <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold mb-2">
                                            {item.date}
                                        </span>
                                        <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                                        <p className="text-gray-600 text-sm">{item.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Marking Scheme */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-5">
                    {/* Header */}
                    <div className="text-center mb-12 space-y-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                            <FaAward className="h-10 w-10 text-primary-foreground" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-balance">মূল্যায়ন মানদণ্ড</h2>
                        <p className="text-lg text-muted-foreground">রমাদান রিফ্লেকশন্স প্রতিযোগিতা</p>
                    </div>

                    {/* Table */}
                    <div className="border-2 shadow-xl overflow-hidden rounded-md ">
                        <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 text-center">
                            <h3 className="text-2xl font-semibold">মোট নম্বর: ১০০</h3>
                        </div>
                        <div className="overflow-x-auto px-5 py-5 ">
                            <table className="min-w-full border-collapse">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="p-4 text-left font-semibold">বিভাগ</th>
                                        <th className="p-4 text-left font-semibold">বিবরণ</th>
                                        <th className="p-4 text-right font-semibold">নম্বর</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {markingCriteria.map((criteria, index) => (
                                        <tr key={index} className="hover:bg-muted/30 transition-colors">
                                            <td className="p-4 font-medium">{criteria.category}</td>
                                            <td className="p-4 text-muted-foreground">{criteria.description}</td>
                                            <td className="p-4 text-right">
                                                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 font-bold text-lg">
                                                    {criteria.marks}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Important Notes */}
                    <div className="mt-8 p-6 bg-card rounded-md border-2 shadow-lg">
                        <h3 className="font-semibold text-xl mb-6">গুরুত্বপূর্ণ নোট:</h3>
                        <ul className="space-y-4 text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>প্রতিটি বয়স বিভাগের জন্য আলাদাভাবে মূল্যায়ন করা হবে</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>বিচারকদের সিদ্ধান্ত চূড়ান্ত এবং সকলের জন্য প্রযোজ্য</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>সৃজনশীলতা এবং মৌলিকত্বকে বিশেষ গুরুত্ব দেওয়া হবে</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Registration Modal */}
            {isRegOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg max-w-xl w-full relative">
                        <h2 className="text-2xl font-bold mb-4">রেজিস্ট্রেশন ফর্ম</h2>
                        <button className="absolute top-2 right-2 text-gray-500" onClick={() => setIsRegOpen(false)}>X</button>
                        <p className="mb-4">আপনার তথ্য দিয়ে প্রতিযোগিতায় নিবন্ধন করুন</p>
                        <div className="space-y-2">
                            <input type="text" placeholder="পূর্ণ নাম" className="w-full border p-2 rounded" />
                            <input type="email" placeholder="ইমেইল" className="w-full border p-2 rounded" />
                            <input type="tel" placeholder="ফোন নম্বর" className="w-full border p-2 rounded" />
                            <input type="text" placeholder="বয়স/শ্রেণী" className="w-full border p-2 rounded" />
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2"><input type="checkbox" /> রমাদান রিফ্লেকশন্স</label>
                                <label className="flex items-center gap-2"><input type="checkbox" /> জিরো অলিম্পিয়াড</label>
                            </div>
                            <button className="w-full bg-blue-500 text-white py-3 rounded mt-2">রেজিস্ট্রেশন সম্পন্ন করুন</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Video Submission Modal */}
            {isVideoOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg max-w-xl w-full relative">
                        <h2 className="text-2xl font-bold mb-4">ভিডিও জমা দিন</h2>
                        <button className="absolute top-2 right-2 text-gray-500" onClick={() => setIsVideoOpen(false)}>X</button>
                        <div
                            onDrop={handleDrop}
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            className={`border-2 border-dashed p-8 rounded text-center mb-4 ${isDragging ? "border-blue-500 bg-blue-50" : ""}`}
                        >
                            {selectedFile ? (
                                <p>{selectedFile.name}</p>
                            ) : (
                                <p>ড্র্যাগ করে ছেড়ে দিন বা ব্রাউজ করুন</p>
                            )}
                            <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => handleFileSelect(e.target.files[0])} />
                            <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded" onClick={() => fileInputRef.current.click()}>ফাইল নির্বাচন করুন</button>
                        </div>
                        <input type="text" placeholder="অংশগ্রহণকারীর নাম" className="w-full border p-2 rounded mb-2" />
                        <select className="w-full border p-2 rounded">
                            <option value="">বয়স বিভাগ নির্বাচন করুন</option>
                            <option value="A">A (৫–৮ বছর)</option>
                            <option value="B">B (৯–১২ বছর)</option>
                            <option value="C">C (১৩+ বছর)</option>
                        </select>
                        <button className="w-full mt-2 bg-blue-500 text-white py-2 rounded">জমা দিন</button>
                    </div>
                </div>
            )}
        </div>
    );
}
