"use client";

import React, { useState, useEffect } from "react";

import {
  FaGlobeAmericas,
  FaLightbulb,
  FaRocket,
  FaUsers,
  FaArrowRight,
  FaPlay,
  FaQuoteLeft,
  FaCheckCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import Image from "next/image";
import HeroSection from "./components/heroSection";
import { IoMdArrowDropright } from "react-icons/io";

export default function ZeroOlympiad() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sdgs = [
    { id: 1, title: "No Poverty", color: "bg-[#E5243B]" },
    { id: 2, title: "Zero Hunger", color: "bg-[#DDA63A]" },
    { id: 3, title: "Good Health", color: "bg-[#4C9F38]" },
    { id: 4, title: "Quality Education", color: "bg-[#C5192D]" },
    { id: 5, title: "Gender Equality", color: "bg-[#FF3A21]" },
    { id: 6, title: "Clean Water", color: "bg-[#26BDE2]" },
    { id: 7, title: "Affordable Energy", color: "bg-[#FCC30B]" },
    { id: 8, title: "Decent Work", color: "bg-[#A21942]" },
    { id: 9, title: "Industry & Innovation", color: "bg-[#FD6925]" },
    { id: 10, title: "Reduced Inequality", color: "bg-[#DD1367]" },
    { id: 11, title: "Sustainable Cities", color: "bg-[#FD9D24]" },
    { id: 12, title: "Responsible Consumption", color: "bg-[#BF8B2E]" },
    { id: 13, title: "Climate Action", color: "bg-[#3F7E44]" },
    { id: 14, title: "Life Below Water", color: "bg-[#0A97D9]" },
    { id: 15, title: "Life On Land", color: "bg-[#56C02B]" },
    { id: 16, title: "Peace & Justice", color: "bg-[#00689D]" },
    { id: 17, title: "Partnerships", color: "bg-[#19486A]" },
  ];

  return (
    <div className="min-h-screen   text-slate-900 selection:bg-indigo-100 selection:text-indigo-700 font-sans antialiased">
      <div className="">
        {/* --- 1. HERO SECTION --- */}
        <section>
          <HeroSection></HeroSection>
        </section>

        {/* --- 2. ABOUT SECTION  founder--- */}

        <section
          id="mission"
          className="relative py-32 bg-white overflow-hidden"
        >
          {/* --- Dot Pattern Background Start --- */}
          <div
            className="absolute inset-0 z-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(#e2e8f0 1.5px, transparent 1.5px)`,
              backgroundSize: "24px 24px",
            }}
          />
          {/* --- Dot Pattern Background End --- */}

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              {/* Left Content */}
              <div className="relative">
                {/* Halka Indigo Glow Background - Dot pattern er upore thakbe */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-50/80 rounded-full -z-10 blur-2xl" />

                <div className="flex items-center text-4xl md:text-5xl  font-black mb-8 leading-tight text-slate-900">
                  <h2 className="   ">
                    <span className="text-Primary"> Founder </span>
                    OF Zero Olympiad
                  </h2>
                  <span className="text-Secondary">
                    <IoMdArrowDropright />
                  </span>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed mb-10">
                  I am a thirteen-year-old Child Rights Activist and Climate
                  Campaigner. I have already spoken in the United Nations, Ford
                  Foundation, TEDx, Harvard University, Columbia University,
                  Georgia Tech etc.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-10">
                  I regularly raise my voice against Global Warming, Climate
                  Change, Carbon Emission, Fossil Fuel etc. I talk to stop Child
                  Abuse, Gender Discrimination and Domestic Violence. I have
                  four published books. I run my own organization named CHIL&D
                  where I work for Climate, Health, Information, Learning and
                  Development.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-10">
                  I have pursued a Professional Development Program from the
                  Department of Continuing Education of University of Harvard. I
                  have obtained “President’s Award For Outstanding Academic
                  Excellence – Gold Certificate''. I have completed the "Gender
                  Equality and Human Rights in Climate Action and Renewable
                  Energy" course provided by United Nations Institute for
                  Training and Research.
                </p>
                <a 
  className="bg-Primary py-2 px-4 rounded-xs text-white hover:bg-Secondary transition-all duration-300 ease-in-out transform hover:scale-105"
  href="https://www.linkedin.com/in/faatihaaayat/"
>
  View More
</a>
              </div>

              {/* Right Image Container */}
              <div className="relative group">
                <div className="absolute inset-0 bg-indigo-600 rounded-[3rem] rotate-3 scale-105 opacity-5 group-hover:rotate-0 transition-transform duration-700" />
                <div className="relative aspect-video lg:aspect-square bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100">
                  <Image
                    src="https://res.cloudinary.com/dsga4gyw9/image/upload/v1770098853/DSC_0931_1_vmw4ge.jpg"
                    alt="Youth Change Makers"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-cover  hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 2. ABOUT SECTION  Managing derectory--- */}

        <section
          id="mission"
          className="relative py-32 bg-white overflow-hidden"
        >
          {/* --- Dot Pattern Background Start --- */}
          <div
            className="absolute inset-0 z-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(#e2e8f0 1.5px, transparent 1.5px)`,
              backgroundSize: "24px 24px",
            }}
          />
          {/* --- Dot Pattern Background End --- */}

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              {/* Left Content */}

              <div className="relative group">
                <div className="absolute inset-0 bg-indigo-600 rounded-[3rem] rotate-3 scale-105 opacity-5 group-hover:rotate-0 transition-transform duration-700" />
                <div className="relative aspect-video lg:aspect-square bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100">
                  <Image
                    src="https://res.cloudinary.com/dsga4gyw9/image/upload/v1770033230/IMG_8582_h5bn0q.jpg"
                    alt="Youth Change Makers"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-cover  hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                  />
                </div>
              </div>

              {/* Right Image Container */}
              <div className="relative">
                {/* Halka Indigo Glow Background - Dot pattern er upore thakbe */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-50/80 rounded-full -z-10 blur-2xl" />

                <div className="flex items-center text-4xl md:text-5xl  font-black mb-8 leading-tight text-slate-900">
                  <h2 className="   ">
                    Managing <span className="text-Primary"> Director </span>
                  </h2>
                  <span className="text-Secondary">
                    <IoMdArrowDropright />
                  </span>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed mb-10">
                  Having over 16 years of expertise in Business and Migration
                  Consultancy under my experience belt, I would love to make
                  more professional acquaintances. I believe in creating and
                  fostering relationships as a cornerstone of conducting
                  business.
                </p>

                <a
                  className="bg-Primary py-2 px-4 rounded-xs text-white hover:bg-Secondary transition-all duration-300 ease-in-out transform hover:scale-105"
                  href="https://www.linkedin.com/in/barristeraftab/"
                >
                  View More
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* --- 4. MISSION VISION VALUES --- */}

        <section
          id="vision-mission"
          className="relative py-32 overflow-hidden "
        >
          <div className="absolute top-0 left-0 w-full flex justify-center z-20">
            <div className="w-1/2 h-[2px] bg-gradient-to-r from-transparent via-Primary to-transparent opacity-50"></div>
          </div>

          {/* --- Background Image Wrapper --- */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://i.ibb.co.com/99HFrKfK/speaker-bg.png"
              alt="Architecture Background"
              className="w-full h-full object-cover"
            />
            {/* Overlay: Jate background image ta cards er upor beshi pressure na dey */}
            <div className="absolute inset-0 "></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Mission",
                  content:
                    "To strategically mobilize 10 million young leaders globally by the year 2030, empowering them to actively dismantle systemic barriers to sustainability and social equality while fostering a movement of impactful, youth-led change across the world.",
                  bg: "bg-slate-900/90 text-white", // 90% opacity
                },
                {
                  title: "Vision",
                  content:
                    "We envision a future world where every single young person is fully equipped with the necessary agency, technical resources, and global support systems required to confront and solve humanity’s most complex and pressing challenges effectively.",
                  bg: "bg-white/90 text-slate-900", // 90% opacity
                },
                {
                  title: "Values",
                  content:
                    "Our foundation is built upon Radical Innovation to challenge the status quo, Unwavering Integrity in every action, Global Inclusivity to ensure no one is left behind, and an ‘Action-First’ Mindset that prioritizes tangible results in everything we build.",
                  bg: "bg-indigo-600/90 text-white", // Thora different color for contrast
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className={`${card.bg} p-12 rounded-[3rem] transition-all hover:scale-[1.05] cursor-default shadow-2xl backdrop-blur-md border border-white/10`}
                >
                  <h3 className="text-3xl font-black mb-8 tracking-tighter italic uppercase">
                    {card.title}
                  </h3>
                  <p className="text-lg opacity-90 leading-relaxed font-medium">
                    {card.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 5. JOURNEY SECTION --- */}
        <section
          id="the-journey"
          className="py-32 bg-slate-950 text-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div className="max-w-2xl">
                <span className="text-indigo-400 font-black tracking-[0.3em] uppercase text-sm">
                  Path to Impact
                </span>
                <h2 className="text-4xl md:text-6xl font-black mt-4 tracking-tighter italic">
                  The Participant Journey
                </h2>
              </div>
              <p className="text-slate-400 max-w-sm font-light">
                From a spark of an idea to a global stage—here is how you evolve
                through Zero Olympiad.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
              {[
                {
                  step: "01",
                  title: "Registration",
                  desc: "Join the global network and select your SDG focus area.",
                },
                {
                  step: "02",
                  title: "Knowledge",
                  desc: "Comprehensive MCQ round testing global awareness.",
                },
                {
                  step: "03",
                  title: "Creation",
                  desc: "Submit a high-impact video pitching your innovative solution.",
                },
                {
                  step: "04",
                  title: "Finale",
                  desc: "Present live to a panel of UN experts and global leaders.",
                },
                {
                  step: "05",
                  title: "Recognition",
                  desc: "Earn international awards and project funding support.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors group"
                >
                  <span className="text-4xl font-black text-indigo-500 opacity-30 mb-8 block group-hover:opacity-100 transition-opacity italic">
                    {item.step}
                  </span>
                  <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 8. FOUNDER SPOTLIGHT --- */}
        <section id="founder" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-slate-900 rounded-4xl overflow-hidden flex flex-col lg:flex-row items-stretch shadow-3xl">
              <div className="lg:w-1/2 relative h-[500px] lg:h-auto">
                <Image
                  src="https://res.cloudinary.com/dsga4gyw9/image/upload/v1770033233/IMG_8818_bdrqrv.jpg"
                  alt="Fatiha Ayat"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover "
                />
                <div className="absolute inset-0 bg-indigo-900/30 mix-blend-multiply" />
              </div>
              <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center text-white">
                <FaQuoteLeft className="text-indigo-500 text-5xl mb-8 opacity-50" />
                <h3 className="text-3xl lg:text-5xl font-black italic tracking-tighter mb-8 leading-tight">
                  "The youth are not just the leaders of tomorrow—we are the
                  architects of today's solutions."
                </h3>
                <div className="space-y-6 mb-12">
                  <p className="text-xl font-black italic text-indigo-400 tracking-tight">
                    Faatiha Ayat — Founder
                  </p>
                  <p className="text-slate-400 font-light leading-relaxed">
                    A child rights activist, climate campaigner, and global
                    orator, Fatiha Ayat founded Zero Olympiad with a singular
                    vision: to empower the youth to take ownership of the
                    planet's destiny. Through her representation at the UN and
                    global summits, she has mobilized thousands of students to
                    join the movement for a "Zero Challenge" future.
                  </p>
                </div>
                <div className="flex gap-4">
                  {["UN Representative", "Author", "Activist"].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold tracking-widest uppercase border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- ANIMATIONS --- */}
        <style jsx global>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          html {
            scroll-behavior: smooth;
          }
        `}</style>
      </div>
    </div>
  );
}
