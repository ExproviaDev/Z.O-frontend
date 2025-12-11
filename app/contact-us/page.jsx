
import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { LuClock4 } from "react-icons/lu";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import Link from "next/link";

export default function Page() {
  const links = [
    {
      name: "Facebook",
      icon: <FaFacebook className="text-blue-600 text-3xl" />,
      url: "https://www.facebook.com/FaatihaAayatOfficial",
      handle: "@FaatihaAayat",
    },
    {
      name: "YouTube",
      icon: <FaYoutube className="text-red-600 text-3xl" />,
      url: "https://www.youtube.com/@FaatihaAayat",
      handle: "Faatiha Aayat",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-pink-500 text-3xl" />,
      url: "https://www.instagram.com/faatiha.aayat",
      handle: "@faatiha.aayat",
    },
  ];

  return (
    <div className="bg-white text-black px-4 md:px-10 lg:px-20">

      {/* Header */}
      <div className="flex flex-col items-center py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Contact & Support
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mt-3">
          Have questions? We're here to assist you every step of the way.
        </p>
      </div>

      {/* Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 pb-16">

        {/* Office Card */}
        <div className="bg-gray-50 border border-gray-200 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08)] rounded-2xl p-7  transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            Office Information
          </h3>

          {/* Head Office */}
          <div className="mb-8">
            <h5 className="flex items-center gap-3 text-lg font-semibold text-blue-700">
              <IoLocationSharp className="text-2xl" />
              Head Office
            </h5>
            <div className="ml-9 mt-2 text-gray-700 leading-relaxed">
              <p>House #23, Road #7</p>
              <p>Dhanmondi, Dhaka-1205</p>
              <p>Bangladesh</p>
            </div>
          </div>

          {/* Phone */}
          <div className="mb-8">
            <h5 className="flex items-center gap-3 text-lg font-semibold text-green-700">
              <FaPhoneAlt className="text-xl" />
              Phone
            </h5>
            <div className="ml-9 mt-2 text-gray-700">
              <p>+880 1234-567890</p>
              <p>+880 9876-543210</p>
            </div>
          </div>

          {/* Email */}
          <div className="mb-8">
            <h5 className="flex items-center gap-3 text-lg font-semibold text-red-700">
              <AiOutlineMail className="text-2xl" />
              Email
            </h5>
            <div className="ml-9 mt-2 text-gray-700">
              <p>info@zeroolympiad.bd</p>
              <p>support@zeroolympiad.bd</p>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h5 className="flex items-center gap-3 text-lg font-semibold text-yellow-600">
              <LuClock4 className="text-2xl" />
              Working Hours
            </h5>
            <div className="ml-9 mt-2 text-gray-700">
              <p>Saturday - Thursday</p>
              <p>9:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>

        {/* follow us  */}
        <div>
          <div className="bg-gray-50 border border-gray-200 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08)] rounded-xl p-7 
                transition-all duration-300 h-fit">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Follow Us
            </h2>

            <div className="space-y-4">
              {links.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-white gap-4 p-2 border border-gray-300 rounded-xl 
                   hover:bg-indigo-50 hover:border-indigo-300 
                   transition-all cursor-pointer"
                >
                  {item.icon}

                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">
                      {item.name}
                    </span>
                    <span className="text-sm text-gray-500">{item.handle}</span>
                  </div>
                </a>
              ))}
            </div>

          </div>
          <div className="mt-8 bg-gray-50 border border-gray-200 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08)] rounded-xl py-3 px-4 text-center">
            <h3 className="text-3xl pb-3 font-semibold">FAQ Page</h3>
           <div className="flex justify-center ">
             <hr className="w-[400px] text-gray-300" />
           </div>
            <Link
              href="/faq"
              className="block my-2  w-full  rounded-xl  font-semibold 
                 text-black hover:text-indigo-400
                 transition-all"
            >
              Introduction
            </Link>
            <Link
              href="/faq"
              className="block my-2  w-full  rounded-xl  font-semibold 
                 text-black hover:text-indigo-400
                 transition-all"
            >
              Participation
            </Link>
            <Link
              href="/faq"
              className="block my-2  w-full  rounded-xl  font-semibold 
                 text-black hover:text-indigo-400
                 transition-all"
            >
              Registration Categories
            </Link>
            <Link
              href="/faq"
              className="block my-2  w-full  rounded-xl  font-semibold 
                 text-black hover:text-indigo-400
                 transition-all"
            >
              Awards
            </Link>
            <Link
              href="/faq"
              className="block my-2  w-full  rounded-xl  font-semibold 
                 text-black hover:text-indigo-400
                 transition-all"
            >
              Timeline
            </Link>
          </div>
        </div>

      </div>


      {/* Map */}
      <div className="pt-16 pb-20">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Our Location
        </h2>

        <div className="w-full lg:h-[600px] h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-400 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.08)]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.214776761477!2d90.37298327476827!3d23.751397489219598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8a36e5ccfdf%3A0xfcf2c98f41a42a40!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1701234567890
"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

    </div>
  );
}
