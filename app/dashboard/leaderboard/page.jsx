"use client";

import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiActivity, FiChevronLeft, FiChevronRight, FiSearch, FiUsers } from "react-icons/fi";
import { api } from "../../lib/apiClient";

const fetchAllLeaderboardData = async ({ queryKey }) => {
  const [, round] = queryKey;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await api.get(`${baseUrl}/api/leaderboard`, {
    params: { page: 1, limit: 4000, round },
  });
  return res.data.data || [];
};

const fetchLeaderboardStatus = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await api.get(`${baseUrl}/api/leaderboard/status`);
  return res.data;
};

export default function PromotedSecondRoundPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [activeRound, setActiveRound] = useState("round_1");

  const { data: statusData, isLoading: isStatusLoading } = useQuery({
    queryKey: ["leaderboardStatus"],
    queryFn: fetchLeaderboardStatus,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchInterval: 15000,
  });

  const isPublic = statusData?.is_public;

  const { data: allStudents = [], isLoading } = useQuery({
    queryKey: ["userPromotedList", activeRound],
    queryFn: fetchAllLeaderboardData,
    enabled: !!isPublic,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  const filteredStudents = useMemo(() => {
    const searchLower = search.toLowerCase().trim();
    if (!searchLower) return allStudents;
    return allStudents.filter((student) =>
      (student.name || "").toLowerCase().includes(searchLower) ||
      (student.institution || "").toLowerCase().includes(searchLower) ||
      (student.status || "").toLowerCase().includes(searchLower),
    );
  }, [allStudents, search]);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
  const currentTableData = filteredStudents.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isStatusLoading || (isPublic && isLoading)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
        <p className="animate-pulse font-bold text-slate-400 tracking-widest text-xs uppercase">
          Fetching Promoted List...
        </p>
      </div>
    );
  }

  if (!isPublic) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="bg-white/80 backdrop-blur-lg p-12 rounded-[2.5rem] shadow-2xl border border-white/50 max-w-2xl w-full text-center relative z-10">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-gradient-to-tr from-indigo-600 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center shadow-lg shadow-indigo-200">
              <FiActivity className="text-4xl text-white animate-bounce" />
            </div>
          </div>
          <h2 className="text-5xl font-black text-slate-800 mb-4 tracking-tight">Coming Soon!</h2>
          <p className="text-slate-500 text-lg font-medium mb-2 leading-relaxed">
            Promoted to Second Round list will be published shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2 tracking-tight uppercase">
          Promoted to Second Round
        </h1>
        <p className="text-slate-500 text-base md:text-lg font-medium">
          Official promotion list for the next round.
        </p>
      </div>

      <div className="max-w-7xl mx-auto bg-white p-4 rounded-xl shadow border border-slate-100 mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex bg-slate-100 p-1 rounded-xl w-full lg:w-auto">
          {["round_1", "round_2", "round_3"].map((round) => (
            <button
              key={round}
              onClick={() => {
                setActiveRound(round);
                setPage(1);
                setSearch("");
              }}
              className={`flex-1 lg:flex-none px-5 py-2 rounded-lg text-xs font-black transition-all ${
                activeRound === round
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {round.replace("_", " ").toUpperCase()}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-80">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search name/institution/status..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 max-w-md mx-auto">
          <FiUsers className="mx-auto text-5xl text-slate-300 mb-4" />
          <p className="font-bold text-slate-400 italic">No participants found.</p>
        </div>
      ) : (
        <>
          <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow border border-slate-100 overflow-hidden mb-8">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest">Rank</th>
                  <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest">User Name</th>
                  <th className="p-5 text-xs font-black text-slate-400 uppercase tracking-widest">
                    Institution / Group / Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {currentTableData.map((student) => (
                  <tr key={`${student.rank}-${student.name}`} className="hover:bg-indigo-50/30 transition-all">
                    <td className="p-5">
                      <span className="text-lg font-black text-slate-500">#{student.rank}</span>
                    </td>
                    <td className="p-5">
                      <span className="font-bold text-slate-800">{student.name}</span>
                    </td>
                    <td className="p-5">
                      <p className="font-semibold text-slate-700">{student.institution || "N/A"}</p>
                      <p className="text-xs text-indigo-600 font-bold mt-1">
                        {activeRound === "round_1"
                          ? "First round participant"
                          : student.status || "Promoted"}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="max-w-7xl mx-auto flex justify-center items-center gap-4 pb-8">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-50"
              >
                <FiChevronLeft /> Prev
              </button>
              <span className="text-sm font-black text-slate-400 bg-white px-4 py-2 rounded-xl border border-slate-100">
                Page <span className="text-indigo-600">{page}</span> of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-50"
              >
                Next <FiChevronRight />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}