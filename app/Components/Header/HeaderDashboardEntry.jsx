"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { RxDashboard } from "react-icons/rx";
import {
  fetchUserProfileOnce,
  primeUserProfileCache,
  resolvePostLoginHeaderPath,
} from "../../lib/hooks/useUserProfile";
import FullPageLoader from "../FullPageLoader";

/**
 * Homepage header — no `/me` on paint. Fetch only when user clicks "Dashboard".
 */
export default function HeaderDashboardEntry({
  className,
  variant = "desktop",
  iconSize = 18,
  label = "Dashboard",
  onAfterNavigate,
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [loadError, setLoadError] = useState("");

  const dismissError = useCallback(() => setLoadError(""), []);

  useEffect(() => {
    if (!loadError) return;
    const t = window.setTimeout(dismissError, 6000);
    return () => window.clearTimeout(t);
  }, [loadError, dismissError]);

  const handleClick = async () => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;
    if (!token) {
      router.push("/login");
      return;
    }

    setLoadError("");
    setBusy(true);
    try {
      const user = await fetchUserProfileOnce();
      if (!user) {
        setLoadError("We could not load your account. Please sign in again.");
        return;
      }
      primeUserProfileCache(queryClient, user);
      const path = resolvePostLoginHeaderPath(user);
      onAfterNavigate?.();
      router.push(path);
    } catch (e) {
      const msg =
        typeof e?.message === "string" ? e.message : "Something went wrong.";
      const lower = msg.toLowerCase();
      if (lower.includes("session") || lower.includes("expired")) {
        router.push("/login");
        return;
      }
      setLoadError(msg || "Unable to open your dashboard. Try again shortly.");
    } finally {
      setBusy(false);
    }
  };

  const isDesktop = variant === "desktop";

  return (
    <>
      <FullPageLoader
        open={busy}
        title="Opening your dashboard"
        subtitle="Fetching your profile…"
      />

      {loadError ? (
        <div
          role="alert"
          className="fixed bottom-6 left-1/2 z-[10000] w-[min(calc(100vw-2rem),22rem)] -translate-x-1/2 rounded-2xl border border-red-200/90 bg-white px-4 py-3 text-center text-sm font-medium text-red-700 shadow-xl"
        >
          {loadError}
          <button
            type="button"
            onClick={dismissError}
            className="mt-2 w-full rounded-lg bg-slate-100 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
          >
            Dismiss
          </button>
        </div>
      ) : null}

      {isDesktop ? (
        <button
          type="button"
          disabled={busy}
          onClick={handleClick}
          className={
            className ??
            "hidden md:flex cursor-pointer items-center gap-2 rounded-lg bg-Primary px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-opacity-90 active:scale-95 disabled:opacity-60"
          }
        >
          <RxDashboard size={iconSize} />
          {label}
        </button>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={handleClick}
          className={
            className ??
            "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-bold text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-60"
          }
        >
          <RxDashboard size={24} />
          <span>{label}</span>
        </button>
      )}
    </>
  );
}
