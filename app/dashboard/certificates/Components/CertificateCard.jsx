"use client";

import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { FiExternalLink, FiAward, FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

// 🔥 DEBUG_MODE (আপনার দরকার হলে true করতে পারেন)
const DEBUG_MODE = false; 

// 🔥 নতুন prop: validationId যোগ করা হলো
const CertificateCard = ({ userName, date, validationId }) => {
  const [loading, setLoading] = useState(false);

  const viewPdf = async () => {
    if (!userName) { toast.error("User name missing!"); return; }
    
    // ১. লোডিং উইন্ডো ওপেন (পপআপ ব্লকার বাইপাস)
    const newWindow = window.open('', '_blank');
    if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>Generating Certificate...</title></head>
            <body style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;background:#f8fafc;">
              <div style="text-align:center;">
                <div style="width:50px;height:50px;border:5px solid #ddd;border-top-color:#4f46e5;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 20px;"></div>
                <h2 style="color:#333;">Generating your certificate...</h2>
                <p style="color:#666;">Please wait a moment.</p>
                <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
              </div>
            </body>
          </html>
        `);
    }

    setLoading(true);

    try {
      const existingPdfBytes = await fetch('/certificates_round_1.pdf').then(res => {
        if (!res.ok) throw new Error("Template not found");
        return res.arrayBuffer();
      });

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica); // আইডির জন্য রেগুলার ফন্ট

      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();

      // ==========================================
      // 👇 আপনার ফিক্স করা পজিশন কনফিগারেশন 👇
      // ==========================================
      const nameYPosition = 300; 
      const nameFontSize = 32;
      const dateXPosition = 110;
      const dateYPosition = 65;
      
      // 🔥 নতুন: আইডির পজিশন (একদম নিচে মাঝখানে)
      const idYPosition = 550; 
      const idFontSize = 11;
      // ==========================================


      // ১. নাম বসানো
      const nameWidth = font.widthOfTextAtSize(userName, nameFontSize);
      firstPage.drawText(userName, {
        x: (width / 1.85) - (nameWidth / 2),
        y: nameYPosition, 
        size: nameFontSize,
        font: font,
        color: rgb(0, 0, 0),
      });

      // ২. তারিখ বসানো
      firstPage.drawText(date, {
        x: dateXPosition,
        y: dateYPosition,
        size: 14,
        font: font,
        color: rgb(0, 0, 0),
      });

      // ৩. 🔥 ভ্যালিডেশন আইডি বসানো
      if (validationId) {
          const idText = `Credential ID: ${validationId}`;
          const idWidth = fontRegular.widthOfTextAtSize(idText, idFontSize);
          
          firstPage.drawText(idText, {
            x: (width / 6) - (idWidth / 2), // মাঝখানে বসবে
            y: idYPosition, 
            size: idFontSize,
            font: fontRegular,
            color: rgb(0, 0, 0), // হালকা ধূসর রং
          });
      }

      if (DEBUG_MODE) {
         // ... Debug logic
      }

      // ৪. পিডিএফ জেনারেশন
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(blob);

      if (newWindow) {
          newWindow.location.href = pdfUrl;
      }

      toast.success("Certificate Opened in New Tab!");

    } catch (error) {
      console.error("PDF Error:", error);
      toast.error("Failed to open certificate.");
      if (newWindow) newWindow.close();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 max-w-md w-full">
      {/* Header */}
      <div className="bg-indigo-600 p-6 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm border border-white/30">
            <FiAward className="text-3xl text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">Participation Certificate</h3>
        <p className="text-indigo-100 text-sm font-medium">Round 1: Quiz Olympiad</p>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <FiCheckCircle className="text-emerald-500 text-xl" />
            <div className="overflow-hidden">
                <p className="text-xs text-slate-400 font-bold uppercase truncate">Awarded To</p>
                <p className="text-lg font-bold text-slate-800 truncate">{userName}</p>
            </div>
        </div>

        {/* 🔥 ভ্যালিডেশন আইডি ডিসপ্লে (কার্ডে দেখাবে) */}
        {validationId && (
            <div className="text-center mb-6">
                <p className="text-[10px] text-slate-700 font-mono bg-slate-100 inline-block px-3 py-1.5 rounded-md border border-slate-200 shadow-sm">
                    ID: {validationId}
                </p>
            </div>
        )}

        <button
          onClick={viewPdf}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-70 shadow-lg shadow-slate-200"
        >
          {loading ? (
            <>Generating...</>
          ) : (
            <>
              <FiExternalLink /> View Certificate
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CertificateCard;