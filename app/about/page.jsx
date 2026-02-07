"use client";

import {
 
  FaQuoteLeft,
  
} from "react-icons/fa";

import Image from "next/image";
import HeroSection from "./components/heroSection";

export default function ZeroOlympiad() {
  return (
    <div className="min-h-screen   text-slate-900 selection:bg-indigo-100 selection:text-indigo-700 font-sans antialiased">
      <div className="">
        <section>
          <HeroSection></HeroSection>
        </section>

        <section
          id="mission"
          className="relative py-32 bg-white overflow-hidden"
        >
          <div
            className="absolute inset-0 z-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(#e2e8f0 1.5px, transparent 1.5px)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-50/80 rounded-full -z-10 blur-2xl" />

                <div className="mb-10 group">
                  <div className="flex flex-col border-l-8 border-Primary pl-6 md:pl-8 py-2">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-none">
                      Faatiha Aayat
                    </h2>

                    <div className="mt-4 flex items-center gap-3">
                      <span className="h-[2px] w-12 bg-Secondary"></span>
                      <span className="text-xl md:text-2xl font-medium text-Secondary tracking-wide">
                        Founder & CEO of Zero Olympiad
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 max-w-2xl"></div>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed mb-10">
                  Fourteen-year-olds Child Rights Activist, Climate Campaigner,
                  and Global Speaker.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-10">
                  I have represented youth voices at the **United Nations,
                  Harvard, and TEDx**, advocating against climate change and
                  social injustices. Through my organization, **Faatiha Aayat Academy**, I work
                  towards sustainable development and global Leadership .
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-10">
                  A published author of four books and a recipient of the
                  **President’s Academic Excellence Gold Certificate**, I
                  continue to bridge the gap between human rights and climate
                  action.
                </p>

                <a
                  href="https://www.linkedin.com/in/faatihaaayat/"
                  className="flex items-center gap-3 cursor-pointer bg-Primary hover:bg-Secondary text-white order-2 w-[150px] border-Primary hover:border-Secondary  px-8 py-4 rounded-xl font-bold text-base transition-all transform hover:scale-105  group"
                >
                  View More
                </a>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-indigo-600 rounded-[3rem] rotate-3 scale-105 opacity-5 group-hover:rotate-0 transition-transform duration-700" />
                <div className="relative aspect-video lg:aspect-square bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100">
                  <Image
                    src="https://res.cloudinary.com/dsga4gyw9/image/upload/v1770219566/FAATIHA_AAYAT_1_ltnjp2.jpg"
                    alt="Youth Change Makers"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-cover  hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="mission"
          className="relative py-32 bg-white overflow-hidden"
        >
          <div
            className="absolute inset-0 z-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(#e2e8f0 1.5px, transparent 1.5px)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-indigo-600 rounded-[3rem] rotate-3 scale-105 opacity-5 group-hover:rotate-0 transition-transform duration-700" />
                <div className="relative aspect-video lg:aspect-square bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100">
                  <Image
                    src="https://res.cloudinary.com/dsga4gyw9/image/upload/v1770219567/SYED_AFTAB_AHMED_1_mnqdha.jpg"
                    alt="Youth Change Makers"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-cover  hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-50/80 rounded-full -z-10 blur-2xl" />

                <div className="mb-10 group">
                  <div className="flex flex-col border-l-8 border-Primary pl-6 md:pl-8 py-2">
                    <span className="text-sm font-bold text-Primary uppercase tracking-[0.2em] mb-1 opacity-80">
                      Barrister-at-Law
                    </span>

                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-none">
                      Syed Aftab Ahmed
                    </h2>

                    <div className="mt-4 flex items-center gap-3">
                      <span className="h-[2px] w-12 bg-Secondary"></span>
                      <span className="text-xl md:text-2xl font-medium text-Secondary tracking-wide">
                        Managing Director
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 max-w-lg"></div>
                </div>

                <p className="text-lg text-slate-600 leading-relaxed mb-10">
                  Having over 16 years of expertise in Business and Migration
                  Consultancy under my experience belt, I would love to make
                  more professional acquaintances. I believe in creating and
                  fostering relationships as a cornerstone of conducting
                  business.
                </p>

                <a
                  href="https://www.linkedin.com/in/barristeraftab/"
                  className="flex items-center gap-3 cursor-pointer bg-Primary hover:bg-Secondary text-white order-2 w-[150px] border-Primary hover:border-Secondary  px-8 py-4 rounded-xl font-bold text-base transition-all transform hover:scale-105  group"
                >
                  View More
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="vision-mission"
          className="relative py-32 overflow-hidden "
        >
          <div className="absolute top-0 left-0 w-full flex justify-center z-20">
            <div className="w-1/2 h-[2px] bg-gradient-to-r from-transparent via-Primary to-transparent opacity-50"></div>
          </div>

          <div className="absolute inset-0 z-0">
            <img
              src="https://i.ibb.co.com/99HFrKfK/speaker-bg.png"
              alt="Architecture Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 "></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Mission",
                  content:
                    "To engage and empower students through competitions, learning, and action-based initiatives that build leadership, critical thinking, and social responsibility. Zero Olympiad aims to inspire youth to actively address global challenges and local problems.",
                  bg: "bg-slate-900/90 text-white",
                },
                {
                  title: "Vision",
                  content:
                    "To nurture a generation of informed, ethical, and courageous young leaders who think critically, act responsibly, and work collectively to build a peaceful, just, and sustainable world where every voice matters.",
                  bg: "bg-white/90 text-slate-900",
                },
                {
                  title: "Values",
                  content:
                    "Integrity and honesty in all actions, inclusivity and respect for diversity, excellence and curiosity in learning, collaboration and teamwork, compassion and empathy, and a strong commitment to service and positive impact in society.",
                  bg: "bg-indigo-600/90 text-white",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className={`${card.bg} p-12 rounded-[3rem] transition-all hover:scale-[1.05] cursor-default shadow-2xl backdrop-blur-md border border-white/10`}
                >
                  <h3 className="text-3xl font-black mb-8 tracking-tighter italic uppercase">
                    {card.title}
                  </h3>
                  <p className="text-lg opacity-90 leading-relaxed font-medium">
                    {card.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="the-journey"
          className="py-32 bg-slate-950 text-white overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div className="max-w-2xl">
                <span className="text-indigo-400 font-black tracking-[0.3em] uppercase text-sm">
                  Path to Impact
                </span>
                <h2 className="text-4xl md:text-6xl font-black mt-4 tracking-tighter italic">
                  The Participant Journey
                </h2>
              </div>
              <p className="text-slate-400 max-w-sm font-light">
                From a spark of an idea to a global stage—here is how you evolve
                through Zero Olympiad.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
              {[
                {
                  step: "01",
                  title: "Registration",
                  desc: "Join the global network and select your SDG focus area.",
                },
                {
                  step: "02",
                  title: "Knowledge",
                  desc: "Comprehensive MCQ round testing global awareness.",
                },
                {
                  step: "03",
                  title: "Creation",
                  desc: "Submit a high-impact video pitching your innovative solution.",
                },
                {
                  step: "04",
                  title: "Finale",
                  desc: "Present live to a panel of UN experts and global leaders.",
                },
                {
                  step: "05",
                  title: "Recognition",
                  desc: "Earn international awards and project funding support.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors group"
                >
                  <span className="text-4xl font-black text-indigo-500 opacity-30 mb-8 block group-hover:opacity-100 transition-opacity italic">
                    {item.step}
                  </span>
                  <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="founder" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-slate-900 rounded-4xl overflow-hidden flex flex-col lg:flex-row items-stretch shadow-3xl">
              <div className="lg:w-1/2 relative h-[500px] lg:h-auto">
                <Image
                  src="https://res.cloudinary.com/dsga4gyw9/image/upload/v1770033233/IMG_8818_bdrqrv.jpg"
                  alt="Fatiha Ayat"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover "
                />
                <div className="absolute inset-0 bg-indigo-900/30 mix-blend-multiply" />
              </div>
              <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center text-white">
                <FaQuoteLeft className="text-indigo-500 text-5xl mb-8 opacity-50" />
                <h3 className="text-3xl lg:text-5xl font-black italic tracking-tighter mb-8 leading-tight">
                  "The youth are not just the leaders of tomorrow—we are the
                  architects of today's solutions."
                </h3>
                <div className="space-y-6 mb-12">
                  <p className="text-xl font-black italic text-indigo-400 tracking-tight">
                    Faatiha Ayat — Founder
                  </p>
                  <p className="text-slate-400 font-light leading-relaxed">
                    A child rights activist, climate campaigner, and global
                    orator, Fatiha Ayat founded Zero Olympiad with a singular
                    vision: to empower the youth to take ownership of the
                    planet's destiny. Through her representation at the UN and
                    global summits, she has mobilized thousands of students to
                    join the movement for a "Zero Challenge" future.
                  </p>
                </div>
                <div className="flex gap-4">
                  {["UN Representative", "Author", "Activist"].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold tracking-widest uppercase border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <style jsx global>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          html {
            scroll-behavior: smooth;
          }
        `}</style>
      </div>
    </div>
  );
}
