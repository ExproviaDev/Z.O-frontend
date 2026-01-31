import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const GalleryHeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "https://i.ibb.co.com/prWJmYRc/EYE01386.jpg",
    "https://i.ibb.co.com/4RTckv6N/EYE02010.jpg",
    "https://i.ibb.co.com/rGNMx82R/IMG-8702.jpg",
    "https://i.ibb.co.com/KzR3JbsL/IMG-8572.jpg",
    "https://i.ibb.co.com/VpkCgnqZ/IMG-8409.jpg",
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
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div
        className="flex h-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((url, index) => (
          <div
            key={index}
            className="min-w-full h-full relative overflow-hidden"
          >
            <img
              src={url}
              alt={`Slide ${index}`}
              className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-linear ${
                index === currentSlide
                  ? "scale-110 -translate-x-10"
                  : "scale-100 translate-x-0"
              }`}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0  mix-blend-multiply z-10 pointer-events-none"></div>

      <div className="absolute inset-0  opacity-65 mix-blend-hard-light" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#266D9A]/100 via-[#266D9A]/50 to-[#266D9A]/100" />
      <div className="absolute inset-0 bg-Secondary/60" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20 pointer-events-none">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow-xl pointer-events-auto">
          Zero Olympiad Gallery{" "}
          <span className="text-Primary">(Session One)</span>
        </h1>

        <p className="text-gray-100 max-w-2xl text-sm md:text-lg mb-8 leading-relaxed pointer-events-auto">
          Relive the inspiring moments from our sessions, ceremonies, and
          workshops — reducing challenges to zero and rising together as heroes
          of change.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
          <Link href={"registration"}>
          <button className="bg-Primary hover:bg-Secondary border border-Primary hover:border-Secondary text-white px-8 py-3 rounded-md font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105">
            Register Now <FaArrowRight className="text-sm" />
          </button>
          </Link>
          <Link href={"instruction"}>
          <button className="border border-white/80 hover:bg-Primary hover:border-Primary text-white px-8 py-3 rounded-md font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105">
            Learn More <FaArrowRight className="text-sm" />
          </button>
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-between px-6 z-30 pointer-events-none">
        <button
          onClick={prevSlide}
          className="pointer-events-auto bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-all backdrop-blur-md"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-all backdrop-blur-md"
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              currentSlide === idx ? "w-12 bg-[#f37021]" : "w-4 bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default GalleryHeroSection;
