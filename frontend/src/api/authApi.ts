import type { RegisterData, LoginData, CodeData, AuthResponse, User } from "../types/auth";
import { axiosAuth } from "./axiosAuth";

const API_URL = "/users/"; 
export const authApi = {
  registerSendCode: (data: RegisterData) =>
    axiosAuth.post(`${API_URL}register/send-code/`, data),

  registerVerifyCode: (data: CodeData) =>
    axiosAuth.post<AuthResponse>(`${API_URL}register/verify-code/`, data),

  loginSendCode: (data: LoginData) =>
    axiosAuth.post(`${API_URL}login/send-code/`, data),

  loginVerifyCode: (data: CodeData) =>
    axiosAuth.post<AuthResponse>(`${API_URL}login/verify-code/`, data),

  getMe: () =>
    axiosAuth.get<User>(`${API_URL}me/`),

  changePassword: (newPassword: string) =>
    axiosAuth.post(`${API_URL}change-password/`, { new_password: newPassword }),
};
