"use client";

import React from "react";
import Image from "next/image";
import { 
  FaGlobe, FaUserCheck, FaPenNib, FaGraduationCap, 
  FaHandsHelping, FaRocket, FaLightbulb, FaComments, 
  FaChalkboardTeacher, FaProjectDiagram, FaHeartbeat, 
  FaTrophy, FaBriefcase, FaTicketAlt
} from "react-icons/fa";

export default function AwardsSection() {
  const awards = [
    { title: "SDG Fellowship Support", icon: <FaGlobe />, desc: "Comprehensive support in applying for SDG Fellowship during admission to Overseas Universities." },
    { title: "UN SDG Summit Recommendation", icon: <FaUserCheck />, desc: "Recommendation for participation in the SDG Summit held at the United Nations every year." },
    { title: "Zero Olympiad National Envoy", icon: <FaPenNib />, desc: "Inclusion in Zero Olympiad Clubs formed in educational institutions across the country through various activities." },
    { title: "International Bootcamp & Scholarships", icon: <FaGraduationCap />, desc: "Winners can join the International Bootcamp at APU, Malaysia. They also receive scholarships from USA and Japan." },
    { title: "Youth Peace & Global Recognition", icon: <FaHandsHelping />, desc: "Participants receive the Youth Peace Fellow Award and global exposure for their achievements." },
    { title: "Year-Long Engagement", icon: <FaBriefcase />, desc: "Engage through Zero Olympiad Clubs nationwide with competitions, workshops, and innovative project funding." },
  ];

  const scholarships = [
    { title: "Daffodil Institute Scholarship", icon: <FaGraduationCap />, desc: "Full scholarship for 'Empowering Future Leaders' program - 8 modules, 24 sessions." },
    { title: "S@ifur's IELTS Course", icon: <FaComments />, desc: "Full scholarship for online IELTS course - 27 classes and 39 comprehensive lessons." },
    { title: "10 Minute School", icon: <FaChalkboardTeacher />, desc: "Customized course scholarship from Bangladesh's leading e-learning platform." },
    { title: "Mana Bay Water Park", icon: <FaTicketAlt />, desc: "Day Long Pass for unlimited aquatic adventure on 17 thrilling rides across 60,000 sq ft." },
    { title: "Ad Din Foundation Medical", icon: <FaHeartbeat />, desc: "Zero Fee Medical vouchers for healthcare services." },
    { title: "Sports Development", icon: <FaTrophy />, desc: "Full scholarship from Bangladesh Sports Development Foundation to learn from Professional Coaches." },
  ];

  const activities = [
    { title: "Case Study Competition", icon: <FaLightbulb />, desc: "Teams collaborate to find innovative solutions to various social problems." },
    { title: "Debate & Public Speaking", icon: <FaComments />, desc: "Present ideas and develop argumentation skills in competitive settings." },
    { title: "Workshops & Seminars", icon: <FaChalkboardTeacher />, desc: "Special training sessions focused on practical skill development." },
    { title: "Project Implementation", icon: <FaProjectDiagram />, desc: "Funding opportunities to implement your innovative ideas into reality." },
  ];

  return (
    <section className="relative w-full py-20 px-4 md:px-10 lg:px-20 overflow-hidden bg-[#0b0418]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="https://i.ibb.co/CKpbjfNn/EYE01386.jpg" 
          alt="Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-Secondary/80 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section 1: Awards & Opportunities */}
        <div className="text-center mb-10">
           <span className="bg-white/10 text-white text-[10px] px-3 py-1 rounded-full border border-white/20">17 finalists who will receive awards</span>
           <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">Awards & <span className="text-Primary">Opportunities</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {awards.map((item, i) => <Card key={i} {...item} />)}
        </div>

        {/* Section 2: Scholarships & Sponsorships */}
        <div className="text-center mb-10">
           <h2 className="text-3xl md:text-4xl font-bold text-white">Scholarships & Sponsorships <span className="text-Primary">(Season One)</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {scholarships.map((item, i) => <Card key={i} {...item} />)}
        </div>

        {/* Section 3: Additional Activities */}
        <div className="text-center mb-10">
           <h2 className="text-3xl md:text-4xl font-bold text-white">Additional <span className="text-Primary">Activities</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {activities.map((item, i) => <WideCard key={i} {...item} />)}
        </div>

        {/* Bottom Button */}
        <div className="mt-16 flex justify-center">
          <button className="bg-Primary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 shadow-xl text-sm md:text-base">
            What prizes will be awarded in Zero Olympiad 2026? →
          </button>
        </div>
      </div>
    </section>
  );
}

// Sub-components for Clean Code
function Card({ title, icon, desc }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-xl hover:bg-white/20 transition-all group">
      <div className="text-Primary text-2xl mb-4 p-2 bg-Primary/10 w-fit rounded-lg group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-300 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

function WideCard({ title, icon, desc }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-xl flex items-start gap-4 hover:bg-white/20 transition-all">
      <div className="text-Primary text-3xl p-3 bg-white/5 rounded-xl">
        {icon}
      </div>
      <div>
        <h3 className="text-white font-bold text-lg">{title}</h3>
        <p className="text-gray-400 text-sm">{desc}</p>
      </div>
    </div>
  );
}