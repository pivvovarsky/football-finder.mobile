import * as Yup from "yup";
import { ChangePasswordEntry } from "../../../../../hooks/api/auth/useChangePassword";

export const initChangePasswordFormData: ChangePasswordEntry = {
  password: "",
  confirmPassword: "",
};

export const ChangePasswordValidationSchema: Yup.Schema<ChangePasswordEntry> = Yup.object().shape({
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character",
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
