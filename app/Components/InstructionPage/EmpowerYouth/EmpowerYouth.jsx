"use client";
import React from "react";
import {
  GraduationCap,
  Trophy,
  CheckCircle2,
  Lightbulb,
  MessageSquare,
  Presentation,
  Briefcase,
  Globe,
  Award,
  Star,
  Plane,
  Utensils,
  HeartPulse,
  Dumbbell,
} from "lucide-react";

const EmpowerYouth = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800">
            Empowering the Youth to Lead the Future
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto text-sm md:text-base">
            A platform designed for young changemakers to learn, compete,
            innovate, and gain global recognition through UN-aligned
            opportunities and real-world impact.
          </p>
          <div className="w-24 h-1 bg-[#f16522] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <GraduationCap className="w-10 h-10 text-[#f16522]" />
                <h3 className="text-2xl font-bold text-gray-800">
                  UN Certificate Course
                </h3>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Register and gain access to multiple UN-accredited courses from
                UNITAR and UNCC ELearn.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Free, online, and self-paced courses.",
                  "Official certificates from UN institutions.",
                  "Course content included in Round 1 MCQs.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-medium text-gray-700"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-gray-300">
                <p className="text-xs md:text-sm text-gray-600 italic">
                  <span className="font-bold">Pro Tip:</span> Including these
                  certificates in your CV/Resume will undoubtedly move you ahead
                  of others in professional life.
                </p>
              </div>
            </div>

            <div className="bg-white mt-20 p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <Trophy className="w-8 h-8 text-[#f16522]" />
                <h3 className="text-2xl font-bold text-gray-800">
                  Competition Rounds
                </h3>
              </div>

              <div className="space-y-4 ">
                <div className="bg-[#f0f9f4] p-5 rounded-xl border border-green-100">
                  <h4 className="font-bold text-gray-800 mb-1">
                    First Round | MCQ Contest
                  </h4>
                  <p className="text-xs text-gray-600">
                    MCQ Contest Register in your class category (as of 8 may
                    2026). Complete 20 MCQ questions from UN-recognized courses.
                    Winners advance to the second round.
                  </p>
                </div>
                <div className="bg-[#f0f4f9] p-5 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-gray-800 mb-1">
                    Second Round | Three Minute Thrill
                  </h4>
                  <p className="text-xs text-gray-600">
                    Submit a 3-minute video on an SDG topic mentioned in your
                    email. Use #ZeroOlympiad and submit link by Jan 31.
                  </p>
                </div>
                <div className="bg-[#f9f9f9] p-5 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-1">
                    Grand Finale | The 71 Finalists
                  </h4>
                  <p className="text-xs text-gray-600">
                    51 finalists invited to Dhaka. 17 winners will present
                    PowerPoint plans to "Zero" their assigned SDG.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#f8fafc] p-6 md:p-8 rounded-[2rem] border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Additional Activities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Case Study Competition",
                    desc: "Find solutions to complex social problems.",
                  },
                  {
                    title: "Debate & Public Speaking",
                    desc: "Argue cases and present innovative ideas.",
                  },
                  {
                    title: "Workshops & Seminars",
                    desc: "Special training for skill development.",
                  },
                  {
                    title: "Project Implementation",
                    desc: "Innovative idea implementation with funding.",
                  },
                ].map((act, i) => (
                  <div
                    key={i}
                    className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"
                  >
                    <h4 className="font-bold text-[18px] text-gray-800 mb-2">
                      {act.title}
                    </h4>
                    <p className="text-[14px] text-gray-800 leading-relaxed">
                      {act.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: <Award className="text-orange-500" />,
                  title: "Fellowship",
                  desc: "Admission support to overseas universities.",
                },
                {
                  icon: <Star className="text-orange-500" />,
                  title: "SDG Summit",
                  desc: "Rec for annual UN SDG Summit.",
                },
                {
                  icon: <GraduationCap className="text-orange-500" />,
                  title: "Full Scholarship",
                  desc: "Entrepreneurship programs & IELTS.",
                },
                {
                  icon: <Plane className="text-orange-500" />,
                  title: "Water Park Pass",
                  desc: "Mana Bay Adventure passes.",
                },
                {
                  icon: <HeartPulse className="text-orange-500" />,
                  title: "Medical Voucher",
                  desc: "Zero Fee medical from Ad Din.",
                },
                {
                  icon: <Globe className="text-orange-500" />,
                  title: "Sports Training",
                  desc: "Professional coaching scholarship.",
                },
              ].map((reward, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3"
                >
                  <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                    {reward.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-[18]">
                      {reward.title}
                    </h4>
                    <p className="text-[14px] text-gray-500">{reward.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmpowerYouth;
