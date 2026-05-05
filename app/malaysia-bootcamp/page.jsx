import React from "react";
import {
  Calendar,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const MalaysiaBootcampPremium = () => {
  const activities = [
    "Poster Presentation",
    "Panel Discussion",
    "Workshop & Seminar",
    "Debate Competition",
    "City Tour & Excursion",
  ];

  return (
    <div className="bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* --- 1. HERO SECTION --- */}
      <section className="relative min-h-[90vh] w-full flex flex-col justify-center overflow-hidden">
        {/* Background Image: Petronas Towers / KL Skyline */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2070"
            alt="Malaysia Skyline"
            className="w-full h-full object-cover object-top"
          />
          {/* Gradient Overlays for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-transparent"></div>
          <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 py-20 lg:py-0 text-white">
          <div className="max-w-3xl">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white text-sm font-black tracking-widest rounded-full shadow-lg shadow-red-600/30">
                <FaStar className="text-yellow-300" />
                BOOTCAMP
                <FaStar className="text-yellow-300" />
              </span>
              <span className="px-4 py-2 border border-blue-400/50 bg-blue-500/20 backdrop-blur-md text-blue-200 text-sm font-bold tracking-wider rounded-full">
                10 - 12 JULY
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter leading-[1.1]">
              BOOTCAMP IN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                MALAYSIA
              </span>
            </h1>

            <p className="text-xl md:text-3xl text-slate-200 mb-10 font-light flex items-center gap-3">
              <span className="text-yellow-400 font-black text-4xl">@</span>
              Asia Pacific University (APU)
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                href="https://docs.google.com/forms/u/0/d/e/1FAIpQLSeuDma33WalqpiH2tFZxDWzww5hYCa227gvTa_ATzp75dzFJg/formResponse"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-105"
              >
                Apply Now <ArrowRight size={20} />
              </Link>
              <a
                href="#details"
                className="flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
              >
                View Activities
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce hidden md:block">
          <ChevronDown size={32} className="opacity-60" />
        </div>
      </section>

      {/* --- 2. QUICK INFO BAR --- */}
      <section className="relative z-20 -mt-10 container mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-hidden">
          <div className="flex-1 p-6 md:p-8 flex items-center gap-5 hover:bg-slate-50 transition-colors">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
              <Calendar size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Date
              </p>
              <p className="text-lg font-bold text-slate-800">10 - 12 July</p>
            </div>
          </div>
          <div className="flex-1 p-6 md:p-8 flex items-center gap-5 hover:bg-slate-50 transition-colors">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
              <MapPin size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Location
              </p>
              <p className="text-lg font-bold text-slate-800">
                APU Campus, Malaysia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. MAIN CONTENT: ACTIVITIES & ELIGIBILITY --- */}
      <section id="details" className="py-24 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Activities Checklist */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900">
              Program Features
            </h2>
            <p className="text-slate-500 text-lg mb-10">
              Join us for three days of intensive learning, networking, and
              exploration at one of Malaysia's premier technological
              universities.
            </p>

            <div className="space-y-6">
              {activities.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 transition-all border border-transparent hover:border-slate-100"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <CheckCircle2 size={24} className="text-blue-600" />
                  </div>
                  <span className="text-xl font-bold text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Exclusive Eligibility Card */}
          <div id="register" className="relative">
            {/* Decorative background blur */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-400 opacity-20 blur-2xl rounded-3xl"></div>

            <div className="relative bg-slate-900 rounded-[2.5rem] p-10 md:p-14 shadow-2xl border border-slate-700 overflow-hidden">
              {/* Internal decorative shapes */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 text-red-400 mb-6">
                  <ShieldAlert size={32} />
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                  Exclusive <br /> Participation
                </h3>

                <p className="text-xl text-blue-200 font-medium mb-8">
                  Only{" "}
                  <span className="text-white font-bold bg-blue-600/30 px-2 py-1 rounded">
                    Zero Olympiad participants
                  </span>{" "}
                  are eligible to apply.
                </p>

                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-8">
                  <p className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-2">
                    Register At
                  </p>
                  <Link
                    href="/registration"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-semibold text-blue-500 border border-blue-300 px-3 py-1 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-all"
                  >
                    Registration
                  </Link>
                </div>

               
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MalaysiaBootcampPremium;
