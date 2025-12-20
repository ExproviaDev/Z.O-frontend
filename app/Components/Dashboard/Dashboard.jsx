"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { FaIdCard, FaTrophy, FaGraduationCap } from "react-icons/fa";

// Ensure the path to your logo is correct
import SiteLogo from "../../../public/src/SiteLogo.png";

const Dashboard = () => {
  const authState = useSelector((state) => state.user);
  const { user = null } = authState || {};

  return (
    <section className="relative min-h-[500px] lg:min-h-[600px] overflow-hidden bg-[#f8fafc]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[450px] lg:h-[500px] bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative container mx-auto px-4 pt-16 lg:pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Glassmorphism Hero Card */}
          <div className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] lg:rounded-[3rem] shadow-2xl transition-all duration-500 hover:shadow-purple-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-emerald-500/80 z-0"></div>

            <div className="relative z-10 p-8 lg:p-16 flex flex-col lg:flex-row justify-between items-center gap-12">
              {/* Left Side: Profile & Information */}
              <div className="flex-1 text-center lg:text-left text-white space-y-8">
                <div className="space-y-2">
                  <h2 className="inline-block px-4 py-1 rounded-full bg-white/20 text-xs md:text-sm font-medium tracking-widest uppercase backdrop-blur-sm border border-white/10">
                    Looking Forward to learning
                  </h2>
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-tight">
                    Zero Olympiad
                  </h1>
                  <p className="text-lg md:text-xl font-light italic opacity-90">
                    "Reducing To Zero, Rising As Hero"
                  </p>
                </div>

                {/* Profile Detail Card */}
                <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl bg-black/10 backdrop-blur-md border border-white/5 shadow-inner">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
                    <Image
                      src={
                        user?.profile_image_url ||
                        "https://images.unsplash.com/photo-1517841905240-472988babdf9"
                      }
                      width={180}
                      height={180}
                      alt="User Profile"
                      className="relative rounded-full border-4 border-white w-28 h-28 lg:w-40 lg:h-40 object-cover shadow-2xl"
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-wide">
                      {user?.name || "Faati Haaayat"}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base">
                      <div className="flex items-center gap-2 opacity-90">
                        <FaIdCard className="text-yellow-400" />
                        <span className="font-medium text-gray-100">
                          ID: {user?.student_id || "ZO2025-12345"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 opacity-90">
                        <FaTrophy className="text-yellow-400" />
                        <span className="font-medium text-gray-100">
                          Rank: #{user?.rank || "0"}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-yellow-400 text-gray-900 font-bold text-sm shadow-lg transform hover:scale-105 transition-transform cursor-default">
                        <FaGraduationCap size={18} />
                        {user?.category || "Junior Category"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Site Logo with Circular Rotation Animation */}
              <div className="flex-shrink-0 relative group">
                <div className="absolute -inset-4 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition duration-700"></div>

                <div
                  style={{
                    animation: "rotateCircular 8s linear infinite",
                  }}
                  className="relative"
                >
                  <Image
                    src={SiteLogo}
                    width={300}
                    height={300}
                    alt="Site Logo"
                    className="w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Circular Rotation Animation Keyframes */}
      <style>{`
        @keyframes rotateCircular {
          from {
            transform: rotate(0deg) translateX(15px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(15px) rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default Dashboard;
