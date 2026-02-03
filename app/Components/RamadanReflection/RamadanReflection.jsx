import Link from "next/link";
import React from "react";
import { FaRegStar } from "react-icons/fa";

const RamadanReflection = () => {
  return (
    <section
      className="relative min-height-[600px] w-full py-20 px-4 flex flex-col items-center justify-center text-white overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url('https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/e80cbcc2-f8ba-4a11-91b7-4a69a12385b3.avif')`,
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-6xl w-full mx-auto text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1 rounded-full mb-6 text-sm">
          <span className="text-Primary">
            <FaRegStar />
          </span>
          <span className="opacity-90">The Ramadan Zero Core</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Two Competitions, One Platform
        </h1>
        <h2 className="text-5xl md:text-6xl font-extrabold text-Primary mb-4">
          Ramadan Zero
        </h2>
        <p className="text-lg opacity-90 mb-12">
          Showcase your talent and win valuable prizes
        </p>

        {/* Cards Container */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Card 1: Ramadan Reflections */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl text-left hover:border-white/40 transition-all">
            <div className="w-12 h-12 bg-Primary rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold  mb-2  decoration-white/30">
              Ramadan Reflections
            </h3>
            <p className="text-sm opacity-80 mb-4 font-semibold">
              What Ramadan Taught Me
            </p>
            <ul className="space-y-2 text-sm opacity-90">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>{" "}
                Express thoughts, faith, and self-reflection
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>{" "}
                Video format: 1-3 minutes
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>{" "}
                Storytelling, Slideshow, Animation
              </li>
            </ul>
          </div>

          {/* Card 2: Zero Olympiad */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl text-left hover:border-white/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-Primary rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Zero Olympiad</h3>
              <p className="text-sm opacity-80 mb-4">
                Participate in the competition
              </p>
            </div>
            <div className="text-center mt-6">
              <p className="text-3xl font-bold text-Primary">Only 500 Taka</p>
              <p className="text-xs opacity-70">For both competitions</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
       <Link prefetch={false} href={"/instruction"}>
        <button className="group bg-Primary hover:bg-[#d95a1f] text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 flex items-center gap-2 mx-auto hover:-translate-y-1 hover:shadow-lg cursor-pointer">
          Learn More
          <span className="transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </button>
       </Link>
      </div>
    </section>
  );
};

export default RamadanReflection;
