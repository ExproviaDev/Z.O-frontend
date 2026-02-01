"use client"

import React, { useState } from 'react';
import { FaExternalLinkAlt, FaEye, FaAward } from 'react-icons/fa'; // FaDownload এর বদলে FaExternalLinkAlt ব্যবহার করা হয়েছে
import { motion, AnimatePresence } from 'framer-motion';

const MyCertificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = [
    {
      id: 1,
      title: "Mastering TypeScript & Node.js",
      issueDate: "Dec 12, 2024",
      instructor: "Dr. Jane Doe",
      image: "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766673234/gettyimages-690545448-612x612_gfo7px.jpg",
      // আপনার দেওয়া ডেমো ডাউনলোড লিঙ্ক (এখানে ড্রাইভ বা অন্য লিঙ্ক হবে)
      downloadUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", 
    },
    {
      id: 2,
      title: "Full Stack Web Development",
      issueDate: "Nov 05, 2024",
      instructor: "Alex Shatter",
      image: "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766673234/modern-elegant-certificate-template-free-vector_tdxgyo.jpg",
      downloadUrl: "https://www.africau.edu/images/default/sample.pdf",
    },
    {
      id: 3,
      title: "Full Stack Web Development",
      issueDate: "Nov 05, 2024",
      instructor: "Alex Shatter",
      image: "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766673363/images_2_uhaup2.jpg",
      downloadUrl: "https://www.africau.edu/images/default/sample.pdf",
    },
    {
      id: 4,
      title: "Full Stack Web Development",
      issueDate: "Nov 05, 2024",
      instructor: "Alex Shatter",
      image: "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766673363/images_obeqwr.png",
      downloadUrl: "https://www.africau.edu/images/default/sample.pdf",
    },
    {
      id: 5,
      title: "Full Stack Web Development",
      issueDate: "Nov 05, 2024",
      instructor: "Alex Shatter",
      image: "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766673363/modern-certificate-award-template_119644-64_ccijcz.avif",
      downloadUrl: "https://www.africau.edu/images/default/sample.pdf",
    },
    {
      id: 6,
      title: "Full Stack Web Development",
      issueDate: "Nov 05, 2024",
      instructor: "Alex Shatter",
      image: "https://res.cloudinary.com/dsga4gyw9/image/upload/v1766673363/certificate-template-vintage-vector-design-certificate-template-vintage-vector-design-background-162810127_d1vysm.webp",
      downloadUrl: "https://www.africau.edu/images/default/sample.pdf",
    },
  ];

  return (
    <div className=" p-4 md:p-8">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3 justify-center md:justify-start">
          <FaAward className="text-yellow-500" /> My Certificates
        </h1>
        <p className="text-gray-500 mt-2 font-medium">Click on the image to preview or click the button to get the PDF link.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-lg group"
          >
            {/* Image Preview Clickable */}
            <div className="relative h-52 overflow-hidden cursor-zoom-in" onClick={() => setSelectedCert(cert)}>
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <FaEye className="text-white text-3xl" />
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 leading-snug h-12 line-clamp-2">{cert.title}</h3>
              
              {/* Redirect to Download Link Button */}
              <a
                href={cert.downloadUrl}
                target="_blank" // নতুন ট্যাবে ওপেন হবে
                rel="noopener noreferrer"
                className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-100"
              >
                <FaExternalLinkAlt size={14} /> Get PDF Link
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for Preview */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <div className="relative max-w-5xl w-full">
              <img src={selectedCert.image} className="w-full h-auto rounded-lg shadow-2xl border-4 border-white/10" alt="Large Preview" />
              <div className="mt-6 flex justify-center gap-4">
                <a 
                   href={selectedCert.downloadUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="bg-white text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-200 shadow-xl"
                   onClick={(e) => e.stopPropagation()} // ক্লিক করলে যেন মডাল বন্ধ না হয়
                >
                  <FaExternalLinkAlt /> Open PDF Link
                </a>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="text-white font-bold px-8 py-3 border border-white/30 rounded-full hover:bg-white/10"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyCertificates;