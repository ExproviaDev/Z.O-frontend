"use client";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "../../store/slices/authSlice";
import { FiLogOut, FiBell, FiSearch, FiHome } from "react-icons/fi";

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Ready to leave the session?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#f43f5e",
      confirmButtonText: "Logout"
    });

    if (result.isConfirmed) {
      dispatch(logout());
      router.push("/");
    }
  };

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-red-600 transition-colors">
          <FiHome size={18} />
          <span className="hidden sm:inline">Home</span>
        </button>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-8 w-px bg-gray-200 mx-2"></div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-red-600 transition-colors">
          <FiLogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}