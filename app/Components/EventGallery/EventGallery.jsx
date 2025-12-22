"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const Gallery = () => {
  // State for Modal
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ImgBB থেকে পাওয়া আপনার ইমেজের লিঙ্কগুলো এখানে বসান
  const images = [
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766410937/EYE02067_qk0a8m.jpg",
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766411372/IMG_8997_bl8xws.jpg", // এখানে অন্য লিঙ্ক বসান
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766411368/IMG_8813_cp1smv.jpg", // এখানে অন্য লিঙ্ক বসান
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766411365/IMG_8708_ksoivs.jpg",
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766411364/IMG_8682_mhxnel.jpg",
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766411361/IMG_8594_okmn5p.jpg",
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766411354/IMG_8485_rnuuok.jpg",
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766411349/IMG_8336_i2khyh.jpg",
    "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766411348/IMG_8289_vgu7a6.jpg",
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
              onClick={() => openModal(index)}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer border border-gray-100 shadow-sm"
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-light"></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Lightbox Modal --- */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button className="absolute top-8 right-8 text-white text-5xl z-[110] hover:scale-110 transition-transform" onClick={closeModal}>×</button>

          {/* Left Arrow */}
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white z-[110] transition-colors"
            onClick={prevImage}
          >
            ❮
          </button>

          {/* Large Image Container */}
          <div className="relative w-full max-w-5xl h-[70vh] md:h-[85vh]">
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
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white z-[110] transition-colors"
            onClick={nextImage}
          >
            ❯
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-8 text-white/70 tracking-widest text-sm uppercase">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;