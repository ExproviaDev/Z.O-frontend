"use client";

import { AiOutlineCheckCircle } from "react-icons/ai";

export default function FinalSubmitModal({ show, timeSpent }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 px-5 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm text-center space-y-4">
        <AiOutlineCheckCircle className="text-Primary mx-auto w-12 h-12" />
        <h2 className="text-2xl font-bold text-Primary">Thank you for completing the quiz! in time</h2>
        <p className="text-gray-600">You completed the quiz in {timeSpent}.</p>
        <button
          onClick={() => window.location.href = "/"}
          className="bg-Primary text-white px-6 py-2 rounded-lg hover:bg-Primary/90 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
