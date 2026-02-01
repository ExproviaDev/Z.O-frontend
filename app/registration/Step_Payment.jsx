"use client";
import React, { useState } from "react";
import axios from "axios";
import { FaMoneyCheckAlt } from "react-icons/fa";

export default function Step_Payment({ amount, prevStep }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/bkash/create`, { amount });
      if (res.data.bkashURL) {
        window.location.href = res.data.bkashURL; // bKash-e niye jabe
      }
    } catch (err) {
      alert("Payment initiation failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center space-y-6">
      <FaMoneyCheckAlt size={50} className="mx-auto text-Primary" />
      <h2 className="text-2xl font-bold">Registration Fee: {amount} BDT</h2>
      <p>Please complete the payment to set your account password.</p>
      <div className="flex justify-between mt-8">
        <button onClick={prevStep} className="btn btn-outline">Back</button>
        <button onClick={handlePayment} disabled={loading} className="btn bg-Primary text-white">
          {loading ? "Loading..." : "Pay with bKash"}
        </button>
      </div>
    </div>
  );
}