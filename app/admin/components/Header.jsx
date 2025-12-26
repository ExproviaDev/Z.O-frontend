// "use client";

// import React from "react";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

// const MySwal = withReactContent(Swal);

// export default function Header({ logout }) {
//   const handleLogoutClick = async () => {
//     const result = await MySwal.fire({
//       title: "Are you sure?",
//       text: "Do you really want to logout?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, logout",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#dc2626", // red
//       cancelButtonColor: "#6b7280", // gray
//     });

//     if (result.isConfirmed) {
//       // Call your logout function
//       logout();

//       // Optional: Success message
//       MySwal.fire({
//         title: "Logged out!",
//         icon: "success",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     }
//   };

//   return (
//     <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      
//       {/* Left side (Logo / Title) */}
//       <div className="flex items-center gap-4"></div>

//       {/* Right side: Logout Button */}
//       <div className="flex items-center gap-4">
//         <button
//           onClick={handleLogoutClick}
//           className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }



"use client";

import React from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation"; // Next.js App Router
import { logout } from "../../store/slices/authSlice";
// import { logout } from "@/app/store/slices/authSlice";

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogoutClick = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      // Call Redux logout action
      dispatch(logout());

      // Optional: Success message
      await Swal.fire({
        title: "Logged out!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      // Redirect to home page
      router.push("/");
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      
      {/* Left side (Logo / Title) */}
      <div className="flex items-center gap-4">
        {/* Logo or site title */}
      </div>

      {/* Right side: Logout Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleLogoutClick}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>

    </header>
  );
}
