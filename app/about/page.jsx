"use client";

// import sdgGride from "../../app/about/components/SDGgrid/SDG"

import React, { useState, useEffect } from 'react';

import { 
  FaGlobeAmericas, 
  FaLightbulb, 
  FaRocket, 
  FaUsers, 
  FaArrowRight, 
  FaPlay, 
  FaQuoteLeft, 
  FaCheckCircle,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import Sdg from './components/Sdg';
import Image from 'next/image';
import img5 from '../../public/src/gallery/img5.jpg';

/**
 * ZERO OLYMPIAD - GLOBAL HOME PAGE
 * Designed to International NGO Standards
 * Tech Stack: Next.js (App Router), Tailwind CSS, React Icons
 */

export default function ZeroOlympiad() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sdgs = [
    { id: 1, title: "No Poverty", color: "bg-[#E5243B]" },
    { id: 2, title: "Zero Hunger", color: "bg-[#DDA63A]" },
    { id: 3, title: "Good Health", color: "bg-[#4C9F38]" },
    { id: 4, title: "Quality Education", color: "bg-[#C5192D]" },
    { id: 5, title: "Gender Equality", color: "bg-[#FF3A21]" },
    { id: 6, title: "Clean Water", color: "bg-[#26BDE2]" },
    { id: 7, title: "Affordable Energy", color: "bg-[#FCC30B]" },
    { id: 8, title: "Decent Work", color: "bg-[#A21942]" },
    { id: 9, title: "Industry & Innovation", color: "bg-[#FD6925]" },
    { id: 10, title: "Reduced Inequality", color: "bg-[#DD1367]" },
    { id: 11, title: "Sustainable Cities", color: "bg-[#FD9D24]" },
    { id: 12, title: "Responsible Consumption", color: "bg-[#BF8B2E]" },
    { id: 13, title: "Climate Action", color: "bg-[#3F7E44]" },
    { id: 14, title: "Life Below Water", color: "bg-[#0A97D9]" },
    { id: 15, title: "Life On Land", color: "bg-[#56C02B]" },
    { id: 16, title: "Peace & Justice", color: "bg-[#00689D]" },
    { id: 17, title: "Partnerships", color: "bg-[#19486A]" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-700 font-sans antialiased">
    
      

      {/* --- 1. HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-white text-xs font-bold tracking-[0.2em] uppercase">Global Youth Initiative 2025</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.95] mb-8 tracking-tighter italic">
            Empowering Youth to <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-200 to-emerald-300">
              Zero Global Challenges
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-12">
            The world doesn't need more spectators. It needs architects of change. Zero Olympiad is the global platform where youth leadership meets the UN Sustainable Development Goals to create measurable human impact.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-500/20 flex items-center justify-center space-x-3 group">
              <span>JOIN ZERO OLYMPIAD</span>
              <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl font-black text-lg hover:bg-white/10 transition-all">
              EXPLORE THE SDGs
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-indigo-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* --- 2. ABOUT SECTION --- */}
      <section id="mission" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-50 rounded-full -z-10" />
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                A Global Movement for <br/> 
                <span className="text-indigo-600">Planetary Progress.</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-10">
                Zero Olympiad is not just a competition—it is a launchpad. We mobilize the boundless creativity of young minds to address the "Zero" targets: Zero Poverty, Zero Hunger, and Zero Carbon. By aligning with the United Nations 17 SDGs, we provide a structured ecosystem for youth to transition from awareness to action.
              </p>
              <div className="grid grid-cols-2 gap-8">
                {[
                  { icon: <FaGlobeAmericas />, label: "100+ Nations", sub: "Global Reach" },
                  { icon: <FaUsers />, label: "Youth-Led", sub: "Authentic Voice" },
                  { icon: <FaRocket />, label: "Solution-First", sub: "Action Oriented" },
                  { icon: <FaLightbulb />, label: "SDG Aligned", sub: "Strategic Impact" }
                ].map((stat, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="text-indigo-600 text-2xl mt-1">{stat.icon}</div>
                    <div>
                      <p className="font-black text-slate-900">{stat.label}</p>
                      <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">{stat.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-indigo-600 rounded-[3rem] rotate-3 scale-105 opacity-5 group-hover:rotate-0 transition-transform duration-700" />
              <div className="relative aspect-video lg:aspect-square bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=1200" 
                  alt="Youth Change Makers" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. WHY SECTION --- */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-indigo-600 font-black tracking-[0.3em] uppercase text-sm">The Paradigm Shift</span>
            <h2 className="text-4xl md:text-6xl font-black mt-4">Why Zero Olympiad?</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 group hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-8 text-2xl">
                <FaTimes />
              </div>
              <h3 className="text-2xl font-black mb-6 italic">Traditional Education Gap</h3>
              <p className="text-slate-500 leading-relaxed">
                Standard curricula often treat global crises as abstract concepts found in textbooks. Students are taught to memorize problems rather than engineer solutions, creating a disconnect between knowledge and the urgent needs of our planet.
              </p>
            </div>
            
            <div className="bg-indigo-600 p-12 rounded-[2.5rem] shadow-2xl shadow-indigo-200 group hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-8 text-2xl">
                <FaCheckCircle />
              </div>
              <h3 className="text-2xl font-black mb-6 italic text-white">The Zero Approach</h3>
              <p className="text-indigo-50 leading-relaxed">
                We bridge the gap by providing a platform for project-based competition. Participants don't just study the SDGs; they apply their skills in science, humanities, and technology to pitch real-world interventions that can be scaled globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. MISSION VISION VALUES --- */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { title: "Mission", content: "To mobilize 10 million young leaders to actively dismantle global barriers to sustainability and equality by 2030.", bg: "bg-slate-900 text-white" },
              { title: "Vision", content: "A world where every young person is equipped with the agency and resources to solve humanity's most complex challenges.", bg: "bg-white text-slate-900 border border-slate-100" },
              { title: "Values", content: "Radical innovation, unwavering integrity, global inclusivity, and an 'Action-First' mindset in everything we build.", bg: "bg-indigo-50 text-indigo-900" }
            ].map((card, i) => (
              <div key={i} className={`${card.bg} p-12 rounded-[3rem] transition-all hover:scale-[1.02] cursor-default shadow-lg`}>
                <h3 className="text-3xl font-black mb-8 tracking-tighter italic uppercase">{card.title}</h3>
                <p className="text-lg opacity-80 leading-relaxed font-medium">{card.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. JOURNEY SECTION --- */}
      <section id="the-journey" className="py-32 bg-slate-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <span className="text-indigo-400 font-black tracking-[0.3em] uppercase text-sm">Path to Impact</span>
              <h2 className="text-4xl md:text-6xl font-black mt-4 tracking-tighter italic">The Participant Journey</h2>
            </div>
            <p className="text-slate-400 max-w-sm font-light">From a spark of an idea to a global stage—here is how you evolve through Zero Olympiad.</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {[
              { step: "01", title: "Registration", desc: "Join the global network and select your SDG focus area." },
              { step: "02", title: "Knowledge", desc: "Comprehensive MCQ round testing global awareness." },
              { step: "03", title: "Creation", desc: "Submit a high-impact video pitching your innovative solution." },
              { step: "04", title: "Finale", desc: "Present live to a panel of UN experts and global leaders." },
              { step: "05", title: "Recognition", desc: "Earn international awards and project funding support." }
            ].map((item, i) => (
              <div key={i} className="relative p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors group">
                <span className="text-4xl font-black text-indigo-500 opacity-30 mb-8 block group-hover:opacity-100 transition-opacity italic">{item.step}</span>
                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 6. YOUTUBE SECTION --- */}
{/* --- 6. YOUTUBE SECTION --- */}
<section className="py-32 bg-white">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <div className="mb-20">
      <span className="text-indigo-600 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Our Impact in Motion</span>
      <h2 className="text-4xl md:text-6xl font-black mb-6 italic tracking-tighter">
        Voices of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">Change</span>
      </h2>
      <div className="h-1.5 w-24 bg-indigo-600 mx-auto rounded-full mb-8"></div>
      <p className="text-slate-500 max-w-xl mx-auto font-medium">
        Witness the stories of courage, innovation, and leadership from participants across the globe.
      </p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-10">
      {[
        { 
          id: "_OzN8MgM8Ck", // প্রথম ভিডিওর আইডি এখানে
          title: "The 2024 Impact Documentary", 
          desc: "A deep dive into how youth projects reached 1M+ beneficiaries." 
        },
        { 
          id: "tEiJtCnmjQ4", // দ্বিতীয় ভিডিওর আইডি এখানে
          title: "Pitching for the Planet", 
          desc: "Watch the winning presentation from our Climate Action track." 
        },
        { 
          id: "dI_UIKjf83Q", // তৃতীয় ভিডিওর আইডি এখানে
          title: "Our Founder's Vision", 
          desc: "Fatiha Ayat shares the 'Why' behind Zero Olympiad." 
        }
      ].map((video, i) => (
        <div key={i} className="group flex flex-col items-start text-left">
          <div className="relative aspect-video w-full bg-slate-100 rounded-[2rem] overflow-hidden mb-8 shadow-2xl shadow-slate-200/50">
            {/* ভিডিও এমবেড */}
            <iframe 
              className="absolute inset-0 w-full h-full z-10"
              src={`https://www.youtube.com/embed/${video.id}`} 
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            
            {/* আপনার আগের ব্লু ওভারলে এবং সাদা-কালো ইফেক্ট সম্পূর্ণ সরিয়ে দেওয়া হয়েছে */}
          </div>

          <div className="px-2">
            <h4 className="text-xl font-black mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
              {video.title}
            </h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              {video.desc}
            </p>
            <div className="mt-4 flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest">
              <span>Watch Video</span>
              <div className="h-px w-8 bg-indigo-600 group-hover:w-12 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* --- 7. SDGs GRID --- */}
      <section id="impact" className="py-32 bg-slate-50 overflow-hidden">
           <Sdg />
      </section>

      {/* --- 8. FOUNDER SPOTLIGHT --- */}
      <section id="founder" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[4rem] overflow-hidden flex flex-col lg:flex-row items-stretch shadow-3xl">
            <div className="lg:w-1/2 relative h-[500px] lg:h-auto">
              <Image
                src={img5} 
                alt="Fatiha Ayat" 
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-indigo-900/30 mix-blend-multiply" />
            </div>
            <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center text-white">
              <FaQuoteLeft className="text-indigo-500 text-5xl mb-8 opacity-50" />
              <h3 className="text-3xl lg:text-5xl font-black italic tracking-tighter mb-8 leading-tight">
                "The youth are not just the leaders of tomorrow—we are the architects of today's solutions."
              </h3>
              <div className="space-y-6 mb-12">
                <p className="text-xl font-black italic text-indigo-400 tracking-tight">Faatiha Ayat — Founder</p>
                <p className="text-slate-400 font-light leading-relaxed">
                  A child rights activist, climate campaigner, and global orator, Fatiha Ayat founded Zero Olympiad with a singular vision: to empower the youth to take ownership of the planet's destiny. Through her representation at the UN and global summits, she has mobilized thousands of students to join the movement for a "Zero Challenge" future.
                </p>
              </div>
              <div className="flex gap-4">
                {['UN Representative', 'Author', 'Activist'].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold tracking-widest uppercase border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 9. FINAL CTA --- */}
      <section className="py-32 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="bg-indigo-600 p-12 lg:p-32 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
            <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter mb-12 relative z-10">
              Ready to write history <br/> or just read it?
            </h2>
            <p className="text-xl md:text-2xl text-indigo-100 font-light mb-12 max-w-2xl mx-auto opacity-80">
              Registration for the 2025 Global Cohort is now open. Join the world's most ambitious youth-led movement.
            </p>
            <button className="bg-white text-indigo-600 px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20 hover:shadow-white/20">
              REGISTER FOR ZERO OLYMPIAD
            </button>
          </div>
        </div>
      </section>

      

      {/* --- ANIMATIONS --- */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}