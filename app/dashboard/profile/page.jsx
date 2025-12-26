"use client";
import { useSelector } from "react-redux";
import {
  FaRegEdit,
  FaUserCircle,
  FaGraduationCap,
  FaAward,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const ProfilePage = () => {
  const authState = useSelector((state) => state.user);
  const loading = authState?.loading;
  const user = useSelector((state) => state.auth.user);
  if (loading)
    return <div className="p-10 text-center">Loading Profile...</div>;
  if (!user)
    return (
      <div className="p-10 text-center text-red-500">
        No profile data found. Please login again.
      </div>
    );

  return (
    <main className="p-4 lg:p-10 bg-gray-50 min-h-screen">
      <div className="w-full mx-auto space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            {user.profile_image_url ? (
              <Image
                src={user.profile_image_url}
                alt="Profile"
                width={300}
                height={300}
                className="w-[100px] h-[100px] object-cover  rounded-full"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400 font-medium">
                <FaUserCircle size={100}></FaUserCircle>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-blue-600 font-medium">
                {user.role || "Participant"}
              </p>
            </div>
          </div>
          <Link href="/dashboard/profile/edit">
            <button className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-md active:scale-95">
              <FaRegEdit className="mr-2" />
              Edit Profile
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-blue-600 border-b pb-2">
              <FaUserCircle size={20} />
              <h2 className="font-bold text-lg">Personal Details</h2>
            </div>
            <div className="space-y-3">
              <ProfileItem label="Email" value={user.email} />
              <ProfileItem label="Phone" value={user.phone} />
              <ProfileItem label="District" value={user.district} />
            </div>
          </section>
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-green-600 border-b pb-2">
              <FaGraduationCap size={22} />
              <h2 className="font-bold text-lg">Academic Background</h2>
            </div>
            <div className="space-y-3">
              <ProfileItem label="Institution" value={user.institution} />
              <ProfileItem label="Education Type" value={user.education_type} />
              <ProfileItem label="Grade Level" value={user.grade_level} />
              <ProfileItem label="Current Year" value={user.current_level} />
            </div>
          </section>
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:col-span-2">
            <div className="flex items-center gap-2 mb-4 text-purple-600 border-b pb-2">
              <FaAward size={20} />
              <h2 className="font-bold text-lg">Participation & Role</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              <ProfileItem label="SDG Role" value={user.sdg_role} />
              <ProfileItem label="Round Type" value={user.round_type} />
              <div className="md:col-span-2 py-2">
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Activities Role/Interest:
                </h3>
                <p className="text-gray-800 bg-gray-50 p-3 rounded-lg italic border-l-4 border-purple-200">
                  {user.activities_role || "No activities specified"}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

const ProfileItem = ({ label, value }) => (
  <div className="flex flex-col py-1">
    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
      {label}
    </span>
    <span className="text-gray-800 font-medium">{value || "Not Provided"}</span>
  </div>
);

export default ProfilePage;
