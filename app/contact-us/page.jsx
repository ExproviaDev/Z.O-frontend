// import React from 'react'
// import { IoLocationSharp } from "react-icons/io5";
// import { FaPhoneAlt } from "react-icons/fa";
// import { AiOutlineMail } from "react-icons/ai";
// import { LuClock4 } from "react-icons/lu";

// import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";




// export default function page() {


//   const links = [
//     {
//       name: "Facebook",
//       icon: <FaFacebook className="text-blue-600 text-3xl" />,
//       url: "https://facebook.com/ZeroOlympiad",
//       handle: "@ZeroOlympiad",
//     },
//     {
//       name: "YouTube",
//       icon: <FaYoutube className="text-red-600 text-3xl" />,
//       url: "https://youtube.com/@ZeroOlympiad",
//       handle: "Zero Olympiad",
//     },
//     {
//       name: "Instagram",
//       icon: <FaInstagram className="text-yellow-500 text-3xl" />,
//       url: "https://instagram.com/zeroolympiad",
//       handle: "@zeroolympiad",
//     },
//   ];



//   return (
//     <div className='bg-white text-black'>
//       <div className='flex flex-col items-center py-8'>
//         <h1 className='text-5xl font-bold pb-4'>Contact & Support</h1>
//         <p className='text-center text-gray-600 text-xl'>Have questions? We're here to help you on your journey to becoming a <br /> national champion</p>
//       </div>
//       <div className='flex justify-center gap-10'>

     

//  <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 border">
//       <h3 className="text-2xl font-semibold mb-6">Office Information</h3>

//       {/* Head Office */}
//       <div className="mb-6">
//         <h5 className="flex items-center gap-2 text-lg font-semibold text-blue-700">
//           <IoLocationSharp className="text-xl" />
//           Head Office
//         </h5>
//         <p className="text-gray-600 ml-7">House #23, Road #7</p>
//         <p className="text-gray-600 ml-7">Dhanmondi, Dhaka-1205</p>
//         <p className="text-gray-600 ml-7">Bangladesh</p>
//       </div>

//       {/* Phone */}
//       <div className="mb-6">
//         <h5 className="flex items-center gap-2 text-lg font-semibold text-green-700">
//           <FaPhoneAlt className="text-lg" />
//           Phone
//         </h5>
//         <p className="text-gray-600 ml-7">+880 1234-567890</p>
//         <p className="text-gray-600 ml-7">+880 9876-543210</p>
//       </div>

//       {/* Email */}
//       <div className="mb-6">
//         <h5 className="flex items-center gap-2 text-lg font-semibold text-red-700">
//           <AiOutlineMail className="text-xl" />
//           Email
//         </h5>
//         <p className="text-gray-600 ml-7">info@zeroolympiad.bd</p>
//         <p className="text-gray-600 ml-7">support@zeroolympiad.bd</p>
//       </div>

//       {/* Working Hours */}
//       <div>
//         <h5 className="flex items-center gap-2 text-lg font-semibold text-yellow-600">
//           <LuClock4 className="text-xl" />
//           Working Hours
//         </h5>
//         <p className="text-gray-600 ml-7">Saturday - Thursday</p>
//         <p className="text-gray-600 ml-7">9:00 AM - 5:00 PM</p>
//       </div>
//     </div>



//         <div className="w-full max-w-sm bg-white shadow-md rounded-xl p-4">
//       <h2 className="text-xl font-bold mb-4">Follow Us</h2>

//       <div className="space-y-3">
//         {links.map((item, index) => (
//           <a
//             key={index}
//             href={item.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center gap-3 p-3 border rounded-xl 
//                        hover:bg-gray-100 transition-all cursor-pointer"
//           >
//             {item.icon}

//             <div className="flex flex-col">
//               <span className="font-semibold">{item.name}</span>
//               <span className="text-sm text-gray-500">{item.handle}</span>
//             </div>
//           </a>
//         ))}
//       </div>
//     </div>
//       </div>
//       <div className='h-10'>
        
//       </div>
//     </div>
//   )
// }



import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { LuClock4 } from "react-icons/lu";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";

export default function Page() {

  const links = [
    {
      name: "Facebook",
      icon: <FaFacebook className="text-blue-600 text-3xl" />,
      url: "https://www.facebook.com/FaatihaAayatOfficial",
      handle: "@ZeroOlympiad",
    },
    {
      name: "YouTube",
      icon: <FaYoutube className="text-red-600 text-3xl" />,
      url: "https://www.youtube.com/@FaatihaAayat",
      handle: "Zero Olympiad",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-pink-500 text-3xl" />,
      url: "https://www.instagram.com/faatiha.aayat?igsh=cDF2ZGR0eXhoZTM5",
      handle: "@zeroolympiad",
    },
  ];

  return (
    <div className="bg-white text-black px-4 md:px-10">
      
      {/* Page Header */}
      <div className="flex flex-col items-center py-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold pb-3">Contact & Support</h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Have questions? We're here to help you on your journey to becoming a <br className="hidden md:block" />
          national champion
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">

        {/* Office Information */}
        <div className="w-full bg-white shadow-lg rounded-2xl p-6 border">
          <h3 className="text-2xl font-semibold mb-6">Office Information</h3>

          {/* Head Office */}
          <div className="mb-6">
            <h5 className="flex items-center gap-2 text-lg font-semibold text-blue-700">
              <IoLocationSharp className="text-xl" />
              Head Office
            </h5>
            <div className="ml-7 text-gray-700">
              <p>House #23, Road #7</p>
              <p>Dhanmondi, Dhaka-1205</p>
              <p>Bangladesh</p>
            </div>
          </div>

          {/* Phone */}
          <div className="mb-6">
            <h5 className="flex items-center gap-2 text-lg font-semibold text-green-700">
              <FaPhoneAlt className="text-lg" />
              Phone
            </h5>
            <div className="ml-7 text-gray-700">
              <p>+880 1234-567890</p>
              <p>+880 9876-543210</p>
            </div>
          </div>

          {/* Email */}
          <div className="mb-6">
            <h5 className="flex items-center gap-2 text-lg font-semibold text-red-700">
              <AiOutlineMail className="text-xl" />
              Email
            </h5>
            <div className="ml-7 text-gray-700">
              <p>info@zeroolympiad.bd</p>
              <p>support@zeroolympiad.bd</p>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h5 className="flex items-center gap-2 text-lg font-semibold text-yellow-600">
              <LuClock4 className="text-xl" />
              Working Hours
            </h5>
            <div className="ml-7 text-gray-700">
              <p>Saturday - Thursday</p>
              <p>9:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>

        {/* Follow Us */}
        <div className="w-full bg-white shadow-lg rounded-2xl p-6 border h-fit">
          <h2 className="text-2xl font-bold mb-5">Follow Us</h2>

          <div className="space-y-3">
            {links.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 border rounded-xl 
                          hover:bg-gray-100 transition-all"
              >
                {item.icon}

                <div className="flex flex-col">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-sm text-gray-500">{item.handle}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="h-10"></div>
    </div>
  );
}
