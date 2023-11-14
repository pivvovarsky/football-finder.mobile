import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/API";

export interface RegisterEntry {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterData {
  id: number;
  firstName?: string;
  lastName?: string;
}

const register = async (reqData: RegisterEntry) => {
  const url = "/auth/register";
  const { data } = await api.post<RegisterEntry, RegisterData>(url, reqData);

  return data;
};

export function useRegister() {
  return useMutation(register);
}
