"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import {
  clearUserProfileSnap,
  persistUserProfileSnap,
  readUserProfileSnapForSessionUser,
} from "../userProfileSnapshot";

/** Minimal session blob set on login — survives refresh until logout. */
const AUTH_MIN_KEY = "zo_auth_min";

/** Supabase JWT `sub` claims user id — used when LC snapshot is missing */
function readJwtSub(token) {
  if (!token || typeof token !== "string") return null;
  try {
    const part = token.split(".")[1];
    if (!part) return null;
    const padded = part.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(padded));
    return payload.sub ?? null;
  } catch {
    return null;
  }
}

function loadAuthMinimal() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_MIN_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function userProfileQueryKey(sessionUserId) {
  return [
    "user-profile",
    sessionUserId == null || sessionUserId === "" ? "__none" : String(sessionUserId),
  ];
}

async function requestMeFromNetwork() {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("zo_auth_min");
    clearUserProfileSnap();
    throw new Error("Session expired");
  }

  if (!res.ok) {
    throw new Error(`Failed to load profile (${res.status})`);
  }

  const data = await res.json();
  return data?.user || null;
}

async function profileQueryFn({ queryKey }) {
  const sessionUserId = queryKey[1];
  const user = await requestMeFromNetwork();
  if (user && sessionUserId && sessionUserId !== "__none") {
    persistUserProfileSnap(sessionUserId, user);
  }
  return user;
}

/** Explicit one-off fetch (e.g. header Dashboard click) — no useQuery on header mount. */
export async function fetchUserProfileOnce() {
  const user = await requestMeFromNetwork();
  if (user && typeof window !== "undefined") {
    const sid = user.user_id ?? user.id;
    if (sid != null) persistUserProfileSnap(String(sid), user);
  }
  return user;
}

export function primeUserProfileCache(queryClient, user) {
  const sid = user?.user_id || user?.id;
  if (!queryClient || !user || !sid) return;
  const sidStr = String(sid);
  queryClient.setQueryData(userProfileQueryKey(sidStr), user);
  persistUserProfileSnap(sidStr, user);
}

export function resolvePostLoginHeaderPath(user) {
  if (!user) return "/login";
  const role = user.role;
  if (role === "admin" || role === "manager") return "/admin";
  const hasBasics =
    Boolean(user.name?.trim()) &&
    Boolean(String(user.phone ?? "").trim());
  if (!hasBasics) return "/dashboard/profile";
  return "/dashboard";
}

/**
 * Full profile via React Query — one fetch per session until logout or explicit invalidate.
 */
export function useUserProfile(options = {}) {
  const { enabled: enabledOption = true, ...restOptions } = options;
  const queryClient = useQueryClient();
  const reduxUid = useSelector((s) => s?.auth?.user?.id ?? null);

  let sessionUserId = reduxUid;
  if (!sessionUserId && typeof window !== "undefined") {
    const snapshot = loadAuthMinimal();
    sessionUserId = snapshot?.id ?? null;
    if (!sessionUserId) {
      sessionUserId = readJwtSub(localStorage.getItem("access_token"));
    }
  }
  if (sessionUserId != null && sessionUserId !== "") {
    sessionUserId = String(sessionUserId);
  }

  const hasToken =
    typeof window !== "undefined" && !!localStorage.getItem("access_token");

  const queryKey = userProfileQueryKey(sessionUserId);

  let memoryCached = undefined;
  let snapHydration = undefined;
  if (typeof window !== "undefined" && sessionUserId) {
    memoryCached = queryClient.getQueryData(queryKey);
    if (!memoryCached) {
      snapHydration = readUserProfileSnapForSessionUser(sessionUserId);
    }
  }

  const useSnap =
    !!snapHydration?.user &&
    !(memoryCached ?? false);

  return useQuery({
    ...restOptions,
    queryKey,
    queryFn: profileQueryFn,
    enabled:
      !!sessionUserId && hasToken && enabledOption,
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
    ...(useSnap
      ? {
          initialData: snapHydration.user,
          initialDataUpdatedAt: snapHydration.savedAt,
        }
      : {}),
  });
}

export function useInvalidateUserProfile() {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      queryKey: ["user-profile"],
      exact: false,
    });
}

export function removeAllProfileQueries(queryClient) {
  clearUserProfileSnap();
  queryClient.removeQueries({ queryKey: ["user-profile"], exact: false });
}
