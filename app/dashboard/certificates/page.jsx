import React from "react";
import { CiTrophy } from "react-icons/ci";

const page = () => {
  return (
    <main className="border-2 border-red-500 p-5 shadow-lg rounded-xl ">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md transition-all ease-in-out duration-300 flex flex-col gap-5">
        <h1 className="text-2xl lg:text-3xl font-semibold lg:mb-6">
          My Certificates
        </h1>
        <div className="relative overflow-hidden border-l-2 lg:border-l-[6px] border border-blue-200 border-l-blue-600 bg-white py-8 px-6 shadow-md rounded-xl">
          <div className="flex items-center justify-between">
            <div className="space-y-3 flex gap-5 justify-center items-center">
              <div className="text-6xl bg-amber-100 p-2 rounded-xl">
                <CiTrophy />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black">
                  Participation Certificate
                </h3>

                <div className="flex items-center gap-6 text-lg text-gray-500">
                  Preliminary Round 2025
                </div>
              </div>
            </div>

            <button className="flex items-center gap-1.5 rounded-full bg-white text-black hover:bg-green-600 cursor-pointer  text-lg font-medium hover:text-white border border-slate-400 py-1 px-4 transition-all ease-in-out duration-300">
              {/* <CheckCircle2 className="h-3.5 w-3.5" /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-download w-4 h-4 mr-2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line>
              </svg>
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
