"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766410937/EYE02067_qk0a8m.jpg",
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766411372/IMG_8997_bl8xws.jpg",
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766411368/IMG_8813_cp1smv.jpg",
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766411365/IMG_8708_ksoivs.jpg",
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766411364/IMG_8682_mhxnel.jpg",
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766411361/IMG_8594_okmn5p.jpg",
  ];

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);
  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section
      className="relative py-24 px-4 min-h-screen overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/99HFrKfK/speaker-bg.png')",
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-4 pb-12">
          <h2 className="md:text-5xl text-4xl font-bold text-gray-800">
            Gallery <span className="text-Primary">(Season One)</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 font-medium italic">
            Capturing the memorable moments of our journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <div
              key={index}
              onClick={() => openModal(index)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer border-2 border-white/50 shadow-2xl transition-all duration-500 hover:scale-[1.03] "
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/20  border border-white/30"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link prefetch={false} href={"gallery"}>
            <button className="bg-Primary hover:bg-[#d9561a] text-white font-bold py-3 px-10 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              View More
            </button>
          </Link>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={closeModal}
        >
          <button
            className="absolute top-8 right-8 text-white text-5xl z-[110] hover:rotate-90 transition-all duration-300"
            onClick={closeModal}
          >
            ×
          </button>

          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-[#f16522] p-4 rounded-full text-white z-[110] transition-all"
            onClick={prevImage}
          >
            ❮
          </button>

          <div className="relative w-full max-w-5xl h-[70vh] md:h-[80vh] animate-in zoom-in duration-300">
            <Image
              src={images[currentIndex]}
              alt="Fullscreen"
              fill
              className="object-contain"
              priority
            />
          </div>

          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-[#f16522] p-4 rounded-full text-white z-[110] transition-all"
            onClick={nextImage}
          >
            ❯
          </button>

          <div className="absolute bottom-10 text-white/70 font-mono tracking-tighter">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
