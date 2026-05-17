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

// Google Translate is disabled on /quiz (see app/quiz/page.jsx). When the user
// leaves the quiz, restore the language they originally had selected so the
// rest of the app keeps working in their preferred language.
function GoogleTranslateRestorer({ pathname }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname?.startsWith("/quiz")) return;

    const savedLang = sessionStorage.getItem("quiz_prev_lang");
    if (!savedLang || savedLang === "en") return;

    sessionStorage.removeItem("quiz_prev_lang");

    const hostname = window.location.hostname;
    document.cookie = `googtrans=/auto/${savedLang}; path=/`;
    if (hostname && hostname !== "localhost") {
      document.cookie = `googtrans=/auto/${savedLang}; path=/; domain=${hostname}`;
      document.cookie = `googtrans=/auto/${savedLang}; path=/; domain=.${hostname}`;
    }

    window.location.reload();
  }, [pathname]);

  return null;
}

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  const routesToHideHeaderFooter = [
    "/admin",
    "/login",
    "/registration-full",
    "/dashboard",
    '/quiz',
  ];

  const shouldHideHeaderFooter = routesToHideHeaderFooter.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <AuthWrapper>
      <GoogleTranslateRestorer pathname={pathname} />
      {!shouldHideHeaderFooter && <Header />}
      <main className="min-h-screen mx-auto">{children}</main>
      {!shouldHideHeaderFooter && <Footer />}
    </AuthWrapper>
  );
}