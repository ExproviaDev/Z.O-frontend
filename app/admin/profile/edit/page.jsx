"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../../store/slices/authSlice"; // check path
import imageCompression from "browser-image-compression";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUserCircle, FaCloudUploadAlt, FaSave, FaArrowLeft } from "react-icons/fa";

export default function AdminEditProfile() {
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    profile_image_url: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        district: user.district || "",
        profile_image_url: user.profile_image_url || "",
      });
    }
  }, [user]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const options = { maxSizeMB: 0.1, maxWidthOrHeight: 800, useWebWorker: true };
      const compressedFile = await imageCompression(file, options);
      const data = new FormData();
      data.append("file", compressedFile);
      data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
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
    setIsSaving(true);
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        dispatch(fetchUserProfile(token));
        router.push("/admin/profile");
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const inputStyle = "w-full border-2 border-gray-100 p-3 rounded-xl bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all";

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 mb-6 hover:text-blue-600 font-medium">
        <FaArrowLeft /> Back to Profile
      </button>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Edit Admin Profile</h2>
          <p className="text-gray-500 text-sm">Update your personal account details</p>
        </div>

        {/* Profile Image Upload */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-blue-50 overflow-hidden bg-gray-50 shadow-inner">
              {formData.profile_image_url ? (
                <Image src={formData.profile_image_url} alt="Profile" placeholder="empty" width={128} height={128} className="w-full h-full object-cover" />
              ) : (
                <FaUserCircle size={128} className="text-gray-200" />
              )}
            </div>
            <label className="absolute bottom-1 right-1 p-2 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 shadow-lg transition-transform active:scale-90">
              <FaCloudUploadAlt size={20} />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
          {loading && <p className="text-blue-600 text-xs animate-pulse font-bold">Uploading Image...</p>}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-2 ml-1">Full Name</label>
            <input className={inputStyle} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-600 mb-2 ml-1">Phone Number</label>
            <input className={inputStyle} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-600 mb-2 ml-1">District</label>
            <input className={inputStyle} value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })} />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving || loading}
          className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
            isSaving || loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
          }`}
        >
          <FaSave />
          {isSaving ? "Saving Changes..." : "Update Profile"}
        </button>
      </form>
    </main>
  );
}