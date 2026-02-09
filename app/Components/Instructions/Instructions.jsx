"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function AboutOlympiad() {
  const sdgData = [
    { id: 1, original: "No Poverty", rephrased: "Zero Poverty" },
    { id: 2, original: "No Hunger", rephrased: "Zero Hunger" },
    { id: 3, original: "Good Health and Well Being", rephrased: "Zero Illness" },
    { id: 4, original: "Quality Education", rephrased: "Zero Illiteracy" },
    { id: 5, original: "Gender Equality", rephrased: "Zero Gender Inequality" },
    { id: 6, original: "Clean Water and Sanitation", rephrased: "Zero Water Scarcity" },
    { id: 7, original: "Affordable and Clean Energy", rephrased: "Zero Energy Inaccessibility" },
    { id: 8, original: "Decent Work and Economic Growth", rephrased: "Zero Economic Inequality" },
    { id: 9, original: "Industry, Innovation, and Infrastructure", rephrased: "Zero Unfair Industrial Practices" },
    { id: 10, original: "Reduced Inequalities", rephrased: "Zero Inequality" },
    { id: 11, original: "Sustainable Cities and Communities", rephrased: "Zero Unsafe Cities" },
    { id: 12, original: "Responsible Consumption and Production", rephrased: "Zero Unaccountable Consumption" },
    { id: 13, original: "Climate Action", rephrased: "Zero Environmental Degradation" },
    { id: 14, original: "Life Below Water", rephrased: "Zero Ocean Pollution" },
    { id: 15, original: "Life on Land", rephrased: "Zero Land Contamination" },
    { id: 16, original: "Peace, Justice, and Strong Institutions", rephrased: "Zero Injustice" },
    { id: 17, original: "Partnerships for the Goals", rephrased: "Zero Partnership Gaps" },
  ];

  return (
    <section className="py-12 md:py-16 bg-white font-sans text-gray-800">
      <div className="max-w-7xl mx-auto px-5 ">

        {/* Section Heading */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1e1b4b]">
            What is the <span className="text-Primary">Zero Olympiad?</span>
          </h2>
          <div className="w-24 h-1 bg-Primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          <div className="space-y-5 text-sm sm:text-base md:text-[17px] leading-relaxed text-gray-700">
            <p>
              Our students rarely encounter topics like{" "}
              <span className="font-bold text-[#1e1b4b]">
                Global Policies, World Affairs, Regional Alliances, Humanitarian
                Interventions
              </span>
              , or <span className="font-bold text-[#1e1b4b]">Diplomatic Relations</span>{" "}
              within their academic curriculum throughout their long educational
              journey. As a result, they often miss the opportunity to evolve
              into true{" "}
              <span className="font-bold text-[#1e1b4b]">
                Global Citizens or International Personalities.
              </span>
            </p>

            <p>
              If you search online for what world leaders will be focused on
              over the next four years, one central theme emerges: the{" "}
              <span className="font-bold text-[#1e1b4b]">SDGs</span>—the United Nations’{" "}
              <span className="font-bold text-Secondary">
                17 Sustainable Development Goals
              </span>
              . These goals are set to conclude by 2030, much like the{" "}
              <span className="font-bold text-[#1e1b4b]">
                Millennium Development Goals (MDGs)
              </span>{" "}
              expired in 2015.
            </p>

            <p>
              To achieve these 17 SDGs, we must eliminate the negative factors
              associated with them. With this in mind, I have rebranded each SDG
              using the concept of <span className="font-bold text-[#1e1b4b]">"Zero-"</span>
              —for instance, Zero Poverty or Zero Hunger.
            </p>

            <p>
              This is exactly why this competition is named the{" "}
              <span className="font-bold text-[#1e1b4b]">Zero Olympiad</span>. Through this
              platform, our students will gain a deep understanding of the SDGs,
              enabling them to secure their place on the global stage. In short,
              the objective of the{" "}
              <span className="font-bold text-[#1e1b4b]">Zero Olympiad</span> is to cultivate
              true{" "}
              <span className="font-bold text-Primary">Global Leaders</span>{" "}
              from Bangladesh.
            </p>

            <p className="pt-2 italic text-gray-500 text-sm">
              Click the button below to learn how Zero Olympiad will develop
              students into Global Citizens and Future Leaders.
            </p>

            <div className="pt-2">
              <Link prefetch={false} href="/instruction">
                <button className="flex items-center gap-2 cursor-pointer bg-Primary hover:bg-Secondary text-white px-6 py-3 rounded-lg font-semibold text-sm md:text-base transition-all transform hover:translate-x-1 shadow-md group">
                  View More Details
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side: Table */}
          <div className="w-full border border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-Secondary text-white">
                    <th className="py-3 px-4 font-semibold text-xs md:text-sm border-r border-white/10 w-12 text-center">
                      #
                    </th>
                    <th className="py-3 px-4 font-semibold text-xs md:text-sm border-r border-white/10">
                      Original Name
                    </th>
                    <th className="py-3 px-4 font-semibold text-xs md:text-sm">
                      Rephrased to Zero
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sdgData.map((sdg) => (
                    <tr
                      key={sdg.id}
                      className={`${sdg.id % 2 === 0
                          ? "bg-white text-gray-700"
                          : "bg-Primary text-white"
                        } border-b border-gray-100 last:border-0 hover:opacity-95 transition-opacity`}
                    >
                      <td className="py-2.5 px-4 text-xs md:text-sm font-bold border-r border-gray-200/20 text-center">
                        {sdg.id}
                      </td>
                      <td className="py-2.5 px-4 text-xs md:text-sm border-r border-gray-200/20">
                        {sdg.original}
                      </td>
                      <td className="py-2.5 px-4 text-xs md:text-sm font-semibold">
                        {sdg.rephrased}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}