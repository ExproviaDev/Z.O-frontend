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
import SDGTable1 from "../InstructionPage/SDGTable1/SDGTable1";



export default function HomePage() {
  return (
    <main className="overflow-x-hidden">

      <HeroSection></HeroSection>
      
      <Instructions></Instructions>
    
      <WhyParticipate></WhyParticipate>

      <SDGTable1></SDGTable1>

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
