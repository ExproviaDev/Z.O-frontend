

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

  // Check if on home page
  const isHomePage = pathname === "/";

  /* Scroll hide/show logic */
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 20);
      setHideHeader(current > lastScrollY.current && current > 100);
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
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isProfileOpen]);

  const leftMenu = navItems.slice(0, 3);
  const rightMenu = navItems.slice(3);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          hideHeader ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-black/95 backdrop-blur shadow-lg"
            : isHomePage
            ? "bg-transparent border-b border-white/20"
            : "bg-[#1A1831]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative flex items-center justify-between h-20">
            {/* DESKTOP LEFT NAV */}
            <nav className="hidden lg:flex items-center gap-8">
              {leftMenu.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`text-sm font-bold transition hover:text-orange-400 ${
                    pathname === item.url ? "text-orange-400" : "text-white"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* LOGO */}
            <Link href="/" className="lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              <div className="relative w-12 h-12">
                <Image src={logo} alt="Logo" fill className="object-contain" />
              </div>
            </Link>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-4">
              <nav className="hidden lg:flex items-center gap-8">
                {rightMenu.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className={`text-sm font-bold transition hover:text-orange-400 ${
                      pathname === item.url ? "text-orange-400" : "text-white"
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>

              {/* PROFILE (Desktop) */}
              <div className="hidden md:flex items-center gap-3">
                {email ? (
                  <div className="relative" ref={profileAreaRef}>
                    <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-white/50">
                        {user?.profile_image_url ? (
                          <Image
                            src={user.profile_image_url}
                            alt="Profile"
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        ) : (
                          <FaUserCircle className="w-full h-full text-gray-300" />
                        )}
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      href="/login"
                      className="text-sm font-bold text-white hover:text-orange-400"
                    >
                      Login
                    </Link>
                    <Link
                      href="/registration"
                      className="px-4 py-2 text-sm font-bold text-white bg-orange-500 rounded-full"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>

              {/* HAMBURGER BUTTON (Mobile/Tablet) */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-white p-2"
              >
                <AiOutlineMenu size={28} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- PROFILE SIDEBAR --- */}
      {isProfileOpen && (
        <div
          className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 ${
            isProfileOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setIsProfileOpen(false)}
        >
          <div
            className={`fixed top-0 left-0 h-full w-[300px] bg-[#1A1831] border-r border-white/10 p-6 transition-transform duration-300 ${
              isProfileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsProfileOpen(false)}
                className="text-white"
              >
                
              </button>
             
            </div>
             <p className="border-b border-white/30 my-2"></p>
             
            

            {/* PROFILE MODAL CONTENT */}
            <ProfileModal
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
            />
           
          </div>
        </div>
      )}

      {/* --- MOBILE SIDEBAR MENU --- */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 left-0 h-full w-[280px] bg-[#1A1831] border-r border-white/10 p-6 transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end mb-8">
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
              <AiOutlineClose size={28} />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className={`text-lg font-semibold transition ${
                  pathname === item.url ? "text-orange-400" : "text-white"
                }`}
              >
                {item.title}
              </Link>
            ))}

            <hr className="border-white/10 my-2" />

            {!email ? (
              <div className="flex flex-col gap-4">
                <Link href="/login" className="text-white font-bold">
                  Login
                </Link>
                <Link
                  href="/registration"
                  className="bg-orange-500 text-white px-4 py-2 rounded-full text-center"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="">
                <Link href={"/dashboard/profile"} className="flex items-center gap-3 text-white">
                  <FaUserCircle size={24} />
                  <span>My Account</span>
                </Link>
                <Link href={"/dashboard"} className="flex pt-4 items-center gap-3 text-white">
                  <RxDashboard size={24} />
                  <span>Dashboard</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
