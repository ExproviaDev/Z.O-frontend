import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin`;

const getAuthConfig = () => {
  const token = localStorage.getItem("access_token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const fetchQuizzes = createAsyncThunk("quiz/fetchQuizzes", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/all-quizzes`, getAuthConfig());
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || "Failed to fetch quizzes");
  }
});
export const fetchSingleQuiz = createAsyncThunk("quiz/fetchSingleQuiz", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/quiz/${id}`, getAuthConfig());
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || "Failed to fetch quiz details");
  }
});
export const createQuizAction = createAsyncThunk("quiz/createQuiz", async (quizData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/add-quiz`, quizData, getAuthConfig());
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.response?.data?.error || "Failed to create quiz");
  }
});
export const deleteQuizAction = createAsyncThunk("quiz/deleteQuiz", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/delete-quiz/${id}`, getAuthConfig());
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || "Failed to delete quiz");
  }
});

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quizzes: [],
    currentQuiz: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetQuizStatus: (state) => {
      state.success = false;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleQuiz.fulfilled, (state, action) => {
        state.currentQuiz = action.payload;
      })
      .addCase(createQuizAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuizAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (action.payload.data) {
          state.quizzes.unshift(action.payload.data);
        }
      })
      .addCase(createQuizAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteQuizAction.fulfilled, (state, action) => {
        state.quizzes = state.quizzes.filter((q) => q.id !== action.payload);
      });
  },
});

export const { resetQuizStatus } = quizSlice.actions;
export default quizSlice.reducer;