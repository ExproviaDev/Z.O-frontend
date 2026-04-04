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
  { name: "Innovation Hub", logo: "https://res.cloudinary.com/dsga4gyw9/image/upload/q_auto/f_auto/v1775294134/IMG_6539.JPG_gfckc0.jpg" },
  { name: "IMSEN Bangladesh", logo: "https://res.cloudinary.com/dsga4gyw9/image/upload/q_auto/f_auto/v1775294133/IMSEN_gu1vus.jpg" },
  { name: "Chorcha", logo: "https://res.cloudinary.com/dsga4gyw9/image/upload/q_auto/f_auto/v1775294133/Chorcha_eb4nvt.png" },
];

const Supporters = () => {
  return (
    <section className="relative w-full py-10 md:py-20 px-4 flex flex-col items-center justify-center bg-gray-50">
      <div className="relative z-10 max-w-7xl w-full mx-auto text-center">
        
        {/* Badge */}
        <div className="inline-block bg-[#f1652210] text-[#f16522] text-xs font-bold px-4 py-1 rounded-full mb-4 border border-[#f1652230]">
          Trusted By
        </div>

        {/* Header Text */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 px-5 leading-tight">
            Our Valued Partners & Supporters{" "}
            <span className="text-[#f16522]">(Season One)</span>
          </h2>
          <p className="text-gray-600 font-medium text-sm md:text-lg max-w-3xl mx-auto leading-relaxed opacity-90">
            Proudly supported by leading organizations who believe in youth
            leadership, innovation, and global impact.
          </p>
        </div>

        {/* Circular Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10 items-center justify-center px-4">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="group relative flex items-center justify-center p-3 rounded-full aspect-square bg-white border border-gray-100 shadow-sm hover:border-[#f1652230] hover:shadow-lg transition-all duration-500 ease-out"
            >
              {/* Logo Container with Safe Padding */}
              <div className="relative w-4/5 h-4/5 flex items-center justify-center transition-all duration-500 grayscale group-hover:grayscale-0">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain p-1" // subtle padding to avoid edge touch
                />
              </div>
              
              {/* Smooth Animated Tooltip */}
              <div className="absolute -bottom-2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 transition-all duration-500 ease-in-out pointer-events-none z-20">
                <div className="bg-gray-900 text-white text-[10px] md:text-[11px] px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                  {partner.name}
                </div>
                <div className="w-2.5 h-2.5 bg-gray-900 rotate-45 absolute left-1/2 -translate-x-1/2 -top-1.5 z-10 rounded-sm" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Supporters;