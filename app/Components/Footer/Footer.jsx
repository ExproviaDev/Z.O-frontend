"use client";

import Image from "next/image";
import Link from "next/link";
import { FaMapPin } from "react-icons/fa";
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
import logo from "../../../public/src/SiteLogo.png"

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FaFacebookF, url: "https://www.facebook.com/FaatihaAayatOfficial/" },
        { icon: FaYoutube, url: "https://www.youtube.com/@FaatihaAayat" },
        { icon: FaInstagram, url: "https://www.instagram.com/faatiha.aayat/" },
        { icon: FaXTwitter, url: "https://x.com/faatihaaayat" },
        { icon: FaLinkedinIn, url: "https://www.linkedin.com/in/faatihaaayat/" },
    ];

    const quickLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact-us" },
        { name: "Privacy Policy", href: "/privacyPolicy" },
        { name: "Terms & Conditions", href: "/tramsAndCondition" },
    ];

    return (
        <footer className="font-sans w-full">
           
            <div className="bg-[#14142B] text-white/70 px-5 pt-20 pb-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div>
                        <Link prefetch={false} href="/" className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110">
                                <Image src={logo} alt="siteLogo" width={56} height={56} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg lg:text-xl font-bold text-white tracking-tight">
                                    Zero Olympiad
                                </span>
                                <span className="text-[10px] lg:text-xs text-gray-300 uppercase tracking-widest">
                                    Excellence Awaits
                                </span>
                            </div>
                        </Link>
                        <p className="text-sm text-white/60 leading-relaxed">
                            Challenge your knowledge, compete with the best, and rise to the top on the ultimate quiz competition platform.
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
                                    <p>House #23, Road #7</p>
                                    <p>Dhanmondi, Dhaka-1205</p>
                                    <p>Bangladesh</p>
                                </div>
                            </li>

                            <li className="flex flex-col sm:flex-row sm:items-start gap-3">
                                <FaPhone className="mt-1  flex-shrink-0" size={20} />
                                <div className="leading-relaxed">
                                    <p>
                                        <a href="tel:+8801234567890" className="hover:text-[#5B2EFF] transition">
                                            +880 1234-567890
                                        </a>
                                    </p>
                                    <p>
                                        <a href="tel:+8809876543210" className="hover:text-[#5B2EFF] transition">
                                           +880 1973-570203
                                        </a>
                                    </p>
                                </div>
                            </li>

                            <li className="flex flex-col sm:flex-row sm:items-start gap-3">
                                <FaEnvelope className="mt-1 flex-shrink-0" size={20} />
                                <div className="leading-relaxed">
                                    <p>
                                        <a href="mailto:info@zeroolympiad.bd" className="hover:text-[#5B2EFF] transition">
                                            info@zeroolympiad.bd
                                        </a>
                                    </p>
                                    <p>
                                        <a href="mailto:support@zeroolympiad.bd" className="hover:text-[#5B2EFF] transition">
                                            support@zeroolympiad.bd
                                        </a>
                                    </p>
                                </div>
                            </li>

                            <li className="flex flex-col sm:flex-row sm:items-start gap-3">
                                <FaClock className="mt-1 flex-shrink-0" size={20} />
                                <div className="leading-relaxed">
                                    <p>Working Hours</p>
                                    <p>Sat - Thu: 9:00 AM - 5:00 PM</p>
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
                        <Link prefetch={false} href="/privacyPolicy" className="hover:text-white transition">Privacy</Link>
                        <Link prefetch={false} href="/tramsAndCondition" className="hover:text-white transition">Terms</Link>
                        <Link prefetch={false} href="/cookie-policy" className="hover:text-white transition">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
