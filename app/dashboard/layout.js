

"use client"

import DashboardHeader from "../Components/Dashboard/Dashboard";
import Sidebar from "../Components/Sidebar/Sidebar";
import { useState } from "react";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header: এটি সবার উপরে ফিক্সড থাকবে */}
      <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

      {/* মেইন কন্টেইনার */}
      <div className="flex">
        {/* Sidebar: ডেক্সটপে এটি বাম পাশে ফিক্সড থাকবে */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Content Area */}
        {/* lg:ml-64 ব্যবহার করা হয়েছে যাতে ডেক্সটপে কন্টেন্ট সাইডবারের ডান থেকে শুরু হয় */}
        <section className="flex-1 w-full lg:ml-64 transition-all duration-300">
          <div className="max-w-full px-4 md:px-6 pb-16 pt-5 lg:pt-8">
            {children} {/* ডাইনামিক কন্টেন্ট এখানে লোড হবে */}
          </div>
        </section>
      </div>
    </main>
  );
};

export default DashboardLayout;