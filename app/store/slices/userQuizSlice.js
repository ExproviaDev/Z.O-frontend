import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin`;
const getSavedActiveQuiz = () => {
    if (typeof window !== "undefined") {
        const savedQuiz = localStorage.getItem("active_quiz");
        try {
            return savedQuiz ? JSON.parse(savedQuiz) : null;
        } catch (e) {
            return null;
        }
    }
    return null;
};

export const fetchUserQuizzes = createAsyncThunk(
    "userQuiz/fetchUserQuizzes",
    async (category, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${API_URL}/public-quizzes?category=${encodeURIComponent(category)}`
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "Failed to fetch quizzes");
        }
    }
);

export const fetchUserSingleQuiz = createAsyncThunk(
    "userQuiz/fetchUserSingleQuiz",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/public-quiz/${id}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || "Failed to load quiz details");
        }
    }
);

const userQuizSlice = createSlice({
    name: "userQuiz",
    initialState: {
        availableQuizzes: [],
        activeQuiz: getSavedActiveQuiz(),
        loading: false,
        error: null,
    },
    reducers: {
        setActiveQuiz: (state, action) => {
            state.activeQuiz = action.payload;
            localStorage.setItem("active_quiz", JSON.stringify(action.payload));
        },
        clearActiveQuiz: (state) => {
            state.activeQuiz = null;
            state.error = null;
            if (typeof window !== "undefined") {
                localStorage.removeItem("active_quiz");
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserQuizzes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserQuizzes.fulfilled, (state, action) => {
                state.loading = false;
                state.availableQuizzes = action.payload;
            })
            .addCase(fetchUserQuizzes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserSingleQuiz.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserSingleQuiz.fulfilled, (state, action) => {
                state.loading = false;
                state.activeQuiz = action.payload;
                localStorage.setItem("active_quiz", JSON.stringify(action.payload));
            })
            .addCase(fetchUserSingleQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearActiveQuiz, setActiveQuiz } = userQuizSlice.actions;
export default userQuizSlice.reducer;