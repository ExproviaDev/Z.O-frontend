/* eslint-disable react/prop-types */

import Link from "next/link";

const Slide = ({ title, image, text }) => {
  return (
    <div
      className="w-full bg-center bg-cover h-[28rem] overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full ">
        <div className="text-center w-3/5 bg-gray-700/70 py-8 px-3 rounded-xl">
          <h2 className="text-3xl mb-8  font-semibold text-white lg:text-4xl">
            {title}
          </h2>
          <h1 className="text-lg  text-gray-200 lg:text-xl">{text}</h1>
          <br />
          <Link
            hrefInstructions="/all-visas"
            className="w-20 px-5 py-4  mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform  opacity-60 rounded-md lg:w-auto focus:outline-none btn-outline bg-blue-600 hover:bg-blue-600"
          >
            explore all visa
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide;
