"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, stopLoading } from "./store/slices/authSlice";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function AuthWrapper({ children }) {
  const dispatch = useDispatch();
  
  // ১. স্টোর আপডেট অনুযায়ী এখানে 'auth' ব্যবহার করুন
  const { user, loading } = useSelector((state) => state.auth); 
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const token = localStorage.getItem("access_token");

    if (token) {
      if (!user) {
        dispatch(fetchUserProfile(token));
      }
    } else {
      dispatch(stopLoading());
    }
  }, [dispatch, user]);
  // 🔥 নতুন যোগ করা অংশ: UTM Tracking Logic (First Touch)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const source = urlParams.get('utm_source');
      
      if (source) {
        // ১. আগে চেক করবে লোকাল স্টোরেজে অলরেডি কিছু আছে কি না
        const existingSource = localStorage.getItem('lead_source');
        
        // ২. যদি না থাকে (খালি হয়), শুধুমাত্র তখনই নতুনটা সেভ করবে
        if (!existingSource) {
          localStorage.setItem('lead_source', source);
          console.log("✅ First time UTM saved:", source);
        } else {
          console.log("ℹ️ UTM already exists. Keeping the old one:", existingSource);
        }
      }
    }
  }, []);
  if (!isMounted) return null;

  return <>{children}</>;
}

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  const routesToHideHeaderFooter = [
    "/admin",
    "/login",
    "/registration",
    "/dashboard",
    '/quiz',
  ];

  const shouldHideHeaderFooter = routesToHideHeaderFooter.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <AuthWrapper>
      {!shouldHideHeaderFooter && <Header />}
      <main className="min-h-screen mx-auto">{children}</main>
      {!shouldHideHeaderFooter && <Footer />}
    </AuthWrapper>
  );
}