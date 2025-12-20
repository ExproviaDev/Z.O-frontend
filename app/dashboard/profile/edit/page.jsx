"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../../store/slices/authSlice";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

export default function EditProfile() {
  const educationTypes = [
    "Bangla Medium (Bangla & English Version)",
    "English Medium (IGCSE & IB)",
    "Madrasha (Alia & Qawmi)",
    "Higher Education (University and Equivalent)",
    "Vocational, Diploma & Other Technical Education",
    "None of These",
  ];
  const gradeLevels = [
    "Class 5, Grade 5, PYP 5, Taysir, Equivalent",
    "Class 6, Grade 6, MYP 1, Mizan, Equivalent",
    "Class 7, Grade 7, MYP 2, Nahbameer",
    "Class 8, Grade 8, MYP 3, Hedayatun Nahu",
    "Class 9, Grade 9, MYP 4, Kafiya and Bekaya, Equivalent",
    "Class 10, Grade 10, MYP 5, Kafiya and Bekaya, Equivalent",
    "SSC Candidate, O Level Candidate, Kafiya and Bekaya Equivalent",
    "Class 11 (HSC), Grade 11, DP 1, Jalalayn, Equivalent",
    "Class 12 (HSC), Grade 12, DP 2, Jalalayn, Equivalent",
    "HSC Candidate, A Level Candidate, Jalalayn Equivalent",
    "None of These",
  ];
  const currentLevels = [
    "1st Year, Fazil, Mishkat",
    "2nd Year, Fazil, Mishkat",
    "3rd Year, Fazil, Mishkat",
    "4th Year, Fazil, Mishkat",
    "5th Year, Internship, Fazil, Mishkat",
    "Postgraduate (Masters), Kamil, Dawrah",
    "Diploma",
    "None of These",
  ];
  const activitiesOptions = [
    "Being a campus ambassador...",
    "I want to work in event management...",
    "I want only to participate in the Zero Olympiad...",
  ];

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    district: "",
    institution: "",
    education_type: "",
    grade_level: "",
    current_level: "",
    sdg_role: "",
    round_type: "",
    activities_role: "",
    profile_image_url: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      }; // ১০০ কেবি টার্গেট
      const compressedFile = await imageCompression(file, options);
      const data = new FormData();
      data.append("file", compressedFile);
      data.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );
      data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: data }
      );
      const fileData = await res.json();
      setFormData({ ...formData, profile_image_url: fileData.secure_url });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/update-profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );
    if (response.ok) {
      alert("Profile updated!");
      dispatch(fetchUserProfile(token));
      router.push("/dashboard/profile");
    }
  };

  const inputStyle =
    "w-full border p-3 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 outline-none";

  return (
    <main className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-2xl shadow-inner">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold border-b pb-4">
          Update Personal Information
        </h2>
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full border-4 border-blue-100 overflow-hidden bg-gray-50 shadow-sm transition-transform group-hover:scale-105">
              {formData.profile_image_url ? (
                <Image
                  src={formData.profile_image_url}
                  alt="Profile"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400 font-medium">
                  <FaUserCircle size={100}></FaUserCircle>
                </div>
              )}
            </div>
          </div>
          <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full border border-blue-200 hover:bg-blue-100 transition-all font-medium text-sm shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <span>Change Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {loading && (
            <p className="text-blue-600 animate-pulse text-xs font-semibold">
              Processing & Compressing...
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-sm">Full Name</label>
            <input
              className={inputStyle}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="font-semibold text-sm">
              Email (Verification Required)
            </label>
            <div className="flex gap-2">
              <input
                className={`${inputStyle} bg-gray-100`}
                value={formData.email}
                disabled
              />
              <button
                type="button"
                className="bg-orange-500 text-white px-3 rounded-lg text-xs"
              >
                Verify
              </button>
            </div>
          </div>

          <div>
            <label className="font-semibold text-sm">Phone</label>
            <input
              className={inputStyle}
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div>
            <label className="font-semibold text-sm">District</label>
            <input
              className={inputStyle}
              value={formData.district}
              onChange={(e) =>
                setFormData({ ...formData, district: e.target.value })
              }
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold border-b pb-4 pt-6">
          Academic & Role Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="font-semibold text-sm">Institution</label>
            <input
              className={inputStyle}
              value={formData.institution}
              onChange={(e) =>
                setFormData({ ...formData, institution: e.target.value })
              }
            />
          </div>

          <div>
            <label className="font-semibold text-sm">Education Type</label>
            <select
              className={inputStyle}
              value={formData.education_type}
              onChange={(e) =>
                setFormData({ ...formData, education_type: e.target.value })
              }
            >
              <option value="">Select Type</option>
              {educationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-sm">Grade Level</label>
            <select
              className={inputStyle}
              value={formData.grade_level}
              onChange={(e) =>
                setFormData({ ...formData, grade_level: e.target.value })
              }
            >
              <option value="">Select Level</option>
              {gradeLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-sm">
              Current Level (Higher Ed)
            </label>
            <select
              className={inputStyle}
              value={formData.current_level}
              onChange={(e) =>
                setFormData({ ...formData, current_level: e.target.value })
              }
            >
              <option value="">Select Year</option>
              {currentLevels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold text-sm">Activities Role</label>
            <select
              className={inputStyle}
              value={formData.activities_role}
              onChange={(e) =>
                setFormData({ ...formData, activities_role: e.target.value })
              }
            >
              <option value="">Select Role</option>
              {activitiesOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt.substring(0, 50)}...
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all"
        >
          {loading ? "Processing..." : "Save All Information"}
        </button>
      </form>
    </main>
  );
}
