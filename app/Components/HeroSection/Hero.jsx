"use client";

import React from "react";
import Image from "next/image";
import { FaArrowRight, FaCalendarAlt, FaUsers, FaTrophy } from "react-icons/fa";
import { IoIosStarOutline } from "react-icons/io";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import Link from "next/link";

export default function HeroSection() {
  const bgImages = ["https://i.ibb.co/k2v3PvBP/IMG-8336.jpg", "https://i.ibb.co/CKpbjfNn/EYE01386.jpg", "https://i.ibb.co/4RTckv6N/EYE02010.jpg"];

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center font-sans">
      {/* --- Background Slider Part --- */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={true}
          className="h-full w-full"
        >
          {bgImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={img}
                  alt={`Background ${index}`}
                  fill
                  className="object-cover animate-slow-zoom"
                  priority
                />

                <div className="absolute inset-0  opacity-65 mix-blend-hard-light" />

                <div className="absolute inset-0 bg-gradient-to-br from-[#266D9A]/90 via-[#266D9A]/40 to-[#266D9A]/90" />

                <div className="absolute inset-0 bg-Secondary/70" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- Main Content Part --- */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col items-center text-center">
        {/* Floating Badge */}
        <div className="mb-8">
          <span className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 py-2 rounded-full text-sm md:text-sm font-medium flex items-center gap-2 shadow-2xl">
            <span className="text-Secondary animate-pulse"><IoIosStarOutline /></span> Welcome to Zero Olympiad
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
          Reducing to Zero,{" "}
          <span className="text-Primary">
            Rising as Hero
          </span>
        </h1>

    

        {/* Buttons Section */}
        <div className="flex flex-wrap justify-center gap-5 mb-16">
          <Link href={'/registration'}>
          <button className="flex items-center gap-3 bg-Primary hover:bg-Secondary text-white px-8 py-4 rounded-xl font-bold text-base transition-all transform hover:scale-105  group">
            Register Now
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          </Link>

          <button className="flex items-center gap-3 bg-white/5 backdrop-blur-md border-2 border-white text-white hover:bg-Primary px-8 py-4 rounded-xl font-bold text-base transition-all transform hover:scale-105 group">
            Learn More{" "}
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {[
            {
              icon: <FaCalendarAlt />,
              number: "18 February 2026",
              label: "Registration Deadline",
            },
            {
              icon: <FaUsers />,
              number: "3 Categories",
              label: "For All Students",
            },
            {
              icon: <FaTrophy />,
              number: "17 SDGs",
              label: "Competition Topic",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-[15px] border border-white/10 rounded-3xl p-8 transition-all hover:bg-white/15 hover:-translate-y-2 group shadow-2xl"
            >
              <div className="text-4xl text-Primary mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-xl font-bold text-white mb-1 tracking-tight">{stat.number}</div>
              <div className="text-gray-300 text-xs font-semibold uppercase tracking-widest opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes slowZoom {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-slow-zoom {
          animation: slowZoom 25s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}
