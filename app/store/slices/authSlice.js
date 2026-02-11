"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// ১. ইউজার প্রোফাইল ফেচ করার থাঙ্ক (যদি কখনো সার্ভার থেকে লেটেস্ট ডাটা লাগে)
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (token, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Session expired");
      }

      return data; // এক্সপেক্টেড ডাটা: { isAuthenticated: true, user: {...} }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// LocalStorage থেকে ডাটা রিকভার করার ফাংশন
const getSavedUser = () => {
  if (typeof window !== "undefined") {
    const savedUser = localStorage.getItem("user_data");
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  }
  return null;
};

const getSavedToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getSavedUser(), // পেজ লোড হওয়ার সাথে সাথেই LC থেকে ডাটা নেবে
    token: getSavedToken(),
    isLoggedIn: !!getSavedToken(), // টোকেন থাকলে ট্রু হবে
    loading: false, // যেহেতু আমরা LC থেকে নিচ্ছি, তাই শুরুতে লোডিং ফলস রাখা যায়
    error: null,
  },
  reducers: {
    // লগআউট লজিক: সব স্টেট রিসেট এবং স্টোরেজ ক্লিন
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
      state.token = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_data");
      Cookies.remove('access_token'); // যদি ব্যবহার করেন
    },
    // লগইন হওয়ার পর স্টেট সেট করার জন্য
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    // 🔥 নতুন রিডিউসার: কুইজ সাবমিশনের পর স্টেট ও ক্যাশ আপডেট করার জন্য
    updateParticipation: (state) => {
      if (state.user) {
        // ১. Redux স্টেট আপডেট
        state.user.is_participated = true;

        // ২. LocalStorage আপডেট (যাতে রিফ্রেশ দিলে ডাটা না হারায়)
        const currentSavedData = localStorage.getItem("user_data");
        if (currentSavedData) {
          const parsedData = JSON.parse(currentSavedData);
          parsedData.is_participated = true;
          localStorage.setItem("user_data", JSON.stringify(parsedData));
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = action.payload.isAuthenticated || true;
        state.user = action.payload.user;
        state.error = null;
        // সার্ভার থেকে নতুন ডাটা আসলে LC আপডেট করে দেওয়া ভালো
        localStorage.setItem("user_data", JSON.stringify(action.payload.user));
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.error = action.payload;
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_data");
      });
  },
});

export const { logout, setLogin, stopLoading, updateParticipation } = authSlice.actions;
export default authSlice.reducer;