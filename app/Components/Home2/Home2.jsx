"use client";

import { useEffect, useState } from "react";
import EventGallery from "../EventGallery/EventGallery"
import JurySection from "../JuryCard/Jury"
import HeroSection from "../HeroSection/Hero"
import TimelineEvent from "../Timeline/TimelineEvent"
import Instructions from "../Instructions/Instructions";
import WhyParticipate from "../WhyParticipate/WhyParticipate";
import Registration from "../Registration/Registration";
import Awards from "../Awards/Award";

import Supporters from "../Supporters/Supporters";
import Pricing from "../Pricing/Pricing";



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

      <HeroSection></HeroSection>
      
      <Instructions></Instructions>
    
      <WhyParticipate></WhyParticipate>

      <Pricing></Pricing>

      <Registration></Registration>

      <Awards></Awards>
      
      <TimelineEvent></TimelineEvent>
      
      <JurySection></JurySection>

      <Supporters></Supporters>
     
      <EventGallery></EventGallery>

    </main>
  );
}
