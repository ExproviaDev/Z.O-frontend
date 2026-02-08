import dynamic from 'next/dynamic';
export const revalidate = 86400; // 1 day
const HeroSection = dynamic(() => import('../Components/InstructionPage/HeroSection/HeroSection'), {
  loading: () => <div className="h-[60vh] bg-slate-100 animate-pulse" />, 
});
import WhyMatters from '../Components/InstructionPage/WhyMatters/WhyMatters'
import EmpowerYouth from '../Components/InstructionPage/EmpowerYouth/EmpowerYouth'
import SDGTable1 from '../Components/InstructionPage/SDGTable1/SDGTable1'
import PrizeSection from '../Components/InstructionPage/PrizeSection/PrizeSection'
import WhyParticipate from '../Components/WhyParticipate/WhyParticipate'

export default function page() {
  return (
    <div>
        <HeroSection />
        <SDGTable1 />
        <PrizeSection />
        <WhyParticipate />
        <WhyMatters />
        <EmpowerYouth />
    </div>
  )
}