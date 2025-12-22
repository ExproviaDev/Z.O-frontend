"use client"; // Next.js App Router-er jonno eta dorkari

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // Next.js navigation hook

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

const HeroSection = () => {
  const router = useRouter();

  const slides = [
    { url: "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766411372/IMG_8997_bl8xws.jpg" },
    { url: "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766411368/IMG_8763_hrsydw.jpg" },
    { url: "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766411366/IMG_8710_lcvcsz.jpg" }
  ];

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950">
      
      {/* --- BACKGROUND SWIPER SLIDER --- */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={2000}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          loop={true}
          allowTouchMove={false}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="overflow-hidden bg-slate-950">
              <div className="relative w-full h-full transform-gpu">
                <div 
                  className="absolute inset-0 bg-cover bg-center animate-subtle-zoom"
                  style={{ 
                    backgroundImage: `url(${slide.url})`,
                    willChange: 'transform' 
                  }}
                />
                <div className="absolute inset-0 bg-slate-950/40 z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/90 z-[2]" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full mb-8">
          <span className="flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-white text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase opacity-90">
            Global Youth Initiative 2025
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tighter italic uppercase py-2">
          Empowering Youth to <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-emerald-400 inline-block">
            Zero Global Challenges
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-100 font-light leading-relaxed mb-12">
          The world doesn't need more spectators. It needs architects of change. <br className="hidden md:block"/>
          Zero Olympiad is the global platform where youth leadership meets impact.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          {/* JOIN Button: Registration Page এ যাওয়ার জন্য */}
          <button 
            onClick={() => router.push('/registration')}
            className="flex items-center gap-3 bg-pink-600 hover:backdrop-blur-md border-2 border-white/20 text-white hover:bg-pink-700 px-8 py-4 rounded-xl font-bold text-base transition-all transform hover:scale-105 group w-full sm:w-auto justify-center"
          >
            <span>JOIN ZERO OLYMPIAD</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          {/* EXPLORE Button: About Us Page এর নির্দিষ্ট Section এ যাওয়ার জন্য */}
          <button 
            onClick={() => router.push('/about#impact')}
            className="w-full sm:w-auto px-10 py-4 bg-white/5 backdrop-blur-md border-2 border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all transform hover:scale-105"
          >
            EXPLORE THE SDGs
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes subtleZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .animate-subtle-zoom {
          animation: subtleZoom 10s ease-out infinite alternate;
        }
        .swiper-effect-fade .swiper-slide {
          pointer-events: none;
          transition-property: opacity !important;
        }
        .swiper-effect-fade .swiper-slide-active {
          pointer-events: auto;
          z-index: 1;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;