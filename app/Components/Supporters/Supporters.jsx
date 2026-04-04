import Image from "next/image";

const partners = [
  { name: "YOUReach", logo: "https://res.cloudinary.com/dsga4gyw9/image/upload/q_auto/f_auto/v1775294134/Logo_with_bg.jpg_grshty.jpg" },
  { name: "Faatiha Aayat Academy", logo: "https://res.cloudinary.com/dsga4gyw9/image/upload/q_auto/f_auto/v1775295723/high_resolution_hwwc5o.jpg" },
  { name: "MFH Science Club Olympiad 2023", logo: "https://res.cloudinary.com/dsga4gyw9/image/upload/q_auto/f_auto/v1775294133/Matrh_jmmuoa.jpg" },
  { name: "MFH Olympiad", logo: "https://res.cloudinary.com/dsga4gyw9/image/upload/q_auto/f_auto/v1775294134/mojaru_d6sgxv.jpg" },
  { name: "Neel Hawa", logo: "https://res.cloudinary.com/dsga4gyw9/image/upload/q_auto/f_auto/v1775294134/Neel_Hawa_j1cmcd.jpg" },
  { name: "Pathao", logo: "https://res.cloudinary.com/dsga4gyw9/image/upload/q_auto/f_auto/v1775294134/Pathao_n805zn.webp" },
  { name: "Probably Physical Education Bangladesh", logo: "https://res.cloudinary.com/dsga4gyw9/image/upload/q_auto/f_auto/v1775294132/PE_BangladeshHoriz_raznbn.png" },
  { name: "Polytechnic Notice", logo: "https://res.cloudinary.com/dsga4gyw9/image/upload/q_auto/f_auto/v1775294132/PN_Logo_kgfq1n.png" },
  { name: "RS Apparels", logo: "https://res.cloudinary.com/dsga4gyw9/image/upload/q_auto/f_auto/v1775294132/RS_Apparels_f1jcd8.jpg" },
  { name: "Sanrin Gakkou", logo: "https://res.cloudinary.com/dsga4gyw9/image/upload/q_auto/f_auto/v1775294132/Sanrin_k7ar8y.png" },
  { name: "10 Minute School", logo: "https://res.cloudinary.com/dsga4gyw9/image/upload/q_auto/f_auto/v1775294132/10_MS_pymx1c.png" },
  { name: "Creative IT Institute", logo: "https://res.cloudinary.com/dsga4gyw9/image/upload/q_auto/f_auto/v1775294133/Copy_of_CIT_Logo_gotdoi.png" },
  { name: "Frame Box", logo: "https://res.cloudinary.com/dsga4gyw9/image/upload/q_auto/f_auto/v1775294133/Frame_BOx_yqm4vz.jpg" },
  { name: "IAAS Bangladesh", logo: "https://res.cloudinary.com/dsga4gyw9/image/upload/q_auto/f_auto/v1775294133/IAAS_Bangladesh_SAU-Dhaka_logo_jyzfnx.png" },
  { name: "IMSEN Bangladesh", logo: "https://res.cloudinary.com/dsga4gyw9/image/upload/q_auto/f_auto/v1775294133/IMSEN_gu1vus.jpg" },
  { name: "Chorcha", logo: "https://res.cloudinary.com/dsga4gyw9/image/upload/q_auto/f_auto/v1775294133/Chorcha_eb4nvt.png" },
  { name: "Zero Olympiad", logo: "https://res.cloudinary.com/dsga4gyw9/image/upload/q_auto/f_auto/v1775294134/IMG_6539.JPG_gfckc0.jpg" },
];

const Supporters = () => {
  return (
    <section className="relative w-full py-10 md:py-16 px-4  bg-gray-50">
      <div className="max-w-6xl mx-auto text-center px-5">
        
        {/* Badge */}
        <div className="inline-block bg-[#f1652210] text-[#f16522] text-[10px] font-bold px-3 py-1 rounded-full mb-4 border border-[#f1652220] uppercase tracking-wider">
          Trusted By
        </div>

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Our Valued Partners & Supporters <span className="text-[#f16522]">(Season One)</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
            Supported by leading organizations globally.
          </p>
        </div>

        {/* 3-Row Logo Grid (on Desktop) */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-8 justify-items-center">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="group relative flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Initial: Color | Hover: B&W */}
              <div className="relative  w-3/4 h-3/4 grayscale-0 group-hover:grayscale transition-all duration-500">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              
              {/* Tooltip */}
              <div className="absolute -bottom-1 translate-y-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 pointer-events-none z-20">
                <div className="bg-gray-900 text-white text-[9px] px-2 py-1 rounded whitespace-nowrap">
                  {partner.name}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Supporters;