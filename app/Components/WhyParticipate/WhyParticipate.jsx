"use client";

import React from "react";
import Image from "next/image";

export default function WhyParticipate() {
  const opportunities = [
    "Seventeen (17) winners of the Zero Olympiad will be awarded the opportunity to participate in an International Bootcamp hosted by Asia Pacific University (APU), Kuala Lumpur, Malaysia.",
    "Scholarship opportunities from Washington University of Science and Technology, USA.",
    "International Bootcamp participation at Asia Pacific University (APU), Malaysia.",
    "Language Learning Scholarship from Sanrin Nihongono Gakkou, Japan.",
    "Youth Peace Fellow Award from the Australian Institute of Peace & Dialogue.",
    "Comprehensive support and guidance in applying for SDG Fellowships during admission processes at overseas universities.",
    "Recommendations and nomination support to participate in the SDG Summit, held annually at the United Nations.",
    "Year-long engagement opportunities through Zero Olympiad Clubs established across educational institutions nationwide—featuring case study competitions, debates, public speaking sessions, workshops, seminars, and funding support for implementing innovative projects. Selected participants will be inducted as Zero Olympiad National Envoys."
  ];

  return (
    <section className="relative w-full py-16 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://i.ibb.co/CKpbjfNn/EYE01386.jpg" // আপনার ব্যাকগ্রাউন্ড ইমেজের পাথ দিন
          alt="Participation Background"
          fill
          className="object-cover"
        />
      
         <div className="absolute inset-0  opacity-65 mix-blend-hard-light" />

                <div className="absolute inset-0 bg-gradient-to-br from-[#266D9A]/100 via-[#266D9A]/50 to-[#266D9A]/100" />

                <div className="absolute inset-0 bg-Secondary/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-12">
          Why Should You <span className="text-Primary">Participate?</span>
        </h2>

        {/* Top Content: Text + Certificate Image */}
        <div className="flex flex-col lg:flex-row gap-10 items-center mb-10 text-white">
          <div className="w-full lg:w-3/5 space-y-5 text-sm md:text-base leading-relaxed opacity-90">
            <p>
              Participants who register for the <span className="font-bold">Zero Olympiad</span> will receive, immediately after registration, an email containing access links to <span className="font-bold">United Nations–recognized courses</span> offered by the <span className="font-bold text-Primary">United Nations Institute for Training and Research (UNITAR)</span> and the <span className="font-bold">UN Climate Change Learning Partnership (UN CC:e-Learn)</span>.
            </p>
            <p>
              The courses offered in the <span className="font-bold italic">first season of Zero Olympiad</span> will be different from those provided this year.
            </p>
            <p>
              <span className="font-bold">Faatiha Aayat</span> completed one of these courses in <span className="font-bold">2023</span>, which significantly helped her gain opportunities to speak on various issues at the <span className="font-bold italic">United Nations</span>.
            </p>
            <p>
              Upon successful completion of the course, participants will receive an <span className="font-bold border-b border-white">official certificate from the United Nations</span>.
            </p>
            <p>
              This certificate will serve as a <span className="font-bold">strong Extra-Curricular Activity (ECA)</span> and will play a vital role in future <span className="font-bold">higher education applications and professional careers</span>. Including this course completion and showcasing the certificate in one's <span className="font-bold italic text-Primary">professional biodata, CV, résumé, profile, or portfolio</span> will undoubtedly provide a significant competitive advantage.
            </p>
          </div>

          {/* Certificate Image Box */}
          <div className="w-full lg:w-2/5 flex justify-center">
            <div className="bg-white p-2 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300 max-w-sm md:max-w-md">
              <Image 
                src="https://i.ibb.co/0VrdCw4t/ser.jpg" // সার্টিফিকেটের ইমেজের পাথ দিন
                alt="UN Certificate"
                width={500}
                height={350}
                className="rounded border border-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Bottom Content: Benefits List */}
        <div className="text-white mt-12 ">
          <h3 className="text-xl md:text-2xl font-bold mb-6">
            In addition, all Zero Olympiad participants will receive the following opportunities and benefits:
          </h3>
          <ul className="grid grid-cols-1 gap-4 text-sm md:text-base opacity-90">
            {opportunities.map((item, index) => (
              <li key={index} className="flex gap-3 items-start">
                <span className="bg-Primary text-white font-bold px-2 py-0.5 rounded text-xs mt-1 shrink-0">
                  {index + 1}
                </span>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}