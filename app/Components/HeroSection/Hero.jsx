"use client";

import React from "react";
import Image from "next/image";
import { FaArrowRight, FaCalendarAlt, FaUsers, FaTrophy } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

export default function HeroSection() {
  const bgImages = ["/src/gallery/img5.jpg", "/src/gallery/img9.jpg"];

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

                <div className="absolute inset-0 bg-[#191280ec] opacity-65 mix-blend-hard-light" />

                <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b]/90 via-[#4c1d95]/40 to-[#0f172a]/90" />

                <div className="absolute inset-0 bg-black/20" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- Main Content Part --- */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col items-center text-center">
        {/* Floating Badge */}
        <div className="mb-8">
          <span className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-5 py-2 rounded-full text-xs md:text-sm font-medium flex items-center gap-2 shadow-2xl">
            <span className="text-pink-500 animate-pulse">★</span> Reducing to
            Zero, Rising as Hero
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
          Welcome to{" "}
          <span className="text-pink-600 drop-shadow-[0_10px_20px_rgba(255,26,117,0.5)]">
            Zero Olympiad
          </span>
        </h1>

        {/* Hero Description */}
        <p className="text-base md:text-xl text-gray-100 max-w-2xl mx-auto font-light leading-relaxed mb-10 drop-shadow-md">
          Unleash Your Potential, Compete With The Brightest Minds, And Embark
          On A Journey Of Academic Excellence And Discovery.
        </p>

        {/* Buttons Section */}
        <div className="flex flex-wrap justify-center gap-5 mb-16">
          <button className="flex items-center gap-3 bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-all transform hover:scale-105 shadow-[0_15px_30px_-10px_rgba(255,26,117,0.6)] group">
            Register Now{" "}
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="flex items-center gap-3 bg-white/5 backdrop-blur-md border-2 border-white/20 text-white hover:bg-pink-700 px-8 py-4 rounded-xl font-bold text-base transition-all transform hover:scale-105 group">
            Learn More{" "}
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {[
            {
              icon: <FaCalendarAlt />,
              number: "Jan 15",
              label: "Registration Dateline",
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
              <div className="text-4xl text-white mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
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
