"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from "../../../public/src/SiteLogo.png";
import Image from "next/image";
import { FaSignInAlt, FaUserCircle, FaUserPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import ProfileModal from "../ProfileModal/ProfileModal";

const navItems = [
  { title: "Home", url: "/" },
  { title: "About Us", url: "/about" },
  { title: "Leaderboard", url: "/leaderboard" },
  { title: "FAQ", url: "/faq" },
  { title: "Contact Us", url: "/contact-us" },
  { title: "Dashboard", url: "/dashboard" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Reference to the entire profile section (Button + Modal)
  const profileAreaRef = useRef(null);

  const authState = useSelector((state) => state.user);
  const { user = null, isLoggedIn = false } = authState || {};
  const email = user?.email;

  // Handle header background change on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global click listener to close modal when clicking anywhere on the display
  useEffect(() => {
    const handleGlobalClick = (event) => {
      // If the modal is open and the click is NOT inside the profileAreaRef
      if (
        isProfileOpen &&
        profileAreaRef.current &&
        !profileAreaRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    // Attach to window for the most reliable global detection
    window.addEventListener("click", handleGlobalClick);

    return () => {
      window.removeEventListener("click", handleGlobalClick);
    };
  }, [isProfileOpen]);

  const filteredNavItems = navItems.filter((item) => {
    if (item.title === "Dashboard") return !!email;
    return true;
  });

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-2"
          : "bg-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-12 h-12 lg:w-14 lg:h-14 transition-transform duration-500 group-hover:rotate-[10deg]">
              <Image
                src={logo}
                alt="Zero Olympiad"
                fill
                className="object-contain"
              />
            </div>
            <div className="ml-3">
              <h1 className="text-xl lg:text-2xl font-extrabold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent leading-none">
                Zero Olympiad
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">
                Excellence Awaits
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {filteredNavItems.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className={`relative text-sm font-bold transition-colors duration-300 hover:text-primary ${
                  pathname === item.url ? "text-primary" : "text-gray-600"
                } group`}
              >
                {item.title}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                    pathname === item.url ? "w-full" : ""
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {email ? (
              <div className="relative" ref={profileAreaRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="relative p-0.5 rounded-full transition-all active:scale-95 cursor-pointer focus:outline-none"
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden border-2 border-purple-500 hover:border-primary transition-colors">
                    {user.profile_image_url ? (
                      <Image
                        src={user.profile_image_url}
                        alt="Profile"
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <FaUserCircle className="w-full h-full text-gray-300 bg-gray-100" />
                    )}
                  </div>
                  <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm"></span>
                </button>

                {/* Profile Modal Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-72 origin-top-right z-[100] animate-in fade-in zoom-in duration-200">
                    <ProfileModal
                      isOpen={isProfileOpen}
                      onClose={() => setIsProfileOpen(false)}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-6 py-2.5 text-sm font-bold text-gray-700 hover:text-white hover:bg-primary hover:rounded-full hover:shadow-lg transition-all ease-in-out duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/registration"
                  className="px-6 py-2.5 text-sm font-bold text-white bg-primary rounded-full shadow-lg hover:bg-primary/90 transition-all"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-gray-50 text-gray-700"
            >
              {isMobileMenuOpen ? (
                <AiOutlineClose size={24} />
              ) : (
                <AiOutlineMenu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
