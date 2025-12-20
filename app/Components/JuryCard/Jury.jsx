"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

export default function JurySection() {
  // আপনার লোকাল ইমেজের পাথ অনুযায়ী ডাটা আপডেট করা হয়েছে
  const juryData = [
    { name: "Heidi Solba", role: "Head of global Dev\nLet's Do It World", image: "/src/jury/img1.jpg" },
    { name: "Yousef Ramada", role: "Palestine Ambassador", image: "/src/jury/img2.jpg" },
    { name: "Shykh Seraj", role: "Journalist, Agriculture Activist", image: "/src/jury/img3.jpg" },
    { name: "Md Sabur Khan", role: "Founder & Chairman, DIU", image: "/src/jury/img4.jpg" },
    { name: "Syed Farhad Ahmed", role: "Honorary Consul of Estonia", image: "/src/jury/img5.jpeg" },
    { name: "Saifur Rahman", role: "Founder of S@ifur's", image: "/src/jury/img6.webp" },
    { name: "Rumana Rashid Ishita", role: "Television. Artist", image: "/src/jury/img7.jpg" },
    { name: "Sadat Rahman", role: "Int'l Peace Prize Winner", image: "/src/jury/img8.jpg" },
    { name: "RJ Kebria", role: "Media Personality", image: "/src/jury/img9.webp" },
  ];

  return (
    <section className="relative w-full py-16 px-4 md:py-24 overflow-hidden">
      {/* Background Section */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/src/gallery/img1.jpg" 
          alt="Background" 
          fill 
          className="object-cover" 
          priority
        />
        <div className="absolute inset-0 bg-[#2b1b66]/90 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-[44px] font-bold text-white mb-4 tracking-tight">
            Confirmed Guest & Jury
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-base md:text-lg font-light leading-relaxed">
            Distinguished academics and professionals who guide and evaluate our participants
          </p>
        </div>

        {/* Desktop View: Grid Layout (Pixel Perfect) */}
        <div className="hidden lg:flex flex-wrap justify-center gap-5">
          {juryData.map((jury, index) => (
            <div 
              key={index} 
              className={`${
                index < 4 ? 'w-[calc(25%-1.25rem)]' : 'w-[calc(20%-1.25rem)]'
              } min-w-[220px]`}
            >
              <Card jury={jury} />
            </div>
          ))}
        </div>

        {/* Mobile/Tablet View: Swiper Slider */}
        <div className="lg:hidden">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={true}
            breakpoints={{
              640: { slidesPerView: 2, centeredSlides: false },
              768: { slidesPerView: 2.5 },
            }}
          >
            {juryData.map((jury, index) => (
              <SwiperSlide key={index}>
                <Card jury={jury} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

function Card({ jury }) {
  return (
    <div className="bg-white rounded-[18px] p-6 h-full flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
      {/* Image Container with Pink Dashed Border */}
      <div className="relative w-24 h-24 mb-5 flex items-center justify-center">
        {/* Animated Dashed Border */}
        <div className="absolute inset-0 rounded-full  border-dashed border-pink-600 border-4 group-hover:rotate-45 transition-transform duration-700" />
        
        {/* Profile Image */}
        <div className="relative w-[82%] h-[82%] rounded-full overflow-hidden border-2 border-white shadow-inner">
          <Image 
            src={jury.image} 
            alt={jury.name} 
            fill 
            className="object-cover"
          />
        </div>
      </div>

      <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-1 leading-tight">
        {jury.name}
      </h3>
      <p className="text-[12px] text-gray-500 font-medium whitespace-pre-line leading-snug">
        {jury.role}
      </p>
    </div>
  );
}