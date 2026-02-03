"use client";

import React from "react";
import Image from "next/image";


import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import Link from "next/link";

export default function HeroSection() {
  const bgImages = [
    "https://i.ibb.co/k2v3PvBP/IMG-8336.jpg",
    "https://i.ibb.co/CKpbjfNn/EYE01386.jpg",
    "https://i.ibb.co/4RTckv6N/EYE02010.jpg",
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center font-sans">
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

                <div className="absolute inset-0 bg-gradient-to-br from-[#266D9A]/50 via-[#266D9A]/60 to-[#266D9A]/50" />

                <div className="absolute inset-0 bg-Secondary/70" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Reducing to <span className="text-white">Zero,</span> <br />
            <span className="text-Primary">Rising as Hero</span>
          </h1>

          <p className="text-blue-50 text-lg md:text-xl max-w-xl leading-relaxed">
            Zero Olympiad empowers International students with SDG knowledge,
            global awareness, and leadership skills to become future-ready
            Global Leaders.
          </p>

          <Link prefetch={false} href={"/registration"}>
            <button className="bg-Primary max-w-[230px] inline-block  cursor-pointer hover:bg-Secondary text-white px-8 py-4 rounded-xl  font-bold text-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg active:scale-95">
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
