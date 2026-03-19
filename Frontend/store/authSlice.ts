import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authService from "../modules/auth/services/authServices";

const AUTH_STORAGE_KEY = "@midremind/auth_user";

interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
  isHydrated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isHydrated: false,
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

export const restoreAuthFromStorage = createAsyncThunk("auth/restoreFromStorage",
  async (_, thunkAPI) => {
    try {
      const raw = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout",
  async (_, thunkAPI) => {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.error = null;
      state.isHydrated = true;
    },
  },

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

      .addCase(restoreAuthFromStorage.pending, state => {
        state.loading = true;
        state.isHydrated = false;
      })
      .addCase(restoreAuthFromStorage.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isHydrated = true;
      })
      .addCase(restoreAuthFromStorage.rejected, state => {
        state.loading = false;
        state.isHydrated = true;
      })

      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
        state.isHydrated = true;
      })
      .addCase(logoutUser.rejected, state => {
        state.user = null;
        state.isHydrated = true;
      })
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;