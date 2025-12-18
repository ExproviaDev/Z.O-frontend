import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./store/ReduxProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata = {
  title: "Zero Olympiad",
  description: "Zero Olympiad by Faatiha Ayat",
};

import ConditionalLayout from './ConditionalLayout';

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <Analytics />
      <SpeedInsights />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}