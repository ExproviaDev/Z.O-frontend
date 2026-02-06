"use client";
import React from "react";
import Image from "next/image";

const teamData = [
  {
    name: "Emrul Ahsan",
    role: "National Director",
    desc: "Leading the execution of Zero Olympiad means ensuring fairness, scale, and impact in every phase from registration to the award stage. We are committed to creating an experience that is not only competitive but transformative, where every participant feels seen, challenged, and inspired to rise.",
    image:
      "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/Emrul-Ahsan-scaled-e1769695007597-768x826.png",
  },
  {
    name: "Sumaiya Kabir",
    role: "Secretary General",
    desc: "Education should unite, not divide. With Zero Olympiad, we are intentionally dismantling the artificial barriers between educational systems and building a national stage where merit is the sole currency. My commitment is to ensure fairness, excellence, and integrity in every aspect of this initiative because when we reduce barriers to zero, we allow heroes to rise.",
    image:
      "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/Sumaiya-Kabir-scaled-e1769699154526-768x726.png",
  },
  {
    name: "Evander Mac",
    role: "Art Director",
    desc: "",
    image:
      "https://zeroolympiad.pronizam.com/wp-content/uploads/2026/01/photo-3-768x768.avif",
  },
];

const OurTeam = () => {
  return (
    <section className="relative py-24 px-4 bg-cover bg-fixed bg-center">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-4 pb-16 animate-in fade-in slide-in-from-top-5 duration-700">
          <h2 className="md:text-5xl text-4xl font-bold text-gray-900">
            Our <span className="text-Primary">Team</span>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 font-medium">
            We are a group of innovative, experienced, and proficient teams. You
            will love to <br /> collaborate with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamData.map((member, index) => (
            <div
              key={index}
              style={{ animationDelay: `${index * 150}ms` }}
              className="bg-white/70 backdrop-blur-sm rounded-[20px] overflow-hidden border border-gray-200 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group animate-in fade-in slide-in-from-bottom-10 fill-mode-both"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="p-8 space-y-3">
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-Primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  {member.role}
                </p>
                <div className="w-10 h-[2px] bg-Primary transition-all duration-500 group-hover:w-full"></div>
                <p className="text-gray-600 text-sm leading-relaxed pt-2">
                  {member.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
