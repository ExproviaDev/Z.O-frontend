import dynamic from "next/dynamic";

export const revalidate = 86400; 
const HeroSection = dynamic(() => import("../HeroSection/Hero"), {
  loading: () => <div className="h-screen bg-gray-900 animate-pulse" />,
});

const Pricing = dynamic(() => import("../Pricing/Pricing"));
const JurySection = dynamic(() => import("../JuryCard/Jury"));
const EventGallery = dynamic(() => import("../EventGallery/EventGallery"));
const Registration = dynamic(() => import("../Registration/Registration"));
import Instructions from "../Instructions/Instructions";
import WhyParticipate from "../WhyParticipate/WhyParticipate";
import SDGTable1 from "../InstructionPage/SDGTable1/SDGTable1";
import Awards from "../Awards/Award";
import TimelineEvent from "../Timeline/TimelineEvent";
import Supporters from "../Supporters/Supporters";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden bg-white text-black">
      <HeroSection />
      <Instructions />
      <WhyParticipate />
      <SDGTable1 />
      <Pricing />
      <Registration />
      <Awards />
      <TimelineEvent />
      <JurySection />

      <Supporters />
      <EventGallery />
    </main>
  );
}