import React from "react";

const HeadingDetails = ({ title, subtitle }) => {
  return (
    <div className="text-center">
      <div className="relative">
        <div className="text-center mb-5 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 bg-[#FF014F] opacity-10 blur-2xl rounded-full"></div>
          </div>
          <div className="relative z-10 inline-flex items-center space-x-4 justify-center">
            <span className="h-[2px] mt-3 w-16 md:w-24 lg:w-28 bg-gradient-to-r from-transparent via-[#FF014F] to-transparent"></span>{" "}
            <h2 className="text-xl md:text-2xl lg:text-4xl font-bold mt-0 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
              {title}
            </h2>
            <span className="h-[2px] mt-3 w-16 md:w-24 lg:w-28 bg-gradient-to-r from-transparent via-[#FF014F] to-transparent"></span>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <p className="mt-3 text-gray-600 font-semibold w-11/12 mx-auto text-sm md:text-base lg:text-xl">
        {subtitle}
      </p>

      {/* Decorative Line */}
      <div className="flex items-center justify-center mt-4">
        <span className="h-[2px] w-32 lg:w-48 bg-gradient-to-r from-transparent via-red-600 to-transparent"></span>
      </div>
    </div>
  );
};

export default HeadingDetails;
