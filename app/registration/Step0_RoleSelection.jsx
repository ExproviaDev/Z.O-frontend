"use client";
import React from "react";
import { FaUserGraduate, FaUserTie, FaCheckCircle } from "react-icons/fa";

export default function Step0_RoleSelection({ formData, updateFormData, nextStep }) {
  
  const handleRoleChoice = (role) => {
    updateFormData({ role });
    // রোল সিলেক্ট করার সাথে সাথেই পরবর্তী ধাপে (Step 1) নিয়ে যাবে
    nextStep();
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="text-center">
        <h2 className="text-2xl font-black text-slate-800">Choose Your Path</h2>
        <p className="text-slate-500 mt-1">Select how you want to join the Zero Olympiad</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contestor Option */}
        <div
          onClick={() => handleRoleChoice("contestor")}
          className={`group relative p-8 border-2 rounded-[2rem] cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] flex flex-col items-center gap-4 ${
            formData.role === "contestor"
              ? "border-Primary bg-blue-50/30 shadow-xl ring-4 ring-Primary/5"
              : "border-slate-100 bg-white"
          }`}
        >
          {formData.role === "contestor" && (
            <FaCheckCircle className="absolute top-4 right-4 text-Primary text-xl" />
          )}
          <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center text-Primary group-hover:scale-110 transition-transform duration-500">
            <FaUserGraduate size={40} />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-800">Contestor</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Participate in the Olympiad, showcase your talent, and earn certificates.
            </p>
          </div>
        </div>

        {/* Ambassador Option */}
        <div
          onClick={() => handleRoleChoice("ambassador")}
          className={`group relative p-8 border-2 rounded-[2rem] cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] flex flex-col items-center gap-4 ${
            formData.role === "ambassador"
              ? "border-slate-900 bg-slate-50/50 shadow-xl ring-4 ring-slate-900/5"
              : "border-slate-100 bg-white"
          }`}
        >
          {formData.role === "ambassador" && (
            <FaCheckCircle className="absolute top-4 right-4 text-slate-900 text-xl" />
          )}
          <div className="w-20 h-20 bg-slate-200 rounded-3xl flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform duration-500">
            <FaUserTie size={40} />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-800">Ambassador</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Represent us, invite others using your custom promo code, and get benefits.
            </p>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 font-medium">
        * You can't change your role once the registration is complete.
      </p>
    </div>
  );
}