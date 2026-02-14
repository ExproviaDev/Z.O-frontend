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

const GALLERY_DATA = [
  "https://i.ibb.co/rRPyZyVG/Copy-of-Copy-of-EYE01207.jpg",
  "https://i.ibb.co/cGdKC4p/Copy-of-Copy-of-EYE00941.jpg",
  "https://i.ibb.co/VcF7bYvM/IMG-9158.jpg",
  "https://i.ibb.co/gLCVGBR3/IMG-9150.jpg",
  "https://i.ibb.co/sdvWdXSs/IMG-9129.jpg",
  "https://i.ibb.co/Q3kMchp6/IMG-9067.jpg",
  "https://i.ibb.co/mV1pf4pM/IMG-9048.jpg",
  "https://i.ibb.co/tphqNcJm/IMG-9036.jpg",
  "https://i.ibb.co/bj5JhYxB/IMG-8998.jpg",
  "https://i.ibb.co/9mpTFNPq/IMG-8990.jpg",
  "https://i.ibb.co/fzKnCxK3/IMG-8974.jpg",
  "https://i.ibb.co/jkg8SYYz/IMG-8963.jpg",
  "https://i.ibb.co/Y7P5hRtB/IMG-8959.jpg",
  "https://i.ibb.co/qFd7X9yY/IMG-8945.jpg",
  "https://i.ibb.co/Vpvnwsk9/IMG-8924.jpg",
  "https://i.ibb.co/kNDD2z6/IMG-8918.jpg",
  "https://i.ibb.co/KjJy01R5/IMG-8915.jpg",
  "https://i.ibb.co/Lzq8zCcm/IMG-8900.jpg",
  "https://i.ibb.co/twk2WCnC/IMG-8894.jpg",
  "https://i.ibb.co/JRf6Brwx/IMG-8889.jpg",
  "https://i.ibb.co/pr07w9fS/IMG-8885.jpg",
  "https://i.ibb.co/PZfPCmzn/IMG-8882.jpg",
  "https://i.ibb.co/LwnpkWq/IMG-8872.jpg",
  "https://i.ibb.co/LXCf1k2c/IMG-8858.jpg",
  "https://i.ibb.co/kgQP6SnM/IMG-8850.jpg",
  "https://i.ibb.co/HfNHt72N/IMG-8841.jpg",
  "https://i.ibb.co/sdYTFKCM/IMG-8831.jpg",
  "https://i.ibb.co/39bf4TV5/IMG-8597.jpg",
  "https://i.ibb.co/wNRxWHhT/IMG-8594.jpg",
  "https://i.ibb.co/fY0m0bjs/IMG-8592.jpg",
  "https://i.ibb.co/6cw63GVS/IMG-8580.jpg",
  "https://i.ibb.co/PZVjjHCm/IMG-8568.jpg",
  "https://i.ibb.co/tw9zR5S9/IMG-8562.jpg",
  "https://i.ibb.co/tF2p743/IMG-8561.jpg",
  "https://i.ibb.co/kgXQLCHp/IMG-8550.jpg",
  "https://i.ibb.co/4wqSk6z0/IMG-8548.jpg",
  "https://i.ibb.co/5XGSzptT/EYE01877.jpg",
  "https://i.ibb.co/VY6Pxtzz/EYE01797.jpg",
  "https://i.ibb.co/zVQkPfK2/EYE01728.jpg",
  "https://i.ibb.co/mVDgG0wj/EYE01717.jpg",
  "https://i.ibb.co/zH5YXjft/EYE01694.jpg",
  "https://i.ibb.co/MxhjNPRH/EYE01688.jpg",
  "https://i.ibb.co/Df6wY0Tk/EYE01662.jpg",
  "https://i.ibb.co/Fk1fq4tT/EYE01633.jpg",
  "https://i.ibb.co/ZRrP8Kq3/EYE01648.jpg",
  "https://i.ibb.co/LXPwCJ0V/EYE01592.jpg",
  "https://i.ibb.co/rRnjcG94/EYE01566.jpg",
  "https://i.ibb.co/R4kZ917j/EYE01564.jpg",
  "https://i.ibb.co/RGPTN9BP/EYE01520.jpg",
  "https://i.ibb.co/VYC3C2Lc/EYE01518.jpg",
  "https://i.ibb.co/xRdyqWP/EYE01507.jpg",
  "https://i.ibb.co/bRsRshxh/EYE01477.jpg",
  "https://i.ibb.co/CdFvTTG/EYE01489.jpg",
  "https://i.ibb.co/Z1mGtgrt/EYE01474.jpg",
  "https://i.ibb.co/r2BBzQWQ/EYE01461.jpg",
  "https://i.ibb.co/JwzyTVBS/EYE01460-1.jpg",
  "https://i.ibb.co/5h5xbg7x/EYE01427.jpg",
  "https://i.ibb.co/7d8NTVwP/EYE01409.jpg",
  "https://i.ibb.co/cSHsBXLF/EYE01396.jpg",
  "https://i.ibb.co/RGkTJ8kJ/EYE01262.jpg",
  "https://i.ibb.co/xqJvSgz2/EYE01144.jpg",
  "https://i.ibb.co/hF3ftRYY/EYE01242.jpg",
  "https://i.ibb.co/bMdHxMGW/EYE01117.jpg",
  "https://i.ibb.co/zVRn8BDM/EYE01143.jpg",
  "https://i.ibb.co/2YCt8Ddm/EYE01116.jpg",
  "https://i.ibb.co/0yKn3K3N/EYE00979.jpg",
  "https://i.ibb.co/kVMNwCDK/EYE00978.jpg",
  "https://i.ibb.co/Ld6H2Dd9/DSC-1603.jpg",
  "https://i.ibb.co/qY2JJtc9/DSC-1467.jpg",
  "https://i.ibb.co/Qv1Mq34W/DSC-1236.jpg",
  "https://i.ibb.co/Y7qHDK77/Copy-of-EYE01870.jpg",
  "https://i.ibb.co/vxyKFp5P/Copy-of-EYE01719.jpg",
  "https://i.ibb.co/5XNvHZC4/Copy-of-EYE01684.jpg",
  "https://i.ibb.co/ks6xDpGD/Copy-of-EYE01637.jpg",
  "https://i.ibb.co/5gz7cWRX/Copy-of-EYE01672.jpg",
  "https://i.ibb.co/bRRNrBvm/Copy-of-EYE01603.jpg",
  "https://i.ibb.co/tMhwN2cs/Copy-of-EYE01575.jpg",
  "https://i.ibb.co/4wnvyPPf/Copy-of-EYE01517.jpg",
  "https://i.ibb.co/Mk9djp1W/Copy-of-EYE01439.jpg",
  "https://i.ibb.co/wFWrNy2h/Copy-of-EYE01430.jpg",
  "https://i.ibb.co/vvrrJcBF/Copy-of-EYE01387.jpg",
  "https://i.ibb.co/bgxyfH4h/Copy-of-EYE01384.jpg",
  "https://i.ibb.co/rfF9PnSw/Copy-of-EYE01380.jpg",
  "https://i.ibb.co/4ZdDgLSL/Copy-of-EYE01339.jpg",
  "https://i.ibb.co/yFHMbFYD/Copy-of-EYE01324.jpg",
  "https://i.ibb.co/5gPC9CKt/Copy-of-EYE01278.jpg",
  "https://i.ibb.co/wNk30S8b/Copy-of-EYE01293.jpg",
  "https://i.ibb.co/DnYv4wZ/Copy-of-EYE01251.jpg",
  "https://i.ibb.co/qTmZRLz/Copy-of-EYE01237.jpg",
  "https://i.ibb.co/spxtfBxv/Copy-of-EYE01231.jpg",
  "https://i.ibb.co/Y4vHSb84/Copy-of-EYE01160.jpg",
  "https://i.ibb.co/x8DGFyS1/Copy-of-EYE01177.jpg",
  "https://i.ibb.co/m53wMQsN/Copy-of-EYE01153.jpg",
  "https://i.ibb.co/Q3mLHrfr/Copy-of-EYE01089.jpg",
  "https://i.ibb.co/VYfwPh00/Copy-of-EYE01069.jpg",
  "https://i.ibb.co/0pnk38yx/Copy-of-EYE01063.jpg",
  "https://i.ibb.co/yB6tT45M/Copy-of-EYE01058.jpg",
  "https://i.ibb.co/HDZjfM0X/Copy-of-EYE01046.jpg",
  "https://i.ibb.co/q3HZkSLd/Copy-of-EYE01036.jpg",
  "https://i.ibb.co/kVmBpmx3/Copy-of-EYE00991.jpg",
  "https://i.ibb.co/pjvMX8z3/Copy-of-EYE00983.jpg",
  "https://i.ibb.co/ymsr8m9b/Copy-of-EYE00976.jpg",
  "https://i.ibb.co/CKCh8SJW/Copy-of-EYE00960.jpg",
  "https://i.ibb.co/93vjRDgR/Copy-of-EYE00952.jpg",
  "https://i.ibb.co/q3WVChbP/Copy-of-EYE00933.jpg"
];

const GalleryPage = () => {
  const [visibleCount, setVisibleCount] = useState(9);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const showNext = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % GALLERY_DATA.length);
  };

  const showPrev = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + GALLERY_DATA.length) % GALLERY_DATA.length);
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

      <section className="max-w-7xl mx-auto py-10 md:py-20 px-5">
        <div className="text-center mb-5 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            Memorable Moments of Victory{" "}
            <span className="text-orange-500">(Season-One)</span>
          </h2>
          <p className="py-4 text-gray-600">
            A collection of the best moments from Zero Olympiad Season one and
            the smiling <br /> faces of our young winners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GALLERY_DATA.slice(0, visibleCount).map((img, idx) => (
            <div
              key={idx}
              className="group cursor-pointer overflow-hidden rounded-sm shadow-md transition-all duration-300 relative h-48 md:h-64"
              onClick={() => setSelectedIndex(idx)}
            >
              <Image
                src={img}
                alt={`Victory ${idx}`}
                fill
                unoptimized={true}
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {visibleCount < GALLERY_DATA.length && (
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
              src={GALLERY_DATA[selectedIndex]}
              alt="Selected Large"
              fill
              priority
              className="object-contain animate-in zoom-in duration-300"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <section
        className="py-10 md:py-20 px-5 bg-repeat"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/99HFrKfK/speaker-bg.png')",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#4a6d88] rounded-[40px] p-8 md:p-16 text-center text-white shadow-2xl">
            <h2 className="text-2xl md:text-5xl font-bold mb-6">
              Be Part of Our Next Event
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
              <Link href="/registration">
                <button className="bg-Primary hover:bg-Secondary cursor-pointer text-[12px] text-white px-10 py-4 rounded-xl font-bold flex items-center gap-2 transition-all">
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