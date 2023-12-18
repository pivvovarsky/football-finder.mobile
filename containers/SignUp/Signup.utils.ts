import * as Yup from "yup";
import { RegisterEntry } from "../../hooks/api/auth/useRegister";

export const initRegisterFormData: RegisterEntry = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignupValidationSchema: Yup.Schema<RegisterEntry> = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character",
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
