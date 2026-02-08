"use client";

import React, { useState, useEffect } from "react";
import {
  FaArrowRight,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import GalleryHeroSection from "../Components/GalleryHeroSection/GalleryHeroSection";
import Link from "next/link";

const GalleryPage = () => {
  const allImages = [
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02377-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02380-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02382-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02384-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02386-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02375-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02371-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02366-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02363-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02359-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02357-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02353-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02347-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02328-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02331-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02334-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02303-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02296-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02275-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02280-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02281-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02284-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02287-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02258-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02255-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02251-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02249-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02245-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02237-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE01330-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02229-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02235-scaled.jpg",
    "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/EYE02340-scaled.jpg",
  ];

  const [visibleCount, setVisibleCount] = useState(9);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const showNext = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % allImages.length);
  };

  const showPrev = (e) => {
    e?.stopPropagation();
    setSelectedIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length,
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  return (
    <div className="bg-white min-h-screen font-sans relative">
      <GalleryHeroSection />

      <section className="max-w-7xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Memorable Moments of Victory{" "}
            <span className="text-orange-500">(Season-One)</span>
          </h2>
          <p className="py-4">A collection of the best moments from Zero Olympiad Season one and the smiling <br /> faces of our young winners.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {allImages.slice(0, visibleCount).map((img, idx) => (
            <div
              key={idx}
              className="group cursor-pointer overflow-hidden rounded-sm shadow-md transition-all duration-300 relative"
              onClick={() => setSelectedIndex(idx)}
            >
              <img
                src={img}
                alt={`Victory ${idx}`}
                className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {visibleCount < allImages.length && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="bg-Secondary hover:bg-Primary  transform hover:-translate-y-1 text-white px-10 py-3 rounded-full transition-all"
            >
              Load More
            </button>
          </div>
        )}
      </section>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 transition-all"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="absolute top-8 right-8 text-white text-3xl z-[110] hover:text-orange-500 transition-colors"
            onClick={() => setSelectedIndex(null)}
          >
            <FaTimes />
          </button>

          <button
            className="absolute left-4 md:left-10 text-white/50 hover:text-white text-4xl md:text-6xl z-[110] transition-all"
            onClick={showPrev}
          >
            <FaChevronLeft />
          </button>

          <button
            className="absolute right-4 md:right-10 text-white/50 hover:text-white text-4xl md:text-6xl z-[110] transition-all"
            onClick={showNext}
          >
            <FaChevronRight />
          </button>

          <div className="relative max-w-5xl w-full flex flex-col items-center justify-center">
            <img
              src={allImages[selectedIndex]}
              alt="Selected"
              className="max-h-[85vh] max-w-full rounded shadow-2xl animate-in zoom-in duration-300"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="text-white/70 mt-4 text-sm font-light tracking-widest">
              {selectedIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}

      <section
        className="py-20 px-4 bg-repeat"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/99HFrKfK/speaker-bg.png')",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#4a6d88] rounded-[40px] p-12 md:p-16 text-center text-white shadow-2xl transition-all hover:shadow-blue-900/20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Be Part of Our Next Event
            </h2>

            <p className="text-blue-50/90 text-sm md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Join Zero Olympiad and create your own memorable moments while{" "}
              <br className="hidden md:block" />
              making a difference for our planet.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
              <Link prefetch={false} href={"registration"}>
              <button className="bg-Primary hover:bg-Secondary hover:border-Secondary text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:-translate-y-1 shadow-lg">
                Register Now <FaArrowRight size={14} />
              </button>
              </Link>

             <Link prefetch={false} href={"instruction"}>
              <button className="border-2 border-white/40 hover:bg-Primary hover:border-Primary  text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:-translate-y-1">
                Learn More <FaArrowRight size={14} />
              </button>
             </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
