"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

export default function JurySection() {
  // আপনার লোকাল ইমেজের পাথ অনুযায়ী ডাটা আপডেট করা হয়েছে
  const juryData = [
    { name: "Heidi Solba", role: "Head of global Dev\nLet's Do It World", image: "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766412286/img1_cxu00j.jpg" },
    { name: "Yousef Ramada", role: "Palestine Ambassador", image: "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766412449/img2_ail852.webp" },
    { name: "Shykh Seraj", role: "Journalist, Agriculture Activist", image: "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766412287/img3_sffg2u.jpg" },
    { name: "Md Sabur Khan", role: "Founder & Chairman, DIU", image: "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766412287/img4_ffoum4.jpg" },
    { name: "Syed Farhad Ahmed", role: "Honorary Consul of Estonia", image: "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766412288/img5_dvxbhk.jpg" },
    { name: "Saifur Rahman", role: "Founder of S@ifur's", image: "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766412254/images_1_raneax.jpg" },
    { name: "Rumana Rashid Ishita", role: "Television. Artist", image: "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766412288/img7_zhlssm.jpg" },
    { name: "Sadat Rahman", role: "Int'l Peace Prize Winner", image: "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766412290/img8_pgfqds.jpg" },
    { name: "RJ Kebria", role: "Media Personality", image: "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766412253/download_hwzpve.jpg" },
  ];

  return (
    <section className="relative w-full py-16 p-5 px-4 md:py-24 overflow-hidden">
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
        <div className="lg:hidden ">
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
    <div className="bg-white mt-3  hover:bg-white/15 hover:-translate-y-2 group shadow-2xl hover:text-white rounded-[18px] p-6 h-full flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
      {/* Image Container with Pink Dashed Border */}
      <div className="relative w-24  h-24 mb-5 flex items-center justify-center">
        {/* Animated Dashed Border */}
        <div className="absolute inset-0 rounded-full   border-dashed border-pink-600 border-4 group-hover:border-blue-400 amber-400 group-hover:rotate-45 transition-transform duration-700" />
        
        {/* Profile Image */}
        <div className="relative w-[82%]  h-[82%] rounded-full overflow-hidden border-2 border-white shadow-inner">
          <Image 
            src={jury.image} 
            alt={jury.name} 
            fill 
            className="object-cover"
          />
        </div>
      </div>

      <h3 className="text-[18px] font-bold   mb-1 leading-tight">
        {jury.name}
      </h3>
      <p className="text-[12px]  font-medium whitespace-pre-line leading-snug">
        {jury.role}
      </p>
    </div>
  );
}