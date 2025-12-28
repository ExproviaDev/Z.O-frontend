


"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaGlobe,
  FaUser,
  FaGraduationCap,
  FaLanguage,
  FaLaptop,
  FaWater,
  FaHeart,
  FaTrophy,
  FaLightbulb,
  FaComments,
  FaTools,
  FaRocket,
} from "react-icons/fa";
import { IoStarOutline } from "react-icons/io5";

/* ================= Animations ================= */

const fadeInUp = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const AwardsPage = () => {
  const awards = [
    {
      icon: <FaGlobe />,
      title: "SDG Fellowship Support",
      desc: "Comprehensive support in applying for SDG Fellowship during admission to Overseas Universities.",
    },
    {
      icon: <FaUser />,
      title: "UN SDG Summit Recommendation",
      desc: "Recommendation for participation in the SDG Summit held at the United Nations every year.",
    },
    {
      icon: <FaGraduationCap />,
      title: "National Zero Olympiad Envoy",
      desc: "Inclusion in Zero Olympiad Clubs formed in educational institutions across the country.",
    },
  ];

  const scholarships = [
    {
      icon: <FaGlobe />,
      title: "Daffodil Institute Scholarship",
      desc: "Full scholarship for 'Empowering Future Leaders' program with 8 modules & 24 sessions.",
    },
    {
      icon: <FaLanguage />,
      title: "S@ifur's IELTS Course",
      desc: "Full scholarship for online IELTS course – 27 classes & 39 lessons.",
    },
    {
      icon: <FaLaptop />,
      title: "10 Minute School",
      desc: "Customized course scholarship from Bangladesh's leading e-learning platform.",
    },
    {
      icon: <FaWater />,
      title: "Mana Bay Water Park",
      desc: "Day Long Pass for unlimited aquatic adventure on 17 thrilling rides.",
    },
    {
      icon: <FaHeart />,
      title: "Ad Din Foundation Medical",
      desc: "Zero Fee Medical vouchers for healthcare services.",
    },
    {
      icon: <FaTrophy />,
      title: "Sports Development",
      desc: "Full scholarship from Bangladesh Sports Development Foundation.",
    },
  ];

  const activities = [
    {
      icon: <FaLightbulb />,
      title: "Case Study Competition",
      desc: "Teams collaborate to find innovative solutions to social problems.",
    },
    {
      icon: <FaComments />,
      title: "Debate & Public Speaking",
      desc: "Present ideas and develop argumentation skills competitively.",
    },
    {
      icon: <FaTools />,
      title: "Workshops & Seminars",
      desc: "Practical skill development focused training sessions.",
    },
    {
      icon: <FaRocket />,
      title: "Project Implementation",
      desc: "Funding opportunities to turn innovative ideas into reality.",
    },
  ];

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed py-12 px-4 md:px-10 text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(31,74,101,0.85), rgba(31,74,101,0.95)), url('https://res.cloudinary.com/dsga4gyw9/image/upload/v1766410899/EYE01577_bgr6zx.jpg')`,
      }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <span className="bg-[#1a3a52]/60 border flex items-center gap-2 border-white/20 text-[16px] px-4 py-1.5 rounded-full backdrop-blur-sm">
           <IoStarOutline /> 17 finalists who will receive awards
          </span>
        </motion.div>

        {/* Awards */}
        <section className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-10"
          >
            Awards & <span className="text">Opportunities</span>
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {awards.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="bg-white/5 border border-white/10 p-6 rounded-xl
                hover:bg-white/10 hover:shadow-[0_12px_40px_rgba(59,130,246,0.18)]
                backdrop-blur-md text-left"
              >
                <motion.div
                  whileHover={{ rotate: 6, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-blue-300 text-2xl mb-4"
                >
                  {item.icon}
                </motion.div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-200">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Scholarships */}
        <section className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-10"
          >
            Scholarships & <span className="text">Sponsorships</span>  (Session One)
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {scholarships.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="bg-white/5 border border-white/10 p-6 rounded-xl
                hover:bg-white/10 hover:shadow-[0_12px_40px_rgba(59,130,246,0.18)]
                backdrop-blur-md text-left"
              >
                <motion.div
                  whileHover={{ rotate: 6, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-blue-300 text-2xl mb-4"
                >
                  {item.icon}
                </motion.div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-200">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Activities */}
        <section className="text-center pb-10">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-10"
          >
            Additional <span className="text">Activities</span>
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-4"
          >
            {activities.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="bg-[#162e41] border border-white/5 p-5 flex gap-5 rounded-lg
                hover:border-blue-400/50 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)]
                text-left group"
              >
                <motion.div
                  whileHover={{ rotate: -6, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 260 }}
                  className="bg-[#1F4A65] p-3 rounded-md text-blue-300 text-xl
                  border border-white/10 group-hover:bg-blue-600"
                >
                  {item.icon}
                </motion.div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

      </div>
    </div>
  );
};

export default AwardsPage;
