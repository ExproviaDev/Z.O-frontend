"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../../store/slices/authSlice";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";

export default function EditProfile() {
  const [isSaving, setIsSaving] = useState(false);
  
  // --- নতুন লিস্ট (রেজিস্ট্রেশন পেজের মতো) ---
  const educationTypes = [
    "Bangla Medium (Bangla & English Version)",
    "English Medium (IGCSE & IB)",
    "Madrasha (Alia & Qawmi)",
    "Higher Education (University and Equivalent)",
    "Vocational, Diploma & Other Technical Education",
  ];

  const allLevels = [
    "Class 5 / PYP 5 / Taisir",
    "Class 6 / MYP 1 / Mizan",
    "Class 7 / MYP 2 / Nahbemir",
    "Class 8 / MYP 3 / Hidayatunnah",
    "Class 9 / MYP 4 / Kafiya & Bekaya",
    "Class 10 / MYP 5",
    "SSC / O Level / Dakhil Candidate",
    "Class 11 / DP 1 / Jalalayn",
    "Class 12 / DP 2",
    "HSC / A Level / Alim Candidate",
    "University Admission Candidate / Musannif",
    "University 1st Year / Diploma 1st Year / Fazil / Mishkat",
    "University 2nd Year / Diploma 2nd Year",
    "University 3rd Year / Diploma 3rd Year",
    "University 4th Year / Diploma 4th Year",
    "University 5th Year & Intern / Kamil / Dawrah",
    "Postgraduate (Masters) and Above"
  ];
  // -------------------------------------------

  const user = useSelector((state) => state.auth.user);
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
    grade_level: "", // এটিই Unified Level হিসেবে কাজ করবে
    current_level: "", // এটিও সিঙ্ক থাকবে
    profile_image_url: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        district: user.district || "",
        institution: user.institution || "",
        education_type: user.education_type || "",
        grade_level: user.grade_level || "", 
        current_level: user.grade_level || "", // grade_level দিয়েই ইনিশিয়েট করা হলো
        profile_image_url: user.profile_image_url || "",
      });
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
      }; 
      const compressedFile = await imageCompression(file, options);
      const data = new FormData();
      data.append("file", compressedFile);
      data.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      );
      data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: data },
      );
      const fileData = await res.json();
      setFormData({ ...formData, profile_image_url: fileData.secure_url });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setIsSaving(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const token = localStorage.getItem("access_token");

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Session Expired",
        text: "Please login again to continue.",
        confirmButtonColor: "#2563eb",
      });
      router.push("/login");
      return;
    }

    try {
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

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your information has been saved successfully.",
          confirmButtonColor: "#2563eb",
        }).then(() => {
          dispatch(fetchUserProfile(token));
          router.push("/dashboard/profile"); // চাইলে রিডাইরেক্ট করতে পারেন
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: result.error || "Failed to update profile.",
          confirmButtonColor: "#d33",
        });

        if (response.status === 401) {
          router.push("/login");
        }
      }
    } catch (err) {
      console.error("Submit Error:", err);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Something went wrong. Please check your connection.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setIsSaving(false);
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
        
        {/* --- Image Upload Section --- */}
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

          {/* --- Education Type Dropdown --- */}
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

          {/* --- Unified Current Level Dropdown --- */}
          <div>
            <label className="font-semibold text-sm">Current Level / Class</label>
            <select
              className={inputStyle}
              value={formData.grade_level}
              onChange={(e) =>
                setFormData({ ...formData, grade_level: e.target.value, current_level: e.target.value })
              }
            >
              <option value="">Select Level</option>
              {allLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving || loading}
          className={`w-full py-4 rounded-xl cursor-pointer font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
            isSaving || loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isSaving || loading ? "Saving Data..." : "Save All Information"}
        </button>
      </form>
    </main>
  );
}