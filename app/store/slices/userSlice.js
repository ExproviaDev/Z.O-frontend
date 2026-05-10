import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =`${process.env.NEXT_PUBLIC_API_URL}`;

// Server-side paginated user fetch for the admin User Management page.
export const fetchAllUsers = createAsyncThunk("users/fetchAll", async (params = {}, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("access_token");
    const query = new URLSearchParams();
    query.set("page", String(params.page || 1));
    query.set("limit", String(params.limit || 20));
    if (params.search) query.set("search", params.search);
    if (params.role && params.role !== "all") query.set("role", params.role);

    const response = await axios.get(`${API_URL}/api/admin/all-users`, {
      headers: { Authorization: `Bearer ${token}` },
      params: query,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || "Failed to fetch users");
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    totalUsers: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 20,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data || [];
        state.totalUsers = action.payload.totalUsers || 0;
        state.totalPages = action.payload.totalPages || 0;
        state.currentPage = action.payload.currentPage || 1;
        state.limit = action.payload.limit || 20;
        state.error = null;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;