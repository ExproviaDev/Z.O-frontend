"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import ProfileModal from "../ProfileModal/ProfileModal";
import logo from "../../../public/src/SiteLogo.png";

const navItems = [
  { title: "Home", url: "/" },
  { title: "About Us", url: "/about" },
  { title: "Instruction", url: "/instruction" },
  { title: "Galley", url: "/gallery" },
  { title: "Ramadan Reflection", url: "/ramadan-zero" },
  { title: "FAQ", url: "/faq" },
  { title: "Contact Us", url: "/contact-us" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const lastScrollY = useRef(0);
  const profileAreaRef = useRef(null);

  const authState = useSelector((state) => state.auth);
  const { user = null } = authState || {};
  const email = user?.email;

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 20);
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [pathname]);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        isProfileOpen &&
        profileAreaRef.current &&
        !profileAreaRef.current.contains(e.target)
      ) {
        setIsProfileOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [isProfileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-md py-2"
            : "bg-white py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
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
                <h1 className="text-xl lg:text-2xl font-extrabold text-Secondary leading-none">
                  Zero Olympiad
                </h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">
                  Excellence Awaits
                </p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`relative text-sm font-bold transition-colors duration-300 hover:text-orange-500 ${
                    pathname === item.url ? "text-orange-500" : "text-gray-600"
                  } group`}
                >
                  {item.title}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full ${
                      pathname === item.url ? "w-full" : ""
                    }`}
                  ></span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {email ? (
                <div className="relative" ref={profileAreaRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="relative p-0.5 rounded-full transition-all active:scale-95 cursor-pointer focus:outline-none"
                  >
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden border-2 border-Secondary">
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
                  </button>
                  <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-4">
                  <Link
                    href="/login"
                    className="text-sm font-bold text-gray-600 hover:text-orange-500"
                  >
                    Login
                  </Link>
                  <Link
                    href="/registration"
                    className="px-6 py-2 text-sm font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all"
                  >
                    Register
                  </Link>
                </div>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-gray-600 p-2"
              >
                <AiOutlineMenu size={28} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 left-0 h-full w-[280px] bg-white border-r border-gray-200 p-6 transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-bold text-Secondary">Menu</h2>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600">
              <AiOutlineClose size={28} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className={`text-base font-bold py-3 px-4 rounded-lg transition-colors ${
                  pathname === item.url
                    ? "bg-orange-50 text-orange-500"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item.title}
              </Link>
            ))}

            <hr className="border-gray-100 my-2" />

            {!email ? (
              <div className="flex flex-col gap-4">
                <Link href="/login" className="text-gray-600 font-bold px-4 py-2">
                  Login
                </Link>
                <Link
                  href="/registration"
                  className="bg-orange-500 text-white px-4 py-2 rounded-full text-center font-bold"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/dashboard/profile" className="flex items-center gap-3 text-gray-600 px-4 py-3 hover:bg-gray-50 rounded-lg">
                  <FaUserCircle size={24} />
                  <span className="font-bold">My Account</span>
                </Link>
                <Link href="/dashboard" className="flex items-center gap-3 text-gray-600 px-4 py-3 hover:bg-gray-50 rounded-lg">
                  <RxDashboard size={24} />
                  <span className="font-bold">Dashboard</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}