"use client";

import Image from "next/image";
import Link from "next/link";
import { FaMapPin } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import {
    FaFacebookF,
    FaLinkedinIn,
    FaYoutube,
    FaInstagram,
    FaXTwitter,
    FaPhone,
    FaEnvelope,
    FaClock,
} from "react-icons/fa6";
import logo from "../../../public/src/zero-olympiad-footer-logo.png"

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FaFacebookF, url: "https://www.facebook.com/zeroolympiad" },
        { icon: FaYoutube, url: "https://www.youtube.com/@zeroolympiad" },
        { icon: FaInstagram, url: "https://www.instagram.com/zeroolympiad.offiical" },
        { icon: FaLinkedinIn, url: "https://www.linkedin.com/company/zeroolympiad" },
        { icon: FaTiktok, url: "https://www.tiktok.com/@zeroolympiad", }
    ];

    const quickLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact-us" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms & Conditions", href: "/terms-and-conditions" },
    ];

    return (
        <footer className="font-sans w-full">

            <div className="bg-[#14142B] text-white/70 px-5 pt-20 pb-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div>
                        <Link prefetch={false} href="/" className="flex items-center gap-3 mb-4">
                            <div className="w-84 h-16 rounded-full flex items-center justify-center shadow-lg pb-8 transition-transform duration-300 ">
                                <Image src={logo} alt="siteLogo" />
                            </div>
                        </Link>
                        <p className="text-sm text-white/60 leading-relaxed">
                            Challenge your knowledge, compete with the best, and rise to the top of the global leadership.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        prefetch={false}
                                        href={link.href}
                                        className="text-white/70 text-sm hover:text-[#5B2EFF] transition"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-1">
                        <h4 className="font-semibold text-white mb-4">Contact Us</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex flex-col sm:flex-row sm:items-start gap-3">
                                <FaMapPin className="mt-1 flex-shrink-0" size={20} />
                                <div className="leading-relaxed">

                                    <p> Office address - House #469, Level #3, Road#31, Mohakhali DOHS, Dhaka 1212</p>
                                    <p>Bangladesh</p>
                                </div>
                            </li>

                            <li className="flex flex-col sm:flex-row sm:items-start gap-3">
                                <FaPhone className="mt-1  flex-shrink-0" size={20} />
                                <div className="leading-relaxed">
                                    <p>
                                        <a href="tel:+8801973570203" className="hover:text-[#5B2EFF] transition">
                                            +880 1973570203
                                        </a>
                                    </p>
                                    <p>
                                        <a href="tel:+8801886-286321" className="hover:text-[#5B2EFF] transition">
                                            +880 1886-286321
                                        </a>
                                    </p>
                                    <p>
                                        <a href="tel:+8801805726666" className="hover:text-[#5B2EFF] transition">
                                            +880 1805726666
                                        </a>
                                    </p>
                                </div>
                            </li>

                            <li className="flex flex-col sm:flex-row sm:items-start gap-3">
                                <FaEnvelope className="mt-1 flex-shrink-0" size={20} />
                                <div className="leading-relaxed">
                                    <p>
                                        <a href="mailto:faatiha.aayat@gmail.com" className="hover:text-[#5B2EFF] transition">
                                            faatiha.aayat@gmail.com
                                        </a>
                                    </p>
                                    <p>
                                        <a href="mailto:admin@zeroolympiad.com" className="hover:text-[#5B2EFF] transition">
                                            admin@zeroolympiad.com
                                        </a>
                                    </p>
                                    <p>
                                        <a href="mailto:zeroolympiad.bd@gmail.com" className="hover:text-[#5B2EFF] transition">
                                            zeroolympiad.bd@gmail.com
                                        </a>
                                    </p>
                                </div>
                            </li>


                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Follow Us</h4>
                        <div className="flex gap-3 mb-4">
                            {socialLinks.map((s, i) => {
                                const Icon = s.icon;
                                return (
                                    <a
                                        key={i}
                                        href={s.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-[#5B2EFF] transition"
                                    >
                                        <Icon size={16} />
                                    </a>
                                );
                            })}
                        </div>
                        <p className="text-sm text-white/60">
                            Stay connected for latest updates & competitions.
                        </p>
                    </div>
                </div>


                <div className="h-px bg-white/20 my-6"></div>

                <div className="flex flex-col sm:flex-row md:items-center justify-between gap-2 text-sm">
                    <p className="text-white/50">
                        © {currentYear} Zero Olympiad. All rights reserved.
                    </p>
                    <div className="flex flex-wrap gap-6">
                        <Link prefetch={false} href="/privacy-policy" className="hover:text-white transition">Privacy</Link>
                        <Link prefetch={false} href="/terms-and-conditions" className="hover:text-white transition">Terms</Link>
                        <Link prefetch={false} href="/cookie-policy" className="hover:text-white transition">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
