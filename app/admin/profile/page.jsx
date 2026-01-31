"use client";
import { useSelector } from "react-redux";
import { 
  FaRegEdit, FaUserShield, FaEnvelope, 
  FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle 
} from "react-icons/fa";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";

const AdminProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <div className="p-10 text-center text-red-500 font-bold">Data loading...</div>;

  return (
    <main className="min-h-screen bg-[#f8fafc] py-12 px-4 lg:px-0">
      <div className="max-w-full mx-auto">
        
        {/* Top Profile Card */}
        <div className="relative bg-white rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden border border-gray-100 mb-8">
          {/* Decorative Background Header */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 w-full"></div>
          
          <div className="px-8 pb-8">
            <div className="relative flex flex-col md:flex-row items-end -mt-12 gap-6">
              {/* Profile Image with Glow */}
              <div className="relative group">
                <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-lg bg-white">
                  {user.profile_image_url ? (
                    <Image
                      src={user.profile_image_url}
                      alt="Profile"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                      <FaUserShield size={50} />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 p-1.5 rounded-full border-4 border-white">
                  <FaCheckCircle className="text-white text-xs" />
                </div>
              </div>

              {/* Name and Role */}
              <div className="flex-1 mb-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h1 className="text-3xl font-extrabold text-gray-900">{user.name}</h1>
                  <HiOutlineBadgeCheck className="text-blue-500 text-2xl" />
                </div>
                <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2 mt-1">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {user.role === 'manager' ? 'Official Jury' : 'System Admin'}
                  </span>
                </p>
              </div>

              {/* Action Button */}
              <div className="mb-2">
                <Link href="/admin/profile/edit">
                  <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 font-bold shadow-sm active:scale-95">
                    <FaRegEdit />
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Contact Info */}
          <div className="md:col-span-2 space-y-6">
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <InfoBlock icon={<FaEnvelope />} label="Email Address" value={user.email} color="text-blue-500" />
                <InfoBlock icon={<FaPhoneAlt />} label="Contact Number" value={user.phone} color="text-green-500" />
              </div>
            </section>
          </div>

          {/* Right Column: Status Card */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
               <div className="relative z-10">
                  <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-1">Status</p>
                  <h4 className="text-xl font-bold mb-4">Account Verified</h4>
                  <div className="w-full bg-white/10 h-2 rounded-full mb-4">
                    <div className="bg-blue-400 h-full rounded-full w-[100%] shadow-[0_0_10px_#60a5fa]"></div>
                  </div>
                  <p className="text-sm text-blue-100 leading-relaxed italic">
                    You have full access to {user.role === 'admin' ? 'administrative controls' : 'evaluation tools'}.
                  </p>
               </div>
               <FaUserShield className="absolute -bottom-4 -right-4 text-white/5 text-9xl" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

// Reusable Info Block Component
const InfoBlock = ({ icon, label, value, color }) => (
  <div className="flex items-start gap-4">
    <div className={`p-3 rounded-2xl bg-gray-50 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-gray-900 font-bold break-all">{value || "Not Provided"}</p>
    </div>
  </div>
);

export default AdminProfilePage;