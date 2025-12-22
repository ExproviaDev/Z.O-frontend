import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =`${process.env.NEXT_PUBLIC_API_URL}`;

// ১. সব ইউজার নিয়ে আসা
export const fetchAllUsers = createAsyncThunk("users/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get(`${API_URL}/api/admin/all-users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: { users: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;