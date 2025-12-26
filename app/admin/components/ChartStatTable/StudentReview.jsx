"use client";

import { useState } from "react";
import { FaStar, FaTrashAlt, FaExternalLinkAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const initialReviews = [
  {
    id: 1,
    name: "Alaxe Smith",
    course: "Course - SaaS Design Learning",
    rating: 5,
    review:
      "This is wonderful course for beginner. It is great for Light photo be very high professional.",
    date: "26 Oct, 2024",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 2,
    name: "Jonson Anderson",
    course: "Course - SaaS Design Learning",
    rating: 4,
    review:
      "It is one of the best Figma course forever never I seen before, recommended this for beginner.",
    date: "25 Oct, 2024",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    id: 3,
    name: "Jonson Anderson",
    course: "Course - SaaS Design Learning",
    rating: 4,
    review:
      "It is one of the best Figma course forever never I seen before, recommended this for beginner.",
    date: "25 Oct, 2024",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    id: 4,
    name: "Jonson Anderson",
    course: "Course - SaaS Design Learning",
    rating: 4,
    review:
      "It is one of the best Figma course forever never I seen before, recommended this for beginner.",
    date: "25 Oct, 2024",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState(initialReviews);
  const [editItem, setEditItem] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // SweetAlert Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        setReviews((prev) =>
          prev.filter((item) => item.id !== id)
        );

        Swal.fire({
          title: "Deleted!",
          text: "Review has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Save edited review
  const handleSave = () => {
    setReviews((prev) =>
      prev.map((item) =>
        item.id === editItem.id ? editItem : item
      )
    );
    setEditItem(null);

    Swal.fire({
      title: "Updated!",
      text: "Review updated successfully.",
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  // show only 3 initially
  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <>
      <section className="bg-base-200  p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Reviews from Students
          </h2>

          {reviews.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn text-sm text-gray-500 hover:text-gray-800"
            >
              {showAll ? "View Less" : "View More"}
            </button>
          )}
        </div>

        {/* Reviews */}
        <div className="space-y-6">
          {visibleReviews.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-4"
            >
              {/* Left */}
              <div className="flex gap-4">
                <img
                  src={item.avatar}
                  className="w-12 h-12 rounded-full"
                  alt={item.name}
                />

                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.course}
                  </p>

                  <div className="flex items-center gap-1 my-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <FaStar
                        key={i}
                        className="text-yellow-400 text-sm"
                      />
                    ))}
                    <span className="text-sm ml-1">
                      {item.rating}.0
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 max-w-xl">
                    {item.review}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4 text-gray-400">
                <span className="text-sm">{item.date}</span>

                <FaTrashAlt
                  onClick={() => handleDelete(item.id)}
                  className="cursor-pointer hover:text-red-500"
                />

                <FaExternalLinkAlt
                  onClick={() => setEditItem(item)}
                  className="cursor-pointer hover:text-gray-700"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              Edit Review
            </h3>

            <input
              className="w-full border p-2 rounded mb-3"
              value={editItem.name}
              onChange={(e) =>
                setEditItem({
                  ...editItem,
                  name: e.target.value,
                })
              }
            />

            <textarea
              className="w-full border p-2 rounded mb-4"
              rows="4"
              value={editItem.review}
              onChange={(e) =>
                setEditItem({
                  ...editItem,
                  review: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditItem(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
