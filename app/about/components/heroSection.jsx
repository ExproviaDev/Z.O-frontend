"use client";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
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
    <section className="relative min-h-[60vh] md:min-h-[70vh] w-full overflow-hidden flex items-center justify-center font-sans">
      
      {/* Background Slider */}
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

                {/* Overlays - Kept inside slide for specific blend mode effects */}
                <div className="absolute inset-0 opacity-65 mix-blend-hard-light" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#266D9A]/50 via-[#266D9A]/60 to-[#266D9A]/50" />
                <div className="absolute inset-0 bg-Secondary/70" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center text-center">
        
        {/* Badge */}
        <div className="mb-6 md:mb-8">
          <span className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-4 py-1.5 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-medium flex items-center gap-2 shadow-2xl">
            <span className="text-Primary animate-pulse">
              <IoIosStarOutline size={16} />
            </span>{" "}
            A Youth-Led Global Movement
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 md:mb-8 tracking-tight leading-tight md:leading-[1.1] max-w-4xl">
          Global Youth Initiative 2026 Empowering Youth to{" "}
          <span className="text-Primary">Global Challenges</span>
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
          
          <Link prefetch={false} href={"/registration"} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 cursor-pointer bg-Primary hover:bg-Secondary text-white border-Primary hover:border-Secondary px-6 py-3.5 md:px-8 md:py-4 rounded-xl font-bold text-sm md:text-base transition-all transform hover:scale-105 group shadow-lg">
              Join Zero Olympiad
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>

          <Link prefetch={false} href="/instruction#sdg" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 cursor-pointer bg-white/5 backdrop-blur-md border-2 border-white hover:border-Primary text-white hover:bg-Primary px-6 py-3.5 md:px-8 md:py-4 rounded-xl font-bold text-sm md:text-base transition-all transform hover:scale-105 group shadow-lg">
              Explore The SDG{" "}
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          
        </div>
      </div>
    </section>
  );
}