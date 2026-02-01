"use client";

import React from "react";
import { HiOutlineSpeakerphone, HiOutlineBell, HiOutlineCalendar } from "react-icons/hi";
import { motion } from "framer-motion";

const announcements = [
  {
    id: 1,
    title: "নতুন কুইজ সিরিজ: জাভাস্ক্রিপ্ট মাস্টারক্লাস",
    content: "আমরা আগামী সপ্তাহে নতুন একটি জাভাস্ক্রিপ্ট অ্যাডভান্সড কুইজ সিরিজ শুরু করতে যাচ্ছি। অংশগ্রহণকারীদের জন্য থাকছে বিশেষ ব্যাজ!",
    date: "২৬ ডিসেম্বর, ২০২৫",
    tag: "নতুন",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "সার্ভার মেইনটেন্যান্স নোটিশ",
    content: "আগামীকাল রাত ১২টা থেকে ভোর ৪টা পর্যন্ত আমাদের ওয়েবসাইট মেইনটেন্যান্সের জন্য বন্ধ থাকবে। সাময়িক অসুবিধার জন্য আমরা দুঃখিত।",
    date: "২৪ ডিসেম্বর, ২০২৫",
    tag: "জরুরি",
    color: "bg-red-100 text-red-600",
  },
  {
    id: 3,
    title: "পেমেন্ট সিস্টেমে নতুন আপডেট",
    content: "এখন থেকে আপনারা খুব সহজেই বিকাশ এবং নগদের মাধ্যমে পেমেন্ট করে কুইজ সাবস্ক্রিপশন কিনতে পারবেন।",
    date: "২০ ডিসেম্বর, ২০২৫",
    tag: "আপডেট",
    color: "bg-green-100 text-green-600",
  },
];

export default function AnnouncementPage() {
  return (
    <div className=" p-4 lg:p-8">
      {/* হেডার সেকশন */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
          <HiOutlineSpeakerphone size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">ঘোষণা (Announcements)</h1>
          <p className="text-sm text-gray-500 font-medium">ওয়েবসাইটের সর্বশেষ আপডেট এবং নোটিশগুলো এখানে পাবেন</p>
        </div>
      </div>

      {/* অ্যানাউন্সমেন্ট লিস্ট */}
      <div className="space-y-6">
        {announcements.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={item.id}
            className="bg-white border border-gray-100 p-6 rounded-3xl hover:shadow-xl hover:shadow-gray-100 transition-all group"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${item.color}`}>
                  {item.tag}
                </span>
                <div className="flex items-center text-gray-400 text-sm gap-1">
                  <HiOutlineCalendar />
                  <span>{item.date}</span>
                </div>
              </div>
              <HiOutlineBell className="text-gray-300 group-hover:text-blue-500 transition-colors" size={20} />
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {item.content}
            </p>

            <div className="mt-5 pt-4 border-t border-gray-50 flex justify-end">
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                বিস্তারিত দেখুন →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* যদি কোনো নোটিশ না থাকে */}
      {announcements.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <HiOutlineSpeakerphone className="mx-auto text-gray-300 mb-4" size={50} />
          <p className="text-gray-500 font-medium">বর্তমানে কোনো ঘোষণা নেই।</p>
        </div>
      )}
    </div>
  );
}