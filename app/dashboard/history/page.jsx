"use client"

import React, { useState } from 'react';
import { FaHistory, FaDownload, FaSearch } from 'react-icons/fa';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // সরাসরি autoTable ইম্পোর্ট করা হয়েছে

const PaymentHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const transactions = [
    { id: "#TRX-98421", courseName: "Mastering TypeScript & Node.js", date: "Dec 12, 2024", amount: "1200", method: "bKash", status: "Success" },
    { id: "#TRX-87510", courseName: "Full Stack Web Development", date: "Nov 28, 2024", amount: "2500", method: "Nagad", status: "Success" },
  ];

  // PDF জেনারেট করার ফিক্সড ফাংশন
  const downloadInvoice = (trx) => {
    const doc = new jsPDF();

    // Header Design
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.text("Zero Olympiad", 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Official Payment Receipt", 14, 28);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 34);

    // Transaction Details Table (doc.autoTable এর বদলে autoTable(doc, ...) ব্যবহার করা হয়েছে)
    autoTable(doc, {
      startY: 45,
      head: [['Description', 'Details']],
      body: [
        ['Transaction ID', trx.id],
        ['Course Name', trx.courseName],
        ['Payment Method', trx.method],
        ['Date', trx.date],
        ['Status', trx.status],
        ['Total Amount', `BDT ${trx.amount}`],
      ],
      theme: 'striped',
      headStyles: { fillColor: [37, 99, 235] }, 
    });

    // Footer (doc.lastAutoTable এর বদলে autoTable এর পর ডাইনামিক পজিশন নেওয়া হয়েছে)
    const finalY = (doc).lastAutoTable.finalY || 150;
    doc.setFontSize(10);
    doc.text("Thank you for your payment!", 14, finalY + 10);
    doc.text("This is a computer-generated receipt.", 14, finalY + 16);

    // Save PDF
    doc.save(`Invoice-${trx.id}.pdf`);
  };

  const filteredTransactions = transactions.filter(item =>
    item.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" p-4 md:p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
          <FaHistory className="text-blue-600" /> Payment History
        </h1>
        <p className="text-gray-500 mt-2 font-medium">Download your payment slips for official records.</p>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Trx ID</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Course</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Slip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTransactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-blue-50/20 transition-all">
                  <td className="px-8 py-5 font-mono text-sm font-bold text-blue-600">{trx.id}</td>
                  <td className="px-8 py-5">
                    <div className="font-bold text-gray-800">{trx.courseName}</div>
                    <div className="text-xs text-gray-400 italic">via {trx.method}</div>
                  </td>
                  <td className="px-8 py-5 font-black text-gray-900">BDT {trx.amount}</td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => downloadInvoice(trx)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl transition-all font-bold text-sm shadow-lg shadow-blue-100 active:scale-95"
                    >
                      <FaDownload size={12} /> Download Slip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;