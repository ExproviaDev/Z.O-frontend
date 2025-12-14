import React from "react";
import { FaRegEdit } from "react-icons/fa";
const page = () => {
  return (
    <main className="border-2 border-red-500 p-5 shadow-lg rounded-xl ">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md transition-all ease-in-out duration-300 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl lg:text-3xl font-semibold lg:mb-6">
            My Profile
          </h1>
          <button className="cursor-pointer flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
            <FaRegEdit />

            <span className="mx-1">Edit</span>
          </button>
        </div>

        <div className=" border-red-300 flex justify-start text-lg lg:text-xl">
          <h2 className="w-1/2 font-semibold">Registration Date</h2>
          <p>February 25, 2025 6:01 am</p>
        </div>
        <div className=" border-red-300 flex justify-start text-lg lg:text-xl">
          <h2 className="w-1/2 font-semibold"> First Name</h2>
          <p>Faati </p>
        </div>
        <div className=" border-red-300 flex justify-start text-lg lg:text-xl">
          <h2 className="w-1/2 font-semibold"> Last Name</h2>
          <p> Haaayat</p>
        </div>
        <div className=" border-red-300 flex justify-start text-lg lg:text-xl">
          <h2 className="w-1/2 font-semibold"> Username</h2>
          <p>faatihaaayat</p>
        </div>
        <div className=" border-red-300 flex justify-start text-lg lg:text-xl">
          <h2 className="w-1/2 font-semibold"> Email</h2>
          <p>faatihaaayat@gmail.com</p>
        </div>
        <div className=" border-red-300 flex justify-start text-lg lg:text-xl">
          <h2 className="w-1/2 font-semibold"> Version</h2>
          <p>English</p>
        </div>
        <div className=" border-red-300 flex justify-start text-lg lg:text-xl">
          <h2 className="w-1/2 font-semibold">Class</h2>
          <p>O Level Candidate</p>
        </div>
      </div>
    </main>
  );
};

export default page;
