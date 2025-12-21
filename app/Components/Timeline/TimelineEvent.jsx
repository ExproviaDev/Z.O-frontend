"use client"
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
  70, 380, 660, 960, 1300, 1620, 1920, 2300,
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
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    return scrollYProgress.on("change", (v) => {
      const progress = Math.min(Math.max(v, 0), 1);
      const speed = 1;
      const point = path.getPointAtLength(length * progress * speed);
      const next = path.getPointAtLength(length * Math.min(progress + 0.000010, 1));

      rocketX.set(point.x);
      rocketY.set(point.y);

      const angle =
        Math.atan2(next.y - point.y, next.x - point.x) * (180 / Math.PI);
      rocketRotate.set(angle);

      setActiveIndex(Math.floor(progress * steps.length));
    });
  }, [scrollYProgress]);

  return (
    <div>
      <div ref={wrapperRef} className="relative h-[2600px] hidden md:block  bg-white overflow-hidden px-5">
        {/* SVG PATH */}
        <svg
          className="absolute left-1/2 -translate-x-1/2 hidden md:block"
          width="1100"
          height="2600"
          viewBox="0 0 1100 2600"
        >
          <path
            ref={pathRef}
            d="
            M 380,140 L 780,140
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
            stroke="#000000"
            strokeWidth="1"
            strokeDasharray="6 6"
            fill="none"
          />
        </svg>

        {/* ROCKET */}
        <motion.div
          className="absolute pointer-events-none hidden md:block"
          style={{
            x: rocketX,
            y: rocketY,
            rotate: rocketRotate,
            translateX: 350,
            translateY: -19,
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
          <motion.div
            key={i}
            className="absolute w-full flex justify-center md:block"
            style={{
              top: CARD_Y[i],
              left:
                typeof window !== "undefined" && window.innerWidth < 768
                  ? "50%"
                  : s.side === "left"
                    ? "calc(50% - 560px)"
                    : "calc(50% + 120px)",
              transform:
                typeof window !== "undefined" && window.innerWidth < 768
                  ? "translateX(-60%)"
                  : "none",
            }}
          >
            <div
              className={`w-full max-w-[420px] rounded-2xl p-5 md:p-6 transition-all duration-500 ${activeIndex === i
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

      {/* ewsponsive part */}

      <div className="block md:hidden bg-gray-50 py-10 px-4">
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-4 top-0 h-full border-l-4 border-indigo-300"></div>

          <div className="space-y-10">
            {steps.map((s, i) => (
              <div key={i} className="relative flex items-start">
                {/* Step circle */}
                <div className="flex flex-col items-center mr-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold">
                    {i + 1}
                  </div>
                  {i !== steps.length - 1 && (
                    <div className="flex-1 w-0.5 bg-indigo-300 mt-1"></div>
                  )}
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-lg p-4 flex-1 hover:shadow-indigo-500/30 transition duration-300">
                  <div className="text-indigo-600 text-2xl mb-2">{s.icon}</div>
                  <h3 className="font-semibold text-base">{s.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
}