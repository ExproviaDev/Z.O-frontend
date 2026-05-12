"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Covers the entire viewport (via document.body portal), same UX for login + dashboard entry.
 */
export default function FullPageLoader({
  open,
  title = "Loading",
  subtitle = "",
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open || typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted || !open) return null;

  const node = (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-[#0F172A] via-[#0c1428] to-[#020617] text-white"
      role="progressbar"
      aria-busy="true"
      aria-live="polite"
      aria-label={title}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center px-8">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-emerald-400 border-r-emerald-300/60" />
        </div>
        <p className="mt-8 text-center text-lg font-semibold tracking-tight text-white">
          {title}
        </p>
        {subtitle ? (
          <p className="mt-2 max-w-xs text-center text-sm text-slate-400 leading-relaxed">
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
