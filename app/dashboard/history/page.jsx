"use client";
import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { pdf } from "@react-pdf/renderer"; // 🔥 Import pdf function
import { FiPrinter, FiAlertCircle } from "react-icons/fi";
import InvoiceDocument from "./Components/InvoiceDocument"; // 🔥 Import the document we made

// ডাটা ফেচিং ফাংশন
const fetchUserInvoice = async () => {
  const token = localStorage.getItem("access_token");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  if (!token) throw new Error("No access token found.");
  const res = await axios.get(`${API_URL}/api/invoice/my-invoice`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

export default function InvoicePage() {
  const [isGenerating, setIsGenerating] = useState(false);

  // ১. ডাটা ফেচ করা
  const { data: invoice, isLoading, isError, error } = useQuery({
    queryKey: ["my-invoice"],
    queryFn: fetchUserInvoice,
    staleTime: Infinity,
  });

  // ২. নতুন ট্যাবে PDF ওপেন করার ফাংশন 🔥
  const handleOpenPDF = async () => {
    setIsGenerating(true);
    try {
      // PDF Blob তৈরি করা
      const blob = await pdf(<InvoiceDocument invoice={invoice} />).toBlob();
      // Blob URL তৈরি করা
      const url = URL.createObjectURL(blob);
      // নতুন ট্যাবে ওপেন করা
      window.open(url, '_blank');
    } catch (err) {
      console.error("PDF Generation Error:", err);
      alert("Failed to open PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) return <div className="text-center p-10">Loading invoice data...</div>;
  
  if (isError) return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-red-500">
        <FiAlertCircle size={40} className="mb-2"/>
        <p>Failed to load invoice information.</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      
      {/* অ্যাকশন এরিয়া */}
      <div className="flex flex-col items-center justify-center bg-white p-10 rounded-2xl shadow-lg border border-gray-100 text-center space-y-4">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
            Z
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Your Invoice is Ready!</h1>
        <p className="text-gray-500 max-w-md">
            Click the button below to open your official invoice PDF in a new tab. You can download or print it from there.
        </p>
        
        <button 
          onClick={handleOpenPDF}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>Generating PDF...</>
          ) : (
            <>
                <FiPrinter className="text-xl" /> Open PDF Invoice
            </>
          )}
        </button>
      </div>

      {/* প্রিভিউ সেকশন (যদি চান ইউজার পেজেই একটু দেখুক) */}
      <div className="opacity-50 pointer-events-none blur-[1px] select-none" aria-hidden="true">
          {/* এখানে আপনার আগের HTML ডিজাইনটা রাখতে পারেন শুধু ভিজ্যুয়াল ফিল দেওয়ার জন্য, 
              অথবা এটি বাদ দিলেও সমস্যা নেই। ইউজার তো বাটনে ক্লিক করেই আসলটা দেখবে। */}
          <div className="bg-white p-8 rounded border">
             <h2 className="text-xl font-bold text-gray-400">Invoice Preview</h2>
             <p>Invoice #{invoice.invoice_id}</p>
             {/* ... */}
          </div>
      </div>

    </div>
  );
}