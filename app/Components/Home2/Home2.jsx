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
    <main className="overflow-x-hidden">
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
