"use client";
import { useSelector } from "react-redux";
import {
  FaRegEdit,
  FaUserCircle,
  FaGraduationCap,
  FaAward,
  FaGlobeAmericas, // SDG এর জন্য গ্লোব আইকন
  FaHashtag, // Number এর জন্য হ্যাশট্যাগ আইকন
  FaTrophy, // Round এর জন্য ট্রফি আইকন
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Loading from "../../admin/components/loadign"; // আপনার বানান ঠিক থাকলে এটাই রাখুন

const ProfilePage = () => {
  const authState = useSelector((state) => state.user);
  const loading = authState?.loading;
  const user = useSelector((state) => state.auth.user);

  if (loading) return <Loading></Loading>;
  // SDG Data Mapping
  const sdgData = {
    1: { title: "No Poverty", desc: "Zero Poverty" },
    2: { title: "Zero Hunger", desc: "Zero Hunger" },
    3: { title: "Good Health and Well-being", desc: "Zero Illness" },
    4: { title: "Quality Education", desc: "Zero Illiteracy" },
    5: { title: "Gender Equality", desc: "Zero Gender Inequality" },
    6: { title: "Clean Water and Sanitation", desc: "Zero Water Scarcity" },
    7: { title: "Affordable and Clean Energy", desc: "Zero Energy Inaccessibility" },
    8: { title: "Decent Work and Economic Growth", desc: "Zero Economic Inequality" },
    9: { title: "Industry, Innovation and Infrastructure", desc: "Zero Unfair Industrial Practices" },
    10: { title: "Reduced Inequality", desc: "Zero Inequality" },
    11: { title: "Sustainable Cities and Communities", desc: "Zero Unsafe Cities" },
    12: { title: "Responsible Consumption and Production", desc: "Zero Unaccountable Consumption" },
    13: { title: "Climate Action", desc: "Zero Environmental Degradation" },
    14: { title: "Life Below Water", desc: "Zero Ocean Pollution" },
    15: { title: "Life on Land", desc: "Zero Land Contamination" },
    16: { title: "Peace and Justice Strong Institutions", desc: "Zero Injustice" },
    17: { title: "Partnerships to achieve the Goal", desc: "Zero Partnership Gaps" },
  };

  if (!user)
    return (
      <div className="p-10 text-center text-red-500 font-medium">
        No profile data found. Please login again.
      </div>
    );

  return (
    <main className="p-4 lg:p-10 bg-[#F8FAFC] min-h-screen">
      <div className="max-full mx-auto space-y-6">

        {/* Top Header Card */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              {user.profile_image_url ? (
                <Image
                  src={user.profile_image_url}
                  alt="Profile"
                  width={300}
                  height={300}
                  className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-full border-4 border-indigo-50 shadow-sm"
                />
              ) : (
                <div className="flex w-24 h-24 md:w-28 md:h-28 items-center justify-center bg-slate-100 rounded-full text-slate-300">
                  <FaUserCircle size={80} />
                </div>
              )}
              {/* Role Badge over image */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border-2 border-white shadow-sm">
                {user.role || "Participant"}
              </div>
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">{user.name}</h1>
              <p className="text-slate-500 font-medium mt-1">
                {user.email}
              </p>
            </div>
          </div>

          <Link prefetch={false} href="/dashboard/profile/edit">
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 transition-all font-bold shadow-md hover:shadow-lg active:scale-95">
              <FaRegEdit /> Edit Profile
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Details Section */}
          <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <FaUserCircle size={20} />
              </div>
              <h2 className="font-bold text-xl text-slate-800">Personal Info</h2>
            </div>
            <div className="space-y-4">
              <ProfileItem label="Phone Number" value={user.phone} />
              <ProfileItem label="District" value={user.district} />
            </div>
          </section>

          {/* Academic Background Section */}
          <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <FaGraduationCap size={20} />
              </div>
              <h2 className="font-bold text-xl text-slate-800">Academic Details</h2>
            </div>
            <div className="space-y-4">
              <ProfileItem label="Institution" value={user.institution} />
              <ProfileItem label="Education Type" value={user.education_type} />
              <ProfileItem label="Grade Level" value={user.grade_level} />
            </div>
          </section>

          {/* Participation & Role Section (Redesigned with Badges) */}
          <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                <FaAward size={20} />
              </div>
              <h2 className="font-bold text-xl text-slate-800">Contest Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* SDG Role Badge */}
              <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl text-center hover:shadow-md transition-shadow">
                <div className="text-indigo-500 mb-2">
                  <FaGlobeAmericas size={28} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Assigned Role</span>
                <span className="text-lg font-black text-indigo-900 capitalize">
                  {user.sdg_role || "Pending"}
                </span>
              </div>
              {/* ✅ কন্ডিশনাল SDG ইনফরমেশন কার্ড */}
              {user.assigned_sdg_number && sdgData[user.assigned_sdg_number] && (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 p-6 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                    <span className="text-9xl font-black text-emerald-600">
                      {user.assigned_sdg_number}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">
                      Your Assigned Topic (SDG Goal)
                    </h3>
                    <h2 className="text-2xl font-black text-slate-800 mb-3">
                      SDG {user.assigned_sdg_number}: {sdgData[user.assigned_sdg_number].title}
                    </h2>
                    <p className="text-slate-600 font-medium leading-relaxed max-w-3xl">
                      {sdgData[user.assigned_sdg_number].desc}
                    </p>
                  </div>
                </div>
              )}

              {/* Round Type Badge */}
              {/* <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-2xl text-center hover:shadow-md transition-shadow">
                <div className="text-orange-500 mb-2">
                  <FaTrophy size={28} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Round</span>
                <span className="text-lg font-black text-orange-900 uppercase">
                  {user.round_type || "Round 1"}
                
                </span>
              </div> */}
              {/* Round Type Badge */}
              <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-2xl text-center hover:shadow-md transition-shadow">
                <div className="text-orange-500 mb-2">
                  <FaTrophy size={28} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Round</span>
                <span className="text-lg font-black text-orange-900 capitalize">
                  {user.round_type
                    ? user.round_type.replace(/initial\s+/i, "")
                    : "Preliminary"}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

// Simple Profile Item Component
const ProfileItem = ({ label, value }) => (
  <div className="flex flex-col pb-3 border-b border-slate-50 last:border-0 last:pb-0">
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
      {label}
    </span>
    <span className="text-slate-700 font-medium">{value || "Not Provided"}</span>
  </div>
);

export default ProfilePage;