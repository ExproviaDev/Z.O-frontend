"use client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "../store/slices/authSlice";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutButton = ({ className = "" }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium ${className} cursor-pointer`}
    >
      <FaSignOutAlt />
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
