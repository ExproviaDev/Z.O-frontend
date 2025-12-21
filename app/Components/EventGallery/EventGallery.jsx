"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const Gallery = () => {
  // State for Modal
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Gallery images list (9 images as per your loop)
  const images = Array.from({ length: 9 }).map((_, i) => `/src/gallery/img${i + 1}.jpg`);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const nextImage = (e) => {
    e.stopPropagation(); // Modal jeno bondho na hoye jay
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="py-20 p-5 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-[40px] font-semibold text-center text-gray-900 mb-4">
          Gallery
        </h2>

        <p className="text-center text-gray-500 text-lg mb-12 max-w-3xl mx-auto">
          Compete for glory and be rewarded with prizes that recognize your hard work and dedication
        </p>

        {/* Grid View */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {images.map((src, index) => (
            <div
              key={index}
              onClick={() => openModal(index)} // Click korle modal open hobe
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium"></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Lightbox Modal --- */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm transition-all"
          onClick={closeModal} // Baire click korle bondho hobe
        >
          {/* Close Button */}
          <button className="absolute top-5 right-5 text-white text-4xl z-[110]" onClick={closeModal}>×</button>

          {/* Left Arrow */}
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white z-[110]"
            onClick={prevImage}
          >
            ❮
          </button>

          {/* Large Image Container */}
          <div className="relative w-full max-w-4xl h-[70vh] md:h-[80vh]">
            <Image
              src={images[currentIndex]}
              alt="Fullscreen view"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Right Arrow */}
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white z-[110]"
            onClick={nextImage}
          >
            ❯
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-5 text-white/70 text-sm">
            Image {currentIndex + 1} of {images.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;