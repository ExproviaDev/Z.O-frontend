"use client";

import { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const navItems = [
  { title: "Home", url: "/" },
  { title: "About Us", url: "/about" },
  { title: "Leaderboard", url: "/leaderboard" },
  { title: "FAQ", url: "/faq" },
  { title: "Contact Us", url: "/contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20 relative">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors relative group"
              >
                {item.title}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <AiOutlineClose className="w-6 h-6" /> : <AiOutlineMenu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-primary flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110">
                <span className="text-white font-bold text-lg lg:text-2xl">Z</span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-lg lg:text-xl font-bold text-gray-800 tracking-tight">
                  Zero Olympiad
                </span>
                <span className="text-[10px] lg:text-xs text-gray-500 uppercase tracking-widest">
                  Excellence Awaits
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="px-5 py-1.5 text-lg text-gray-800 font-bold border border-primary rounded-sm hover:bg-primary hover:text-white transition-all">
              Login
            </button>
            <button className="px-5 py-1.5 text-lg text-white font-bold border border-primary rounded-sm bg-primary hover:bg-white hover:text-primary transition-all">
              Register
            </button>
          </div>

          {/* Mobile placeholder for centering logo */}
          <div className="lg:hidden w-10" />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <nav className="flex flex-col gap-4">
            {navItems.map((item, index) => (
              <Link
                key={item.title}
                href={item.url}
                className="text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100 px-4 py-3 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-gray-200">
            <button className="w-full py-3 text-gray-800 border border-primary rounded-lg hover:bg-primary hover:text-white transition-all">
              Login
            </button>
            <button className="w-full py-3 text-white bg-primary rounded-lg hover:bg-white hover:text-primary transition-all">
              Register
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
