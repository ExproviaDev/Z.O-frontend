import React from "react";
import { FaBookOpenReader } from "react-icons/fa6";
import { LuMonitorPlay } from "react-icons/lu";
import { LiaCertificateSolid } from "react-icons/lia";
const Dashboard = () => {
  return (
    <main className="border-2 border-red-500 p-5 shadow-lg rounded-xl ">
      <div class="container mx-auto p-6">
        <h1 class="text-3xl font-semibold mb-10">Dashboard</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 shadow-lg p-8 rounded-xl">
          <div class="bg-blue-100 p-6 rounded-lg shadow-md flex flex-col justify-center items-center gap-6 transition-all transform hover:shadow-xl hover:-translate-y-2  duration-300 cursor-pointer">
            <div class="text-blue-500 text-6xl mr-4 border border-red-300 rounded-full p-3">
              <FaBookOpenReader />
            </div>
            <p class="text-5xl font-bold">2</p>
            <h3 class="text-lg font-medium">Enrolled Courses</h3>
          </div>

          <div class="bg-purple-100 p-6 rounded-lg shadow-md flex flex-col justify-center items-center gap-6 transition-all transform hover:shadow-xl hover:-translate-y-2  duration-300 cursor-pointer">
            <div class="text-blue-500 text-6xl mr-4 border border-red-300 rounded-full p-3">
              <LuMonitorPlay />
            </div>
            <p class="text-5xl font-bold">1</p>
            <h3 class="text-lg font-medium">Active Courses</h3>
          </div>

          <div class="bg-pink-100 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center gap-6 transition-all transform hover:shadow-xl hover:-translate-y-2  duration-300 cursor-pointer">
            <div class="text-blue-500 text-6xl mr-4 text-center border border-red-300 rounded-full p-3">
              <LiaCertificateSolid />
            </div>
            <p class="text-5xl font-bold">0</p>
            <h3 class="text-lg font-medium">Completed Courses</h3>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
