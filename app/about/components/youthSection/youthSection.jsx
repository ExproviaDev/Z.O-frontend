"use client";

import React from "react";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";

export default function YouthSection() {
  return (
    <section id="founder" className="py-16 md:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Container */}
        <div className="bg-slate-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
          
          {/* Image Side */}
          {/* Mobile: Aspect Ratio 4/5 (Portrait), Desktop: 50% width */}
          <div className="relative w-full lg:w-1/2 aspect-[4/3] sm:aspect-video lg:aspect-auto lg:h-auto min-h-[300px] lg:min-h-[600px]">
            <Image
              src="https://res.cloudinary.com/dsga4gyw9/image/upload/v1770033233/IMG_8818_bdrqrv.jpg"
              alt="Faatiha Ayat"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              priority // Loads image faster since it's likely above fold or important
            />
            {/* Overlay for better text contrast if needed, or style */}
            <div className="absolute inset-0 bg-indigo-900/20 mix-blend-multiply" />
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center text-white bg-slate-900">
            
            <FaQuoteLeft className="text-indigo-500 text-3xl md:text-5xl mb-6 md:mb-8 opacity-50" />
            
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tighter mb-6 md:mb-8 leading-tight">
              "The youth are not just the leaders of tomorrow—we are the
              architects of today's solutions."
            </h3>

            <div className="space-y-4 md:space-y-6 mb-8 md:mb-12">
              <p className="text-lg md:text-xl font-black italic text-indigo-400 tracking-tight">
                Faatiha Ayat — Founder
              </p>
              
              <p className="text-slate-300 text-sm md:text-base lg:text-lg font-light leading-relaxed text-justify lg:text-left">
                A child rights activist, climate campaigner, and global
                orator, Faatiha Ayat founded Zero Olympiad with a singular
                vision: to empower the youth to take ownership of the
                planet's destiny. Through her representation at the UN and
                global summits, she has mobilized thousands of students to
                join the movement for a "Zero Challenge" future.
              </p>
            </div>

            {/* Tags - Flex wrap ensures they don't overflow on small screens */}
            <div className="flex flex-wrap gap-3 md:gap-4">
              {["UN Representative", "Author", "Activist"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 md:px-4 md:py-2 bg-white/10 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase border border-white/10 hover:bg-white/20 transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}