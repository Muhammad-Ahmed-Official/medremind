import api from "@/constants/api";

export const signup = async (data: {
  userName: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("auth/signup", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};

export const login = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("auth/login", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};


export const forgotPassword = async (data: { email: string }) => {
  try {
    const response = await api.post("auth/forgot-password", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "ForgotPassword failed");
  }
};


export const chnagePassword = async (data: { email: string }) => {
  try {
    const response = await api.post("auth/change-password", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "ChangePassword failed");
  }
};