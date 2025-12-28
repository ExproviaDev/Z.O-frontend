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
import WhyParticipate from "../Participate/participate";
import AwardsPage from "../Opportunities/Opportunities";

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
      <section className="w-full py-20  p-7 bg-white"
      style={{
        backgroundImage: "radial-gradient(#E5E7EB 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}>
        <div className="max-w-7xl  mx-auto px-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              data-section="instructions-text"
              className={`transition-all duration-1000 ${
                animatedSections.has("instructions-text")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Zero Olympiad Instructions
              </h2>
              <p className="text-gray-800 text-lg mb-4 leading-relaxed">
                The Zero Olympiad is a groundbreaking initiative that aims to
                inspire and activate the young generation to address global
                issues. Led by Fatiha Ayat, the Olympiad is working to raise
                awareness among young people,
              </p>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                develop leadership skills, and engage them in achieving the
                United Nations Sustainable Development Goals (SDGs). The Zero
                Olympiad is a platform where participants are inspired to find
                effective solutions to various problems in society through their
                own thinking and solutions
              </p>

              <div className="md:flex gap-4">
                <div className="mb-4">
                  <button className="flex  btn-primary">
                    English Instructions
                    <FaArrowRight />
                  </button>
                </div>
                <div>
                  <button className="flex btn-Secondary">
                    Bangla Instructions
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>

            <div
              data-section="instructions-video"
              className={`transition-all duration-1000 ${
                animatedSections.has("instructions-video")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/Us-DfHSgBm4?si=C9sfk8xGdCPYNqLX"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Should You Participate - Full Width */}
      <WhyParticipate></WhyParticipate>

      {/* Registration Categories */}
      <section 
       style={{
        backgroundImage: "radial-gradient(#E5E7EB 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
      className="relative  w-full min-h-screen bg-gray-50 flex items-center py-20 px-5">
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2
              data-section="categories-title"
              className={`text-[28px] md:text-[40px] font-bold text-gray-900 mb-4 transition-all duration-1000 ${
                animatedSections.has("categories-title")
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
            >
              Registration <span className="text-pink-500">Categories</span>
            </h2>
            <p className="text-gray-600 text-[16px] md:text-[18px] max-w-3xl mx-auto">
              Choose the category that matches your academic level and begin
              your journey to excellence
            </p>
          </div>

          {/* Cards Grid */}
          {/* Cards Grid */}
          <div className="grid grid-cols-1 p-5 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {[
              {
                title: "SDG Activist",
                price: "৳300",
                level: "Class 5-8 & Examinee",
                features: [
                  "Participants from Grade 5/PYP 5 to Grade 8/MYP 3 will be called SDG Activists. Four SDG Activists from four classes (5th, 6th, 7th and 8th) who win the first and second rounds will give presentations in front of the jury board at the grand finale ceremony. The one with the highest score will be given the SDG Defender Award.",
                ],
                bg: "bg-[#F4FAFF]",
                highlighted: false,
              },
              {
                title: "SDG Ambassador",
                price: "৳300",
                level: "Class 9-12 and Versity Admission Examinee",
                features: [
                  "Participants from Grade 9/MYP 4 to HSC examinees/A Level Candidate will be called SDG Ambassadors. 9th, 10th, SSC examinees, 11th, 12th, HSC examinees – six SDG Ambassadors from these six classes will give presentations before the jury board at the grand finale ceremony. The one who gets the highest marks will be given the SDG Leader Award.",
                ],
                bg: "bg-[#FFF7FB]",
                highlighted: true,
              },
              {
                title: "SDG Achiever",
                price: "৳300",
                level: "Bachelor to Masters & Examinee",
                features: [
                  "Seven SDG Achievers from 1st year to Postgraduate from Degree Pass, Graduation, Honors, Postgraduate, Medical, Engineering, Marine, Marine Fisheries, Diploma will give presentations before the jury board at the grand finale ceremony. The one who gets the highest marks will be given the SDG Pioneer Award.",
                ],
                bg: "bg-[#F6FFF7]",
                highlighted: false,
              },
            ].map((category, index) => (
              <div
                key={index}
                data-section={`category-${index}`}
                className={`group relative rounded-3xl p-8 flex flex-col h-full transition-all duration-700
      hover:-translate-y-2 hover:shadow-2xl border border-pink-200
      ${category.bg}
      ${
        animatedSections.has(`category-${index}`)
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-700  flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
                  <FaBookOpen size={22} />
                </div>

                {/* Title */}
                <h3 className="text-[24px] font-bold mb-1">{category.title}</h3>
                <p className="text-Primary text-[18px] font-medium mb-4">
                  {category.level}
                </p>

                {/* Features */}
                <ul className="space-y-3 text-[16px] text-gray-600 flex-1">
                  {category.features.map((feature, i) => (
                    <li key={i} className="flex gap-3 leading-relaxed">
                      <span className="text-pink-500 mt-1"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div className="mt-6">
                 <div className="flex pb-3.5 gap-1 align-bottom">
                   <p className="text-3xl font-bold ">{category.price}</p>
                  <p className="text-lg text-gray-500 mt-4 ">/ participant</p>
                 </div>

                  {/* Button */}
                  <button
                    className={`
          ${
            category.highlighted
              ? "btn-primary"
              : "btn-Secondary"
              
          }` }
           style={{ width: '100%' }}
        >
          Register Now
          <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  ))}
</div>
    
  </div>
</section>





<AwardsPage></AwardsPage>




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
