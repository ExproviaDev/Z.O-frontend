// import Image from "next/image";

// export default function Instructions() {
//   return (
//     <section className="flex flex-col lg:flex-row items-center justify-between p-8 bg-white">
//       <div className="w-full lg:w-1/2 space-y-6">
//         <h2 className="text-3xl font-semibold text-gray-800">
//           Courses Focused on Building Strong Foundational Skills for Career
//           Growth
//         </h2>
//         <div className="flex items-center space-x-6">
//           <div className="flex items-center space-x-2">
//             <span className="text-2xl text-blue-600">❤️</span>
//             <p className="text-lg text-gray-700">Flexible Classes</p>
//           </div>
//           <div className="flex items-center space-x-2">
//             <span className="text-2xl text-blue-600">🌍</span>
//             <p className="text-lg text-gray-700">Learn From Anywhere</p>
//           </div>
//           <div className="flex items-center space-x-2">
//             <span className="text-2xl text-blue-600">💻</span>
//             <p className="text-lg text-gray-700">Skill-Based Learning</p>
//           </div>
//         </div>
//       </div>

//       <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
//         <div className="relative pb-9/16">
//           <iframe
//             className="absolute inset-0 w-full h-full rounded-lg"
//             src="https://www.youtube.com/embed/tEiJtCnmjQ4?si=v4MAbQ4XqZPZz-BU"
//             title="YouTube video player"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             referrerPolicy="strict-origin-when-cross-origin"
//             allowFullScreen
//           ></iframe>
//         </div>
//       </div>
//     </section>
//   );
// }

// import { FaRegHeart, FaRegLightbulb, FaLaptop } from "react-icons/fa";

// export default function WhyChooseUs() {
//   return (
//     <section className="bg-white py-12">
//       <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
//         {/* Left Content */}
//         <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
//           <h2 className="text-3xl font-semibold text-gray-800">
//             Courses Focused on Building Strong Foundational Skills for Career
//             Growth
//           </h2>
//           <div className="flex items-center justify-center lg:justify-start space-x-6">
//             <div className="flex items-center space-x-2">
//               <FaRegHeart className="text-2xl text-blue-600" />
//               <p className="text-lg text-gray-700">Flexible Classes</p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <FaRegLightbulb className="text-2xl text-blue-600" />
//               <p className="text-lg text-gray-700">Learn From Anywhere</p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <FaLaptop className="text-2xl text-blue-600" />
//               <p className="text-lg text-gray-700">Skill-Based Learning</p>
//             </div>
//           </div>
//         </div>

//         {/* Right Content (Video Section) */}
//         <div className="w-full lg:w-1/2">
//           <div className="relative pb-9/16">
//             <iframe
//               width="560"
//               height="315"
//               src="https://www.youtube.com/embed/tEiJtCnmjQ4?si=8ompfwNgfh5iYjo2"
//               title="YouTube video player"
//               frameborder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               referrerpolicy="strict-origin-when-cross-origin"
//               allowfullscreen
//             ></iframe>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { FaRegHeart, FaRegLightbulb, FaLaptop } from "react-icons/fa";

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16 lg:py-30">
      <div className="container mx-auto px-5 lg:px-20 max-w-screen-7xl flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0  border-rose-800 gap-10">
        {/* Right Content (Video Section) */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full h-0 pb-[50.75%] lg:pb-[75.75%]">
            <iframe
              className="absolute inset-0 w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/tEiJtCnmjQ4?si=8ompfwNgfh5iYjo2"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        {/* right Content */}
        <div className="w-full lg:w-1/2 space-y-3 lg:space-y-8">
          <h3 className="capitalize text-base lg:text-xl bg-gradient-to-r from-[#2f57ef] to-[#b966e7] bg-clip-text text-transparent font-semibold">
            why choose us
          </h3>
          <h2 className="text-[28px] md:text-3xl lg:text-5xl font-bold leading-12">
            Courses Focused on Building Strong Foundational Skills for{" "}
            <span className="bg-gradient-to-r from-[#2f57ef] to-[#b966e7] bg-clip-text text-transparent">
              Career Growth
            </span>
          </h2>
          <div className="flex flex-col gap-5">
            <div className="flex items-center space-x-2 text-2xl font-semibold">
              <FaRegHeart className="text-2xl text-blue-600" />
              <p className=" text-gray-700">Flexible Classes</p>
            </div>
            <div className="flex items-center space-x-2 text-2xl font-semibold">
              <FaRegLightbulb className="text-2xl text-blue-600" />
              <p className=" text-gray-700">Learn From Anywhere</p>
            </div>
            <div className="flex items-center space-x-2 text-2xl font-semibold">
              <FaLaptop className="text-2xl text-blue-600 bg-" />
              <p className=" text-gray-700">Skill-Based Learning</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
