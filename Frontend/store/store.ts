import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "./authSlice";
import medicineReducer from "./medicineSlice";
import { loginUser } from "./authSlice";

const AUTH_STORAGE_KEY = "@midremind/auth_user";
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: loginUser.fulfilled,
  effect: async (action) => {
    try {
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(action.payload));
    } catch {
      // Silently fail — Redux state is still the source of truth
    }
  },
});

export const store = configureStore({
  reducer: {
    auth: authReducer,
    medicine: medicineReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
