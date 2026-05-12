"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function AuthWrapper({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get("utm_source");
    if (!source) return;

    const existingSource = localStorage.getItem("lead_source");
    if (!existingSource) {
      localStorage.setItem("lead_source", source);
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