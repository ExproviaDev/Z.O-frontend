"use client";

import { AiOutlinePlayCircle } from "react-icons/ai";

export default function StartModal({ onStart }) {
  return (
    <div className="fixed inset-0 px-5 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm text-center space-y-4">
        <AiOutlinePlayCircle className="text-Primary mx-auto w-12 h-12" />
        <h2 className="text-2xl font-bold text-Primary">Welcome to the Quiz!</h2>
        <p className="text-gray-600">
          You have 10 minutes to complete the quiz. Click Start when you're ready.
        </p>
        <button
          onClick={onStart}
          className="bg-Primary mx-auto mt-6 text-white px-6 py-2 rounded-lg hover:bg-Primary/90 transition flex items-center gap-2 justify-center"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
