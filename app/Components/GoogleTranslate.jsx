"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function GoogleTranslate() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (
      ready &&
      window.google &&
      window.google.translate &&
      window.google.translate.TranslateElement
    ) {
      const el = document.getElementById("google_translate_element");

      if (el && !el.hasChildNodes()) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,bn",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    }
  }, [ready]);

  return (
    <Script
      src="https://translate.google.com/translate_a/element.js"
      strategy="afterInteractive"
      onLoad={() => setReady(true)}
    />
  );
}
