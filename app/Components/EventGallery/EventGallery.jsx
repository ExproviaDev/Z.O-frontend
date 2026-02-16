import Image from "next/image";
import Link from "next/link";

const Gallery = () => {
  const images = [
    "https://i.ibb.co/sdvWdXSs/IMG-9129.jpg",
    "https://i.ibb.co/Q3kMchp6/IMG-9067.jpg",
    "https://i.ibb.co/mV1pf4pM/IMG-9048.jpg",
    "https://i.ibb.co/tphqNcJm/IMG-9036.jpg",
    "https://i.ibb.co/bj5JhYxB/IMG-8998.jpg",
    "https://i.ibb.co/9mpTFNPq/IMG-8990.jpg",
  ];

  return (
    <section
      className="relative py-24 px-4 min-h-screen overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/99HFrKfK/speaker-bg.png')",
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-4 pb-12">
          <h2 className="md:text-5xl text-4xl font-bold text-gray-800">
            Gallery <span className="text-Primary">(Season One)</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 font-medium italic">
            Capturing the memorable moments of our journey.
          </p>
        </div>

        {/* Static Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white/50 shadow-2xl transition-all duration-500 hover:scale-[1.03]"
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link prefetch={false} href={"/gallery"}>
            <button className="bg-Primary cursor-pointer hover:bg-[#d9561a] text-white font-bold py-3 px-10 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              View More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;