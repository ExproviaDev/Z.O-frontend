"use client"
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

const partners = [
    { id: 1, name: "Daffodil International", logo: "/src/marquee/Daffodil-international.png", category: "Education Partner" },
    { id: 2, name: "10 MINUTE SCHOOL", logo: "/src/marquee/10minSchool.png", category: "Education Partner" },
    { id: 3, name: "Jute Craft Bangladesh", logo: "/src/marquee/jute-Craft-bangladesh.png", category: "Sustainability Partner" },
    { id: 4, name: "Ad Din Foundation", logo: "/src/marquee/ad-din.png", category: "Healthcare Partner" },
    { id: 5, name: "Bangladesh Sports Foundation", logo: "/src/marquee/BSDF.jpeg", category: "Sports Partner" },
    { id: 6, name: "Mana Bay Water Park", logo: "/src/marquee/mana-bay.png", category: "Entertainment Partner" },
    { id: 7, name: "CHIL&D", logo: "/src/marquee/Chil&d.png", category: "Non-Profit Organization" },
    { id: 8, name: "UNCC Learn", logo: "/src/marquee/Uncc-Learn.jpeg", category: "Education and Training" },
    { id: 9, name: "UNITER", logo: "/src/marquee/unitar.jpeg", category: "Global Initiative" },
];

export default function ValuedPartners() {
    return (
        <div className="px-5 py-20 overflow-hidden max-w-7xl mx-auto">
            {/* Heading */}
            <div className="text-center mb-16 ">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    Our Supporters
                </span>

                <h2 className="font-bold text-2xl lg:text-4xl mb-4">
                    Powers & <span className="text-amber-600">Partners</span>
                </h2>

                <p className="text-md max-w-1xl mx-auto ">
                   We are grateful to our sponsors and partners who make this event possible
                </p>
            </div>

            <motion.div
                animate={{ x: ["100%", "-100%"] }}
                transition={{ repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" }}
                className="flex flex-wrap gap-4 justify-center"
            >
                <ul className="flex gap-4">
                    {partners.map((partner) => (
                        <li key={partner.id} className="w-32 h-32 relative">
                            <Image
                                src={partner.logo}
                                alt={partner.name}
                                fill
                                className="object-contain px-5"
                            />
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
    );
}
