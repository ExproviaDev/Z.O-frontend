 "use client"
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false, 
  user: null, 
  loading: false, 
  error: null, 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true; 
      state.user = action.payload; 
      state.loading = false; 
      state.error = null; 
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload; 
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
