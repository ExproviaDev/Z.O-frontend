"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValue } from "framer-motion";
import {
  FaClock,
  FaHourglassHalf,
  FaSearch,
  FaHandsHelping,
} from "react-icons/fa";

/* ---------------- DATA ---------------- */
const steps = [
  {
    title: "Registration Deadline",
    desc: "২০২৫ সালের জানুয়ারি মাসে তুমি কোন ক্লাসে পড় সেই অনুযায়ী নির্ধারিত ক্যাটাগরিতে রেজিস্ট্রেশন কর।",
    side: "left",
    icon: <FaClock />,
  },
  {
    title: "1st Round MCQ Test",
    desc: "রেজিস্ট্রেশনের পরে তুমি যেই ইমেইল পেয়েছ সেখানে জাতিসংঘ স্বীকৃত যে কোর্স এর তালিকা দেয়া আছে সেখান থেকেই প্রথম রাউন্ডের MCQ পরীক্ষা অনুষ্ঠিত হবে ১০ জানুয়ারী।",
    side: "right",
    icon: <FaHourglassHalf />,
  },
  {
    title: "2nd Round Video Contest",
    desc: "প্রথম রাউন্ডের MCQ পরীক্ষায় সর্বোচ্চ নম্বর প্রাপ্তির ভিত্তিতে দ্বিতীয় রাউন্ডে অংশ গ্রহণের জন্য ইমেইল করা হবে। ভিডিও জমা দেয়ার শেষ তারিখ ৩১ জানুয়ারী।",
    side: "left",
    icon: <FaSearch />,
  },
  {
    title: "Grand Finale",
    desc: "জুরি বোর্ডের সিদ্ধান্ত অনুযায়ী ৫১ জনকে ঢাকায় গ্র্যান্ড ফিনালে আমন্ত্রণ জানানো হবে।",
    side: "right",
    icon: <FaHandsHelping />,
  },
];

/* ---------------- CONSTANTS ---------------- */
const CARD_GAP = 260;
const START_TOP = 160;
const SECTION_HEIGHT = START_TOP + steps.length * CARD_GAP + 200;

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
    offset: ["start start", "end end"],
  });

  /* ---------------- ROCKET FOLLOW PATH ---------------- */
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    return scrollYProgress.on("change", (v) => {
      const progress = Math.min(Math.max(v * 1.5, 0), 1);
      const point = path.getPointAtLength(length * progress);
      const next = path.getPointAtLength(
        length * Math.min(progress + 0.001, 1)
      );

      rocketX.set(point.x);
      rocketY.set(point.y);

      const angle =
        Math.atan2(next.y - point.y, next.x - point.x) *
        (180 / Math.PI);

      rocketRotate.set(angle);
      setActiveIndex(Math.floor(progress * steps.length));
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <section
        ref={wrapperRef}
        style={{ minHeight: SECTION_HEIGHT }}
        className="relative  hidden md:block bg-white overflow-hidden py-40"
      >
        {/* SVG PATH */}
        <svg
          className="absolute left-1/2 -translate-x-1/2"
          width="1100"
          height="1200"
          viewBox="0 0 1100 1200"
        >
          <path
            ref={pathRef}
            d="
              M 380,120 L 780,120
              Q 820,120 820,160
              L 820,380
              Q 820,420 780,420
              L 320,420
              Q 280,420 280,460
              L 280,650
              Q 280,690 320,690
              L 780,690
              Q 820,690 820,730
              L 820,850
            "
            stroke="#000"
            strokeWidth="1"
            strokeDasharray="6 6"
            fill="none"
          />
        </svg>

        {/* ROCKET */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            x: rocketX,
            y: rocketY,
            rotate: rocketRotate,
            translateX: 350,
            translateY: -20,
          }}
        >
          <svg
            viewBox="0 0 67 40"
            width="67"
            height="40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_575_1310)">
              <path
                d="M16.8529 20C16.8549 19.2544 16.7081 18.5158 16.4208 17.8269C16.1335 17.1381 15.7114 16.5126 15.1791 15.9868C14.6497 15.458 14.0199 15.0388 13.3262 14.7535C12.6324 14.4682 11.8886 14.3225 11.1377 14.3247C7.24216 14.3247 1.95524 18.4438 1.36521 18.9127L0 20L1.36521 21.0864C1.95524 21.5563 7.24216 25.6753 11.1377 25.6753C11.8885 25.6774 12.6323 25.5316 13.326 25.2463C14.0197 24.961 14.6496 24.5419 15.1791 24.0132C15.7113 23.4873 16.1332 22.8618 16.4205 22.173C16.7078 21.4842 16.8547 20.7456 16.8529 20Z"
                fill="#FDBF00"
              />
              <path
                d="M1.36525 21.0865C1.95528 21.5563 7.2422 25.6753 11.1377 25.6753C11.8886 25.6774 12.6324 25.5316 13.3261 25.2463C14.0198 24.961 14.6496 24.5419 15.1791 24.0132C15.7114 23.4875 16.1333 22.8623 16.4206 22.1736C16.7079 21.4849 16.8549 20.7464 16.8529 20L0 20L1.36525 21.0865Z"
                fill="#FF9100"
              />
              <path
                d="M25.0986 9.71827L22.1999 9.71827L14.0488 11.7611L14.0488 28.2289L22.1989 30.2819L25.0977 30.2819L25.0986 9.71827Z"
                fill="#C6DCF8"
              />
              <path
                d="M14.0479 28.2335L22.1989 30.2819L25.0976 30.2819L25.0976 20.001L14.0479 20.001L14.0479 28.2335Z"
                fill="#82BCEA"
              />
              <path
                d="M66.0577 21.2769L67 20L66.0577 18.7252C65.3889 17.8201 64.6518 16.9667 63.8527 16.1726C61.801 14.1316 59.3642 12.5123 56.6817 11.4073C53.9816 10.2894 51.0848 9.71526 48.1594 9.71828L45.4346 9.71829L45.4346 30.281L48.1613 30.281C51.6465 30.2764 55.0821 29.461 58.1927 27.9002C61.2996 26.3322 63.9932 24.0632 66.0577 21.275L66.0577 21.2769Z"
                fill="#FD4B49"
              />
              <path
                d="M67 20L45.4346 20L45.4346 30.2809L48.1613 30.2809C51.6465 30.2764 55.0821 29.461 58.1927 27.9001C61.2994 26.3319 63.993 24.0629 66.0577 21.2749L67 20Z"
                fill="#E70B69"
              />
              <path
                d="M21.1797 0L21.1797 2.78566L24.5516 2.78566L24.5516 12.5038L46.1425 12.5038L35.3891 0L21.1797 0Z"
                fill="#445EA0"
              />
              <path
                d="M35.3928 40L46.1462 27.4961L24.5516 27.4961L24.5516 37.2143L21.1797 37.2143L21.1797 40L35.3928 40Z"
                fill="#224070"
              />
              <path
                d="M22.1973 9.71632L48.2316 9.71632L48.2316 30.2762L22.1973 30.2762L22.1973 9.71632Z"
                fill="#EAF2F9"
              />
              <path
                d="M22.1963 19.9971L48.2316 19.9971L48.2316 30.2761L22.1963 30.2761L22.1963 19.9971Z"
                fill="#C6DCF8"
              />
              <path
                d="M39.6828 22.6769C41.1716 21.1985 41.1716 18.8015 39.6828 17.3231C38.194 15.8447 35.7802 15.8447 34.2914 17.3231C32.8026 18.8015 32.8026 21.1985 34.2914 22.6769C35.7802 24.1553 38.194 24.1553 39.6828 22.6769Z"
                fill="#71D5FF"
              />
            </g>

            <defs>
              <clipPath id="clip0">
                <rect width="65" height="40" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </motion.div>

        {/* CARDS */}
        {steps.map((s, i) => (
          <div
            key={i}
            className={`absolute w-[420px] ${s.side === "left"
              ? "left-[calc(50%-560px)]"
              : "left-[calc(50%+120px)]"
              }`}
            style={{ top: START_TOP + i * CARD_GAP }}
          >
            <div
              className={`rounded-2xl p-6 transition-all duration-500 ${activeIndex === i
                ? "bg-indigo-600 text-white scale-105 shadow-[0_0_40px_rgba(99,102,241,0.5)]"
                : "bg-white text-gray-800 shadow-xl"
                }`}
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-bold text-lg">{s.title}</h3>
              <p className="mt-2 text-sm opacity-90">{s.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ================= MOBILE ================= */}
      <section className="md:hidden bg-gray-50 py-12 px-4">
        <div className="space-y-8">
          {steps.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-5">
              <div className="text-indigo-600 text-2xl mb-2">
                {s.icon}
              </div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-gray-600 text-sm mt-1">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
