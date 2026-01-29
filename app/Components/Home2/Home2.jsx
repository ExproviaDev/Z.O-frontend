"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaUniversity,
  FaFlag,
  FaSchool,
  FaClock,
  FaWater,
  FaHeart,
  FaFutbol,
  FaGavel,
  FaComments,
  FaTools,
  FaRocket,
  FaBookOpen,
  FaArrowRight,
  FaTrophy,
  FaUsers,
  FaCalendarAlt,
  FaCertificate,
  FaUserGraduate,
  FaMedal,
  FaAward,
  FaHandshake,
  FaBook,
  FaLightbulb,
  FaChalkboardTeacher,
  FaTheaterMasks,
} from "react-icons/fa"
import EventGallery from "../EventGallery/EventGallery"
import JurySection from "../JuryCard/Jury"
import HeroSection from "../HeroSection/Hero"
import TimelineEvent from "../Timeline/TimelineEvent"
import Instructions from "../Instructions/Instructions";
import WhyParticipate from "../WhyParticipate/WhyParticipate";
import Registration from "../Registration/Registration";

export default function HomePage() {
  const [animatedSections, setAnimatedSections] = useState(new Set());

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAnimatedSections(
            (prev) => new Set([...prev, entry.target.dataset.section])
          );
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    });

    document.querySelectorAll("[data-section]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="overflow-x-hidden ">
      {/* Hero Section - Full Width */}
      <section>
        <HeroSection></HeroSection>
      </section>

      {/* Zero Olympiad Instructions */}
      
<Instructions></Instructions>



      {/* Why Should You Participate - Full Width */}
     <WhyParticipate></WhyParticipate>



      {/* Registration Categories */}
    
<Registration></Registration>






 <section className="relative w-full py-24  px-10 bg-gradient-to-br from-[#2034a88f] via-[#134bb3] to-[#1f28aade] overflow-hidden">
  {/* background image */}
  <Image
    src="/src/NRBAward.jpg"
    alt="Background"
    fill
    className="object-cover scroll opacity-20 mix-blend-overlay"
  />
  <div className="absolute inset-0 bg-black/60" />

  <div className="relative z-10 max-w-7xl mx-auto">
    {/* ================= Header ================= */}
    <div className="text-center mb-16">
      <span className="inline-block mb-3 px-4 py-1 rounded-full bg-pink-500/20 text-pink-400 text-sm">
        🎖 17 finalists who will receive awards
      </span>
      <h2 className="text-2xl md:text-[40px] font-bold text-white">
        Awards & <span className="text-pink-500">Opportunities</span>
      </h2>
    </div>

    {/* ================= Awards ================= */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
      {[
        {
          icon: FaUserGraduate,
          title: "SDG Fellowship Support",
          desc: "Comprehensive support in applying for SDG Fellowship during admission to Overseas Universities.",
        },
        {
          icon: FaUniversity,
          title: "UN SDG Summit Recommendation",
          desc: "Recommendation for participation in the SDG Summit held at the United Nations every year.",
        },
        {
          icon: FaFlag,
          title: "National Zero Olympiad Envoy",
          desc: "Inclusion in Zero Olympiad Clubs formed in educational institutions across the country through various activities.",
        },
      ].map((item, i) => (
        <div
          key={i}
          data-section={`award-${i}`}
          className={`group rounded-2xl p-6 border border-pink-500 bg-white/5 backdrop-blur-md
          hover:bg-white/10 hover:-translate-y-1 transition-all duration-500
          ${
            animatedSections.has(`award-${i}`)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
              >
                <item.icon className="bg-pink-600 text-white  text-4xl p-1 rounded-xs mb-4" />
                <h3 className="text-white font-semibold mb-2 text-[18px] md:text-2xl">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* ================= Scholarships ================= */}
          <h3 className="text-3xl font-bold text-center text-white mb-10">
            Scholarships & <span className="text-pink-500">Sponsorships</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              {
                icon: FaSchool,
                title: "Daffodil Institute Scholarship",
                desc: "Full scholarship for 'Empowering Future Leaders' program - 8 modules, 24 sessions on Entrepreneurship, Sustainable Development & 21st-Century Skills.",
              },
              {
                icon: FaBookOpen,
                title: "Saflur’s IELTS Course",
                desc: "Full scholarship for online IELTS course - 27 classes and 39 comprehensive lessons.",
              },
              {
                icon: FaClock,
                title: "10 Minute School",
                desc: "Customized course scholarship from Bangladesh's leading e-learning platform.",
              },
              {
                icon: FaWater,
                title: "Mana Bay Water Park",
                desc: "Day Long Pass for unlimited aquatic adventure on 17 thrilling rides across 60,000 sq ft.",
              },
              {
                icon: FaHeart,
                title: "Ad Din Foundation Medical",
                desc: "Zero Fee Medical vouchers for healthcare services.",
              },
              {
                icon: FaFutbol,
                title: "Sports Development",
                desc: "Full scholarship from Bangladesh Sports Development Foundation to learn from Professional Coaches.",
              },
            ].map((item, i) => (
              <div
                key={i}
                data-section={`scholar-${i}`}
                className={`group rounded-2xl p-6 border border-pink-500 bg-white/5 backdrop-blur-md
          hover:bg-white/10 hover:-translate-y-1 transition-all duration-500
          ${
            animatedSections.has(`scholar-${i}`)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
              >
                <item.icon className="bg-pink-600 text-white  text-4xl p-1 rounded-xs mb-4" />
                <h3 className="text-white font-semibold mb-2 text-[18px] md:text-2xl">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* ================= Activities ================= */}
          <h3 className="text-3xl md:text-[40px] font-bold text-center text-white mb-10">
            Additional <span className="text-pink-500">Activities</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: FaGavel,
                title: "Case Study Competition",
                desc: "Teams collaborate to find innovative solutions to various social problems.",
              },
              {
                icon: FaComments,
                title: "Debate & Public Speaking",
                desc: "Present ideas and develop argumentation skills in competitive settings.",
              },
              {
                icon: FaTools,
                title: "Workshops & Seminars",
                desc: "Special training sessions focused on practical skill development.",
              },
              {
                icon: FaRocket,
                title: "Project Implementation",
                desc: "Funding opportunities to implement your innovative ideas into reality.",
              },
            ].map((item, i) => (
              <div
                key={i}
                data-section={`activity-${i}`}
                className={`flex items-start gap-4 rounded-2xl p-6  bg-gray-900 backdrop-blur-md
          hover:bg-white/10 transition-all duration-500
          ${
            animatedSections.has(`activity-${i}`)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
              >
                <item.icon className="bg-pink-600 text-white  text-4xl p-1 rounded-xs mb-4 mt-1" />
                <div>
                  <h4 className="text-white font-semibold mb-1 text-[18px] md:text-2xl">
                    {item.title}
                  </h4>
                  <p className="text-gray-300 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-5 ">
        
       <TimelineEvent></TimelineEvent>
      </section>

      {/* Confirmed Guest & Jury Section */}
      <section>
        <JurySection></JurySection>
      </section>

      {/* Gallery */}
  {/* Gallery */}
<section>
  <EventGallery></EventGallery>
</section>



      {/* CTA Section - Full Width */}
      
    </main>
  );
}
