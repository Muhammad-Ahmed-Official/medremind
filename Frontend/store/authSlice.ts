import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../modules/auth/services/authServices";

interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const signupUser = createAsyncThunk("/auth/signup",
  async (data: { userName: string; email: string; password: string }, thunkAPI) => {
    try {
      return await authService.signup(data);
    } catch (error: any) {
      const message = error?.message
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk("/auth/login",
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      return await authService.login(data);
    } catch (error: any) {
      const message = error?.message
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const forgotPasswordUser = createAsyncThunk("/auth/forgot-password",
  async (data: { email: string }, thunkAPI) => {
    try {
      return await authService.forgotPassword(data);
    } catch (error: any) {
      const message = error?.message
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const chnagePasswordUser = createAsyncThunk("/auth/chnage-password",
  async (data: { email: string, newPassword: string, code: string }, thunkAPI) => {
    try {
      return await authService.chnagePassword(data);
    } catch (error: any) {
      const message = error?.message
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(signupUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

     .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(forgotPasswordUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(forgotPasswordUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(chnagePasswordUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(chnagePasswordUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(chnagePasswordUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export default authSlice.reducer;