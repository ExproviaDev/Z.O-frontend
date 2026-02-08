"use client";
import React, { useState } from "react";
import axios from "axios";
import { FaMoneyCheckAlt } from "react-icons/fa";

// ✅ props এ formData রিসিভ করুন
export default function Step_Payment({ amount, prevStep, formData }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    // ✅ UPDATE: bKash এ যাওয়ার আগে ডাটা সেভ করা
    if (formData) {
        localStorage.setItem("reg_formData", JSON.stringify(formData));
    }

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/bkash/create`, { amount });
      if (res.data.bkashURL) {
        window.location.href = res.data.bkashURL; 
      }
    } catch (err) {
      alert("Payment initiation failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center space-y-6">
      <FaMoneyCheckAlt size={50} className="mx-auto text-black" />
      <h2 className="text-2xl font-bold">Registration Fee: {amount} BDT</h2>
      <p>Please complete the payment to set your account password.</p>
      <div className="flex justify-between mt-8">
        <button onClick={prevStep} className="btn btn-outline">Back</button>
        <button onClick={handlePayment} disabled={loading} className="btn bg-black text-white">
          {loading ? "Loading..." : "Pay with bKash"}
        </button>
      </div>
    </div>
  );
}