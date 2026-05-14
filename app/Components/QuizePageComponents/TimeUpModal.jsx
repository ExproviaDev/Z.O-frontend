"use client";

import Link from "next/link";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export default function TimeUpModal({ show, onSubmit, onQuit }) {
  if (!show) return null;

  return (
    <div className="fixed px-3 sm:px-5 inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-8 w-full max-w-sm text-center space-y-3 md:space-y-4">
        <AiOutlineCloseCircle className="text-Primary mx-auto w-10 h-10 md:w-12 md:h-12" />
        <h2 className="text-lg md:text-2xl font-bold text-Primary">Time is up!</h2>
        <p className="text-xs md:text-base text-gray-600">You can submit your answers or quit the quiz.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-2.5 md:gap-4 mt-3 md:mt-4">
          <button
            onClick={onSubmit}
            className="flex items-center gap-2 justify-center bg-Primary text-white px-4 py-2.5 md:py-2 rounded-lg font-bold text-xs md:text-base hover:bg-Primary/90 transition"
          >
            <AiOutlineCheckCircle /> Submit Answers
          </button>
          <Link prefetch={false} href={"/"}>
            <button
              onClick={onQuit}
              className="w-full flex items-center gap-2 justify-center border border-Primary text-Primary px-3 py-2.5 md:py-2 rounded-lg font-bold text-xs md:text-base hover:bg-Primary/10 transition"
            >
              <AiOutlineCloseCircle /> Quit Quiz
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
