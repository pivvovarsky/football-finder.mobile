import { ForgotPasswordEntry } from "../../hooks/api/auth/useForgotPassword";
import * as Yup from "yup";

export const initForgotPassword: ForgotPasswordEntry = {
  email: "",
};

export const ForgotPasswordValidationSchema: Yup.Schema<ForgotPasswordEntry> = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});
