"use client";

import {
  FaClock,
  FaPlay,
  FaExclamationTriangle,
  FaBan,
  FaShieldAlt,
  FaFlag,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Link from "next/link";

// ✅ SDG Data Mapping
const sdgData = {
  1: { title: "No Poverty", desc: "Zero Poverty" },
  2: { title: "Zero Hunger", desc: "Zero Hunger" },
  3: { title: "Good Health and Well-being", desc: "Zero Illness" },
  4: { title: "Quality Education", desc: "Zero Illiteracy" },
  5: { title: "Gender Equality", desc: "Zero Gender Inequality" },
  6: { title: "Clean Water and Sanitation", desc: "Zero Water Scarcity" },
  7: { title: "Affordable and Clean Energy", desc: "Zero Energy Inaccessibility" },
  8: { title: "Decent Work and Economic Growth", desc: "Zero Economic Inequality" },
  9: { title: "Industry, Innovation and Infrastructure", desc: "Zero Unfair Industrial Practices" },
  10: { title: "Reduced Inequality", desc: "Zero Inequality" },
  11: { title: "Sustainable Cities and Communities", desc: "Zero Unsafe Cities" },
  12: { title: "Responsible Consumption and Production", desc: "Zero Unaccountable Consumption" },
  13: { title: "Climate Action", desc: "Zero Environmental Degradation" },
  14: { title: "Life Below Water", desc: "Zero Ocean Pollution" },
  15: { title: "Life on Land", desc: "Zero Land Contamination" },
  16: { title: "Peace and Justice Strong Institutions", desc: "Zero Injustice" },
  17: { title: "Partnerships to achieve the Goal", desc: "Zero Partnership Gaps" },
};

/** Normalize API values like "initial round_1", "round_2", "Round_3" */
function getCompetitionRoundKey(roundType) {
  if (!roundType || typeof roundType !== "string") return "round_1";
  const n = roundType.toLowerCase().replace(/\s+/g, "_");
  if (n.includes("round_3")) return "round_3";
  if (n.includes("round_2")) return "round_2";
  return "round_1";
}

function formatCompetitionRoundTitle(roundType) {
  const key = getCompetitionRoundKey(roundType);
  if (key === "round_3") return "Round 3 — Grand Finale";
  if (key === "round_2") return "Round 2 — Selection";
  return "Round 1 — Preliminary";
}

const UserDashboard = () => {
  const authState = useSelector((state) => state.auth);
  const { user = null } = authState || {};
  const userName = user?.name || "User";
  const roundKey = getCompetitionRoundKey(user?.round_type);
  const roundTitle = formatCompetitionRoundTitle(user?.round_type);

  const examRules = [
    {
      id: 1,
      title: "Time Management",
      desc: "You have strictly 30 minutes. The quiz will auto-submit when the time is up.",
      icon: <FaClock size={24} className="text-blue-600" />,
      bg: "bg-blue-50",
      border: "border-blue-100",
    },
    {
      id: 2,
      title: "Navigation Restricted",
      desc: "Do not refresh the page or use the back button. It will terminate your session.",
      icon: <FaBan size={24} className="text-red-600" />,
      bg: "bg-red-50",
      border: "border-red-100",
    },
    {
      id: 3,
      title: "Security Protocols",
      desc: "Switching tabs or minimizing the window will trigger a security warning.",
      icon: <FaShieldAlt size={24} className="text-indigo-600" />,
      bg: "bg-indigo-50",
      border: "border-indigo-100",
    },
    {
      id: 4,
      title: "Disqualification Policy",
      desc: "After 3 security warnings, you will be automatically disqualified from the quiz.",
      icon: <FaFlag size={24} className="text-orange-600" />,
      bg: "bg-orange-50",
      border: "border-orange-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      
      {/* Welcome Banner — large hero for dashboard */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f172a] text-white shadow-2xl shadow-slate-900/25 md:rounded-[2.5rem]"
      >
        {/* layered glow / depth */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-black/20"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl sm:h-96 sm:w-96"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-white/5 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-[12%] top-1/2 hidden h-px w-32 -translate-y-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent lg:block"
          aria-hidden
        />

        <div className="relative z-10 flex min-h-[260px] flex-col gap-10 px-6 py-10 sm:px-10 sm:py-12 md:min-h-[300px] md:px-12 md:py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-14 lg:py-16">
          <div className="max-w-2xl flex-1">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-white/65 md:text-xs">
              Your learning hub
            </p>
            <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl md:text-5xl lg:text-6xl">
              Welcome back,
              <span className="mt-1 block bg-gradient-to-r from-white via-blue-50 to-white/90 bg-clip-text text-transparent md:mt-2">
                {userName}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-blue-100/95 md:text-lg">
              This is your space to practice, learn from mistakes, and grow
              smarter every day.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                prefetch={false}
                href="/dashboard/mycourses"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-blue-700 shadow-lg shadow-black/15 transition hover:bg-blue-50 hover:shadow-xl active:scale-[0.98] sm:px-8 sm:py-4 sm:text-base"
              >
                <FaPlay className="text-sm opacity-90" />
                Continue Courses
              </Link>
              <Link
                prefetch={false}
                href="/dashboard/quizzes"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-[0.98] sm:px-8 sm:py-4 sm:text-base"
              >
                View quizzes
              </Link>
            </div>
          </div>

          {/* Current competition round + conditional copy */}
          <div className="relative flex w-full max-w-sm shrink-0 flex-col items-stretch lg:items-end">
            <div className="relative w-full rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                Your current round
              </p>
              <p className="mt-2 text-xl font-black text-white md:text-2xl">
                {roundTitle}
              </p>
              {roundKey === "round_2" && (
                <>
                  <p className="mt-3 rounded-xl border border-amber-300/40 bg-amber-400/15 px-3 py-2 text-xs font-bold text-amber-100">
                    Congratulations — you&apos;ve advanced to Round 2!
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-blue-100/90">
                    Submit your video presentation from the Video Submission page and watch for updates after jury evaluation. You can also take Round 2 quizzes from My Quizzes when they are available.
                  </p>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    <Link
                      prefetch={false}
                      href="/dashboard/video-submission"
                      className="inline-flex items-center justify-center rounded-lg bg-white/95 px-4 py-2.5 text-xs font-bold text-blue-800 shadow-md transition hover:bg-white"
                    >
                      Video submission
                    </Link>
                    <Link
                      prefetch={false}
                      href="/dashboard/quizzes"
                      className="inline-flex items-center justify-center rounded-lg border border-white/50 bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/20"
                    >
                      My quizzes
                    </Link>
                  </div>
                </>
              )}
              {roundKey === "round_3" && (
                <>
                  <p className="mt-3 rounded-xl border border-emerald-300/40 bg-emerald-400/15 px-3 py-2 text-xs font-bold text-emerald-50">
                    Congratulations — you&apos;re in the Grand Finale!
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-blue-100/90">
                    Follow official announcements for final presentation guidelines and schedules. Keep an eye on your dashboard for any last updates.
                  </p>
                </>
              )}
              {roundKey === "round_1" && (
                <p className="mt-3 text-sm leading-relaxed text-blue-100/85">
                  You&apos;re in Round 1. Use courses to prepare, then complete your qualifying quiz when you&apos;re ready.
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {roundKey === "round_2" ? (
                  <>
                    <span className="rounded-lg bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white/90">
                      Round 2
                    </span>
                    <span className="rounded-lg bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white/90">
                      Video
                    </span>
                  </>
                ) : roundKey === "round_3" ? (
                  <>
                    <span className="rounded-lg bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white/90">
                      Finale
                    </span>
                    <span className="rounded-lg bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white/90">
                      Grand stage
                    </span>
                  </>
                ) : (
                  <>
                    <span className="rounded-lg bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white/90">
                      Learn
                    </span>
                    <span className="rounded-lg bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white/90">
                      Quiz
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="absolute -right-4 -top-4 hidden h-24 w-24 rounded-2xl border border-white/10 bg-white/5 sm:block" aria-hidden />
          </div>
        </div>
      </motion.div>

      {/* ✅ কন্ডিশনাল SDG ইনফরমেশন কার্ড (Welcome Banner এর ঠিক নিচে) */}
      {user?.assigned_sdg_number && sdgData[user.assigned_sdg_number] && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 p-6 md:p-8 rounded-[2rem] relative overflow-hidden shadow-sm"
        >
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
            <span className="text-9xl font-black text-emerald-600">
              {user.assigned_sdg_number}
            </span>
          </div>
          <div className="relative z-10">
            <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">
              Your Assigned Topic (SDG Goal)
            </h3>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">
              SDG {user.assigned_sdg_number}: {sdgData[user.assigned_sdg_number].title}
            </h2>
            <p className="text-slate-600 font-medium leading-relaxed max-w-3xl">
              Focus Area: {sdgData[user.assigned_sdg_number].desc}
            </p>
          </div>
        </motion.div>
      )}

      {/* --- Static Instructions Section --- */}
      <div className="max-w-full mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                <FaExclamationTriangle size={20} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Important Exam Instructions
            </h2>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {examRules.map((rule) => (
                <motion.div 
                    key={rule.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: rule.id * 0.1 }}
                    className={`flex items-start gap-4 p-6 rounded-2xl border ${rule.bg} ${rule.border} hover:shadow-md transition-all`}
                >
                    <div className="mt-1 bg-white p-3 rounded-xl shadow-sm">
                        {rule.icon}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 text-lg mb-1">{rule.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
                            {rule.desc}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Warning Note */}
        <div className="mt-8 p-5 bg-white border-l-4 border-red-500 rounded-r-xl shadow-sm flex items-start gap-4">
            <div className="text-red-500 mt-1">
                <FaShieldAlt size={22} />
            </div>
            <div>
                <h4 className="font-bold text-gray-800">Strict Monitoring Active</h4>
                <p className="text-sm text-gray-500 mt-1">
                    Our system uses AI detection to monitor screen activity. Any attempt to switch tabs, take screenshots, or use external tools will be recorded and may lead to an immediate ban.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;