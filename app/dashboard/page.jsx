import React from "react";
import { FaBookOpenReader } from "react-icons/fa6";
import { LuMonitorPlay } from "react-icons/lu";
import { LiaCertificateSolid } from "react-icons/lia";

const page = () => {
  const stats = [
    {
      id: 1,
      label: "Enrolled Courses",
      count: "02",
      icon: <FaBookOpenReader />,
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      label: "Active Courses",
      count: "01",
      icon: <LuMonitorPlay />,
      color: "from-purple-500 to-fuchsia-600",
      bgLight: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      id: 3,
      label: "Completed Courses",
      count: "00",
      icon: <LiaCertificateSolid />,
      color: "from-pink-500 to-rose-600",
      bgLight: "bg-pink-50",
      iconColor: "text-pink-600",
    },
  ];

  return (
    <main className=" p-4 md:p-8 rounded-xl">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Welcome back! Here is what`s happening with your courses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="group relative bg-white p-8 rounded-3xl shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden cursor-pointer"
            >
              <div
                className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-700 bg-gradient-to-br ${stat.color}`}
              ></div>

              <div className="flex flex-col items-center text-center relative z-10">
                <div
                  className={`mb-6 p-5 rounded-2xl ${stat.bgLight} ${stat.iconColor} text-5xl shadow-inner transition-transform duration-500 group-hover:rotate-12`}
                >
                  {stat.icon}
                </div>

                <div className="space-y-1">
                  <h3 className="text-5xl font-black text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-500 transition-all">
                    {stat.count}
                  </h3>
                  <p className="text-lg font-semibold text-gray-500 uppercase tracking-widest pt-2">
                    {stat.label}
                  </p>
                </div>
              </div>

              <div
                className={`absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${stat.color}`}
              ></div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold">Ready to continue learning?</h2>
            <p className="text-indigo-100 opacity-90">
              You have 1 active course waiting for you to finish.
            </p>
          </div>
          <button className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:bg-gray-100 transition-colors uppercase tracking-wider text-sm">
            Resume Lesson
          </button>
        </div>
      </div>
    </main>
  );
};

export default page;
