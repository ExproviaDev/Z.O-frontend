"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { MdErrorOutline } from "react-icons/md";

function FailureContent() {
  const searchParams = useSearchParams();
  
  // URL থেকে মেসেজ এবং ইনভয়েস ধরা হচ্ছে
  const errorMessage = searchParams.get("message") || "Payment processing failed due to an unknown error.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center border border-gray-100">
        
        {/* Error Icon */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6">
          <MdErrorOutline className="h-10 w-10 text-red-600" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
          Payment Failed!
        </h2>

        {/* Dynamic Error Message */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-700 font-medium text-lg">
                {errorMessage}
            </p>
        </div>

        <p className="text-gray-500 mb-8 text-sm">
          We couldn't process your payment. Please try again or contact support if the issue persists.
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/registration?step=3"> 
            <button className="w-full btn bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-md">
              Try Again
            </button>
          </Link>
          
          <Link href="/">
            <button className="w-full btn btn-ghost text-gray-600 hover:bg-gray-100 font-semibold py-3 px-4 rounded-xl transition duration-300">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <FailureContent />
    </Suspense>
  );
}