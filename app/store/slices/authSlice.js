import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from "js-cookie";
export const fetchUserProfile = createAsyncThunk(
    'auth/fetchUserProfile',
    async (token, { rejectWithValue }) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoggedIn: false,
        isHydrated: false,
        loading: true,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.loading = false;
            localStorage.removeItem("access_token");
            localStorage.removeItem("persist:root");
            Cookies.remove("access_token");
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.isLoggedIn = true;
            state.loading = false;
        },
        stopLoading: (state) => {
            state.loading = false;
        },
        setHydrated: (state) => {
        state.isHydrated = true;
    }
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
                state.user = action.payload.user || action.payload;
                state.error = null;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.user = null;
                state.error = action.payload;
                localStorage.removeItem("access_token");
                Cookies.remove("access_token");
            });
    }
});

export const { logout, setLogin, stopLoading } = authSlice.actions;
export default authSlice.reducer;