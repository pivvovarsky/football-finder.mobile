import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/API";

export interface ForgotPasswordEntry {
  email: string;
}

const forgotPassword = async (reqData: ForgotPasswordEntry) => {
  const url = "/auth/forgot-password";
  const { data } = await api.post<ForgotPasswordEntry>(url, reqData);

  return data;
};

export function useForgotPassword() {
  return useMutation(forgotPassword);
}
