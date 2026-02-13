"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const GalleryHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // ⭐ Cloudinary optimization
  const cld = (url) =>
    url.replace(
      "/upload/",
      "/upload/f_auto,q_auto,c_fill,g_auto,w_1600/"
    );

  const slides = [
    cld("https://res.cloudinary.com/dsga4gyw9/image/upload/v1770035159/EYE01784_rungxh.jpg"),
    cld("https://res.cloudinary.com/dsga4gyw9/image/upload/v1770035167/EYE02328_eag6gi.jpg"),
    cld("https://res.cloudinary.com/dsga4gyw9/image/upload/v1770035172/EYE02333_f5aazo.jpg"),
    cld("https://res.cloudinary.com/dsga4gyw9/image/upload/v1770035174/EYE02405_oqadno.jpg"),
    cld("https://res.cloudinary.com/dsga4gyw9/image/upload/v1770035175/EYE02334_zf4tvx.jpg"),
    cld("https://res.cloudinary.com/dsga4gyw9/image/upload/v1770035176/EYE02357_pmarco.jpg"),
  ];

  // Stable autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const next = () => setCurrentSlide((p) => (p + 1) % slides.length);
  const prev = () =>
    setCurrentSlide((p) => (p === 0 ? slides.length - 1 : p - 1));

  return (
    <section className="relative w-full overflow-hidden bg-black
      h-[65svh] sm:h-[70svh] md:h-[80vh] lg:h-screen">

      {/* Slider */}
      <div
        className="flex absolute inset-0 transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((url, i) => (
          <div key={i} className="relative min-w-full h-full">
            <Image
              src={url}
              alt="gallery"
              fill
              priority={i === 0}
              sizes="(max-width:768px) 100vw,
                     (max-width:1200px) 100vw,
                     100vw"
              className={`object-cover transition-transform duration-[5000ms] ease-linear
                ${i === currentSlide
                  ? "scale-105 md:scale-110 md:-translate-x-8"
                  : "scale-100"
                }`}
            />
          </div>
        ))}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/30 z-10"/>
      <div className="absolute inset-0 bg-gradient-to-br from-[#266D9A]/80 via-[#266D9A]/40 to-[#266D9A]/80"/>
      <div className="absolute inset-0 bg-Secondary/60"/>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4">

        <h1 className="text-white font-bold
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          Zero Olympiad Gallery
          <span className="text-Primary block md:inline md:ml-2">
            (Session One)
          </span>
        </h1>

        <p className="text-gray-100 mt-4 mb-8
            max-w-sm sm:max-w-md md:max-w-2xl
            text-xs sm:text-sm md:text-base lg:text-lg">
          Relive the inspiring moments from sessions,
          ceremonies, and workshops.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="registration">
            <button className="px-6 sm:px-8 py-3 bg-Primary text-white rounded-md flex items-center gap-2 hover:scale-105 transition">
              Register Now <FaArrowRight/>
            </button>
          </Link>

          <Link href="instruction">
            <button className="px-6 sm:px-8 py-3 border border-white text-white rounded-md flex items-center gap-2 hover:bg-Primary transition">
              Learn More <FaArrowRight/>
            </button>
          </Link>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-0 flex justify-between items-center px-3 md:px-6 z-30">
        <button onClick={prev} className="bg-white/20 p-2 rounded-full">
          <FaChevronLeft/>
        </button>

        <button onClick={next} className="bg-white/20 p-2 rounded-full">
          <FaChevronRight/>
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1.5 rounded-full transition-all
              ${i === currentSlide
                ? "w-8 bg-orange-500"
                : "w-3 bg-white/40"
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default GalleryHeroSection;
