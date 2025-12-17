




"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {

    
  FaUniversity,
  FaFlag,
  FaSchool,
  
  FaClock,
  FaWater,
  FaHeart,
  FaFutbol,
  FaGavel,
  FaComments,
  FaTools,
  FaRocket,


  
 FaBookOpen,
  FaArrowRight,
  FaTrophy,
  FaUsers,
  FaCalendarAlt,
  FaCertificate,
  FaUserGraduate,
  FaMedal,
  FaAward,
  FaHandshake,
  FaBook,
  FaLightbulb,
  FaChalkboardTeacher,
  FaTheaterMasks,
} from "react-icons/fa"
import EventGallery from "../EventGallery/EventGallery"

export default function HomePage() {
  const [animatedSections, setAnimatedSections] = useState(new Set())

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAnimatedSections((prev) => new Set([...prev, entry.target.dataset.section]))
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    })

    document.querySelectorAll("[data-section]").forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <main className="overflow-x-hidden ">
      {/* Hero Section - Full Width */}
      <section className="p-5 relative min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="absolute inset-0 bg-black/40" />
        <Image
          src="/src/bannerForLogin.png"
          alt="Hero Background"
          fill
          className="object-cover mix-blend-overlay opacity-30"
          priority
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-20">
          <div
            data-section="hero"
            className={`text-center transition-all duration-1000 ${
              animatedSections.has("hero") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Welcome to <span className="text-pink-500">Zero Olympiad</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Unleash your potential, compete with the brightest minds, and embark on a journey of academic excellence and discovery.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <button className="flex items-center gap-3 bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                Register Now
                <FaArrowRight />
              </button>
               <button className="flex items-center gap-3 border-2 border-pink-500 text-white  hover:bg-pink-600  px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                Learn More
                <FaArrowRight />
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            {[
               { icon: FaCalendarAlt, number: "Jan 15", label: "Registration Dateline" },
              { icon: FaUsers, number: "3 Categories", label: "For All Student" },
              
              { icon: FaTrophy, number: "17 SDGs", label: "Competition Topic" },
             
            ].map((stat, index) => (
              <div
                key={index}
                data-section={`stat-${index}`}
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 transition-all duration-700 hover:scale-105 hover:bg-white/20 ${
                  animatedSections.has(`stat-${index}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <stat.icon className="text-5xl text-pink-400 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zero Olympiad Instructions */}
      <section className="py-20 p-5 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              data-section="instructions-text"
              className={`transition-all duration-1000 ${
                animatedSections.has("instructions-text") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Zero Olympiad Instructions</h2>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">
                The Zero Olympiad is a groundbreaking initiative that aims to inspire and activate the young generation to address global issues. Led by Fatiha Ayat, the Olympiad is working to raise awareness among young people,
              </p>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                develop leadership skills, and engage them in achieving the United Nations Sustainable Development Goals (SDGs). The Zero Olympiad is a platform where participants are inspired to find effective solutions to various problems in society through their own thinking and solutions
              </p>

              <div className="flex gap-4">
               <button className="flex items-center gap-3 bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                English Instructions
                <FaArrowRight />
              </button>
               <button className="flex items-center gap-3 border-2 border-pink-500 text-black hover:text-white hover:bg-pink-600  px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                Bangla Instructions
                <FaArrowRight />
              </button>
              </div>

            </div>

            <div
              data-section="instructions-video"
              className={`transition-all duration-1000 ${
                animatedSections.has("instructions-video") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >

              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 aspect-video">
  <iframe
    className="absolute inset-0 w-full h-full"
    src="https://www.youtube.com/embed/Us-DfHSgBm4?si=C9sfk8xGdCPYNqLX"
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  ></iframe>
</div>


            </div>
          </div>
        </div>
      </section>

 {/* Why Should You Participate - Full Width */}
<section className="relative w-full min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-5 flex flex-col justify-center">
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50" />
  <Image
    src="/src/image.jpg"
    alt="Participate Background"
    fill
    className="object-cover mix-blend-overlay opacity-20"
  />

  <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col justify-center h-full">
    <h2
      data-section="participate-title"
      className={`text-4xl md:text-5xl font-bold text-center text-white mb-4 transition-all duration-1000 ${
        animatedSections.has("participate-title") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      Why should you participate?
    </h2>

    <p className="text-center text-gray-300 text-lg mb-12 max-w-3xl mx-auto">
      Choose the category that matches your academic level and begin your journey to excellence
    </p>

    {/* Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  h-full">
      {[
        {
          badge: "SDG",
          badgeColor: "bg-blue-500",
          title: "Fellowship Support",
          description:
            "Support for applying to the SDG Fellowship during overseas university admission.",
          icon: "✨",
        },
        {
          badge: "SDG",
          badgeColor: "bg-purple-500",
          title: "Summit Participation",
          description:
            "Recommendation for participation in the SDG Summit at the United Nations every year.",
          icon: "🤝",
        },
        {
          badge: "National",
          badgeColor: "bg-orange-500",
          title: "Zero Olympiad Envoy",
          description:
            "Inclusion of National Zero Olympiad Envoys in Zero Olympiad Clubs nationwide.",
          icon: "🧑‍💻",
        },
        {
          badge: "UN",
          badgeColor: "bg-orange-400",
          title: "Certificate Course",
          description:
            "Register for UN-accredited courses via Zero Olympiad for free online learning.",
          icon: "🏆",
        },
        {
          badge: "Case Study",
          badgeColor: "bg-green-500",
          title: "Debate & Public Speaking",
          description:
            "Case Study Competition, Debate, and Public Speaking events for idea presentation.",
          icon: "📊",
        },
        {
          badge: "Workshops",
          badgeColor: "bg-pink-500",
          title: "Seminars & Project Implementation",
          description:
            "Special skill development workshops, seminars, and funding opportunities for projects.",
          icon: "🏆",
        },
      ].map((item, index) => (
        <div
          key={index}
          data-section={`benefit-${index}`}
          className={`relative bg-white rounded-3xl p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between  h-full ${
            animatedSections.has(`benefit-${index}`)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          {/* Badge */}
          <span
            className={`inline-block ${item.badgeColor} text-white text-sm font-semibold px-4 py-1 rounded-full w-1/3 text-center mb-4`}
          >
            {item.badge}
          </span>





          {/* Content */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed pr-12">{item.description}</p>
          </div>

          {/* Right Icon */}
          <div className="absolute bottom-6 right-6 text-4xl opacity-80">{item.icon}</div>
        </div>
      ))}
    </div>
  </div>
</section>





{/* Registration Categories */}
<section className="relative w-full min-h-screen bg-gray-50 flex items-center py-20 px-5">
  <div className="max-w-7xl mx-auto w-full">
    {/* Section Title */}
    <div className="text-center mb-12">
      <h2
        data-section="categories-title"
        className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 transition-all duration-1000 ${
          animatedSections.has("categories-title") ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        Registration <span className="text-pink-500">Categories</span>
      </h2>
      <p className="text-gray-600 text-lg max-w-3xl mx-auto">
        Choose the category that matches your academic level and begin your journey to excellence
      </p>
    </div>




    {/* Cards Grid */}
   {/* Cards Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
  {[
    {
      title: "SDG Activist",
      price: "৳300",
      level: "Class 5-8",
      features: [
        "Participants from Grade 5/PYP 5 to Grade 8/MYP 3 will be called SDG Activists.",
        "Four SDG Activists from each class who win first and second rounds will present in front of the jury board.",
        "Highest scorer will receive SDG Defender Award."
      ],
      bg: "bg-[#F4FAFF]",
      highlighted: false,
    },
    {
      title: "SDG Ambassador",
      price: "৳300",
      level: "Class 8-12",
      features: [
        "Participants from Grade 9/MYP 4 to HSC examinees/A Level candidates called SDG Ambassadors.",
        "6 ambassadors from 9th, 10th, SSC examinees, 11th, 12th, HSC examinees will present before jury board.",
        "Highest scorer will receive SDG Leader Award."
      ],
      bg: "bg-[#FFF7FB]",
      highlighted: true,
    },
    {
      title: "SDG Achiever",
      price: "৳300",
      level: "Bachelor to Masters",
      features: [
        "Participants from 1st year to Postgraduate from Degree Pass, Graduation, Honors, Medical, Engineering, Marine Fisheries, Diploma.",
        "Presentations before jury board at grand finale ceremony.",
        "Highest scorer will receive SDG Pioneer Award."
      ],
      bg: "bg-[#F6FFF7]",
      highlighted: false,
    },
  ].map((category, index) => (
    <div
      key={index}
      data-section={`category-${index}`}
      className={`group relative rounded-3xl p-8 flex flex-col h-full transition-all duration-700
      hover:-translate-y-2 hover:shadow-2xl border border-pink-200
      ${category.bg}
      ${
        animatedSections.has(`category-${index}`)
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
        <FaBookOpen size={22} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-1">{category.title}</h3>
      <p className="text-pink-500 text-sm font-medium mb-4">
        {category.level}
      </p>

      {/* Features */}
      <ul className="space-y-3 text-sm text-gray-600 flex-1">
        {category.features.map((feature, i) => (
          <li key={i} className="flex gap-3 leading-relaxed">
            <span className="text-pink-500 mt-1">•</span>
            {feature}
          </li>
        ))}
      </ul>

      {/* Price */}
      <div className="mt-6">
        <p className="text-3xl font-bold">{category.price}</p>
        <p className="text-sm text-gray-500 mb-4">/ participant</p>

        {/* Button */}
        <button
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-semibold transition-all duration-300
          ${
            category.highlighted
              ? "bg-pink-500 text-white hover:bg-pink-600"
              : "border border-pink-500 text-pink-500 hover:bg-pink-50"
          }`}
        >
          Register Now
          <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  ))}
</div>



    
  </div>
</section>





 <section className="relative w-full py-24 p-5 px-5 bg-gradient-to-br from-[#182a8d8f] via-[#0b3c97] to-[#121974de] overflow-hidden">
  {/* background image */}
  <Image
    src="/src/NRBAward.jpg"
    alt="Background"
    fill
    className="object-cover opacity-20 mix-blend-overlay"
  />
  <div className="absolute inset-0 bg-black/60" />

  <div className="relative z-10 max-w-7xl mx-auto">
    {/* ================= Header ================= */}
    <div className="text-center mb-16">
      <span className="inline-block mb-3 px-4 py-1 rounded-full bg-pink-500/20 text-pink-400 text-sm">
        🎖 17 finalists who will receive awards
      </span>
      <h2 className="text-4xl md:text-5xl font-bold text-white">
        Awards & <span className="text-pink-500">Opportunities</span>
      </h2>
    </div>

    {/* ================= Awards ================= */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
      {[
        {
          icon: FaUserGraduate,
          title: "SDG Fellowship Support",
          desc: "Comprehensive support in applying for SDG Fellowship during admission to Overseas Universities.",
        },
        {
          icon: FaUniversity,
          title: "UN SDG Summit Recommendation",
          desc: "Recommendation for participation in the SDG Summit held at the United Nations every year.",
        },
        {
          icon: FaFlag,
          title: "National Zero Olympiad Envoy",
          desc: "Inclusion in Zero Olympiad Clubs formed in educational institutions across the country.",
        },
      ].map((item, i) => (
        <div
          key={i}
          data-section={`award-${i}`}
          className={`group rounded-2xl p-6 border-2 border-pink-500 bg-white/5 backdrop-blur-md
          hover:bg-white/10 hover:-translate-y-1 transition-all duration-500
          ${
            animatedSections.has(`award-${i}`)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <item.icon className="text-pink-500 text-3xl mb-4" />
          <h3 className="text-white font-semibold mb-2">{item.title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>

    {/* ================= Scholarships ================= */}
    <h3 className="text-3xl font-bold text-center text-white mb-10">
      Scholarships & <span className="text-pink-500">Sponsorships</span>
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
      {[
        { icon: FaSchool, title: "Daffodil Institute Scholarship", desc: "Full scholarship for empowering future leaders." },
        { icon: FaBookOpen, title: "Saflur’s IELTS Course", desc: "27 classes & 39 comprehensive lessons." },
        { icon: FaClock, title: "10 Minute School", desc: "Customized scholarship from top e-learning platform." },
        { icon: FaWater, title: "Mana Bay Water Park", desc: "Day-long pass with thrilling rides." },
        { icon: FaHeart, title: "Ad Din Foundation Medical", desc: "Zero-fee medical vouchers for healthcare services." },
        { icon: FaFutbol, title: "Sports Development", desc: "Professional coaching & training facilities." },
      ].map((item, i) => (
        <div
          key={i}
          data-section={`scholar-${i}`}
          className={`group rounded-2xl p-6 border-2 border-pink-500 bg-white/5 backdrop-blur-md
          hover:bg-white/10 hover:-translate-y-1 transition-all duration-500
          ${
            animatedSections.has(`scholar-${i}`)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <item.icon className="text-pink-500 text-3xl mb-4" />
          <h3 className="text-white font-semibold mb-2">{item.title}</h3>
          <p className="text-gray-300 text-sm">{item.desc}</p>
        </div>
      ))}
    </div>

    {/* ================= Activities ================= */}
    <h3 className="text-3xl font-bold text-center text-white mb-10">
      Additional <span className="text-pink-500">Activities</span>
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { icon: FaGavel, title: "Case Study Competition", desc: "Solve real-world social problems collaboratively." },
        { icon: FaComments, title: "Debate & Public Speaking", desc: "Enhance argumentation & presentation skills." },
        { icon: FaTools, title: "Workshops & Seminars", desc: "Hands-on professional skill development." },
        { icon: FaRocket, title: "Project Implementation", desc: "Funding support to bring ideas into reality." },
      ].map((item, i) => (
        <div
          key={i}
          data-section={`activity-${i}`}
          className={`flex items-start gap-4 rounded-2xl p-6 border-2 border-pink-500 bg-white/5 backdrop-blur-md
          hover:bg-white/10 transition-all duration-500
          ${
            animatedSections.has(`activity-${i}`)
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <item.icon className="text-pink-500 text-3xl mt-1" />
          <div>
            <h4 className="text-white font-semibold mb-1">{item.title}</h4>
            <p className="text-gray-300 text-sm">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Timeline */}
      <section className="py-20 p-5 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2
            data-section="timeline-title"
            className={`text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4 transition-all duration-1000 ${
              animatedSections.has("timeline-title") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Time <span className="text-pink-500">Line</span>
          </h2>
          <p className="text-center text-gray-600 text-lg mb-16 max-w-3xl mx-auto">
            Important dates and milestones for the competition
          </p>

          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500 hidden lg:block" />

            <div className="space-y-12">
              {[
                {
                  date: "March 15, 2024",
                  title: "Registration Deadline",
                  description: "Last day to register for the competition",
                  side: "left",
                },
                {
                  date: "April 1, 2024",
                  title: "1st Round MCQ Test",
                  description: "Multiple choice screening test",
                  side: "right",
                },
                {
                  date: "April 20, 2024",
                  title: "2nd Round Video Contest",
                  description: "Submit your creative video entry",
                  side: "left",
                },
                {
                  date: "May 10, 2024",
                  title: "3rd Round Written Analysis",
                  description: "In-depth written evaluation",
                  side: "right",
                },
                {
                  date: "June 1, 2024",
                  title: "Grand Finale",
                  description: "Final competition and award ceremony",
                  side: "left",
                },
              ].map((event, index) => (
                <div
                  key={index}
                  data-section={`timeline-${index}`}
                  className={`relative flex items-center ${event.side === "left" ? "lg:justify-start" : "lg:justify-end"}`}
                >
                  <div
                    className={`w-full lg:w-5/12 transition-all duration-1000 ${
                      animatedSections.has(`timeline-${index}`)
                        ? "opacity-100 translate-x-0"
                        : event.side === "left"
                          ? "opacity-0 -translate-x-8"
                          : "opacity-0 translate-x-8"
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-l-4 border-pink-500">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div className="text-sm text-pink-500 font-semibold">{event.date}</div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-pink-500 rounded-full border-4 border-gray-50 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



{/* Confirmed Guest & Jury Section */}
<section className="relative w-full py-20 px-5 bg-[#2b1b668f] overflow-hidden">
  {/* background image */}
  <Image
    src="/src/UNDP.jpg"
    alt="Jury Background"
    fill
    className="object-cover opacity-20"
  />
  <div className="absolute inset-0 bg-[#2b1b66]/80" />

  <div className="relative z-10 max-w-7xl mx-auto">
    {/* Title Section */}
    <div className="text-center mb-16">
      <h2
        className={`text-3xl md:text-5xl font-bold text-white mb-4 transition-all duration-1000 ${
          typeof animatedSections !== 'undefined' && animatedSections.has("jury-title") 
          ? "opacity-100 translate-y-0" 
          : "opacity-100 translate-y-0" // এখানে কন্ডিশন ফেইল করলেও যাতে দেখা যায় তাই opacity-100 রাখা হয়েছে
        }`}
      >
        Confirmed Guest & Jury
      </h2>
      <p className="text-gray-200 max-w-3xl mx-auto text-base md:text-lg font-light">
        Distinguished academics and professionals who guide and evaluate our participants
      </p>
    </div>

    {/* Jury Cards Container */}
    <div className="flex flex-wrap justify-center gap-6">
      {[
        { name: "Heidi Solba", role: "Head of global Dev\nLet's Do It World", image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop", width: "w-full sm:w-[calc(50%-1.5rem)] lg:w-[23%]" },
        { name: "Yousef Ramada", role: "Palestine Ambassador", image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop", width: "w-full sm:w-[calc(50%-1.5rem)] lg:w-[23%]" },
        { name: "Shykh Seraj", role: "Journalist, Agriculture Activist", image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop", width: "w-full sm:w-[calc(50%-1.5rem)] lg:w-[23%]" },
        { name: "Md Sabur Khan", role: "Founder & Chairman, DIU", image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop", width: "w-full sm:w-[calc(50%-1.5rem)] lg:w-[23%]" },
        
        { name: "Syed Farhad Ahmed", role: "Honorary Consul of Estonia", image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop", width: "w-full sm:w-[calc(50%-1.5rem)] lg:w-[18%]" },
        { name: "Saifur Rahman", role: "Founder of S@ifur's", image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop", width: "w-full sm:w-[calc(50%-1.5rem)] lg:w-[18%]" },
        { name: "Rumana Rashid Ishita", role: "Television Artist", image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop", width: "w-full sm:w-[calc(50%-1.5rem)] lg:w-[18%]" },
        { name: "Sadat Rahman", role: "Int'l Peace Prize Winner", image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop", width: "w-full sm:w-[calc(50%-1.5rem)] lg:w-[18%]" },
        { name: "RJ Kebria", role: "Media Personality", image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop", width: "w-full sm:w-[calc(50%-1.5rem)] lg:w-[18%]" },
      ].map((jury, index) => (
        <div
          key={index}
          className={`${jury.width} bg-white rounded-[20px] p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center justify-center ${
            typeof animatedSections !== 'undefined' && animatedSections.has(`jury-${index}`) 
            ? "opacity-100 translate-y-0" 
            : "opacity-100 translate-y-0" 
          }`}
          style={{ transitionDelay: `${index * 50}ms` }}
        >
          {/* Circular Avatar with Dotted Border */}
          <div className="relative w-24 h-24 mb-4 p-1 rounded-full border-[3px] border-dashed border-[#e91e63]">
            <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                src={jury.image}
                alt={jury.name}
                fill
                className="object-cover"
                unoptimized
                />
            </div>
          </div>

          {/* Name */}
          <h3 className="text-lg font-extrabold text-[#1a1a1a] mb-1 leading-tight">
            {jury.name}
          </h3>

          {/* Role */}
          <p className="text-[12px] text-gray-500 font-medium leading-snug whitespace-pre-line">
            {jury.role}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      

      {/* Gallery */}
  {/* Gallery */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4">
    <h2
      data-section="gallery-title"
      className={`text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4 transition-all duration-1000 ${
        animatedSections.has("gallery-title")
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
    >
      <span className="text-pink-500">Gallery</span>
    </h2>

    <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
      Compete for glory and be rewarded with prizes that recognize your hard work and dedication
    </p>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          data-section={`gallery-${index}`}
          className={`relative aspect-square rounded-xl overflow-hidden group cursor-pointer transition-all duration-700 ${
            animatedSections.has(`gallery-${index}`)
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
          style={{ transitionDelay: `${index * 50}ms` }}
        >
          <Image
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&h=600&fit=crop"
            alt={`Gallery image ${index + 1}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
           
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* CTA Section - Full Width */}
      <section className="relative p-5 w-full py-32 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/30" />

        <div
          data-section="cta"
          className={`relative z-10 max-w-4xl mx-auto px-4 text-center transition-all duration-1000 ${
            animatedSections.has("cta") ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Want Something Extra?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already part of this incredible journey. Don't miss out on this
            opportunity!
          </p>
          <button className="bg-white text-pink-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-all duration-300 hover:scale-110 shadow-2xl">
            Get Started
          </button>
        </div>
      </section>
    </main>
  )
}
