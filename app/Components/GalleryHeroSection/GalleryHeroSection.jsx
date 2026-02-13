import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const GalleryHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const optimize = (url) =>
    url.replace("/upload/", "/upload/f_auto,q_auto,w_1600/");

  const slides = [
    optimize("https://res.cloudinary.com/dsga4gyw9/image/upload/v1770033233/IMG_8818_bdrqrv.jpg"),
    optimize("https://res.cloudinary.com/dsga4gyw9/image/upload/v1770035159/EYE01784_rungxh.jpg"),
    optimize("https://res.cloudinary.com/dsga4gyw9/image/upload/v1770033238/IMG_9113_jqccyp.jpg"),
    optimize("https://res.cloudinary.com/dsga4gyw9/image/upload/v1770033238/IMG_9119_nq6gnz.jpg"),
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );

  const prevSlide = () =>
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  return (
    <section
      className="
        relative w-full overflow-hidden bg-black font-sans
        h-[65svh]
        sm:h-[70svh]
        md:h-[80vh]
        lg:h-screen
      "
    >
      {/* Slider */}
      <div
        className="flex absolute inset-0 transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((url, index) => (
          <div key={index} className="relative min-w-full h-full">
            <Image
              src={url}
              alt={`Slide ${index}`}
              fill
              sizes="100vw"
              priority={index === 0}
              unoptimized
              className={`object-cover transition-transform duration-[5000ms] ease-linear ${
                index === currentSlide
                  ? "scale-105 md:scale-110 md:-translate-x-10"
                  : "scale-100"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/25 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#266D9A]/80 via-[#266D9A]/40 to-[#266D9A]/80 md:opacity-100 opacity-70" />
      <div className="absolute inset-0 bg-Secondary/60" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4 sm:px-6 pointer-events-none">
        
        <h1 className="
          text-white font-bold drop-shadow-xl pointer-events-auto
          text-2xl
          sm:text-3xl
          md:text-4xl
          lg:text-5xl
          xl:text-6xl
        ">
          Zero Olympiad Gallery
          <span className="text-Primary block md:inline md:ml-2">
            (Session One)
          </span>
        </h1>

        <p className="
          text-gray-100 pointer-events-auto mt-4 mb-8
          max-w-sm
          sm:max-w-md
          md:max-w-2xl
          text-xs
          sm:text-sm
          md:text-base
          lg:text-lg
        ">
          Relive the inspiring moments from our sessions, ceremonies,
          and workshops — reducing challenges to zero and rising together.
        </p>

        <div className="
          flex flex-col sm:flex-row gap-3 sm:gap-4
          w-full sm:w-auto
          pointer-events-auto
        ">
          <Link href="registration">
            <button className="
              w-full sm:w-auto
              px-6 sm:px-8 py-3
              text-sm sm:text-base
              bg-Primary hover:bg-Secondary
              border border-Primary hover:border-Secondary
              text-white rounded-md font-semibold
              flex items-center justify-center gap-2
              transition-transform hover:scale-105 shadow-lg
            ">
              Register Now <FaArrowRight />
            </button>
          </Link>

          <Link href="instruction">
            <button className="
              w-full sm:w-auto
              px-6 sm:px-8 py-3
              text-sm sm:text-base
              border border-white/80
              hover:bg-Primary hover:border-Primary
              text-white rounded-md font-semibold
              flex items-center justify-center gap-2
              transition-transform hover:scale-105
              shadow-lg backdrop-blur-sm
            ">
              Learn More <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>

      {/* Controls */}
      <div className="
        absolute inset-0 flex items-center justify-between
        px-2 sm:px-4 md:px-6 z-30 pointer-events-none
      ">
        <button
          onClick={prevSlide}
          className="pointer-events-auto bg-white/10 hover:bg-white/20 p-2 sm:p-3 rounded-full text-white backdrop-blur-md"
        >
          <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="pointer-events-auto bg-white/10 hover:bg-white/20 p-2 sm:p-3 rounded-full text-white backdrop-blur-md"
        >
          <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`rounded-full transition-all ${
              currentSlide === idx
                ? "bg-[#f37021] w-6 sm:w-8 md:w-12 h-1.5"
                : "bg-white/30 w-2 sm:w-3 md:w-4 h-1.5"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default GalleryHeroSection;
