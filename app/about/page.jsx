import {

  FaArrowRight,
  FaQuoteLeft,

} from "react-icons/fa";

import Image from "next/image";
import HeroSection from "./components/heroSection";
import JourneySection from "./components/Participant-Journey/ParticipantJourney";
import YouthSection from "./components/youthSection/youthSection";
export const revalidate = 86400;
export default function ZeroOlympiad() {
  return (
    <div className="min-h-screen   text-slate-900 selection:bg-indigo-100 selection:text-indigo-700 font-sans antialiased">
      <div className="">
        <section>
          <HeroSection></HeroSection>
        </section>
        {/* Faatiha Aayat section */}
        <section
          id="mission"
          className="relative py-12 md:py-24 bg-white overflow-hidden font-sans"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Left Side: Content */}
              <div className="relative order-2 lg:order-1">
                {/* Background Blur Effect */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-50/80 rounded-full -z-10 blur-2xl" />

                <div className="mb-8 md:mb-10 group">
                  <div className="flex flex-col border-l-4 md:border-l-8 border-Primary pl-5 md:pl-8 py-2">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
                      Faatiha Aayat
                    </h2>

                    <div className="mt-3 md:mt-4 flex items-center gap-3">
                      <span className="h-[2px] w-8 md:w-12 bg-Secondary"></span>
                      <span className="text-lg md:text-2xl font-medium text-Secondary tracking-wide">
                        Founder & CEO of Zero Olympiad
                      </span>
                    </div>
                  </div>
                </div>

                {/* Paragraphs with fixed Bold Text */}
                <div className="space-y-6 text-base md:text-lg text-slate-600 leading-relaxed text-justify md:text-left">
                  <p>
                    Faatiha Aayat is a fourteen-year-old Child Rights Activist and Climate
                    Campaigner. She has already spoken in the United Nations, Ford Foundation,
                    TEDx, Harvard University, Columbia University, Georgia Tech etc.
                  </p>

                  <p>
                    She regularly raises her voice against Global Warming, Climate Change,
                    Carbon Emission, Fossil Fuel etc. She talks to stop Child Abuse, Gender
                    Discrimination and Domestic Violence. She has four published books. She runs
                    her own organization named{" "}
                    <strong className="font-bold text-slate-900">
                      Faatiha Aayat Academy
                    </strong>{" "}
                    where she works for CHIL&D - Climate, Health, Information, Learning and
                    Development.
                  </p>

                  <p>
                    She has pursued a Professional Development Program from the Department of
                    Continuing Education of University of Harvard. She has obtained{" "}
                    <strong className="font-bold text-slate-900">
                      “President’s Award For Outstanding Academic Excellence – Gold
                      Certificate''
                    </strong>
                    . She has completed the "Gender Equality and Human Rights in Climate Action
                    and Renewable Energy" course provided by United Nations Institute for
                    Training and Research.
                  </p>

                  <p>
                    She was conferred the{" "}
                    <strong className="font-bold text-slate-900">
                      Human Rights Hero Award 2023
                    </strong>{" "}
                    at the 17th International Human Rights Youth Summit held at the UN
                    Headquarters ECOSOC Chamber. She became champion in “My Goal – For A Better
                    Future” organized by UN Environment. Her prototype of Space Rover
                    Perseverance and Helicopter Ingenuity has been nominated for display in the
                    Jet Propulsion Laboratory of NASA. She received the Amazing Artist Award in
                    the Ocean Under Threat category at the Advena World Art Competition. She
                    became Champion in the New York City Urban Debate League 2023 in
                    MSParliJVDivision.
                  </p>
                </div>

                {/* Button Section */}
                <div className="mt-8 md:mt-10">
                  <a
                    href="https://www.linkedin.com/in/faatihaaayat/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-3 cursor-pointer bg-Primary hover:bg-Secondary text-white border-Primary hover:border-Secondary px-8 py-3.5 md:px-8 md:py-4 rounded-xl font-bold text-base transition-all transform hover:scale-105 shadow-lg group"
                  >
                    View More
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Right Side: Image */}
              <div className="relative group order-1 lg:order-2 mx-auto w-full max-w-md lg:max-w-full">
                {/* Rotated Background Frame */}
                <div className="absolute inset-0 bg-indigo-600 rounded-[2rem] md:rounded-[3rem] rotate-3 scale-105 opacity-5 group-hover:rotate-0 transition-transform duration-700" />

                {/* Image Container */}
                <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square bg-slate-100 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100">
                  <Image
                    src="https://res.cloudinary.com/dsga4gyw9/image/upload/v1770219566/FAATIHA_AAYAT_1_ltnjp2.jpg"
                    alt="Faatiha Aayat - Founder & CEO"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-cover hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>
        {/* Mission , Vision , Values section */}
        <section
          id="vision-mission"
          className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-slate-50"
        >
          {/* Top Gradient Line */}
          <div className="absolute top-0 left-0 w-full flex justify-center z-20">
            <div className="w-3/4 md:w-1/2 h-[2px] bg-gradient-to-r from-transparent via-Primary to-transparent opacity-50"></div>
          </div>

          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://i.ibb.co.com/99HFrKfK/speaker-bg.png"
              alt="Background"
              className="w-full h-full object-cover"
            />
            {/* Optional: Dark overlay to make cards pop more if needed */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Responsive Grid System */}
            {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 3 cols */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  title: "Mission",
                  content:
                    "To engage and empower students through competitions, learning, and action-based initiatives that build leadership, critical thinking, and social responsibility. Zero Olympiad aims to inspire youth to actively address global challenges and local problems.",
                  bg: "bg-slate-900/95 text-white",
                  border: "border-slate-800",
                },
                {
                  title: "Vision",
                  content:
                    "To nurture a generation of informed, ethical, and courageous young leaders who think critically, act responsibly, and work collectively to build a peaceful, just, and sustainable world where every voice matters.",
                  bg: "bg-white/95 text-slate-900",
                  border: "border-gray-200",
                },
                {
                  title: "Values",
                  content:
                    "Integrity and honesty in all actions, inclusivity and respect for diversity, excellence and curiosity in learning, collaboration and teamwork, compassion and empathy, and a strong commitment to service and positive impact in society.",
                  bg: "bg-indigo-600/95 text-white",
                  border: "border-indigo-500",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  // Responsive Classes:
                  // 1. Logic for Tablet (md): If it's the 3rd card (index 2), span 2 columns to center it.
                  // 2. Padding adjusts from p-8 (mobile) to p-12 (desktop).
                  // 3. Rounded corners adjust for mobile aesthetics.
                  className={`
            ${card.bg} 
            ${i === 2 ? "md:col-span-2 lg:col-span-1" : ""} 
            p-8 md:p-10 lg:p-12 
            rounded-[2rem] md:rounded-[3rem] 
            transition-all duration-300 
            hover:scale-[1.02] lg:hover:scale-[1.05] 
            cursor-default shadow-2xl 
            backdrop-blur-md border ${card.border}
            flex flex-col justify-center
          `}
                >
                  <h3 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 tracking-tighter italic uppercase">
                    {card.title}
                  </h3>
                  <p className="text-base md:text-lg opacity-90 leading-relaxed font-medium text-justify md:text-left">
                    {card.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* The Participant Journey section */}
        <JourneySection></JourneySection>
        {/* The youth section */}
        <YouthSection></YouthSection>
      </div>
    </div>
  );
}
