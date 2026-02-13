

"use client"

import { useState } from "react";
import DashboardHeader from "./Dashboard/Dashboard";
import Sidebar from "./Sidebar/Sidebar";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50">
      <DashboardHeader onMenuClick={() => setSidebarOpen(true)}></DashboardHeader>

      <div className="flex">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)}></Sidebar>

         <section className="flex-1 w-full lg:ml-64 transition-all duration-300">
          <div className="max-w-full px-5 md:px-5 pb-16 pt-5 lg:pt-8">
            {children} 
          </div>
        </section>
      </div>
    </main>
  );
};

export default DashboardLayout;