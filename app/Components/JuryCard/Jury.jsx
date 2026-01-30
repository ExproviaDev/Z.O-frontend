


"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

export default function JurySection() {
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

  const bgImag = "https://i.ibb.co.com/SwrHNnwd/IMG-8818.jpg"

  return (
    <section className="relative w-full py-16 px-4 md:py-24 overflow-hidden font-sans">

      <div className="absolute inset-0 z-0">
      
 
        <div className="absolute inset-0 bg-[#1F4A65]/90 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
   
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-[44px] font-bold text-white mb-4 tracking-tight">
            Confirmed Guest & Jury (Session One)
          </h2>
          <p className="text-gray-200 max-w-3xl mx-auto text-base md:text-lg font-light leading-relaxed opacity-90">
            Distinguished academics and professionals who guide and evaluate our participants
          </p>
        </div>

        
        <div className="hidden lg:flex flex-col gap-8">

          <div className="grid grid-cols-4 gap-6">
            {juryData.slice(0, 4).map((jury, index) => (
              <Card key={index} jury={jury} />
            ))}
          </div>

          <div className="grid grid-cols-5 gap-6 px-10">
            {juryData.slice(4).map((jury, index) => (
              <Card key={index + 4} jury={jury} />
            ))}
          </div>
        </div>


        <div className="hidden md:grid lg:hidden grid-cols-3 gap-6">
          {juryData.map((jury, index) => (
            <Card key={index} jury={jury} />
          ))}
        </div>


        <div className="md:hidden">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={true}
            loop={true}
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
    <div className="bg-white rounded-[20px] p-8 flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-500 hover:-translate-y-3 group h-full">
      

      <div className="relative w-28 h-28 mb-6 flex items-center justify-center">

        <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-[#1F4A65] opacity-70 group-hover:rotate-90 transition-transform duration-1000" />
        

        <div className="relative w-[84%] h-[84%] rounded-full overflow-hidden border-2 border-white shadow-md">
          <Image 
            src={jury.image} 
            alt={jury.name} 
            fill 
            className="object-cover"
          />
        </div>
      </div>

 
      <h3 className="text-[#0a2540] text-xl font-bold mb-2 leading-tight">
        {jury.name}
      </h3>
      

      <p className="text-gray-500 text-sm font-medium leading-snug whitespace-pre-line">
        {jury.role}
      </p>
    </div>
  );
}

