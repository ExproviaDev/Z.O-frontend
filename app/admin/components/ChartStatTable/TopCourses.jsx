import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const TopCourses = () => {
  const [courses, setCourses] = useState([]);
  const [showAllCourses, setShowAllCourses] = useState(false);

  useEffect(() => {
    fetch('/courses.json')
      .then((response) => response.json())
      .then((data) => setCourses(data.courses))
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  const toggleCourses = () => {
    setShowAllCourses((prevState) => !prevState);
  };

  // প্রথমে ৩টি দেখাবে, View All ক্লিক করলে সব দেখাবে
  const coursesToShow = showAllCourses ? courses : courses.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto mt-16  p-4">
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="flex justify-between items-center p-6 pb-2">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">Top Courses</h2>
          <button 
            onClick={toggleCourses}
            className="px-4 py-1.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
          >
            {showAllCourses ? 'Show Less' : 'View All'}
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-[11px] uppercase tracking-widest border-b border-gray-50">
                <th className="px-6 py-4 font-bold">Coureses</th>
                <th className="px-6 py-4 font-bold text-center">Rating</th>
                <th className="px-6 py-4 font-bold text-center">Total Enroll</th>
                <th className="px-6 py-4 font-bold text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {coursesToShow.map((course, index) => (
                <tr key={index} className="group hover:bg-blue-50/30 transition-colors">
                  {/* Course Title & Icon */}
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-50">
                      <img
                        src={course.image_url}
                        alt={course.course_title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-semibold text-gray-700 text-[15px] group-hover:text-blue-600 transition-colors">
                      {course.course_title}
                    </span>
                  </td>

                  {/* Rating */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <FaStar className="text-orange-400 text-sm" />
                      <span className="text-gray-700 font-bold text-sm">{course.rating.toFixed(1)}</span>
                    </div>
                  </td>

                  {/* Enrollments */}
                  <td className="px-6 py-4 text-center text-gray-600 font-medium text-sm">
                    {course.total_enrollments.toLocaleString()}
                  </td>

                  {/* Revenue */}
                  <td className="px-6 py-4 text-right">
                    <span className="text-gray-900 font-bold text-sm">
                      ${course.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer (Optional empty space for padding) */}
        <div className="h-4"></div>
      </div>
    </div>
  );
};

export default TopCourses;