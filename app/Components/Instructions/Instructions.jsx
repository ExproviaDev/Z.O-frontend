"use client";

import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function AboutOlympiad() {
  const sdgData = [
    { id: 1, original: "No Poverty", rephrased: "Zero Poverty" },
    { id: 2, original: "No Hunger", rephrased: "Zero Hunger" },
    {
      id: 3,
      original: "Good Health and Well Being",
      rephrased: "Zero Illness",
    },
    { id: 4, original: "Quality Education", rephrased: "Zero Illiteracy" },
    { id: 5, original: "Gender Equality", rephrased: "Zero Gender Inequality" },
    {
      id: 6,
      original: "Clean Water and Sanitation",
      rephrased: "Zero Water Scarcity",
    },
    {
      id: 7,
      original: "Affordable and Clean Energy",
      rephrased: "Zero Energy Inaccessibility",
    },
    {
      id: 8,
      original: "Decent Work and Economic Growth",
      rephrased: "Zero Economic Inequality",
    },
    {
      id: 9,
      original: "Industry, Innovation, and Infrastructure",
      rephrased: "Zero Unfair Industrial Practices",
    },
    { id: 10, original: "Reduced Inequalities", rephrased: "Zero Inequality" },
    {
      id: 11,
      original: "Sustainable Cities and Communities",
      rephrased: "Zero Unsafe Cities",
    },
    {
      id: 12,
      original: "Responsible Consumption and Production",
      rephrased: "Zero Unaccountable Consumption",
    },
    {
      id: 13,
      original: "Climate Action",
      rephrased: "Zero Environmental Degradation",
    },
    { id: 14, original: "Life Below Water", rephrased: "Zero Ocean Pollution" },
    { id: 15, original: "Life on Land", rephrased: "Zero Land Contamination" },
    {
      id: 16,
      original: "Peace, Justice, and Strong Institutions",
      rephrased: "Zero Injustice",
    },
    {
      id: 17,
      original: "Partnerships for the Goals",
      rephrased: "Zero Partnership Gaps",
    },
  ];

  return (
    <section className="py-16 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1e1b4b]">
            What is the <span className="text-Primary">Zero Olympiad?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed">
            <p>
              Our students rarely encounter topics like{" "}
              <span className="font-bold">
                Global Policies, World Affairs, Regional Alliances, Humanitarian
                Interventions
              </span>
              , or <span className="font-bold">Diplomatic Relations</span>{" "}
              within their academic curriculum throughout their long educational
              journey. As a result, they often miss the opportunity to evolve
              into true{" "}
              <span className="font-bold">
                Global Citizens or International Personalities.
              </span>
            </p>

            <p>
              If you search online for what world leaders will be focused on
              over the next four years, one central theme emerges: the{" "}
              <span className="font-bold">SDGs</span>—the United Nations’{" "}
              <span className="font-bold text-Secondary">
                17 Sustainable Development Goals
              </span>
              . These goals are set to conclude by 2030, much like the{" "}
              <span className="font-bold">
                Millennium Development Goals (MDGs)
              </span>{" "}
              expired in 2015.
            </p>

            <p>
              To achieve these 17 SDGs, we must eliminate the negative factors
              associated with them. With this in mind, I have rebranded each SDG
              using the concept of <span className="font-bold">"Zero-"</span>
              —for instance, Zero Poverty or Zero Hunger.
            </p>

            <p>
              This is exactly why this competition is named the{" "}
              <span className="font-bold">Zero Olympiad</span>. Through this
              platform, our students will gain a deep understanding of the SDGs,
              enabling them to secure their place on the global stage. In short,
              the objective of the{" "}
              <span className="font-bold">Zero Olympiad</span> is to cultivate
              true{" "}
              <span className="font-bold text-Primary">Global Leaders</span>{" "}
              from Bangladesh.
            </p>

            <p className="pt-4 italic">
              Click the button below to learn how Zero Olympiad will develop
              students into Global Citizens and Future Leaders through various
              programs in 2026, as well as to explore the Zero Olympiad
              Competition.
            </p>

            <Link href="/instruction">
              <button className="flex items-center gap-2 cursor-pointer bg-Primary hover:bg-Secondary text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg group">
                View More Details
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          <div className="overflow-hidden border border-gray-200 rounded-xl shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-Secondary text-white">
                    <th className="py-3 px-4 font-semibold text-xs md:text-sm border-r border-white/10">
                      SDG
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
                      className={`${sdg.id % 2 === 0 ? "bg-white" : "bg-Primary text-white"} transition-colors  `}
                    >
                      <td className="py-2 px-4 text-xs md:text-sm font-medium border-r border-gray-200/20">
                        {sdg.id}
                      </td>
                      <td className="py-2 px-4 text-xs md:text-sm border-r border-gray-200/20">
                        {sdg.original}
                      </td>
                      <td className="py-2 px-4 text-xs md:text-sm font-semibold">
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
