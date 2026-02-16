"use client";
import { useEffect, useState } from "react";
import Script from "next/script";

export default function GoogleTranslate() {
  const [selected, setSelected] = useState("en");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    const langCookie = cookies.find((c) => c.trim().startsWith("googtrans="));
    if (langCookie) {
      const lang = langCookie.split("/").pop();
      setSelected(lang);
    }
  }, []);

  const handleLanguageChange = (lang) => {
    const hostname = window.location.hostname;

    document.cookie = `googtrans=/auto/${lang}; path=/`;

    if (hostname !== "localhost") {
      document.cookie = `googtrans=/auto/${lang}; path=/; domain=zeroolympiad.faatihaaayat.com`;
      document.cookie = `googtrans=/auto/${lang}; path=/; domain=.faatihaaayat.com`;
    }

    setSelected(lang);
    setIsOpen(false);

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const googleTranslateInit = () => {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,bn",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    }
  };

  return (
    <>
      <div className="relative inline-block z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-[#111111] border border-[#333] rounded-full text-white text-sm hover:bg-black transition-all shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>

          <span className="font-medium">
            {selected === "en" ? "English" : "বাংলা"}
          </span>

          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-[#111111] border border-[#333] rounded-xl shadow-xl overflow-hidden py-1 animate-in fade-in slide-in-from-top-2">
            <button
              onClick={() => handleLanguageChange("en")}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${selected === "en" ? "bg-[#222] text-white font-bold" : "text-gray-300 hover:bg-[#222]"
                }`}
            >
              English
            </button>
            <button
              onClick={() => handleLanguageChange("bn")}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${selected === "bn" ? "bg-[#222] text-white font-bold" : "text-gray-300 hover:bg-[#222]"
                }`}
            >
              বাংলা
            </button>
          </div>
        )}
      </div>

      <div
        id="google_translate_element"
        style={{
          width: "0px",
          height: "0px",
          overflow: "hidden",
          position: "absolute",
          left: "-9999px",
          visibility: "hidden",
        }}
      ></div>

      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        onLoad={() => {
          window.googleTranslateElementInit = googleTranslateInit;
        }}
        strategy="afterInteractive"
      />

      <style jsx global>{`
        .goog-te-banner-frame { display: none !important; }
        .goog-te-banner-frame.skiptranslate { display: none !important; }
        
        body { top: 0px !important; position: static !important; }
        
        .goog-tooltip { display: none !important; }
        .goog-tooltip:hover { display: none !important; }
        
        .goog-text-highlight {
          background-color: transparent !important;
          box-shadow: none !important;
        }
        
        .goog-te-gadget-icon { display: none !important; }
        .goog-te-gadget-simple { display: none !important; }
      `}</style>
    </>
  );
}