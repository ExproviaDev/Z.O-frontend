"use client"
import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,bn',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    if (!document.querySelector('script[src*="translate_a/element.js"]')) {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    const removeGoogleBanner = () => {
      const banner = document.querySelector(".goog-te-banner-frame");
      const bannerContainer = document.querySelector(".VIpgJd-ZVi9od-ORHb"); 
      const googleIframe = document.querySelector('iframe[id*=":1.container"]');
      const googleIframe2 = document.querySelector('iframe[id*=":2.container"]');
      
      if (banner) banner.remove();
      if (bannerContainer) bannerContainer.remove();
      if (googleIframe) googleIframe.remove();
      if (googleIframe2) googleIframe2.remove();

      document.body.style.top = "0px";
      document.body.style.position = "static";
    };

    const interval = setInterval(removeGoogleBanner, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-block">
      <div id="google_translate_element"></div>
      
      <style jsx global>{`
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
        }

        .goog-te-gadget-simple span {
          color: white !important;
        }
      `}</style>
    </div>
  );
}