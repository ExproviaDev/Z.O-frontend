"use client";

import Image from "next/image";
import React, { useState } from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",
    alt: "Previous Event Ceremony",
    category: "Events",
    title: "Previous Event Ceremony",
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    alt: "Award Ceremony",
    category: "Awards",
    title: "Award Ceremony",
  },
  {
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop",
    alt: "Participants in Action",
    category: "Competition",
    title: "Participants in Action",
  },
  {
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
    alt: "Team Celebration",
    category: "Events",
    title: "Team Celebration",
  },
  {
    src: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop",
    alt: "Winners with Trophies",
    category: "Awards",
    title: "Winners with Trophies",
  },
  {
    src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop",
    alt: "Group Study Session",
    category: "Competition",
    title: "Group Study Session",
  },
];

const categories = ["All", "Events", "Awards", "Competition"];

export default function EventGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  return (
    <section className="bg-gradient-to-b from-background to-Primary/30 py-20 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-Primary/10 text-primary text-sm font-medium mb-4">
            Memories
          </span>
          <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl mb-4 ">
            Event <span className="text-amber-600">Gallery</span>
          </h2>
          <p className=" max-w-2xl mx-auto text-base sm:text-lg">
            Relive the moments from our previous events and celebrations
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg ${
                selectedCategory === cat
                  ? "bg-gray-700 text-white"
                  : "bg-primary/20 text-primary hover:bg-gray-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw,
                         (max-width: 1024px) 50vw,
                         33vw"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs font-medium text-amber-500">
                  {img.category}
                </span>
                <h4 className="text-white font-semibold">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
