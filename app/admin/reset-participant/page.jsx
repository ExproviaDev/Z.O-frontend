"use client";
import { useState } from "react";
import { FiSearch, FiRefreshCw, FiUser, FiAlertTriangle } from "react-icons/fi";
import { MdOutlineRestartAlt } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

export default function ResetParticipantPage() {
  const [email, setEmail] = useState("");
  const [searching, setSearching] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [participant, setParticipant] = useState(null);
  const [searchError, setSearchError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSearching(true);
    setSearchError("");
    setParticipant(null);

    try {
      const res = await axios.get(`${API_URL}/api/admin/search-participant`, {
        headers: authHeaders(),
        params: { email: email.trim() },
      });
      setParticipant(res.data.data);
    } catch (err) {
      const msg = err.response?.data?.error || "Search failed. Please try again.";
      setSearchError(msg);
    } finally {
      setSearching(false);
    }
  };

  const handleReset = async () => {
    if (!participant) return;

    const confirm = await Swal.fire({
      title: "Reset quiz data?",
      html: `
        <p class="text-gray-600 mt-1">This will permanently delete all quiz submission records for:</p>
        <p class="font-bold text-gray-900 mt-2">${participant.name}</p>
        <p class="text-sm text-gray-500">${participant.email}</p>
        <p class="mt-3 text-sm text-amber-600 font-semibold">They will be able to retake the quiz after reset.</p>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, reset data",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    setResetting(true);
    try {
      const res = await axios.post(
        `${API_URL}/api/admin/reset-participant`,
        { user_id: participant.user_id },
        { headers: authHeaders() }
      );

      await Swal.fire({
        title: "Reset successful",
        text: res.data.message,
        icon: "success",
        confirmButtonColor: "#10b981",
      });

      // Refresh participant card to show updated state
      setParticipant((prev) => ({
        ...prev,
        is_participated: false,
        submission_count: 0,
      }));
    } catch (err) {
      Swal.fire({
        title: "Reset failed",
        text: err.response?.data?.error || "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <MdOutlineRestartAlt className="text-red-500 text-3xl" />
            <h1 className="text-2xl font-extrabold text-slate-900">Reset Participant</h1>
          </div>
          <p className="text-sm text-slate-500 ml-10">
            Search a participant by email and clear their quiz submission data so they can retake the quiz.
          </p>
        </div>

        {/* Warning banner */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <FiAlertTriangle className="text-amber-500 text-lg mt-0.5 shrink-0" />
          <p className="text-sm text-amber-800 font-medium">
            This action <span className="font-bold">permanently deletes</span> the participant&apos;s quiz submissions and resets their participation status. It cannot be undone.
          </p>
        </div>

        {/* Search form */}
        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            Participant Email
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSearchError("");
                  setParticipant(null);
                }}
                placeholder="participant@email.com"
                required
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-slate-400 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={searching}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white text-sm font-bold rounded-xl hover:bg-slate-900 transition-all disabled:opacity-60"
            >
              {searching ? (
                <FiRefreshCw className="animate-spin" />
              ) : (
                <FiSearch />
              )}
              {searching ? "Searching…" : "Search"}
            </button>
          </div>

          {searchError && (
            <p className="mt-3 text-sm text-red-500 font-medium">{searchError}</p>
          )}
        </form>

        {/* Participant card */}
        {participant && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl font-black text-slate-700 border border-slate-200">
                  {participant.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 text-lg">{participant.name}</p>
                  <p className="text-sm text-slate-500">{participant.email}</p>
                </div>
              </div>
              <span
                className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-full ${
                  participant.is_participated
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {participant.is_participated ? "Participated" : "Not participated"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Role</p>
                <p className="text-sm font-bold text-slate-800">{participant.role}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">SDG Role</p>
                <p className="text-sm font-bold text-slate-800">{participant.sdg_role || "—"}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">SDG Number</p>
                <p className="text-sm font-bold text-slate-800">{participant.assigned_sdg_number || "—"}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Submissions</p>
                <p className="text-sm font-bold text-slate-800">{participant.submission_count}</p>
              </div>
            </div>

            {participant.is_participated || participant.submission_count > 0 ? (
              <button
                onClick={handleReset}
                disabled={resetting}
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all disabled:opacity-60 shadow-sm"
              >
                {resetting ? (
                  <FiRefreshCw className="animate-spin" />
                ) : (
                  <MdOutlineRestartAlt className="text-xl" />
                )}
                {resetting ? "Resetting…" : "Reset Quiz Data"}
              </button>
            ) : (
              <div className="text-center py-3 text-sm text-gray-400 font-medium bg-gray-50 rounded-xl border border-dashed">
                No quiz data to reset — this participant has not submitted a quiz yet.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
