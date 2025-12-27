import React from 'react';
// import { FaGraduationCap, FaHandshake, FaMicrophoneAlt, FaUsers, FaLightbulb, FaAward } from 'react-icons/fa';
import { FaCheck } from "react-icons/fa";

import { motion } from 'framer-motion'; // এনিমেশনের জন্য (npm install framer-motion)
import { 
  FaHandshakeAngle, 
  FaUsersViewfinder, 
  FaAward, 
  FaGraduationCap, 
  FaMicrophoneLines, 
  FaLightbulb 
} from "react-icons/fa6";


const ParticipationSection = () => {
  // আপনার ইমেজের লিঙ্কগুলো এখানে বসান
  const backgroundImage = "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766482083/IMG_8352_ck3al2.jpg";
  const certificateImage = "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766841450/WhatsApp-Image-2024-11-26-at-13.34.29_lkfkfc.jpg";

  return (
    <section 
      className="relative min-height-screen py-16 px-4 md:px-10 lg:px-20 bg-cover bg-center bg-no-repeat font-sans"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {/* Overlay with specific color #2a719f and opacity */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ backgroundColor: '#2a719f', opacity: '0.92' }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-white text-3xl md:text-4xl font-bold  text-center mb-18">
          Why Should You Participate?
        </h2>

        {/* Top Section: Certificate and Info */}
        <div className="flex flex-col lg:flex-row items-stretch gap-8 mb-6">
  {/* Certificate Image Side */}
  <div className="w-full pl-5 lg:w-1/2 flex items-center justify-center">
    <div className="bg-white p-2 rounded-sm shadow-2xl  w-full">
      <img 
        src={certificateImage} 
        alt="UN Certificate" 
        className="w-full h-auto object-contain"
      />
    </div>
  </div>

  {/* Text Content Side */}
  <div className="w-full lg:w-1/2 text-white flex flex-col justify-between">
    <div>
      <h3 className="text-2xl font-bold mb-1 leading-tight">জাতিসংঘের সার্টিফিকেট কোর্স</h3>
      <h2 className="text-3xl font-bold mb-3">UN Certificate Course</h2>
      
      <ul className="space-y-2">
        {[
          "Those who register for Zero Olympiad will have the opportunity to take multiple UN-accredited courses from UNITAR and UNCC ELearn.",
          "The courses can be taken online for free at your own pace and convenience.",
          "A certificate will be issued by the UN institution upon completion of the course.",
          "There will be 30 MCQ questions in the first round of Zero Olympiad from this course."
        ].map((item, index) => (
          <li key={index} className="flex border-b border-white/20 pb-1 items-start gap-1">
            <span className="text-green-400 text-xl mt-1 flex-shrink-0">
              <FaCheck />
            </span>
            <p className="text-sm md:text-base leading-snug">{item}</p>
          </li>
        ))}
      </ul>
    </div>

    {/* Success Story Box - automatically stays at bottom or aligns if content is less */}
    <div className="mt-6 bg-[#fef9c3] p-5 rounded-xl border-l-4 border-yellow-500 text-gray-800 shadow-lg">
      <p className="text-[16px] md:text-[17px] leading-relaxed italic">
        <span className="font-extrabold text-[#2a719f] not-italic">Success Story:</span> Faatiha Aayat completed this course in 2023, which greatly helped her gain opportunities to speak at the United Nations on various issues. Mentioning this course in your CV/resume/portfolio will undoubtedly give you an advantage over others.
      </p>
    </div>
  </div>
</div>

        {/* Bottom Grid: Cards */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  md:p-8">
      <FeatureCard 
        tag="SDG" 
        tagColor="bg-[#6366f1]" // Indigo-ish
        title="Fellowship Support" 
        desc="Support for applying to the SDG Fellowship during overseas university admission."
        icon={<FaHandshakeAngle className="text-[#6366f1]" />}
        delay={0.1}
      />
      <FeatureCard 
        tag="SDG" 
        tagColor="bg-[#a855f7]" // Purple
        title="Summit Participation" 
        desc="Recommendation for participation in the SDG Summit at the United Nations every year."
        icon={<FaUsersViewfinder className="text-[#a855f7]" />}
        delay={0.1}
      />
      <FeatureCard 
        tag="National" 
        tagColor="bg-[#ef4444]" // Red
        title="Zero Olympiad Envoy" 
        desc="Inclusion of National Zero Olympiad Envoys in Zero Olympiad Clubs nationwide."
        icon={<FaAward className="text-[#ef4444]" />}
        delay={0.1}
      />
      <FeatureCard 
        tag="UN" 
        tagColor="bg-[#f97316]" // Orange
        title="Certificate Course" 
        desc="Register for UN-accredited courses via Zero Olympiad for free online learning."
        icon={<FaGraduationCap className="text-[#f97316]" />}
        delay={0.1}
      />
      <FeatureCard 
        tag="Case Study" 
        tagColor="bg-[#22c55e]" // Green
        title="Debate & Public Speaking" 
        desc="Case Study Competition, Debate, and Public Speaking events for idea presentation."
        icon={<FaMicrophoneLines className="text-[#22c55e]" />}
        delay={0.1}
      />
      <FeatureCard 
        tag="Workshops" 
        tagColor="bg-[#0369a1]" // Blue
        title="Seminars & Project Implementation" 
        desc="Special skill development workshops, seminars, and funding opportunities for projects."
        icon={<FaLightbulb className="text-[#0369a1]" />}
        delay={0.1}
      />
    </div>
      </div>
    </section>
  );
};

// Card Component for clean code
// Pixel Perfect Card Component
const FeatureCard = ({ tag, tagColor, title, desc, icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: delay }}
    whileHover={{ 
      y: -10, 
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" 
    }}
    className="bg-[#f8fbff] rounded-[20px] p-10 shadow-sm border border-white/50 flex flex-col justify-between min-h-[320px] relative overflow-hidden group"
  >
    {/* Background subtle glow effect on hover */}
    <div className={`absolute -right-10 -bottom-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${tagColor}`}></div>

    <div>
      {/* Tag Style */}
      <span className={`${tagColor} text-white text-[14px] font-semibold px-5 py-1.5 rounded-full inline-block mb-6`}>
        {tag}
      </span>
      
      {/* Title */}
      <h4 className="text-[#000000] font-bold text-[24px] leading-tight mb-4">
        {title}
      </h4>
      
      {/* Description */}
      <p className="text-[#4b5563] text-[16px] leading-[1.6] font-medium max-w-[90%]">
        {desc}
      </p>
    </div>

    {/* Icon Section - Positioned exactly like the image */}
    <div className="flex justify-end items-end mt-4">
      <div className="text-6xl transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 ease-out opacity-80 group-hover:opacity-100">
        {icon}
      </div>
    </div>
  </motion.div>
);

export default ParticipationSection;