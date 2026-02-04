"use client";

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white font-sans overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Side: Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          {/* Animated Glitch 404 */}
          <h1 className="relative text-8xl md:text-[10rem] font-black text-[#2D4686] leading-none mb-4 animate-pulse">
            404
            <span className="absolute top-0 left-0 w-full h-full text-blue-300 opacity-30 animate-ping pointer-events-none">
              404
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-bold text-[#1A2E5A] tracking-wider uppercase mb-8">
            Page Not Found
          </h2>

          <Link
            href="/"
            className="inline-block px-10 py-3 border-2 border-[#2D4686] text-[#2D4686] font-bold rounded-full hover:bg-[#2D4686] hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95 uppercase tracking-widest text-sm"
          >
            Go To Home
          </Link>
        </div>
        

        {/* Right Side: Illustration */}
        <div className="w-full md:w-1/2 relative flex justify-center items-center">
          {/* Background Shape with Floating Animation */}
          <div className="relative w-full max-w-lg animate-float">
            <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <path 
                fill="#D4E3FF" 
                d="M444.5,313.5Q414,377,354.5,414Q295,451,228.5,429.5Q162,408,103,371.5Q44,335,46.5,267.5Q49,200,99,149.5Q149,99,216,77Q283,55,348,87.5Q413,120,444,185Q475,250,444.5,313.5Z" 
              />
            </svg>

            {/* Workplace/Computer Illustration (Simplified Placeholder) */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-4/5 h-3/5 bg-[#1A2E5A] rounded-xl shadow-2xl relative flex items-center justify-center transform -rotate-2">
                  <div className="w-11/12 h-5/6 bg-white rounded-lg flex items-center justify-center border-4 border-[#2D4686]">
                      <div className="w-16 h-16 border-4 border-red-400 rounded-full flex items-center justify-center animate-bounce">
                          <span className="text-red-500 text-3xl font-bold">X</span>
                      </div>
                  </div>
                  {/* Table Base */}
                  <div className="absolute -bottom-8 w-full h-4 bg-[#1A2E5A] rounded-full"></div>
               </div>
            </div>
          </div>
        </div>

      </div>

      {/* Global Animation CSS */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}