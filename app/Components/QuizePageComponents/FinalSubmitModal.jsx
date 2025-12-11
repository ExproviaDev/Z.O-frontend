"use client";

export default function FinalSubmitModal({ show, timeSpent }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg text-center max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Thank you for completing the quiz!</h2>
        <p className="mb-6">You completed the quiz in {timeSpent}.</p>
        <button
          onClick={() => window.location.href = "/dashboard"} // or any page you want to redirect
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
