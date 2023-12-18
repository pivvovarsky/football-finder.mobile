import { useMutation } from "@tanstack/react-query";
import { api } from "../../../services/API";

export interface ChangePasswordEntry {
  password: string;
  confirmPassword: string;
}

const changePassword = async (reqData: ChangePasswordEntry) => {
  const url = "/auth/me/change-password";
  const { data } = await api.post<ChangePasswordEntry>(url, reqData);

  return data;
};

export function useChangePassword() {
  return useMutation(changePassword);
}
