import React from "react";
import { FaBookOpenReader } from "react-icons/fa6";
import { LuMonitorPlay } from "react-icons/lu";
import { LiaCertificateSolid } from "react-icons/lia";
const Dashboard = () => {
  return (
    <main className="border-2 border-red-500 p-5 shadow-lg rounded-xl ">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-10">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 shadow-lg p-8 rounded-xl">
          <div className="bg-blue-100 p-6 rounded-lg shadow-md flex flex-col justify-center items-center gap-6 transition-all transform hover:shadow-xl hover:-translate-y-2  duration-300 cursor-pointer">
            <div className="text-blue-500 text-6xl mr-4 border border-red-300 rounded-full p-3">
              <FaBookOpenReader />
            </div>
            <p className="text-5xl font-bold">2</p>
            <h3 className="text-lg font-medium">Enrolled Courses</h3>
          </div>

          <div className="bg-purple-100 p-6 rounded-lg shadow-md flex flex-col justify-center items-center gap-6 transition-all transform hover:shadow-xl hover:-translate-y-2  duration-300 cursor-pointer">
            <div className="text-blue-500 text-6xl mr-4 border border-red-300 rounded-full p-3">
              <LuMonitorPlay />
            </div>
            <p className="text-5xl font-bold">1</p>
            <h3 className="text-lg font-medium">Active Courses</h3>
          </div>

          <div className="bg-pink-100 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center gap-6 transition-all transform hover:shadow-xl hover:-translate-y-2  duration-300 cursor-pointer">
            <div className="text-blue-500 text-6xl mr-4 text-center border border-red-300 rounded-full p-3">
              <LiaCertificateSolid />
            </div>
            <p className="text-5xl font-bold">0</p>
            <h3 className="text-lg font-medium">Completed Courses</h3>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
