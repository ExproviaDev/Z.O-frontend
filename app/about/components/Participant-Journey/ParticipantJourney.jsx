"use client";

import { FaCheckCircle } from "react-icons/fa";

export default function JourneySection() {
  const steps = [
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
  ];

  return (
    <section
      id="the-journey"
      className="py-16 md:py-24 bg-slate-950 text-white overflow-hidden font-sans relative"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-Primary/10 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="text-indigo-400 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3 block">
            Path to Impact
          </span>
          <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white mb-6">
            The Participant Journey
          </h2>
          <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed">
            From a spark of an idea to a global stage—follow the roadmap to becoming a global change-maker.
          </p>
        </div>

        <div className="relative">
          
          <div className="hidden lg:block absolute top-[2.5rem] left-0 w-full h-1 bg-gradient-to-r from-indigo-500/10 via-indigo-500/50 to-indigo-500/10 rounded-full -z-10"></div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((item, i) => (
              <div 
                key={i} 
                className="relative flex lg:flex-col items-start lg:items-center group"
              >
                <div className="relative flex flex-col items-center shrink-0 mr-6 lg:mr-0 lg:mb-8">
                  
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-900 border-4 border-indigo-500/30 group-hover:border-indigo-500 flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-indigo-500/50 z-10 relative">
                    <span className="text-xl md:text-2xl font-black text-white italic">
                      {item.step}
                    </span>
                  </div>

                  {i !== steps.length - 1 && (
                    <div className="lg:hidden absolute top-16 bottom-[-2rem] w-[2px] bg-indigo-500/20"></div>
                  )}
                </div>
                <div className="w-full bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl group-hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 lg:text-center lg:min-h-[160px] flex flex-col lg:justify-start">
                  <h4 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">
                    {item.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}