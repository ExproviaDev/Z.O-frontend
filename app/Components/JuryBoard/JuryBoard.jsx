import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";



const juryBoard = [
    {
        id: 1,
        tag: "Chief Judge",
        name: "Dr. Ahmed Rahman",
        title: "Professor of Mathematics, University of Dhaka",
        image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        Linkedin: "linkedin.com",
        Facebook: "https://www.facebook.com/",
    },
    {
        id: 2,
        tag: "Jury Member",
        name: "Dr. Fatima Hassan",
        title: "Head of Science Department, BUET",
        image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
        Linkedin: "linkedin.com",
        Facebook: "https://www.facebook.com/",
    },
    {
        id: 3,
        tag: "Jury Member",
        name: "Prof. Karim Abdullah",
        title: "Dean of Engineering, NSU",
        image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        Linkedin: "linkedin.com",
        Facebook: "https://www.facebook.com/",
    },
];

const guests = [
    {
        id: 1,
        tag: "Chief Guest",
        name: "Dr. Shahida Begum",
        title: "Secretary, Ministry of Education",
        image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
        Linkedin: "linkedin.com",
        Facebook: "https://www.facebook.com/",
    },
    {
        id: 2,
        tag: "Special Guest",
        name: "Mr. Rafiq Islam",
        title: "Chairman, Education Board",
        image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
        Linkedin: "linkedin.com",
        Facebook: "https://www.facebook.com/",
    },
];



export default function JuryBoard() {
    return (
        <section className="relative z-10 py-20">
            <div className="max-w-7xl mx-auto px-5">

                {/* Heading */}
                <div className="text-center mb-16 ">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Our Experts
                    </span>

                    <h2 className="font-bold text-2xl lg:text-4xl mb-4">
                        Jury Board & <span className="text-amber-600">Hon&apos;ble Guests</span>
                    </h2>

                    <p className="text-md max-w-1xl mx-auto ">
                        Distinguished academics and professionals who guide and evaluate our
                        participants
                    </p>
                </div>

                {/* Jury Board */}
                <div className="mb-16">
                    <h3 className="text-2xl lg:text-3xl font-bold text-center mb-10 ">
                        Jury Board
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {juryBoard.map((item) => (
                            <div
                                key={item.id}
                                className="glass-card rounded-3xl p-6 text-center group hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-xl border-gray-100  "
                            >
                                <div className="relative w-32 h-32 mx-auto mb-6">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-gold-dark p-0.5">
                                        <div className="w-full h-full rounded-full overflow-hidden bg-card">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover group-hover:scale-110 rounded-full border-2 border-amber-400 transition-transform duration-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <span className="text-sm font-medium text-Primary">
                                    {item.tag}
                                </span>

                                <h4 className="text-xl font-bold font-display text-foreground mt-1 mb-2">
                                    {item.name}
                                </h4>

                                <p className="text-sm text-muted-foreground mb-4">
                                    {item.title}
                                </p>

                                <div className="flex items-center justify-center gap-3">

                                    <Link href={item.Linkedin}>
                                        <div className="p-2 rounded-lg bg-Primary text-white" >
                                            <FaLinkedinIn />
                                        </div>
                                    </Link>
                                    <Link href={item.Facebook}>
                                        <div className="p-2 rounded-lg bg-Primary text-white" >
                                             <FaFacebookF />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Guests */}
                <div>
                    <h3 className="font-bold text-2xl lg:text-4xl text-foreground text-center mb-10 ">
                        Hon&apos;ble Guests
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        {guests.map((item) => (
                            <div
                                key={item.id}
                                className="glass-card rounded-3xl p-6 flex items-center gap-6 group hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-xl border-gray-200 "
                            >
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal to-teal-light p-0.5">
                                        <div className="w-full h-full rounded-full overflow-hidden bg-card">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover rounded-full  border-2 border-amber-400 group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-sm font-medium text-teal">
                                        {item.tag}
                                    </span>
                                    <h4 className="text-lg font-bold font-display text-foreground">
                                        {item.name}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        {item.title}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
