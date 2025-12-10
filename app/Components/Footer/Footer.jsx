"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaYoutube  } from "react-icons/fa";
import LogoFooter from "../../../public/src/SiteLogo.png";
 import {MdEmail, MdPhone, MdLocationOn} from "react-icons/md";

export default function Footer() {
    return (
        <footer className="bg-[#F4F4F4] text-black mt-10">
            <div className="container mx-auto px-5 lg:px-4 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                    {/* Brand Section */}
                    <div>
                        <Link href="/" className="flex items-center gap-3 mb-4 group">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-transform duration-300 group-hover:scale-105">
                                <Image
                                    src={LogoFooter}
                                    width={40}
                                    height={40}
                                    alt="Zero Olympiad Footer Logo"
                                    className="rounded-lg"
                                />
                            </div>

                            <span className="text-2xl font-bold">
                                Zero <span className="text-primary">Olympiad</span>
                            </span>
                        </Link>

                        <p className="text-lg text-black/70 leading-relaxed">
                            Challenge your knowledge, compete with the best, and rise to the
                            top on the ultimate quiz competition platform.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-3 text-lg">
                            {[
                                { name: "Home", path: "/" },
                                { name: "About Us", path: "/about-us" },
                                { name: "Contact Us", path: "/contact-us" },
                                { name: "Privacy Policy", path: "/privacy" },
                                { name: "Terms & Conditions", path: "/terms" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.path}
                                        className="text-black/70 hover:text-primary transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                   

                    <div>
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-lg text-black">

                            <li className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <MdEmail className="w-4 h-4 text-primary" />
                                </span>
                                <a href="mailto:faatiha.aayat@gmail.com" className="hover:text-primary transition-colors">
                                    faatiha.aayat@gmail.com
                                </a>
                            </li>

                            <li className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <MdPhone className="w-4 h-4 text-primary" />
                                </span>
                                <a href="tel:+880-1973-570203" className="hover:text-primary transition-colors">
                                    +880-1973-570203
                                </a>
                            </li>

                            <li className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <MdLocationOn className="w-4 h-4 text-primary" />
                                </span>
                                <span className="hover:text-primary transition-colors">
                                    Khulna, Bangladesh
                                </span>
                            </li>

                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                        <div className="flex gap-3">
                            {[
                                { icon: FaFacebookF, url: "https://facebook.com" },
                                { icon: FaLinkedinIn, url: "https://linkedin.com" },
                                { icon: FaYoutube , url: "https://youtube.com" },
                            ].map((s, i) => {
                                const Icon = s.icon;
                                return (
                                    <a
                                        key={i}
                                        href={s.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-black/70 hover:bg-primary hover:text-white transition-all duration-300"
                                    >
                                        <Icon size={20} />
                                    </a>
                                );
                            })}
                        </div>

                        <p className="mt-4 text-lg text-black/70">
                            Stay connected for the latest updates and competitions.
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-black/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-lg text-black/60">
                            © {new Date().getFullYear()} Zero Olympiad. All rights reserved.
                        </p>

                        <div className="flex items-center gap-6 text-lg">
                            <Link
                                href="/privacy"
                                className="text-black/60 hover:text-primary transition-colors"
                            >
                                Privacy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-black/60 hover:text-primary transition-colors"
                            >
                                Terms
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
