"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaCalendarAlt, FaToggleOn, FaSave, FaVideo } from "react-icons/fa";

const AdminVideoSettings = () => {
  const [settings, setSettings] = useState({
    current_active_round: "round_2", // ডিফল্ট ভ্যালু
    round_2_start: "",
    round_2_end: "",
    round_2_has_video: false,
  });
  const [loading, setLoading] = useState(true);

  // ১. বর্তমান সেটিংস লোড করা
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem("access_token");
      // ✅ FIX: Admin Route ব্যবহার করুন (video route নয়)
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // ডাটাবেস থেকে আসা ডাটা সেভ করা
      if(res.data) {
          setSettings(res.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Settings Load Error:", error);
      Swal.fire("Error", "Could not load settings.", "error");
      setLoading(false);
    }
  };

  /** Bangladesh (Asia/Dhaka, UTC+6, no DST) wall time for `<input type="datetime-local" />`. */
  const DHAKA_TZ = "Asia/Dhaka";
  const DHAKA_UTC_OFFSET_HOURS = 6;

  const formatDbTimeForDatetimeLocalDhaka = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return "";
    const s = d.toLocaleString("sv-SE", { timeZone: DHAKA_TZ });
    return s.replace(" ", "T").slice(0, 16);
  };

  /** Treat datetime-local value as Bangladesh civil time → ISO (UTC) for API/DB. */
  const parseDatetimeLocalDhakaToIso = (datetimeLocalValue) => {
    if (!datetimeLocalValue) return "";
    const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(datetimeLocalValue.trim());
    if (!m) return datetimeLocalValue;
    const y = Number(m[1]);
    const mo = Number(m[2]);
    const day = Number(m[3]);
    const h = Number(m[4]);
    const mi = Number(m[5]);
    const utcMs = Date.UTC(y, mo - 1, day, h - DHAKA_UTC_OFFSET_HOURS, mi);
    return new Date(utcMs).toISOString();
  };

  // ২. সেটিংস আপডেট করা
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      // ✅ FIX: Admin Update Route
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/update-settings`, settings, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Success", "Video submission settings updated!", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update settings.", "error");
    }
  };

  if (loading) return <div className="p-10 text-center animate-pulse">Loading settings...</div>;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-3xl mx-auto mt-10">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
         <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
            <FaVideo size={24} />
         </div>
         <h2 className="text-2xl font-bold text-gray-800">
            Video Submission Control
         </h2>
      </div>

      <form onSubmit={handleUpdate} className="space-y-8">
        {/* Enable/Disable Toggle */}
        <div className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-200">
          <div>
              <span className="font-bold text-gray-700 block">Enable Video Submission (Round 2)</span>
              <span className="text-xs text-gray-500">Toggle this to allow users to see the submission form.</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.round_2_has_video || false} // undefined হ্যান্ডেল করার জন্য
              onChange={(e) => setSettings({ ...settings, round_2_has_video: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {/* Date Inputs — values shown/edited as Bangladesh time; stored as ISO UTC on save */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Start Date & Time{" "}
              <span className="font-normal text-gray-400">(Bangladesh)</span>
            </label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="datetime-local"
                value={formatDbTimeForDatetimeLocalDhaka(settings.round_2_start)}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    round_2_start: parseDatetimeLocalDhakaToIso(e.target.value),
                  })
                }
                className="w-full pl-12 p-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              End Date (Deadline){" "}
              <span className="font-normal text-gray-400">(Bangladesh)</span>
            </label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-4 top-3.5 text-red-400" />
              <input
                type="datetime-local"
                value={formatDbTimeForDatetimeLocalDhaka(settings.round_2_end)}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    round_2_end: parseDatetimeLocalDhakaToIso(e.target.value),
                  })
                }
                className="w-full pl-12 p-3 bg-white border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-medium text-gray-600"
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 -mt-2">
          Times use 24-hour clock in Bangladesh (Asia/Dhaka, UTC+6). Stored on the server as UTC.
        </p>

        <button
          type="submit"
          className="w-full py-4 bg-[#0F172A] hover:bg-[#020617] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-black/20 active:scale-95"
        >
          <FaSave /> Save Changes
        </button>
      </form>
    </div>
  );
};

export default AdminVideoSettings;