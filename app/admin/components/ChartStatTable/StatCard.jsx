// "use client"


import { FaUserGraduate, FaBookOpen, FaCheckCircle, FaDollarSign } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);

  // IntersectionObserver to trigger animation when the section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Check if the section is in view
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Set visibility to true when section is in view
            observer.unobserve(entry.target); // Stop observing once the animation is triggered
          }
        });
      },
      { threshold: 0.1 } // Trigger animation when 10% of the section is in view
    );

    const section = document.getElementById('stats-section');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
   <section id="stats-section" className="py-16 bg-gray-100">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Total Students */}
      <div
        className={`w-full text-center p-6 bg-white rounded-xl shadow-lg transition-all duration-700 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}
      >
        <FaUserGraduate className="mx-auto text-4xl text-blue-500 mb-4" />
        <h3 className="text-xl font-semibold">Total Students</h3>
        <p className="text-3xl font-bold text-gray-800">18K</p>
      </div>

      {/* Total Enrolled Courses */}
      <div
        className={`w-full text-center p-6 bg-white rounded-xl shadow-lg transition-all duration-700 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}
      >
        <FaBookOpen className="mx-auto text-4xl text-green-500 mb-4" />
        <h3 className="text-xl font-semibold">Total Enrolled Courses</h3>
        <p className="text-3xl font-bold text-gray-800">13K</p>
      </div>

      {/* Total Subscription */}
      <div
        className={`w-full text-center p-6 bg-white rounded-xl shadow-lg transition-all duration-700 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}
      >
        <FaCheckCircle className="mx-auto text-4xl text-yellow-500 mb-4" />
        <h3 className="text-xl font-semibold">Total Subscription</h3>
        <p className="text-3xl font-bold text-gray-800">10K</p>
      </div>

      {/* Total Revenue */}
      <div
        className={`w-full text-center p-6 bg-white rounded-xl shadow-lg transition-all duration-700 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}
      >
        <FaDollarSign className="mx-auto text-4xl text-red-500 mb-4" />
        <h3 className="text-xl font-semibold">Total Revenue</h3>
        <p className="text-3xl font-bold text-gray-800">$4.5k</p>
      </div>
    </div>
  </div>
</section>

  );
}
