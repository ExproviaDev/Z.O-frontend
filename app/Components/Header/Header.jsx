"use client";

import { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from "../../../public/src/SiteLogo.png";
import Image from "next/image";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

const navItems = [
  { title: "Home", url: "/" },
  { title: "About Us", url: "/about" },
  { title: "Leaderboard", url: "/leaderboard" },
  { title: "FAQ", url: "/faq" },
  { title: "Contact Us", url: "/contact-us" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const authState = useSelector((state) => state.user);
  // const { user = null, isLoggedIn = false, loading = true } = authState || {};

  // console.log("Is Authenticated:", isLoggedIn);
  // console.log("User Profile Data:", user);
  // console.log("Loading State:", loading);
  const user = false;
  console.log("user", user);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full  bg-white backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container max-w-7xl mx-auto p-5">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo and Mobile Menu Toggle */}
            <div className="flex items-center justify-between w-full lg:w-auto">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-6 pr-10">
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className="text-md font-semibold text-gray-700 hover:text-primary transition-colors relative group"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>

              {/* Logo */}
              <div className="flex items-center justify-center gap-2 lg:px-8 ">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110">
                    <Image src={logo} alt="siteLogo" width={56} height={56} />
                  </div>
                  <div className="hidden sm:flex flex-col ml-2">
                    <span className="text-lg lg:text-xl font-bold text-gray-800 tracking-tight">
                      Zero Olympiad
                    </span>
                    <span className="text-[10px] lg:text-xs text-gray-500 uppercase tracking-widest">
                      Excellence Awaits
                    </span>
                  </div>
                </Link>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 text-gray-700 hover:text-primary transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <AiOutlineClose className="w-6 h-6" />
                ) : (
                  <AiOutlineMenu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Desktop Buttons */}
            {user && (
              <div className="hidden lg:flex items-center gap-4">
                <Link
                  href={"/login"}
                  className="px-5 py-1.5 flex justify-center items-center gap-2 text-lg text-gray-800 font-bold border border-primary rounded-sm hover:bg-primary hover:text-white transition-all"
                >
                  <FaSignInAlt size={18} /> Login
                </Link>
                <Link
                  href={"/registration"}
                  className="px-5 py-1.5 text-lg flex justify-center items-center gap-2 text-white font-bold border border-primary rounded-sm bg-primary hover:bg-white hover:text-primary transition-all"
                >
                  <FaUserPlus size={18} /> Register
                </Link>
              </div>
            )}
            {!user && <div>hello</div>}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden top-0 left-0 right-0 border-t border-gray-200 shadow-lg transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "flex opacity-100 translate-y-0"
              : "hidden opacity-0 -translate-y-4 pointer-events-none"
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
              <Link
                href={"/login"}
                className="w-full py-3 flex justify-center items-center gap-2 text-gray-800 border border-primary rounded-lg hover:bg-primary hover:text-white transition-all"
              >
                <FaSignInAlt size={16} /> Login
              </Link>
              <Link
                href={"/registration"}
                className="w-full py-3 flex justify-center items-center gap-2 text-white bg-primary rounded-lg hover:bg-white hover:text-primary transition-all"
              >
                <FaUserPlus size={18} /> Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
