"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const JurySection = () => {
  const [juryData, setJuryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJury = async () => {
      try {
        const response = await fetch("/src/jury.json");
        const data = await response.json();
        setJuryData(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJury();
  }, []);

  const getImagePath = (url) => {
    if (url && url.startsWith("http")) return url;
    return `/src/${url}`;
  };

  if (loading)
    return (
      <div className="text-center py-20 text-white bg-Secondary">
        Loading...
      </div>
    );

  return (
    <section className="py-20 bg-Secondary relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundSize: "30px 30px",
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1.5px)",
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl text-white font-bold tracking-tight">
            Respected Jury Board{" "}
            <span className="text-Primary">(Season One)</span>
          </h1>
          <p className="text-[18px] text-gray-300 py-5 max-w-2xl mx-auto font-medium">
            Distinguished academics and professionals who guide and evaluate our
            participants
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {juryData.map((member) => (
            <div
              key={member.id}
              className="group bg-white p-8 rounded-[2.5rem] shadow-2xl transition-all duration-500 text-center flex flex-col items-center border border-white/10"
            >
              <div className="relative w-44 h-44 mb-6">
                <div
                  className="absolute inset-0 rounded-full transition-transform duration-700 ease-in-out group-hover:rotate-20"
                  style={{
                    padding: "4px",
                    background: `repeating-conic-gradient(
                      #F97316 0deg 15deg, 
                      transparent 15deg 25deg, 
                      #266D9A 25deg 40deg, 
                      transparent 40deg 50deg
                    )`,
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent calc(100% - 4px), #fff 0)",
                    mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #fff 0)",
                  }}
                ></div>

                <div className="relative w-full h-full p-4">
                  <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-gray-100 bg-slate-100 shadow-inner">
                    <Image
                      src={getImagePath(member.image_url)}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 176px"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      priority={false}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight group-hover:text-Primary transition-colors duration-300">
                  {member.name}
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-Primary to-Secondary mx-auto rounded-full group-hover:w-24 transition-all duration-500"></div>
                <p className="text-slate-600 text-sm font-bold leading-relaxed px-2">
                  {member.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JurySection;
