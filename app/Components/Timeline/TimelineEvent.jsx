import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValue } from "framer-motion";
import {
  FaClock,
  FaHourglassHalf,
  FaSearch,
  FaHandsHelping,
  FaPlayCircle,
  FaClipboardCheck,
  FaCertificate,
  FaCalendarAlt,
  FaRocket,
} from "react-icons/fa";

/* ---------------- DATA ---------------- */
const steps = [
  { title: "মডিউল রিলিজ টাইম", desc: "প্রতিদিন রাত ৮টায় নতুন মডিউল।", side: "left", icon: <FaClock /> },
  { title: "ওয়াচ টাইম ডিউরেশন", desc: "প্রতি মডিউলে ১০টি ভিডিও।", side: "right", icon: <FaHourglassHalf /> },
  { title: "সিলেবাস টপিক সাপোর্ট", desc: "প্রতিটি টপিকের জন্য আলাদা গাইড।", side: "left", icon: <FaSearch /> },
  { title: "আটকে গেলে সাপোর্ট", desc: "কমিউনিটি ও লাইভ সাপোর্ট।", side: "right", icon: <FaHandsHelping /> },
  { title: "লাইভ সেশন", desc: "সাপ্তাহিক লাইভ ক্লাস।", side: "left", icon: <FaPlayCircle /> },
  { title: "অ্যাসাইনমেন্ট", desc: "প্রতিটি মডিউলের শেষে।", side: "right", icon: <FaClipboardCheck /> },
  { title: "SCIC", desc: "Career instruction & counseling।", side: "left", icon: <FaCertificate /> },
  { title: "২২–২৪ সপ্তাহ", desc: "পুরো বুটক্যাম্প।", side: "right", icon: <FaCalendarAlt /> },
];

/* ---------------- PATH → CARD Y MAP ---------------- */
const CARD_Y = [
  140, 430, 720, 1020, 1350, 1660, 2000, 2300,
];

/* ---------------- COMPONENT ---------------- */
export default function TimelineEvent() {
  const wrapperRef = useRef(null);
  const pathRef = useRef(null);

  const rocketX = useMotionValue(0);
  const rocketY = useMotionValue(0);
  const rocketRotate = useMotionValue(0);

  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start center", "end end"],
  });

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    return scrollYProgress.on("change", (v) => {
      const progress = Math.min(Math.max(v, 0), 1);
      const point = path.getPointAtLength(length * progress);
      const next = path.getPointAtLength(length * Math.min(progress + 0.002, 1));

      rocketX.set(point.x);
      rocketY.set(point.y);

      const angle =
        Math.atan2(next.y - point.y, next.x - point.x) * (180 / Math.PI);
      rocketRotate.set(angle);

      setActiveIndex(Math.floor(progress * steps.length));
    });
  }, [scrollYProgress]);

  return (
    <div ref={wrapperRef} className="relative h-[2600px] bg-white overflow-hidden">
      {/* SVG PATH */}
      <svg
        className="absolute left-1/2 -translate-x-1/2"
        width="1100"
        height="2600"
        viewBox="0 0 1100 2600"
      >
        <path
          ref={pathRef}
          d="
            M 520,140 L 780,140
            Q 820,140 820,180
            L 820,420
            Q 820,460 820,460
            L 300,460
            Q 260,460 260,500
            L 260,700
            Q 260,740 260,740
            L 780,740
            Q 820,740 820,780
            L 820,1040
            L 300,1040
            L 300,1370
            L 780,1370
            L 780,1700
            L 300,1700
            L 300,2000
            L 780,2000
            L 780,2320
          "
          stroke="#9CA3AF"
          strokeWidth="2"
          strokeDasharray="8 8"
          fill="none"
        />
      </svg>

      {/* ROCKET */}
      <motion.div
        className="absolute text-indigo-600"
        style={{
          x: rocketX,
          y: rocketY,
          rotate: rocketRotate,
          translateX: 380,
          translateY: -13,
        }}
      >
        <FaRocket size={28} />
      </motion.div>

      {/* CARDS */}
      {steps.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: CARD_Y[i],
            left: s.side === "left"
              ? "calc(50% - 560px)"
              : "calc(50% + 120px)",
          }}
        >
          <div
            className={`w-[420px] rounded-2xl p-6 transition-all duration-500 ${
              activeIndex === i
                ? "bg-indigo-600 text-white shadow-[0_0_40px_rgba(99,102,241,0.5)] scale-105"
                : "bg-white text-gray-800 shadow-xl"
            }`}
          >
            <div className="text-3xl mb-4">{s.icon}</div>
            <h3 className="font-bold text-lg">{s.title}</h3>
            <p className="mt-2 opacity-90">{s.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
