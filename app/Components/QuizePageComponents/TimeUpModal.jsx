"use client";

import Link from "next/link";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export default function TimeUpModal({ show, onSubmit, onQuit }) {
  if (!show) return null;

  return (
    <div className="fixed px-5 inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm text-center space-y-4">
        <AiOutlineCloseCircle className="text-Primary mx-auto w-12 h-12" />
        <h2 className="text-2xl font-bold text-Primary">Time is up!</h2>
        <p className="text-gray-600">You can submit your answers or quit the quiz.</p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onSubmit}
            className="flex items-center gap-2 justify-center bg-Primary text-white px-4 py-2 rounded-lg hover:bg-Primary/90 transition"
          >
            <AiOutlineCheckCircle /> Submit Answers
          </button>
          <Link href={"/"}>
            <button
              onClick={onQuit}
              className="flex items-center gap-2  justify-center border border-Primary text-Primary px-2 py-2 rounded-lg hover:bg-Primary/10 transition"
            >
              <AiOutlineCloseCircle /> Quit Quiz
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
