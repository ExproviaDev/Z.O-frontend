"use client";

import React from "react";
import Image from "next/image";
import {
  FaGlobe,
  FaUserCheck,
  FaPenNib,
  FaGraduationCap,
  FaHandsHelping,
  FaLightbulb,
  FaComments,
  FaChalkboardTeacher,
  FaProjectDiagram,
  FaHeartbeat,
  FaTrophy,
  FaTicketAlt,
  FaBriefcase,
  FaAward,
} from "react-icons/fa";
import Link from "next/link";

export default function AwardsSection() {
  const awards = [
    {
      title: "SDG Fellowship Support",
      icon: <FaGlobe />,
      desc: "Comprehensive support in applying for SDG Fellowship during admission to Overseas Universities.",
    },
    {
      title: "UN SDG Summit Recommendation",
      icon: <FaUserCheck />,
      desc: "Recommendation for participation in the SDG Summit held at the United Nations every year.",
    },
    {
      title: "Zero Olympiad National Envoy",
      icon: <FaPenNib />,
      desc: "Inclusion in Zero Olympiad Clubs formed in educational institutions across the country through various activities.",
    },
    {
      title: "International Bootcamp & Scholarships",
      icon: <FaGraduationCap />,
      desc: "Winners can join the International Bootcamp at APU, Malaysia. They also receive scholarships from USA and Japan.",
    },
    {
      title: "Youth Peace & Global Recognition",
      icon: <FaHandsHelping />,
      desc: "Participants receive the Youth Peace Fellow Award and global exposure for their achievements.",
    },
    {
      title: "Year-Long Engagement",
      icon: <FaBriefcase />,
      desc: "Engage through Zero Olympiad Clubs nationwide with competitions, workshops, and innovative project funding.",
    },
  ];

  const scholarships = [
    {
      title: "Daffodil Institute Scholarship",
      icon: <FaGraduationCap />,
      desc: "Full scholarship for 'Empowering Future Leaders' program - 8 modules, 24 sessions.",
    },
    {
      title: "S@ifur's IELTS Course",
      icon: <FaComments />,
      desc: "Full scholarship for online IELTS course - 27 classes and 39 comprehensive lessons.",
    },
    {
      title: "10 Minute School",
      icon: <FaChalkboardTeacher />,
      desc: "Customized course scholarship from Bangladesh's leading e-learning platform.",
    },
    {
      title: "Mana Bay Water Park",
      icon: <FaTicketAlt />,
      desc: "Day Long Pass for unlimited aquatic adventure on 17 thrilling rides across 60,000 sq ft.",
    },
    {
      title: "Ad Din Foundation Medical",
      icon: <FaHeartbeat />,
      desc: "Zero Fee Medical vouchers for healthcare services.",
    },
    {
      title: "Sports Development",
      icon: <FaTrophy />,
      desc: "Full scholarship from Bangladesh Sports Development Foundation to learn from Professional Coaches.",
    },
  ];

  const activities = [
    {
      title: "Case Study Competition",
      icon: <FaLightbulb />,
      desc: "Teams collaborate to find innovative solutions to various social problems.",
    },
    {
      title: "Debate & Public Speaking",
      icon: <FaComments />,
      desc: "Present ideas and develop argumentation skills in competitive settings.",
    },
    {
      title: "Workshops & Seminars",
      icon: <FaChalkboardTeacher />,
      desc: "Special training sessions focused on practical skill development.",
    },
    {
      title: "Project Implementation",
      icon: <FaProjectDiagram />,
      desc: "Funding opportunities to implement your innovative ideas into reality.",
    },
  ];

  return (
    <section className="relative w-full py-16 md:py-24 px-4 overflow-hidden">
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        style={{ clipPath: "inset(0 0 0 0)" }}
      >
        <div className="fixed inset-0 w-full h-full">
          <Image
            src="https://i.ibb.co/CKpbjfNn/EYE01386.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0  opacity-65 mix-blend-hard-light" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#266D9A]/100 via-[#266D9A]/50 to-[#266D9A]/100" />
          <div className="absolute inset-0 bg-Secondary/80" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] md:text-xs px-4 py-1.5 rounded-full mb-4">
            <FaAward className="text-Primary" /> 17 finalists who will receive
            awards
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Awards & <span className="text-Primary">Opportunities</span>
          </h2>
        </div>

        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {awards.map((item, i) => (
            <GlassCard key={i} {...item} />
          ))}
        </div>

        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Scholarships & Sponsorships{" "}
            <span className="text-Primary font-medium">(Season One)</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {scholarships.map((item, i) => (
            <GlassCard key={i} {...item} />
          ))}
        </div>

        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Additional <span className="text-Primary">Activities</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {activities.map((item, i) => (
            <WideGlassCard key={i} {...item} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/instruction">
            <button className="bg-Primary hover:bg-orange-600 text-white font-bold py-4 px-8 md:px-10 rounded-xl transition-all transform hover:scale-105 shadow-xl text-sm md:text-base">
              What prizes will be awarded in Zero Olympiad 2026? →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function GlassCard({ title, icon, desc }) {
  return (
    <div className="group bg-white/5 backdrop-blur-[12px] border border-white/10 p-7 rounded-2xl hover:bg-white/10 transition-all duration-300 flex flex-col items-start h-full shadow-xl">
      <div className="text-Primary text-3xl mb-5 p-3 bg-white/5 rounded-xl group-hover:scale-110 group-hover:bg-Primary group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-white font-bold text-xl mb-3 leading-snug">
        {title}
      </h3>
      <p className="text-gray-300 text-sm leading-relaxed opacity-80">{desc}</p>
    </div>
  );
}

function WideGlassCard({ title, icon, desc }) {
  return (
    <div className="bg-white/5 backdrop-blur-[12px] border border-white/10 p-6 rounded-2xl flex items-center gap-5 hover:bg-white/10 transition-all duration-300 shadow-xl">
      <div className="text-Primary text-4xl p-4 bg-white/5 rounded-2xl shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-white font-bold text-xl mb-1">{title}</h3>
        <p className="text-gray-400 text-sm leading-snug opacity-80">{desc}</p>
      </div>
    </div>
  );
}
