"use client";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[40vh] flex items-center bg-[#4080ab] px-6 py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
            <p className="text-white text-sm font-medium tracking-wide">
              Welcome to Zero Olympiad
            </p>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Reducing to <span className="text-white">Zero,</span> <br />
            <span className="text-Primary">Rising as Hero</span>
          </h1>

          <p className="text-blue-50 text-lg md:text-xl max-w-xl leading-relaxed">
            Zero Olympiad empowers International students with SDG knowledge,
            global awareness, and leadership skills to become future-ready
            Global Leaders.
          </p>

          <Link href={"/registration"}>
            <button className="bg-Primary hover:bg-Secondary text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg active:scale-95">
              Register Now <span>→</span>
            </button>
          </Link>
        </div>

        <div className="relative animate-in fade-in slide-in-from-right-10 duration-1000">
          <div className="absolute -inset-1 bg-black/20 rounded-[35px] blur-xl"></div>

          <div className="relative bg-black p-3 rounded-[32px] shadow-2xl overflow-hidden ">
            <div className="relative overflow-hidden rounded-[22px] aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/zeWD8T0RxN0"
                title="জিরো অলিম্পিয়াডের থিম সং"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="flex justify-between items-center px-4 py-2 bg-black">
              <div className="flex items-center gap-2"></div>
              <div className="text-[10px] text-gray-500 font-mono">
                ZERO OLYMPIAD OFFICIAL
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
