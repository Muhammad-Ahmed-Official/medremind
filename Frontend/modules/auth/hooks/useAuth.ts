import { useDispatch, useSelector } from "react-redux";
import { signupUser, loginUser, forgotPasswordUser, chnagePasswordUser, restoreAuthFromStorage, logoutUser } from "@/store/authSlice";
import { RootState, AppDispatch } from "@/store/store";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const signup = (data: { userName: string; email: string; password: string }) =>
    dispatch(signupUser(data));

  const login = (data: { email: string; password: string }) =>
    dispatch(loginUser(data));

  const forgotPassword = (data: { email: string }) =>
    dispatch(forgotPasswordUser(data));

  const changePassword = (data: { email: string; newPassword: string, code:string }) =>
    dispatch(chnagePasswordUser(data));

  const restoreSession = () =>
    dispatch(restoreAuthFromStorage());

  const logout = () =>
    dispatch(logoutUser());

  return {
    ...auth,
    signup,
    login,
    forgotPassword,
    changePassword,
    restoreSession,
    logout,
  };
};