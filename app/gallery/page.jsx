"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import GalleryHeroSection from "../Components/GalleryHeroSection/GalleryHeroSection";

const GalleryPage = () => {
  const [allImages, setAllImages] = useState([]); // ডাটা রাখার জন্য স্টেট
  const [visibleCount, setVisibleCount] = useState(9);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  // public/images.json থেকে ডাটা ফেচ করা
  useEffect(() => {
    fetch("/images.json") // public ফোল্ডারের পাথ সরাসরি এভাবে লিখতে হয়
      .then((res) => res.json())
      .then((data) => {
        setAllImages(data.galleryImages || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
        setLoading(false);
      });
  }, []);

  const getOptimizedUrl = (url) => {
    return url.replace("/upload/", "/upload/f_auto,q_auto,w_800/");
  };

  const showNext = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % allImages.length);
  };

  const showPrev = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
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
  }, [selectedIndex, allImages]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  if (loading) return <div className="text-center py-20">Loading Gallery...</div>;

  return (
    <div className="bg-white min-h-screen font-sans relative">
      <GalleryHeroSection />

      <section className="max-w-7xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Memorable Moments of Victory{" "}
            <span className="text-orange-500">(Season-One)</span>
          </h2>
          <p className="py-4 text-gray-600">
            A collection of the best moments from Zero Olympiad Season one and
            the smiling <br /> faces of our young winners.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {allImages.slice(0, visibleCount).map((img, idx) => (
            <div
              key={idx}
              className="group cursor-pointer overflow-hidden rounded-sm shadow-md transition-all duration-300 relative h-48 md:h-64"
              onClick={() => setSelectedIndex(idx)}
            >
              <Image
                src={getOptimizedUrl(img)}
                alt={`Victory ${idx}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {visibleCount < allImages.length && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="bg-Secondary cursor-pointer hover:bg-Primary transform hover:-translate-y-1 text-white px-10 py-3 rounded-full transition-all shadow-lg font-semibold"
            >
              Load More
            </button>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="absolute top-8 right-8 text-white text-3xl z-[110] hover:text-orange-500"
            onClick={() => setSelectedIndex(null)}
          >
            <FaTimes />
          </button>

          <button
            className="absolute left-4 md:left-10 text-white/50 hover:text-white text-4xl md:text-6xl z-[110]"
            onClick={showPrev}
          >
            <FaChevronLeft />
          </button>

          <button
            className="absolute right-4 md:right-10 text-white/50 hover:text-white text-4xl md:text-6xl z-[110]"
            onClick={showNext}
          >
            <FaChevronRight />
          </button>

          <div className="relative w-full max-w-5xl h-[80vh]">
            <Image
              src={allImages[selectedIndex]}
              alt="Selected Large"
              fill
              priority
              className="object-contain animate-in zoom-in duration-300"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Footer CTA Section */}
      <section
        className="py-20 px-4 bg-repeat"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/99HFrKfK/speaker-bg.png')",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#4a6d88] rounded-[40px] p-12 md:p-16 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Be Part of Our Next Event
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
              <Link href="/registration">
                <button className="bg-Primary hover:bg-Secondary cursor-pointer text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 transition-all">
                  Register Now <FaArrowRight size={14} />
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