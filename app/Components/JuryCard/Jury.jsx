import Image from "next/image";

const JurySection = () => {
  const juryMembers = [
    {
      id: 1,
      name: "SHAMSA ARA DOLLY",
      title: "Chairperson, S@ifur's Pvt. Ltd.",
      image: "/src/image/SHAMSA-ARA-DOLLY.jfif",
    },
    {
      id: 2,
      name: "RATHINDRA NATH DAS",
      title: "ED, Daffodil International Professional Training Institute",
      image: "/src/image/ED-Sir-Updated_drogq8.webp",
    },
    {
      id: 3,
      name: "RUMANA RASHID ISHITA",
      title: "Cultural Personality",
      image: "/src/image/RUMANA-RASHID-ISHITA.jpg",
    },
    {
      id: 4,
      name: "SADAT RAHMAN",
      title: "Int'l Children Peace Prize Winner",
      image: "/src/image/SADAT-RAHMAN.jfif",
    },
    {
      id: 5,
      name: "SYED FARHAD AHMED",
      title: "Honorary Consul of Estonia",
      image: "/src/image/SYED-FARHAD-AHMED.jfif",
    },
    {
      id: 6,
      name: "HEIDI SOLBA",
      title: "Head of Global Development, Let's Do It World",
      image: "/src/image/HEIDI-SOLBA.jpg",
    },
    {
      id: 7,
      name: "MD MANSURUL HAQUE",
      title: "UN Disaster Risk Reduction Fellow",
      image: "/src/image/MD-MANSURUL-HAQUE.jpeg",
    },
    {
      id: 8,
      name: "AMAAN SULAIMAN",
      title: "CEO, English Olympiad",
      image: "/src/image/AMAAN-SULAIMAN.jfif",
    },
    {
      id: 9,
      name: "MITALI DAS",
      title: "Country Director, Pure Earth Bangladesh",
      image: "/src/image/MITALI-DAS.webp",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#013551] relative overflow-hidden">
     
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundSize: "30px 30px",
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1.5px)",
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white font-bold tracking-tight mb-4">
            Respected Jury Board <span className="text-[#F97316]">(Season One)</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-medium">
            Distinguished academics and professionals who guide and evaluate our participants
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {juryMembers.map((member) => (
            <div
              key={member.id}
              className="group bg-white p-8 rounded-[2.5rem] shadow-2xl transition-all duration-500 text-center flex flex-col items-center border border-white/10 hover:-translate-y-2"
            >
           
              <div className="relative w-44 h-44 mb-6">
                <div
                  className="absolute inset-0 rounded-full transition-transform duration-700 ease-in-out group-hover:rotate-45"
                  style={{
                    padding: "4px",
                    background: `repeating-conic-gradient(
                      #F97316 0deg 15deg, 
                      transparent 15deg 25deg, 
                      #266D9A 25deg 40deg, 
                      transparent 40deg 50deg
                    )`,
                    WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #fff 0)",
                    mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #fff 0)",
                  }}
                ></div>

                <div className="relative w-full h-full p-3">
                  <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-gray-100 bg-slate-50 shadow-inner">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="176px"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight group-hover:text-[#F97316] transition-colors duration-300">
                  {member.name}
                </h3>
                <div className="w-10 h-1 bg-gradient-to-r from-[#F97316] to-[#266D9A] my-3 rounded-full group-hover:w-20 transition-all duration-500"></div>
                <p className="text-slate-600 text-xs md:text-sm font-bold leading-relaxed max-w-[240px]">
                  {member.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JurySection;