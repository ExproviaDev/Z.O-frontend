"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/effect-fade";

export default function HeroSection() {
  const bgImages = [
    "https://i.ibb.co/k2v3PvBP/IMG-8336.jpg",
    "https://i.ibb.co/CKpbjfNn/EYE01386.jpg",
    "https://i.ibb.co/4RTckv6N/EYE02010.jpg",
  ];

  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden flex items-center justify-center font-sans">

      {/* Background Slider */}
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
                  priority={index === 0} // Optimized loading
                />

                {/* Overlays */}
                <div className="absolute inset-0 opacity-65 mix-blend-hard-light" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#266D9A]/50 via-[#266D9A]/60 to-[#266D9A]/50" />
                <div className="absolute inset-0 bg-Secondary/70" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 py-12 md:py-20 mt-16 md:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left Side: Text Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Reducing to <span className="text-white/90">Zero,</span> <br className="hidden md:block" />
              <span className="text-Primary">Rising as Hero</span>
            </h1>

            <p className="text-blue-50 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              Zero Olympiad empowers International students with SDG knowledge,
              global awareness, and leadership skills to become future-ready
              Global Leaders.
            </p>

            <div className="flex justify-center lg:justify-start">
              <Link prefetch={false} href={"/registration"} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-Primary hover:bg-Secondary text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-xl active:scale-95 group">
                  Register Now
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side: Video Content */}
          <div className="relative w-full max-w-lg mx-auto lg:max-w-full animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-Primary/30 rounded-[35px] blur-2xl"></div>

            {/* Video Container */}
            <div className="relative bg-black p-2 sm:p-3 rounded-[24px] sm:rounded-[32px] shadow-2xl overflow-hidden border border-white/10">
              <div className="relative overflow-hidden rounded-[16px] sm:rounded-[22px] aspect-video">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/Gvvq9Ehsjig?si=nxs-4nFw-BWxEkgO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}