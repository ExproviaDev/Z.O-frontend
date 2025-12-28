


"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link"; // FIXED: Import from next/link
import { usePathname } from "next/navigation";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import ProfileModal from "../ProfileModal/ProfileModal";
import logo from "../../../public/src/SiteLogo.png";

const navItems = [
  { title: "Home", url: "/" },
  { title: "About Us", url: "/about" },
  { title: "About Faatiha", url: "/aboutFaatiha" },
  { title: "Leaderboard", url: "/leaderboard" },
  { title: "FAQ", url: "/faq" },
  { title: "Contact Us", url: "/contact-us" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const lastScrollY = useRef(0);
  const profileAreaRef = useRef(null);

  const authState = useSelector((state) => state.auth);
  const { user = null } = authState || {};
  const email = user?.email;

  // Scroll logic for hide/show and background change
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 20);
      if (current > lastScrollY.current && current > 100) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close sidebar menu when route changes
  useEffect(() => setIsMobileMenuOpen(false), [pathname]);

  // Close profile modal when clicking outside (Desktop)
  useEffect(() => {
    const handleClick = (e) => {
      if (isProfileOpen && profileAreaRef.current && !profileAreaRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isProfileOpen]);

  const leftMenu = navItems.slice(0, 3);
  const rightMenu = navItems.slice(3);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out
      ${hideHeader ? "-translate-y-full" : "translate-y-0"}
      ${scrolled ? "bg-black/95 backdrop-blur shadow-lg" : "bg-transparent border-b border-white/20"}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative flex items-center justify-between h-20">
          
          {/* 1. DESKTOP: LEFT NAV (Hidden on Tablet/Mobile) */}
          <nav className="hidden lg:flex items-center gap-8">
            {leftMenu.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className={`text-sm font-bold transition hover:text-orange-400 ${pathname === item.url ? "text-orange-400" : "text-white"}`}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* 2. LOGO: Center on Desktop, Left on Mobile/Tablet */}
          <Link href="/" className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 flex-shrink-0">
            <div className="relative w-12 h-12">
              <Image src={logo} alt="Logo" fill className="object-contain" />
            </div>
          </Link>

          {/* 3. RIGHT SIDE SECTION */}
          <div className="flex items-center gap-6">
            
            {/* Desktop Only Right Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {rightMenu.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`text-sm font-bold transition hover:text-orange-400 ${pathname === item.url ? "text-orange-400" : "text-white"}`}
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Profile/Auth Section (Hidden in Header on Mobile) */}
            <div className="hidden lg:flex items-center gap-3">
              {email ? (
                <div className="relative" ref={profileAreaRef}>
                  <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="block focus:outline-none">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/50">
                      {user?.profile_image_url ? (
                        <Image src={user.profile_image_url} alt="Profile" width={40} height={40} className="object-cover" />
                      ) : (
                        <FaUserCircle className="w-full h-full text-gray-300" />
                      )}
                    </div>
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-72 z-50">
                      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login" className="px-4 py-2 text-sm font-bold text-white hover:text-orange-400 transition">
                    Login
                  </Link>
                  <Link href="/registration" className="px-5 py-2 text-sm font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition">
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* HAMBURGER BUTTON (Mobile & Tablet) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 focus:outline-none"
            >
              {isMobileMenuOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- SIDEBAR MENU (Mobile & Tablet) --- */}
<div
  className={`fixed h-full inset-0 z-[60] lg:hidden
  ${isMobileMenuOpen ? "visible" : "invisible"}`}
>
  {/* Overlay */}
  <div
    className={`absolute inset-0 bg-black/60 transition-opacity duration-300
    ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
    onClick={() => setIsMobileMenuOpen(false)}
  />

  {/* Sidebar */}
  <nav
    className={`absolute left-0 top-0 h-full w-4/5 max-w-sm
     shadow-2xl
    transition-transform duration-300 transform
    ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
  >
    {/* CONTENT */}
    <div className="flex flex-col h-screen bg-Primary ">

      {/* Links */}
      <div className="flex flex-col  p-5 gap-2">
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`font-bold px-4 py-3 rounded-lg transition-colors
              ${
                pathname === item.url
                  ? "bg-white/15 text-white"
                  : "text-white/80 hover:bg-white/10"
              }`}
          >
            {item.title}
          </Link>
        ))}
      </div>

      {/* Profile / Auth Bottom */}
      <div className="mt-auto pt-4 border-t p-5  border-white/10">
        {email ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
              <div className="w-10 h-10 rounded-full overflow-hidden border">
                {user?.profile_image_url ? (
                  <Image
                    src={user.profile_image_url}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                ) : (
                  <FaUserCircle className="w-full h-full text-gray-400" />
                )}
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-gray-800 truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">{email}</p>
              </div>
            </div>

            <Link
              href="/dashboard/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full py-2 text-center font-bold text-white bg-orange-500 rounded-xl"
            >
              View Profile
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full py-2 text-center font-bold text-white bg-orange-500 rounded-xl"
            >
              Dashboard
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              className="py-3 text-center font-bold text-gray-700 bg-gray-100 rounded-xl"
            >
              Login
            </Link>
            <Link
              href="/registration"
              className="py-3 text-center font-bold text-white bg-orange-500 rounded-xl"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  </nav>
</div>

    </header>
  );
}