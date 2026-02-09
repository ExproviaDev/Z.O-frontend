"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const GalleryHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1770033233/IMG_8818_bdrqrv.jpg",
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1770035159/EYE01784_rungxh.jpg",
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1770033238/IMG_9113_jqccyp.jpg",
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1770033238/IMG_9113_jqccyp.jpg",
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1770033238/IMG_9119_nq6gnz.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    // Update: h-screen removed, added min-h-[70vh]
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-black font-sans">
      
      {/* Slider Container (Behavior: Sliding TranslateX preserved) */}
      <div
        className="flex h-full absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((url, index) => (
          <div key={index} className="relative min-w-full h-full overflow-hidden">
            <Image
              src={url}
              alt={`Slide ${index}`}
              fill
              priority={index === 0}
              className={`object-cover transition-transform duration-[7000ms] ease-linear ${
                index === currentSlide
                  ? "scale-110 -translate-x-10"
                  : "scale-100 translate-x-0"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Overlays (Design Preserved) */}
      <div className="absolute inset-0 mix-blend-multiply z-10 pointer-events-none bg-black/20"></div>
      <div className="absolute inset-0 opacity-65 mix-blend-hard-light" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#266D9A]/100 via-[#266D9A]/50 to-[#266D9A]/100 opacity-60 md:opacity-100" />
      <div className="absolute inset-0 bg-Secondary/60" />

      {/* Content Section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-20 pointer-events-none">
        
        {/* Responsive Heading */}
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-4 drop-shadow-xl pointer-events-auto leading-tight">
          Zero Olympiad Gallery <br className="md:hidden" />
          <span className="text-Primary block md:inline mt-2 md:mt-0">(Session One)</span>
        </h1>

        {/* Responsive Paragraph */}
        <p className="text-gray-100 max-w-lg md:max-w-2xl text-sm md:text-lg mb-8 leading-relaxed pointer-events-auto drop-shadow-md">
          Relive the inspiring moments from our sessions, ceremonies, and
          workshops — reducing challenges to zero and rising together as heroes
          of change.
        </p>

        {/* Responsive Buttons (Stack on mobile, Row on Desktop) */}
        <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto w-full sm:w-auto px-4 sm:px-0">
          <Link prefetch={false} href={"registration"} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-Primary hover:bg-Secondary border border-Primary cursor-pointer hover:border-Secondary text-white px-8 py-3.5 rounded-md font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg">
              Register Now <FaArrowRight className="text-sm" />
            </button>
          </Link>
          <Link prefetch={false} href={"instruction"} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto border border-white/80 hover:bg-Primary cursor-pointer hover:border-Primary text-white px-8 py-3.5 rounded-md font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg backdrop-blur-sm">
              Learn More <FaArrowRight className="text-sm" />
            </button>
          </Link>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-6 z-30 pointer-events-none">
        <button
          onClick={prevSlide}
          className="pointer-events-auto bg-white/10 hover:bg-white/20 p-2 md:p-3 rounded-full text-white transition-all backdrop-blur-md border border-white/10"
        >
          <FaChevronLeft size={20} className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto bg-white/10 hover:bg-white/20 p-2 md:p-3 rounded-full text-white transition-all backdrop-blur-md border border-white/10"
        >
          <FaChevronRight size={20} className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 shadow-sm ${
              currentSlide === idx ? "w-8 md:w-12 bg-[#f37021]" : "w-2 md:w-4 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default GalleryHeroSection;