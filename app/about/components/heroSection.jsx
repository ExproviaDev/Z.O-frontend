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
  const bgImages = [
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1770033238/IMG_9113_jqccyp.jpg",
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1770033235/IMG_9040_aam5lu.jpg",
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1770033236/IMG_9062_slanjd.jpg",
  ];

  return (
    <section className="relative h-screen w-auto overflow-hidden flex items-center justify-center font-sans">
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

      <div className="relative z-10 max-w-6xl  mx-auto px-6 py-12 flex flex-col items-center text-center">
        <div className="mb-8">
          <span className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-6 py-2 rounded-full text-sm md:text-sm font-medium flex items-center gap-2 shadow-2xl">
            <span className="text-Primary animate-pulse">
              <IoIosStarOutline />
            </span>{" "}
            A Youth-Led Global Movement
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
          Global Youth Initiative 2026 Empowering Youth to{" "}
          <span className="text-Primary">Global Challenges</span>
        </h1>

        <div className="flex flex-wrap justify-center gap-5 mb-16">
          <Link prefetch={false} href={"/registration"}>
            <button className="flex items-center gap-3 cursor-pointer bg-Primary hover:bg-Secondary text-white order-2 border-Primary hover:border-Secondary  px-8 py-4 rounded-xl font-bold text-base transition-all transform hover:scale-105  group">
              Join Zero Olympiad
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <Link prefetch={false} href="/instruction#sdg">
            <button className="flex items-center cursor-pointer gap-3 bg-white/5 backdrop-blur-md border-2 border-white hover:border-Primary text-white hover:bg-Primary px-8 py-4 rounded-xl font-bold text-base transition-all transform hover:scale-105 group">
              Explore The SDG{" "}
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
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
