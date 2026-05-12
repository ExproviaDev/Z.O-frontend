"use client";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { clearUserProfileSnap } from "../../lib/userProfileSnapshot";

const AUTH_MIN_KEY = "zo_auth_min";

// Login response shudhu { id, email } rakhe — full profile React Query hook diye page-wise fetch hobe.

const getSavedToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

function decodeJwtPayload(token) {
  if (!token || typeof token !== "string") return null;
  try {
    const part = token.split(".")[1];
    if (!part) return null;
    const padded = part.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(padded));
    return typeof payload === "object" && payload ? payload : null;
  } catch {
    return null;
  }
}

const getMinimalSavedUser = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_MIN_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.id) return parsed;
    }
    const token = getSavedToken();
    if (!token) return null;
    const payload = decodeJwtPayload(token);
    if (payload?.sub) {
      return { id: payload.sub, email: payload.email ?? null };
    }
    return null;
  } catch {
    return null;
  }
};

const persistMinimalUser = (user) => {
  if (typeof window === "undefined" || !user?.id) return;
  try {
    localStorage.setItem(
      AUTH_MIN_KEY,
      JSON.stringify({ id: user.id, email: user.email ?? null }),
    );
  } catch {}
};

const clearMinimalUser = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(AUTH_MIN_KEY);
  } catch {}
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getMinimalSavedUser(),
    token: getSavedToken(),
    isLoggedIn: !!getSavedToken(),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_data");
        clearMinimalUser();
        clearUserProfileSnap();
        Cookies.remove("access_token");
      }
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
      persistMinimalUser(action.payload.user);
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { logout, setLogin, stopLoading } = authSlice.actions;
export default authSlice.reducer;
