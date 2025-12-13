import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header></Header>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a4500141773cb8d176be7e8aee96914d8c6bdc9f
        <main className="min-h-screen mx-auto ">
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </main>
<<<<<<< HEAD
=======
        <main className="min-h-screen mx-auto ">{children}</main>
>>>>>>> bd4c452e266031866d0ec39c6d3aa4e91d1a9d80
=======
>>>>>>> a4500141773cb8d176be7e8aee96914d8c6bdc9f
        <Footer></Footer>
      </body>
    </html>
  );
}
