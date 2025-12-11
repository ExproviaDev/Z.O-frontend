"use client";

import Link from "next/link";

export default function TimeUpModal({ show, onSubmit, onQuit }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-0.1 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg text-center max-w-sm">
                <h2 className="text-xl font-semibold mb-4">Time is up!</h2>
                <p className="mb-6">You can either submit your answers or quit the quiz.</p>
                <button
                    onClick={onSubmit}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                    Submit Answers
                </button>
                <Link href={"/"}>
                    <button
                        onClick={onQuit}
                        className="ml-4 bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
                    >
                        Quit Quiz
                    </button>
                </Link>
            </div>
        </div>
    );
}
