// app/layout.js (Server Component)

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Header, Footer, ReduxProvider আর এখানে রাখবেন না, কারণ এগুলো ক্লায়েন্ট কম্পোনেন্টের ভেতরে যাবে।

// আপনার ফন্টের কোড ঠিক আছে
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. metadata এখানে export করুন (এটি Server Component এর জন্য)
export const metadata = {
  title: "Zero Olympiad",
  description: "Zero Olympiad by Faatiha Ayat",
};

// 2. Client Layout Wrapper ইম্পোর্ট করুন
import ConditionalLayout from './ConditionalLayout';

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 3. সমস্ত কন্টেন্ট এখন ConditionalLayout-এর মাধ্যমে পাস হবে */}
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}