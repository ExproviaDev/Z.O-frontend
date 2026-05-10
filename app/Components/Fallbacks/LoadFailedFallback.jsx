"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  FiAlertTriangle,
  FiLogOut,
  FiRefreshCw,
  FiClock,
  FiWifiOff,
} from "react-icons/fi";
import { logout } from "../../store/slices/authSlice";

/**
 * Detects whether an error from useQuery / fetch / axios looks like an
 * auth/session problem. We treat any of these as "session expired":
 *   - HTTP 401 / 403
 *   - error message contains "session", "expired", "unauthorized", "token"
 */
function isAuthError(error) {
  if (!error) return false;
  const status = error?.response?.status ?? error?.status;
  if (status === 401 || status === 403) return true;
  const raw =
    error?.response?.data?.error ||
    error?.response?.data?.message ||
    error?.message ||
    "";
  const msg = String(raw).toLowerCase();
  return (
    msg.includes("session") ||
    msg.includes("expired") ||
    msg.includes("unauthor") ||
    msg.includes("invalid token") ||
    msg.includes("jwt") ||
    msg.includes("no access token")
  );
}

function isNetworkError(error) {
  if (!error) return false;
  if (error?.message === "Network Error") return true;
  if (error?.code === "ERR_NETWORK") return true;
  if (typeof navigator !== "undefined" && navigator.onLine === false) return true;
  return false;
}

/**
 * Friendly fallback UI for when a query/page fails to load its data.
 *
 * Props:
 *  - error: the error object from useQuery (optional but recommended)
 *  - title: optional override for the title
 *  - description: optional override for the description
 *  - onRetry: optional retry handler (e.g. () => refetch())
 *  - compact: small inline variant for cards/sections (default false)
 */
export default function LoadFailedFallback({
  error,
  title,
  description,
  onRetry,
  compact = false,
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const variant = useMemo(() => {
    if (isAuthError(error)) return "session";
    if (isNetworkError(error)) return "network";
    return "generic";
  }, [error]);

  const goLogin = () => {
    try {
      dispatch(logout());
    } catch {
      // logout reducer already clears storage, but be defensive
    }
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_data");
        localStorage.removeItem("active_quiz");
      } catch {}
    }
    router.replace("/login");
  };

  const config = {
    session: {
      icon: <FiClock className="text-amber-500" size={compact ? 28 : 36} />,
      tone: {
        bg: "bg-amber-50",
        ring: "ring-amber-200",
        border: "border-amber-200",
      },
      title: title || "Your session has expired",
      description:
        description ||
        "For your security, please log out and sign in again to continue.",
      primaryLabel: "Logout & Login Again",
      primaryAction: goLogin,
      showRetry: false,
    },
    network: {
      icon: <FiWifiOff className="text-slate-500" size={compact ? 28 : 36} />,
      tone: {
        bg: "bg-slate-50",
        ring: "ring-slate-200",
        border: "border-slate-200",
      },
      title: title || "Connection problem",
      description:
        description ||
        "We couldn't reach the server. Please check your internet and try again.",
      primaryLabel: "Try Again",
      primaryAction: onRetry,
      showRetry: !!onRetry,
    },
    generic: {
      icon: <FiAlertTriangle className="text-amber-500" size={compact ? 28 : 36} />,
      tone: {
        bg: "bg-amber-50",
        ring: "ring-amber-200",
        border: "border-amber-200",
      },
      title: title || "Couldn't load this section",
      description:
        description ||
        "Something went wrong while loading. You can retry, or sign in again if the issue continues.",
      primaryLabel: onRetry ? "Try Again" : "Logout & Login Again",
      primaryAction: onRetry || goLogin,
      showRetry: !!onRetry,
    },
  }[variant];

  const wrapperClass = compact
    ? "w-full"
    : "w-full min-h-[60vh] flex items-center justify-center p-4";

  return (
    <div className={wrapperClass}>
      <div
        className={[
          "w-full max-w-md mx-auto text-center",
          "rounded-2xl border bg-white shadow-sm",
          compact ? "p-5" : "p-8 md:p-10",
          config.tone.border,
        ].join(" ")}
      >
        <div
          className={[
            "mx-auto mb-4 flex items-center justify-center rounded-full ring-4",
            config.tone.bg,
            config.tone.ring,
            compact ? "h-12 w-12" : "h-16 w-16",
          ].join(" ")}
        >
          {config.icon}
        </div>

        <h3
          className={[
            "font-bold text-slate-800",
            compact ? "text-base" : "text-xl",
          ].join(" ")}
        >
          {config.title}
        </h3>

        <p
          className={[
            "mt-2 text-slate-500 leading-relaxed",
            compact ? "text-xs" : "text-sm",
          ].join(" ")}
        >
          {config.description}
        </p>

        <div
          className={[
            "mt-5 flex flex-col gap-2",
            compact ? "" : "sm:flex-row sm:justify-center",
          ].join(" ")}
        >
          {config.showRetry && (
            <button
              type="button"
              onClick={config.primaryAction}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F172A] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#020617] active:scale-[0.99]"
            >
              <FiRefreshCw />
              {config.primaryLabel}
            </button>
          )}

          {!config.showRetry && (
            <button
              type="button"
              onClick={config.primaryAction}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F172A] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#020617] active:scale-[0.99]"
            >
              <FiLogOut />
              {config.primaryLabel}
            </button>
          )}

          {/* For network/generic with retry, also show a secondary "Login again" link */}
          {config.showRetry && (
            <button
              type="button"
              onClick={goLogin}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <FiLogOut />
              Logout & Login Again
            </button>
          )}
        </div>

        {process.env.NODE_ENV === "development" && error?.message && (
          <p className="mt-4 text-[11px] text-slate-400 font-mono break-all">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
}
