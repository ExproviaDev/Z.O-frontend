"use client";

export default function StartModal({ onStart }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg text-center max-w-sm">
        <h2 className="text-2xl font-semibold mb-4">Welcome to the Quiz!</h2>
        <p className="text-gray-600 mb-6">
          You have 10 minutes to complete the quiz. Click Start when you're ready.
        </p>
        <button
          onClick={onStart}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
