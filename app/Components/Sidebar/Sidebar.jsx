

// "use client";

// import React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { FaUser, FaHome, FaBook, FaRegBookmark, FaStar } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import { GrAnnounce } from "react-icons/gr";
// import LogoutButton from "../LogoutButton";

// export default function Sidebar({ isOpen, onClose }) {
//   const pathname = usePathname();

//   const menuItems = [
//     { name: "Dashboard", icon: <FaHome />, href: "/dashboard" },
//     { name: "My Profile", icon: <FaUser />, href: "/dashboard/profile" },
//     { name: "My Quizzes", icon: <FaBook />, href: "/dashboard/quizzes" },
//     { name: "My Certificates", icon: <FaRegBookmark />, href: "/dashboard/certificates" },
//     { name: "Payment History", icon: <FaStar />, href: "/dashboard/history" },
//     { name: "Announcement", icon: <GrAnnounce  />, href: "/dashboard/announcement" },
//   ];

//   return (
//     <>
//       {/* Sidebar মেইন কন্টেইনার */}
//       <aside
//         className={`
//           fixed inset-y-0 left-0 z-[40] w-64 bg-white border-r border-gray-100
//           transform transition-transform duration-300 ease-in-out
//           lg:translate-x-0 lg:fixed lg:top-16 lg:h-[calc(100vh-64px)]
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//           flex flex-col overflow-hidden
//         `}
//       >
//         <div className="flex flex-col h-full p-5">
//           {/* লোগো সেকশনটি সরিয়ে দিয়েছি কারণ এটি এখন হেডারে আছে */}
//           <div className="pb-4 px-2 hidden lg:block">
//             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Main Menu</p>
//           </div>

//           {/* মেনু আইটেমসমূহ */}
//           <nav className="flex-1 space-y-1 mt-2 overflow-y-auto no-scrollbar">
//             {menuItems.map((item) => {
//               const isActive = pathname === item.href;

//               return (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   onClick={onClose} 
//                   className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium 
//                   ${
//                     isActive
//                       ? "text-blue-600 bg-blue-50 border-r-4 border-blue-600 shadow-sm"
//                       : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
//                   }
//                 `}
//                 >
//                   <span className="text-xl">{item.icon}</span>
//                   <span className="text-sm">{item.name}</span>
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* নিচের সেকশন (Home & Logout) */}
//           <div className="pt-4 border-t border-gray-100 space-y-2">
//             <Link 
//               href="/" 
//               onClick={onClose}
//               className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 font-medium text-sm hover:bg-gray-100 transition-all"
//             >
//               <FaHome className="text-xl" />
//               <span>Back to Home</span>
//             </Link>
            
//             <div className="w-full">
//                <LogoutButton />
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* মোবাইল ওভারলে */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[30] lg:hidden"
//           />
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // useRouter যোগ করা হয়েছে
import { FaUser, FaHome, FaBook, FaRegBookmark, FaStar, FaSignOutAlt } from "react-icons/fa"; // FaSignOutAlt যোগ করা হয়েছে
import { motion, AnimatePresence } from "framer-motion";
import { GrAnnounce } from "react-icons/gr";
import Swal from "sweetalert2"; // SweetAlert2 ইম্পোর্ট করা হয়েছে

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, href: "/dashboard" },
    { name: "My Profile", icon: <FaUser />, href: "/dashboard/profile" },
    { name: "My Quizzes", icon: <FaBook />, href: "/dashboard/quizzes" },
    { name: "My Certificates", icon: <FaRegBookmark />, href: "/dashboard/certificates" },
    { name: "Payment History", icon: <FaStar />, href: "/dashboard/history" },
    { name: "Announcement", icon: <GrAnnounce />, href: "/dashboard/announcement" },
  ];

  // লগআউট হ্যান্ডলার ফাংশন
  const handleLogout = () => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "আপনি আপনার অ্যাকাউন্ট থেকে লগআউট করতে যাচ্ছেন!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb", // আপনার ব্লু থিমের সাথে মিল রেখে
      cancelButtonColor: "#d33",
      confirmButtonText: "হ্যাঁ, লগআউট করুন",
      cancelButtonText: "না, বাতিল",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // এখানে আপনার লগআউট লজিক (যেমন: cookie/token clear)
        // signOut(); // যদি next-auth ব্যবহার করেন
        
        Swal.fire({
          title: "লগআউট হয়েছে!",
          text: "আপনাকে হোম পেজে পাঠানো হচ্ছে।",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          onClose(); // সাইডবার বন্ধ করা
          router.push("/"); // হোম পেজে পাঠানো
        }, 1500);
      }
    });
  };

  return (
    <>
      {/* Sidebar মেইন কন্টেইনার */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-[40] w-64 bg-white border-r border-gray-100
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:fixed lg:top-16 lg:h-[calc(100vh-64px)]
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          flex flex-col overflow-hidden
        `}
      >
        <div className="flex flex-col h-full p-5">
          <div className="pb-4 px-2 hidden lg:block">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Main Menu</p>
          </div>

          {/* মেনু আইটেমসমূহ */}
          <nav className="flex-1 space-y-1 mt-2 overflow-y-auto no-scrollbar">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium 
                  ${
                    isActive
                      ? "text-blue-600 bg-blue-50 border-r-4 border-blue-600 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
                  }
                `}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* নিচের সেকশন (Home & Logout) */}
          <div className="pt-4 border-t border-gray-100 space-y-2">
            <Link 
              href="/" 
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 font-medium text-sm hover:bg-gray-100 transition-all"
            >
              <FaHome className="text-xl" />
              <span>Back to Home</span>
            </Link>
            
            {/* এখানে LogoutButton এর পরিবর্তে সরাসরি বাটনটি আপনার ডিজাইনে বসানো হয়েছে */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 font-medium text-sm hover:bg-red-50 transition-all"
            >
              <FaSignOutAlt className="text-xl" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* মোবাইল ওভারলে */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[30] lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}