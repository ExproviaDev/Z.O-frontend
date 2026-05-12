"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { useSelector } from "react-redux";
import logo from "../../../public/src/zeroolympiad.png";
import GoogleTranslate from "../../GoogleTranslate";
import HeaderDashboardEntry from "./HeaderDashboardEntry";

const navItems = [
  { title: "Home", url: "/" },
  { title: "About Us", url: "/about" },
  { title: "Instruction", url: "/instruction" },
  { title: "Gallery", url: "/gallery" },
  { title: "GLTS", url: "https://glts.faatihaaayat.com/", external: true },
  { title: "Malaysia Summit", url: "https://docs.google.com/forms/d/e/1FAIpQLSc8ZMkQnp0Lm57wW2TRSmX7vd1uSB1o7BGFBWHG1rXEhvE9fA/viewform", external: true },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const authState = useSelector((state) => state.auth);
  const { isLoggedIn } = authState || {};

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-md py-2"
            : "bg-white py-4"
        }`}
      >
        <div className=" px-4 lg:px-5">
          <div className=" max-w-7xl mx-auto flex items-center justify-between">
            <Link prefetch={false} href="/" className="flex items-center group">
              <div className="relative w-44 h-16  lg:w-64 lg:h-16 transition-transform">
                <Image
                  src={logo}
                  alt="Zero Olympiad"
                  fill
                  sizes="(max-width: 1023px) 176px, 256px"
                  className="object-contain"
                />
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.title}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative text-sm font-bold text-gray-600 transition-colors duration-300 hover:text-orange-500 group"
                  >
                    {item.title}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ) : (
                  <Link
                    prefetch={false}
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
                ),
              )}
            </nav>

            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <HeaderDashboardEntry />
              ) : (
                <div className="hidden lg:flex items-center gap-4">
                  <Link
                    prefetch={false}
                    href="/login"
                    className="text-sm font-bold text-gray-600 hover:text-orange-500"
                  >
                    Login
                  </Link>
                  <Link
                    prefetch={false}
                    href="/registration"
                    className="px-6 py-2 text-sm font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all"
                  >
                    Register
                  </Link>
                </div>
              )}
              <div className="hidden md:flex">
                <GoogleTranslate />
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-gray-600 p-2 cursor-pointer"
                type="button"
                aria-label="Open menu"
              >
                <AiOutlineMenu size={28} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer: includes Dashboard button (lazy profile fetch on click only) */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity  duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 left-0 h-full w-[280px] bg-white border-r  border-gray-200 p-6 transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-bold text-Secondary">Menu</h2>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-600"
            >
              <AiOutlineClose size={28} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-bold py-3 px-4 rounded-lg transition-colors text-gray-600 hover:bg-gray-50"
                >
                  {item.title}
                </a>
              ) : (
                <Link
                  key={item.title}
                  href={item.url}
                  prefetch={false}
                  className={`text-base font-bold py-3 px-4 rounded-lg transition-colors ${
                    pathname === item.url
                      ? "bg-orange-50 text-orange-500"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item.title}
                </Link>
              ),
            )}

            <hr className="border-gray-100 my-2" />

            {!isLoggedIn ? (
              <div className="flex flex-col gap-4">
                <Link prefetch={false} href="/login" className="text-gray-600 font-bold px-4 py-2">
                  Login
                </Link>
                <Link
                  href="/registration"
                  prefetch={false}
                  className="bg-orange-500 text-white px-4 py-2 rounded-full text-center font-bold"
                >
                  Register
                </Link>
              </div>
            ) : (
              <HeaderDashboardEntry
                variant="mobile"
                onAfterNavigate={() => setIsMobileMenuOpen(false)}
              />
            )}

            <hr className="border-gray-100 my-2" />
            <div className="flex md:hidden">
              <GoogleTranslate />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
