"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCalendarAlt, FaClock, FaTrophy } from "react-icons/fa";
import { IoIosStarOutline } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

export default function HeroSection() {
  const bgImages = [
    "https://i.ibb.co/k2v3PvBP/IMG-8336.jpg",
    "https://i.ibb.co/CKpbjfNn/EYE01386.jpg",
    "https://i.ibb.co/4RTckv6N/EYE02010.jpg",
  ];

  const stats = [
    {
      icon: <FaCalendarAlt />,
      number: "18 February, 2026",
      label: "Registration Opens",
    },
    {
      icon: <FaClock />,
      number: "6 May, 2026",
      label: "Registration Deadline",
    },
    {
      icon: <FaTrophy />,
      number: "6 June, 2026",
      label: "Grand Finale",
    },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center font-sans">

      {/* Background Swiper */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
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
                  priority={index === 0}
                />

                {/* Overlays for readability */}
                <div className="absolute inset-0 opacity-65 mix-blend-hard-light" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#266D9A]/50 via-[#266D9A]/60 to-[#266D9A]/50" />
                <div className="absolute inset-0 bg-Secondary/70" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center text-center mt-10 md:mt-0">

        {/* Welcome Badge */}
        <div className="mb-6 md:mb-8 animate-fade-in-down">
          <span className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-medium flex items-center gap-2 shadow-2xl">
            <span className="text-Primary animate-pulse">
              <IoIosStarOutline size={16} />
            </span>
            Welcome to Zero Olympiad
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight md:leading-[1.1] max-w-4xl">
          Reducing to Zero, <br className="md:hidden" />
          <span className="text-Primary">Rising as Hero</span>
        </h1>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12 md:mb-16">
          <Link prefetch={false} href={"/registration"} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 cursor-pointer bg-Primary hover:bg-Secondary text-white border-Primary hover:border-Secondary px-6 py-3.5 md:px-8 md:py-4 rounded-xl font-bold text-sm md:text-base transition-all transform hover:scale-105 group shadow-lg">
              Register Now
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <Link prefetch={false} href="/instruction" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 cursor-pointer bg-white/5 backdrop-blur-md border-2 border-white hover:border-Primary text-white hover:bg-Primary px-6 py-3.5 md:px-8 md:py-4 rounded-xl font-bold text-sm md:text-base transition-all transform hover:scale-105 group shadow-lg">
              Learn More
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Stats Grid - Now visible on mobile */}
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 transition-all hover:bg-white/20 hover:-translate-y-1 group shadow-xl flex flex-col items-center justify-center"
              >
                <div className="text-3xl md:text-4xl text-Primary mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-lg md:text-xl font-bold text-white mb-1 tracking-tight">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-[10px] md:text-xs font-semibold tracking-widest uppercase opacity-80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}