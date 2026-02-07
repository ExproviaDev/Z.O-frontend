import React from 'react'
import HeroSection from '../Components/InstructionPage/HeroSection/HeroSection'
import WhyMatters from '../Components/InstructionPage/WhyMatters/WhyMatters'
import EmpowerYouth from '../Components/InstructionPage/EmpowerYouth/EmpowerYouth'
import SDGTable1 from '../Components/InstructionPage/SDGTable1/SDGTable1'
import PrizeSection from '../Components/InstructionPage/PrizeSection/PrizeSection'
import WhyParticipate from '../Components/WhyParticipate/WhyParticipate'

export default function page() {
  return (
    <div>
        <HeroSection></HeroSection>
        <SDGTable1></SDGTable1>
        <PrizeSection></PrizeSection>
        <WhyParticipate></WhyParticipate>
        <WhyMatters></WhyMatters>
        <EmpowerYouth></EmpowerYouth>
        
    </div>
  )
}
