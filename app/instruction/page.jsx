import React from 'react'
import HeroSection from '../Components/InstructionPage/HeroSection/HeroSection'
import WhyMatters from '../Components/InstructionPage/WhyMatters/WhyMatters'
import EmpowerYouth from '../Components/InstructionPage/EmpowerYouth/EmpowerYouth'
import SDGTable1 from '../Components/InstructionPage/SDGTable1/SDGTable1'
import PrizeSection from '../Components/InstructionPage/PrizeSection/PrizeSection'

export default function page() {
  return (
    <div>
        <HeroSection></HeroSection>
        <WhyMatters></WhyMatters>
        <EmpowerYouth></EmpowerYouth>
        <SDGTable1></SDGTable1>
        <PrizeSection></PrizeSection>
    </div>
  )
}
