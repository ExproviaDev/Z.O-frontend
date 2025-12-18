"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";

export default function JurySection({ animatedSections }) {
  const juryData = [
    { name: "Heidi Solba", role: "Head of global Dev\nLet's Do It World", image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop", width: "lg:w-[23%]" },
    { name: "Yousef Ramada", role: "Palestine Ambassador", image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop", width: "lg:w-[23%]" },
    { name: "Shykh Seraj", role: "Journalist, Agriculture Activist", image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop", width: "lg:w-[23%]" },
    { name: "Md Sabur Khan", role: "Founder & Chairman, DIU", image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop", width: "lg:w-[23%]" },
    { name: "Syed Farhad Ahmed", role: "Honorary Consul of Estonia", image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop", width: "lg:w-[18%]" },
    { name: "Saifur Rahman", role: "Founder of S@ifur's", image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop", width: "lg:w-[18%]" },
    { name: "Rumana Rashid Ishita", role: "Television Artist", image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop", width: "lg:w-[18%]" },
    { name: "Sadat Rahman", role: "Int'l Peace Prize Winner", image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop", width: "lg:w-[18%]" },
    { name: "RJ Kebria", role: "Media Personality", image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop", width: "lg:w-[18%]" },
  ];

  return (
    <section className="relative w-full py-20 px-5 bg-[#2b1b668f] overflow-hidden">
      {/* Background */}
      <Image src="/src/UNDP.jpg" alt="Jury Background" fill className="object-cover opacity-20" />
      <div className="absolute inset-0 bg-[#2b1b66]/80" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-[40px] font-bold text-white mb-4">
            Confirmed Guest & Jury
          </h2>
          <p className="text-gray-200 max-w-3xl mx-auto text-[18px] md:text-lg font-light">
            Distinguished academics and professionals who guide and evaluate our participants
          </p>
        </div>

        {/* 🔹 MOBILE / TABLET → SLIDER */}
        <div className="relative  lg:hidden">
          {/* Custom Arrows */}
          <button className="jury-prev absolute left-[-10px] top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-pink-700 text-white font-bold shadow  flex items-center justify-center">
            ‹
          </button>
          <button className="jury-next absolute right-[-10px] top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-pink-700 text-white font-bold shadow flex items-center justify-center">
            ›
          </button>

          <Swiper
            modules={[Navigation]}
            spaceBetween={26}
            slidesPerView={1.1}
            navigation={{
              prevEl: ".jury-prev",
              nextEl: ".jury-next",
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 2.5 },
            }}
          >
            {juryData.map((jury, index) => (
              <SwiperSlide key={index}>
                <Card jury={jury} animatedSections={animatedSections} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 🔹 DESKTOP */}
        <div className="hidden lg:flex flex-wrap justify-center gap-6">
          {juryData.map((jury, index) => (
            <div key={index} className={`w-full  sm:w-[calc(50%-1.5rem)] ${jury.width}`}>
              <Card jury={jury} animatedSections={animatedSections} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Card */
function Card({ jury, animatedSections, index }) {
  return (
    <div className="bg-white rounded-[20px] p-6 text-center hover:-translate-y-2 hover:shadow-2xl transition">
      <div className="relative w-24 h-24 mb-4 p-1 rounded-full border-[3px] border-dashed border-[#e91e63]">
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <Image src={jury.image} alt={jury.name} fill className="object-cover" unoptimized />
        </div>
      </div>

      <h3 className="text-lg font-extrabold text-[#1a1a1a] mb-1">{jury.name}</h3>
      <p className="text-[12px] text-gray-500 whitespace-pre-line">{jury.role}</p>
    </div>
  );
}
