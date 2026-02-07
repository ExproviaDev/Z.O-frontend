"use client";

import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function Registration() {
  const steps = [
    {
      id: "01",
      text: (
        <>
          In February 2026, register on the <b>Zero Olympiad</b> website under
          the designated category based on the class you are studying in. The
          registration fee is <b>300 Taka.</b>
        </>
      ),
    },
    {
      id: "04",
      text: (
        <>
          The <b>Round 1 exam</b> will consist of <b>30 MCQ questions</b>, carrying a total of <b>30 marks.</b>{" "}
          The time limit is <b>30 minutes.</b> You will be able to see your score on the website
          immediately after the exam. There will be no fixed passing mark; instead, the <b>top 200 students from each SDG</b>{" "}
          will qualify for the <b>2nd Round.</b>

        </>
      ),
    },
    {
      id: "02",
      text: (
        <>
          After registration, you will receive an email containing links to{" "}
          <b>UN-recognized courses.</b> Additionally, you will find the links to
          the relevant courses on your personal <b>dashboard.</b> A video
          tutorial will also be provided explaining how to complete the courses.
          The courses can be completed <b>online for free</b> at your own
          convenience. Upon completion of each course, a <b>certificate</b> will
          be issued directly by the UN institution.
        </>
      ),
    },
    {
      id: "05",
      text: (
        <>
          Those who qualify for the <b>2nd Round</b> must create a{" "}
          <b>three-minute video</b> based on a specific{" "}
          <b>SDG (Sustainable Development Goal)</b> assigned to their class.
          This video should be uploaded to your own, a family member's, or a
          friend's social media account using the hashtag <b>#ZeroOlympiad.</b>{" "}
          Finally, you must submit the video link through your personal{" "}
          <b>dashboard.</b>
        </>
      ),
    },
    {
      id: "03",
      text: (
        <>
          The questions for the <b>Zero Olympiad Round 1 MCQ</b> Exam will be
          prepared directly from these courses. To participate, you must log in
          to the Zero Olympiad website on the scheduled date using the same{" "}
          <b>email address (or username) and password</b> you used during
          registration. Immediately after completing the Round 1 exam, you will
          receive your <b>Zero Olympiad Round 1 certificate</b> both on your
          dashboard and via email.
        </>
      ),
    },
    {
      id: "06",
      text: (
        <>
          Based on the evaluation of the three-minute videos by the honorable
          jury board, <b>3 finalists</b> will be selected for each of the{" "}
          <b>17 SDGs,</b> totaling <b>51 finalists.</b> These finalists will be
          invited to attend the <b>Grand Finale</b> in Dhaka. The remaining
          participants will receive their <b>Round 2 certificates</b> via their
          personal dashboards.
        </>
      ),
    },
  ];

  return (
    <section
      className="relative py-20 px-6 md:px-12 lg:px-24 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://i.ibb.co/99HFrKfK/speaker-bg.png')",
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#1e1b4b]">
          How to <span className="text-Primary">participate?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-300 rounded-2xl p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <p className="text-gray-800 text-sm md:text-base leading-relaxed">
                  {step.text}
                </p>
              </div>

              <div className="absolute -top-4 right-6  bg-Primary text-white font-bold text-lg px-4 py-1 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
                {step.id}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <Link prefetch={false} href="/instruction">
            <button className="flex items-center gap-3 cursor-pointer bg-Primary hover:bg-Secondary text-white px-10 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-2xl group">
              Views More Details
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
