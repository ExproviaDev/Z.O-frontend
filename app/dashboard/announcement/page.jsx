"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HiOutlineSpeakerphone,
  HiOutlineCalendar,
} from "react-icons/hi";
import { motion } from "framer-motion";

export default function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "https://zero-olympiad-server.vercel.app/api/announcement/all",
        );
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"></div>
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
          <h1 className="text-2xl font-bold text-gray-800">
            (All Announcements)
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Find our latest updates and notices here.
          </p>
        </div>
      </div>

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
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-600">
                  New Update
                </span>
                <div className="flex items-center text-gray-400 text-sm gap-1">
                  <HiOutlineCalendar />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2  transition-colors">
              {item.title}
            </h3>

            <p className="text-gray-600 leading-relaxed text-sm">
              {item.fullDescription}
            </p>
          </motion.div>
        ))}
      </div>

      {announcements.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <HiOutlineSpeakerphone
            className="mx-auto text-gray-300 mb-4"
            size={50}
          />
          <p className="text-gray-500 font-medium">
            There are no announcements at this time.
          </p>
        </div>
      )}
    </div>
  );
}
