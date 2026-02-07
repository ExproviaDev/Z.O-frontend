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