"use client";

import React from 'react';
import { 
  FaGraduationCap, 
  FaAward, 
  FaRocket, 
  FaCheckCircle,
  FaArrowRight,
  FaChalkboardTeacher,
  FaUserFriends
} from 'react-icons/fa';

export default function Sdg() {
  const academicCategories = [
    {
      group: "SDG DEFENDER",
      sub: "Junior Category (Class 5 - 8)",
      winnerTitle: "SDG Defender",
      othersTitle: "SDG Activist",
      color: "from-blue-600 to-cyan-500",
      items: [
        { id: "01", sdg: "SDG 1", bn: "৫ম শ্রেণী", en: "Grade 5 / PYP 5", madrasa: "তাইসীর" },
        { id: "02", sdg: "SDG 2", bn: "ষষ্ঠ শ্রেণী", en: "Grade 6 / MYP 1", madrasa: "মিজান" },
        { id: "03", sdg: "SDG 3", bn: "সপ্তম শ্রেণী", en: "Grade 7 / MYP 2", madrasa: "নাহেবমীর" },
        { id: "04", sdg: "SDG 4", bn: "অষ্টম শ্রেণী", en: "Grade 8 / MYP 3", madrasa: "হেদায়েতুন্নাহ" },
      ]
    },
    {
      group: "SDG LEADER",
      sub: "Secondary Category (Class 9 - 12)",
      winnerTitle: "SDG Leader",
      othersTitle: "SDG Ambassador",
      color: "from-indigo-600 to-purple-600",
      items: [
        { id: "05", sdg: "SDG 5", bn: "নবম শ্রেণী", en: "Grade 9 / MYP 4", madrasa: "কাফিয়া ও বেকায়া" },
        { id: "06", sdg: "SDG 6", bn: "দশম শ্রেণী", en: "Grade 10 / MYP 5", madrasa: "দশম শ্রেণী" },
        { id: "07", sdg: "SDG 7", bn: "এসএসসি পরীক্ষার্থী", en: "O Level Candidate", madrasa: "দাখিল পরীক্ষার্থী" },
        { id: "08", sdg: "SDG 8", bn: "একাদশ শ্রেণী", en: "Grade 11 / DP 1", madrasa: "একাদশ শ্রেণী" },
        { id: "09", sdg: "SDG 9", bn: "দ্বাদশ শ্রেণী", en: "Grade 12 / DP 2", madrasa: "জালালাইন" },
        { id: "10", sdg: "SDG 10", bn: "এইচএসসি পরীক্ষার্থী", en: "A Level Candidate", madrasa: "আলিম পরীক্ষার্থী" },
      ]
    },
    {
      group: "SDG PIONEER",
      sub: "Higher Category (University & Beyond)",
      winnerTitle: "SDG Pioneer",
      othersTitle: "SDG Achiever",
      color: "from-emerald-600 to-teal-600",
      items: [
        { id: "11", sdg: "SDG 11", bn: "১ম বর্ষ", en: "1st Year (Honors/Med/Eng)", madrasa: "ফাযিল / মেশকাত" },
        { id: "12", sdg: "SDG 12", bn: "২য় বর্ষ", en: "2nd Year / Honors", madrasa: "—" },
        { id: "13", sdg: "SDG 13", bn: "৩য় বর্ষ", en: "3rd Year / Honors", madrasa: "—" },
        { id: "14", sdg: "SDG 14", bn: "৪র্থ বর্ষ", en: "4th Year / Honors", madrasa: "—" },
        { id: "15", sdg: "SDG 15", bn: "৫ম বর্ষ ও ইন্টার্ন", en: "5th Year & Intern", madrasa: "—" },
        { id: "16", sdg: "SDG 16", bn: "স্নাতকোত্তর", en: "Masters / MS", madrasa: "—" },
        { id: "17", sdg: "SDG 17", bn: "মাস্টার্স / কামিল", en: "Post-Graduation", madrasa: "কামিল / দাওরা" },
      ]
    }
  ];

  return (
    <section id="sdg-mapping" className="py-24 bg-gray-200 overflow-hidden antialiased">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Modern Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-indigo-600"></span>
              <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs">Road to Dhaka 2025</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[1]">
              TRACK YOUR <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">SDG</span> MISSION
            </h2>
            <p className="mt-8 text-lg text-slate-500 font-medium leading-relaxed max-w-2xl">
              দ্বিতীয় রাউন্ডের ৩ মিনিটের ভিডিও থেকে নির্বাচিত ৫১ জন অংশগ্রহণকারীকে ঢাকায় গ্র্যান্ড ফিনালেতে আমন্ত্রণ জানানো হবে। আপনার নির্ধারিত SDG এবং ক্যাটাগরি দেখে নিন।
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-[2rem] flex flex-col items-center justify-center min-w-[140px]">
              <span className="text-3xl font-black text-slate-900">51</span>
              <span className="text-[10px] font-black uppercase text-slate-400 mt-1">Finalists</span>
            </div>
            <div className="bg-indigo-600 p-6 rounded-[2rem] flex flex-col items-center justify-center min-w-[140px] shadow-xl shadow-indigo-200">
              <span className="text-3xl font-black text-white">17</span>
              <span className="text-[10px] font-black uppercase text-indigo-100 mt-1">Champions</span>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="space-y-32">
          {academicCategories.map((cat, idx) => (
            <div key={idx} className="relative">
              {/* Category Sidebar Title (Vertical on Desktop) */}
              <div className="hidden xl:block absolute -left-16 top-0 origin-top-left rotate-90 text-slate-100 font-black text-8xl whitespace-nowrap select-none -z-10">
                {cat.group}
              </div>

              <div className="grid lg:grid-cols-12 gap-12 items-start">
                {/* Category Identity Card */}
                <div className="lg:col-span-4 sticky top-24">
                  <div className={`bg-gradient-to-br ${cat.color} p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden`}>
                    <div className="absolute -right-8 -bottom-8 opacity-10">
                      <FaGraduationCap size={180} />
                    </div>
                    <h3 className="text-4xl font-black italic tracking-tighter mb-2 leading-none">{cat.group}</h3>
                    <p className="text-white/70 font-bold text-xs uppercase tracking-widest mb-10">{cat.sub}</p>
                    
                    <div className="space-y-4">
                      <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                        <p className="text-[10px] uppercase font-black opacity-60 mb-1 tracking-tighter">Winner Receives</p>
                        <p className="font-bold text-lg">{cat.winnerTitle}</p>
                      </div>
                      <div className="bg-black/10 p-4 rounded-2xl border border-white/5">
                        <p className="text-[10px] uppercase font-black opacity-40 mb-1 tracking-tighter">Others Receive</p>
                        <p className="font-bold text-lg text-white/80">{cat.othersTitle}</p>
                      </div>
                    </div>

                    <button className="mt-10 flex items-center gap-3 text-xs font-black uppercase tracking-widest group">
                      View Criteria <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* SDG Table/List */}
                <div className="lg:col-span-8 bg-slate-50/50 rounded-[3rem] border border-slate-100 p-8 md:p-12">
                  <div className="space-y-4">
                    {cat.items.map((item, i) => (
                      <div key={i} className="group flex flex-col md:flex-row md:items-center bg-white border border-slate-100 p-6 rounded-[2.5rem] transition-all hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
                        <div className="flex items-center gap-6 md:w-1/3 mb-4 md:mb-0">
                          <span className="text-2xl font-black text-slate-200 group-hover:text-indigo-100 transition-colors tracking-tighter">
                            {item.id}
                          </span>
                          <div>
                            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-1">
                              {item.sdg}
                            </span>
                            <h4 className="font-black text-slate-800 uppercase text-sm tracking-tight italic">Global Goal Vision</h4>
                          </div>
                        </div>

                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8">
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">General Medium</p>
                            <p className="text-sm font-bold text-slate-700">{item.bn}</p>
                            <p className="text-[11px] text-slate-400 italic font-medium">{item.en}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Madrasa Track</p>
                            <p className={`text-sm font-bold ${item.madrasa === "—" ? "text-slate-300" : "text-slate-600"}`}>
                              {item.madrasa}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Grand Finale Process Details */}
        <div className="mt-40">
          <div className="bg-slate-900 rounded-[4rem] p-8 md:p-20 text-white relative overflow-hidden shadow-3xl">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <FaRocket size={300} />
            </div>
            
            <div className="max-w-4xl relative z-10">
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter italic leading-[0.9] mb-12">
                FROM THE STAGE <br/> <span className="text-indigo-400">TO THE WORLD</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-14 h-14 rounded-3xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                      <FaAward className="text-yellow-400 text-2xl" />
                    </div>
                    <div>
                      <h5 className="font-black text-xl mb-3">Invitations</h5>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        প্রতিটি SDG থেকে নির্বাচিত ৩ জন করে মোট ৫১ জনকে ঢাকায় আসার আমন্ত্রণ জানানো হবে। সাথে আসতে পারবেন ২ জন অভিভাবক।
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-14 h-14 rounded-3xl bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/20">
                      <FaChalkboardTeacher className="text-indigo-400 text-2xl" />
                    </div>
                    <div>
                      <h5 className="font-black text-xl mb-3">PowerPoint Presentation</h5>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        নির্বাচিত ১৭ জন সেরা অংশগ্রহণকারী মঞ্চে তাদের SDG নিয়ে পাওয়ারপয়েন্ট প্রেজেন্টেশন দেবেন।
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <FaUserFriends className="text-emerald-400 text-3xl" />
                    <h5 className="font-black text-2xl uppercase tracking-tighter italic">Zero Negative Impact</h5>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-8">
                    তারা কীভাবে নির্ধারিত নেগেটিভ ইস্যুটিকে "Zero" করে লক্ষ্য অর্জন করতে চায়—সেটিই হবে চূড়ান্ত রাউন্ডের মূল চ্যালেঞ্জ।
                  </p>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-gradient-to-r from-indigo-500 to-emerald-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        html { scroll-behavior: smooth; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>
    </section>
  );
}