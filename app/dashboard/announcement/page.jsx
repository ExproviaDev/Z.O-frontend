

"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineSpeakerphone, HiOutlineCalendar } from "react-icons/hi";
import { motion } from "framer-motion";
import Loading from "../../admin/components/loadign";

export default function AnnouncementPage() {
  const { data: announcements = [], isLoading, error } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const response = await axios.get(
        "https://zero-olympiad-server.vercel.app/api/announcement/all"
      );
      return response.data;
    },
   
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false, 
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold">
        Something went wrong. Please check your connection.
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
          <HiOutlineSpeakerphone size={28} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">(All Announcements)</h1>
          <p className="text-sm text-gray-500 font-medium">Latest updates from Zero Olympiad.</p>
        </div>
      </div>

      <div className="space-y-6">
        {announcements.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={item.id || index}
            className="bg-white border border-gray-100 p-6 rounded-3xl hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-600 uppercase">
                Update
              </span>
              <div className="flex items-center text-gray-400 text-sm gap-1">
                <HiOutlineCalendar />
                <span>{item.date}</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">{item.fullDescription}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}