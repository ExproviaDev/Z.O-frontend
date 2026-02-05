"use client";
import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,bn",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };

    if (!document.querySelector('script[src*="translate_a/element.js"]')) {
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    const removeGoogleBanner = () => {
      const banner = document.querySelector(".goog-te-banner-frame");
      const bannerContainer = document.querySelector(".VIpgJd-ZVi9od-ORHb");
      const googleIframe = document.querySelector('iframe[id*=":1.container"]');
      const googleIframe2 = document.querySelector(
        'iframe[id*=":2.container"]',
      );

      if (banner) banner.remove();
      if (bannerContainer) bannerContainer.remove();
      if (googleIframe) googleIframe.remove();
      if (googleIframe2) googleIframe2.remove();

      document.body.style.top = "0px";
      document.body.style.position = "static";

      const isBengali = document.cookie.includes("/en/bn");

      const googleSpan = document.querySelector(
        ".goog-te-gadget-simple span:first-child",
      );
      if (googleSpan) {
        googleSpan.innerText = isBengali ? "ভাষা বেছে নিন" : "Select Language";
      }

      const menuFrames = document.querySelectorAll(".goog-te-menu-frame");
      menuFrames.forEach((frame) => {
        try {
          const frameDoc =
            frame.contentDocument || frame.contentWindow.document;
          if (frameDoc) {
            const menuItems = frameDoc.querySelectorAll(
              ".goog-te-menu2-item span.text",
            );
            menuItems.forEach((item) => {
              const text = item.innerText.trim();
              if (isBengali) {
                if (text.toLowerCase() === "bengali") item.innerText = "বাংলা";
                if (text.toLowerCase() === "english") item.innerText = "ইংরেজি";
              } else {
                if (text === "বাংলা") item.innerText = "Bengali";
                if (text === "ইংরেজি") item.innerText = "English";
              }
            });
          }
        } catch (e) {}
      });
    };

    const interval = setInterval(removeGoogleBanner, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block">
      <div id="google_translate_element"></div>

      <style jsx global>{`
        .goog-te-menu-frame {
          z-index: 99999999 !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
          border: none !important;
          border-radius: 8px !important;
        }

        .goog-te-banner-frame,
        .goog-te-banner,
        .VIpgJd-ZVi9od-ORHb,
        #goog-gt-tt,
        .goog-te-balloon-frame,
        iframe.goog-te-banner-frame,
        iframe[id*=":1.container"],
        iframe[id*=":2.container"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
        }

        body {
          top: 0px !important;
          position: static !important;
        }

        .goog-te-gadget-icon,
        .goog-te-gadget-simple img,
        .goog-te-menu-value span:nth-child(3),
        .goog-te-menu-value span:nth-child(5) {
          display: none !important;
        }

        .goog-te-gadget-simple {
          background-color: #111111 !important;
          border: 1px solid #333 !important;
          padding: 8px 16px !important;
          border-radius: 999px !important;
          display: flex !important;
          align-items: center !important;
          color: white !important;
          cursor: pointer !important;
        }

        .goog-te-gadget-simple span {
          color: white !important;
          font-family: inherit !important;
          font-size: 14px !important;
        }
      `}</style>
    </div>
  );
}
