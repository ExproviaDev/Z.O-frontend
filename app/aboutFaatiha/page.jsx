"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-fade"
import {
  FaLeaf,
  FaChild,
  FaRecycle,
  FaGlobeAmericas,
  FaMicrophone,
  FaHandsHelping,
  FaUsers,
  FaTrophy,
  FaAward,
  FaMedal,
  FaPlay,
} from "react-icons/fa"

export default function AboutFaatihaPage() {
  const [selectedMedia, setSelectedMedia] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      
      {/* 1️⃣ CINEMATIC HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden">
  <Swiper
    modules={[Autoplay, EffectFade]}
    effect="fade"
    autoplay={{ delay: 6500, disableOnInteraction: false }}
    speed={1400}
    loop={true}
    className="h-full w-full"
  >
    <SwiperSlide>
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 6.5, ease: "easeOut" }}
        className="h-full w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dsga4gyw9/image/upload/v1766482083/IMG_8818_nrmq2a.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-950" />
      </motion.div>
    </SwiperSlide>

    <SwiperSlide>
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 6.5, ease: "easeOut" }}
        className="h-full w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dsga4gyw9/image/upload/v1766482083/IMG_8805_rbfyuu.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-950" />
      </motion.div>
    </SwiperSlide>

    <SwiperSlide>
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 3.5, ease: "easeOut" }}
        className="h-full w-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dsga4gyw9/image/upload/v1766482085/IMG_9062_h6cvym.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-950" />
      </motion.div>
    </SwiperSlide>
  </Swiper>

{/* 🔥 Centered Heading on Slider */}
<div className="absolute inset-0 z-20 flex items-center justify-center text-center px-6">
  <div className="relative max-w-4xl">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
      className="text-4xl md:text-6xl font-bold tracking-wide leading-tight"
    >
      <span className="bg-gradient-to-r italic from-emerald-300 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
        Reducing To Zero, Rising As Hero!
      </span>
    </motion.h2>

    {/* underline */}
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "260px" }}
      transition={{ duration: 1, delay: 1.3, ease: "easeOut" }}
      className="h-[2px] mx-auto mt-6 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
    />

    {/* author – right aligned under heading */}
    <motion.p
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
      className="mt-2 text-lg md:text-xl text-gray-300 text-right"
    >
      — Faatiha Ayat
    </motion.p>
  </div>
</div>


  {/* Existing Center Content */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="max-w-5xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="inline-flex items-center gap-2 px-5 py-2 mb-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full"
        >
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium tracking-wide text-emerald-300">
            UN Speaker
          </span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Reducing To Zero,
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Rising As Hero!
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          Climate activist, youth advocate, and global changemaker
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-lg font-semibold shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-shadow duration-500"
        >
          Discover Her Story
        </motion.button>
      </motion.div>
    </div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
    <motion.div
      animate={{ y: [0, 12, 0] }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      className="text-white/60"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </motion.div>
  </div>
</section>


      {/* 2️⃣ VISIONARY BIOGRAPHY */}
      <BiographySection />

      {/* 3️⃣ ADVOCACY FOCUS */}
      <AdvocacySection />

      {/* 4️⃣ GLOBAL IMPACT TIMELINE */}
      <TimelineSection />

      {/* 5️⃣ GLOBAL LEADERSHIP SECTION */}
      <LeadershipSection />

      {/* 6️⃣ MEDIA GALLERY */}
      <MediaGallerySection selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia} />

      {/* 7️⃣ GRID OF HONOR */}
      <GridOfHonorSection />

      {/* 8️⃣ VISIONARY CTA */}
      {/* <CTASection /> */}

      {/* Media Modal */}
      {selectedMedia && <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} />}
    </div>
  )
}

// 2️⃣ BIOGRAPHY COMPONENT
function BiographySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-700" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-2 shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dsga4gyw9/image/upload/v1766482946/DSC_0931_1_nfxc63.jpg"
                  alt="Faatiha"
                  className="w-full aspect-[3/4] object-cover rounded-2xl"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          >
            <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm mb-4 block">
              Visionary Biography
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              A Voice for the
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                Voiceless
              </span>
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Faatiha is a passionate climate activist and youth advocate who has dedicated her life to creating
              sustainable change. From speaking at the{" "}
              <span className="text-emerald-400 font-semibold">United Nations 2023 Water Conference</span> to
              representing youth voices at <span className="text-emerald-400 font-semibold">ECOSOC</span>, her work
              spans continents and causes.
            </p>

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              As a researcher and advocate, she has collaborated with institutions like{" "}
              <span className="text-emerald-400 font-semibold">Harvard University</span>, bringing evidence-based
              solutions to global challenges. Her mission is simple yet powerful: amplify the voices of those fighting
              for climate justice, child rights, and a pollution-free future.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
              className="border-l-4 border-emerald-500 pl-6 py-4 bg-emerald-500/5 rounded-r-xl"
            >
              <p className="text-xl italic text-gray-200 leading-relaxed">
                "Every action we take today shapes the world our children will inherit. We must act with urgency and
                compassion."
              </p>
              <p className="text-emerald-400 font-semibold mt-3">— Faatiha</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// 3️⃣ ADVOCACY FOCUS COMPONENT
function AdvocacySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const advocacyCards = [
    {
      icon: FaLeaf,
      title: "Climate Action",
      description:
        "Leading global initiatives to combat climate change and promote sustainable practices for future generations.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: FaChild,
      title: "Child Rights",
      description:
        "Advocating for the protection and empowerment of children worldwide, ensuring every child has a voice.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: FaRecycle,
      title: "Ending Pollution",
      description:
        "Championing zero-waste solutions and circular economy models to eliminate environmental degradation.",
      gradient: "from-teal-500 to-emerald-500",
    },
    {
      icon: FaGlobeAmericas,
      title: "Sustainable Development",
      description:
        "Working with international bodies to implement the UN Sustainable Development Goals across communities.",
      gradient: "from-cyan-500 to-blue-500",
    },
  ]

  return (
    <section ref={ref} className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm mb-4 block">
            Core Focus Areas
          </span>
          <h2 className="text-5xl md:text-6xl font-bold">
            Advocacy{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Impact</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {advocacyCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: index * 0.25, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 rounded-3xl blur-2xl transition-all duration-700`}
              />

              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:border-white/20 transition-all duration-500">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-500`}
                >
                  <card.icon className="text-3xl text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-center">{card.title}</h3>
                <p className="text-gray-300 leading-relaxed text-center">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 4️⃣ TIMELINE COMPONENT
function TimelineSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const milestones = [
    {
      year: "2021",
      title: "NYC Urban Debate League",
      description:
        "Championed youth voices through competitive debate, focusing on social justice and environmental policy.",
    },
    {
      year: "2022",
      title: "Environmentalist Award",
      description:
        "Recognized for outstanding contributions to climate advocacy and community environmental initiatives.",
    },
    {
      year: "2023",
      title: "UN Water Conference Speaker",
      description:
        "Addressed world leaders at the United Nations 2023 Water Conference on sustainable water management.",
    },
    {
      year: "2024",
      title: "Zero Olympiad Founder",
      description: "Launched global initiative empowering youth to become climate champions and changemakers.",
    },
  ]

  return (
    <section ref={ref} className="py-32 px-6 relative bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm mb-4 block">
            Journey of Impact
          </span>
          <h2 className="text-5xl md:text-6xl font-bold">
            Global{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Timeline
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-500 to-cyan-500 origin-top"
          />

          <div className="space-y-20">
            {milestones.map((milestone, index) => (
              <TimelineMilestone key={index} milestone={milestone} index={index} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineMilestone({ milestone, index, isInView }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1.2, delay: index * 0.3, ease: "easeOut" }}
      className={`relative flex ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
    >
      <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"} ml-12 md:ml-0`}>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="inline-block"
        >
          <span className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {milestone.year}
          </span>
        </motion.div>
        <h3 className="text-2xl font-bold mt-3 mb-2">{milestone.title}</h3>
        <p className="text-gray-300 leading-relaxed">{milestone.description}</p>
      </div>

      {/* Pulse dot */}
      <div className="absolute left-0 md:left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full shadow-lg shadow-emerald-500/50"
        />
      </div>

      <div className="flex-1 hidden md:block" />
    </motion.div>
  )
}

// 5️⃣ GLOBAL LEADERSHIP COMPONENT
function LeadershipSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const leadershipCards = [
    {
      icon: FaMicrophone,
      title: "International Conferences",
      description:
        "Speaker at UN Water Conference, ECOSOC forums, and global youth summits addressing climate urgency.",
    },
    {
      icon: FaHandsHelping,
      title: "Policy Advocacy",
      description:
        "Collaborating with governments and NGOs to shape evidence-based environmental and child protection policies.",
    },
    {
      icon: FaUsers,
      title: "Youth Representation",
      description:
        "Amplifying youth voices on global platforms, ensuring the next generation leads climate conversations.",
    },
  ]

  return (
    <section ref={ref} className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm mb-4 block">
            Global Presence
          </span>
          <h2 className="text-5xl md:text-6xl font-bold">
            Leadership{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Worldwide
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {leadershipCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: index * 0.3, ease: "easeOut" }}
              whileHover={{ rotateY: 4, rotateX: -4 }}
              className="group relative perspective-1000"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:border-emerald-500/50 transition-all duration-500">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                  <card.icon className="text-2xl text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className="text-gray-300 leading-relaxed">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// 6️⃣ MEDIA GALLERY COMPONENT
function MediaGallerySection({ selectedMedia, setSelectedMedia }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // YouTube URL theke ID ber korar function
  const getYTId = (url) => {
    const regExp = /^.*(embed\/|v\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const mediaItems = [
    {
      type: "video",
      title: "UN Water Conference 2023",
      url: "https://www.youtube.com/embed/U0Vg6ymJDB8?si=3c8U_dr-7um6_aK3",
    },
    {
      type: "video",
      title: "ECOSOC Youth Forum",
      url: "https://www.youtube.com/watch?v=h9k6q9jO5ck",
    },
    {
      type: "video",
      title: "Harvard Research Presentation",
      url: "https://www.youtube.com/embed/18kRsnDq-mw?si=LOo7kafueuUUO4og",
    },
    {
      type: "video",
      title: "Climate Action Workshop",
      url: "https://www.youtube.com/watch?v=I84Du2wNqHc&feature=youtu.be",
    },
    {
      type: "video",
      title: "Youth Summit Panel",
      url: "https://youtu.be/mlIZKSQ4sgI?si=POWFB7-pU9pcGRet",
    },
    {
      type: "video",
      title: "Zero Olympiad Launch",
      url: "https://www.youtube.com/embed/M4zZ_OTqwIM?si=oCstY85051pAKexr",
    },
  ]

  return (
    <section ref={ref} className="py-32 px-6 relative bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm mb-4 block">
            Visual Journey
          </span>
          <h2 className="text-5xl md:text-6xl font-bold">
            Media{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Gallery</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {mediaItems.map((item, index) => {
            // Protiti video-r thumbnail URL eikhane generate hochhe
            const videoId = getYTId(item.url);
            const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group shadow-2xl"
                onClick={() => setSelectedMedia(item)}
              >
                {/* YouTube Image Loader with Fallback */}
                <img 
                  src={thumbUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Jodi High Definition image na thake, tobe standard image load hobe
                    e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-500">
                    <FaPlay className="text-white text-xl ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white font-semibold">{item.title}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

// Media Modal Component
function MediaModal({ media, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute -top-12 right-0 text-white/80 hover:text-white text-4xl">
          ×
        </button>

        {media.type === "video" ? (
          <div className="aspect-video rounded-2xl overflow-hidden">
            <iframe
              src={media.url}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <img src={media.thumbnail || "/placeholder.svg"} alt={media.title} className="w-full rounded-2xl" />
        )}

        <p className="text-white text-xl font-semibold mt-4 text-center">{media.title}</p>
      </motion.div>
    </motion.div>
  )
}

// 7️⃣ GRID OF HONOR COMPONENT
function GridOfHonorSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const achievements = [
    {
      icon: FaTrophy,
      title: "President's Volunteer Service Award",
      description: "Recognized for exemplary community service and youth leadership",
      gradient: "from-yellow-500 to-orange-500",
      size: "large",
    },
    {
      icon: FaAward,
      title: "NYC Mayor Recognition",
      description: "Honored for environmental advocacy impact",
      gradient: "from-blue-500 to-cyan-500",
      size: "medium",
    },
    {
      icon: FaMedal,
      title: "UNESCO Youth Champion",
      description: "Leading sustainable education initiatives",
      gradient: "from-emerald-500 to-teal-500",
      size: "medium",
    },
    {
      icon: FaGlobeAmericas,
      title: "Global Youth Leader",
      description: "International recognition for climate advocacy",
      gradient: "from-purple-500 to-pink-500",
      size: "large",
    },
  ]

  return (
    <section ref={ref} className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm mb-4 block">
            Achievements & Recognition
          </span>
          <h2 className="text-5xl md:text-6xl font-bold">
            Grid of{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Honor</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: index * 0.2, ease: "easeOut" }}
              className={`group relative ${achievement.size === "large" ? "md:col-span-1" : ""}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-3xl transition-all duration-700`}
              />

              <div
                className={`relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:border-white/20 transition-all duration-500 ${achievement.size === "large" ? "md:p-14" : ""}`}
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${achievement.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                >
                  <achievement.icon className="text-3xl text-white" />
                </div>

                <h3 className={`font-bold mb-3 ${achievement.size === "large" ? "text-3xl" : "text-2xl"}`}>
                  {achievement.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{achievement.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


