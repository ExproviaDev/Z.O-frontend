"use client";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "../store/slices/authSlice";
import { removeAllProfileQueries } from "../lib/hooks/useUserProfile";
import { FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const LogoutButton = ({ className = "" }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8b5cf6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Logout!",
      cancelButtonText: "Cancel",
      background: "#0b0418",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        removeAllProfileQueries(queryClient);
        dispatch(logout());
        window.location.href = "/login";
      }
    });
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center gap-2 px-4  text-red-500 hover:bg-white/5 rounded-lg transition-all font-medium ${className} cursor-pointer w-full`}
    >
      <FaSignOutAlt />
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;