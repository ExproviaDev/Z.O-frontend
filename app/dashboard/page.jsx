import React from "react";
import { FaBookOpenReader } from "react-icons/fa6";
const Dashboard = () => {
  return (
    <main className="border border-red-500 p-5">
      <div class="container mx-auto p-6">
        <h1 class="text-3xl font-semibold mb-6">Dashboard</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-blue-100 p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
            <div class="text-blue-500 text-4xl mr-4">
              <FaBookOpenReader />
            </div>
            <div>
              <h3 class="text-lg font-medium">Enrolled Courses</h3>
              <p class="text-3xl font-bold">30</p>
            </div>
          </div>
          <div class="bg-purple-100 p-6 rounded-lg shadow-md flex items-center">
            <div class="text-purple-500 text-4xl mr-4">
              <i class="fas fa-laptop"></i>
            </div>
            <div>
              <h3 class="text-lg font-medium">Active Courses</h3>
              <p class="text-3xl font-bold">10</p>
            </div>
          </div>
          <div class="bg-pink-100 p-6 rounded-lg shadow-md flex items-center">
            <div class="text-pink-500 text-4xl mr-4">
              <i class="fas fa-trophy"></i>
            </div>
            <div>
              <h3 class="text-lg font-medium">Completed Courses</h3>
              <p class="text-3xl font-bold">7</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
