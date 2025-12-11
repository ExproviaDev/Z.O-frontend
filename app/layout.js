import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body

        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header></Header>
        <main className="min-h-screen">
          {children}
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}
