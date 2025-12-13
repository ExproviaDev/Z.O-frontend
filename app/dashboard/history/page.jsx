import React from "react";
import { IoCalendarClearOutline } from "react-icons/io5";

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
                <IoCalendarClearOutline />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black">৳210</h3>

                <div className="flex items-center gap-6 text-lg text-gray-500">
                  2025-01-15 • bKash
                </div>
              </div>
            </div>

            <button className="flex items-center gap-1.5 rounded-full text-white bg-green-600 cursor-pointer  text-lg font-medium  py-1 px-4 transition-all ease-in-out duration-300">
              {/* <CheckCircle2 className="h-3.5 w-3.5" /> */}

              <span>Success</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
