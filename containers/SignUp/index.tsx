import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Formik, FormikState } from "formik";
import { SignupValidationSchema, initRegisterFormData } from "./Signup.utils";
import { useUser } from "../../hooks/context/useUser";
import { HelperText, TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { colors } from "../../constants/Colors";
import { Topbar } from "../../components/Topbar/Topbar";
import { useNavigation } from "@react-navigation/native";
import { NotLoggedNavigationProp } from "../../navigation/NotLogged";
import { RegisterEntry, useRegister } from "../../hooks/api/auth/useRegister";
import { Row } from "../../components/Containers/Row";
import { fonts } from "../../constants/Fonts";

export function SignUp() {
  const navigation = useNavigation<NotLoggedNavigationProp>();
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const { mutate: registerUser, isLoading } = useRegister();
  const [errorText, setErrorText] = useState<string | null>(null);
  const { setIsCreatedAccount } = useUser();
  const goBack = () => {
    navigation.goBack();
  };

  const signup = (
    values: RegisterEntry,
    resetForm: (nextState?: Partial<FormikState<RegisterEntry>> | undefined) => void,
  ) => {
    const registerData: RegisterEntry = {
      ...values,
    };

    setErrorText(null);
    registerUser(registerData, {
      onSuccess: () => {
        navigation.navigate("Login");
        resetForm();
        setIsCreatedAccount(true);
      },
      onError: (error: any) => {
        const { response } = error;
        if (response?.data?.statusCode === 409 || response?.data?.statusText === "Conflict") {
          setErrorText("Account already in use.");
          return;
        } else {
          setErrorText("Something went wrong. Try again later.");
        }
      },
    });
  };
  const navigateLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <>
      <Topbar title={"Sign Up"} onPress={goBack} arrowIcon />
      <View style={styles.container}>
        <Formik
          initialValues={initRegisterFormData}
          validationSchema={SignupValidationSchema}
          onSubmit={(values, { resetForm }) => {
            signup(values, resetForm);
          }}>
          {({ handleChange, handleBlur, handleSubmit, errors, values, touched }) => (
            <View>
              <TextInput
                label="Email"
                returnKeyType="next"
                value={values.email}
                onChangeText={handleChange("email")}
                autoCapitalize="none"
                textContentType="emailAddress"
                keyboardType="email-address"
                onBlur={handleBlur("email")}
                error={!!errors.email && touched.email}
                style={{
                  backgroundColor: colors.lightBlue,
                }}
                theme={{
                  fonts: { bodyLarge: { fontFamily: fonts.regular } },
                }}
              />
              {!!errors.email && touched.email && (
                <HelperText type="error" visible={!!errors.email && !!touched.email}>
                  {errors.email}
                </HelperText>
              )}
              <TextInput
                onChangeText={handleChange("password")}
                value={values.password}
                label="Password"
                theme={{
                  fonts: { bodyLarge: { fontFamily: fonts.regular } },
                }}
                onBlur={handleBlur("password")}
                returnKeyType="done"
                secureTextEntry={securePassword}
                right={
                  <TextInput.Icon
                    icon={securePassword ? "eye-off" : "eye"}
                    onPress={() => setSecurePassword(!securePassword)}
                  />
                }
                error={!!errors.password && touched.password}
                style={styles.passwordInput}
              />
              {!!errors.password && touched.password && (
                <HelperText type="error" visible={!!errors.password && touched.password}>
                  {errors.password}
                </HelperText>
              )}
              <TextInput
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                label="Confirm Password"
                returnKeyType="done"
                theme={{
                  fonts: { bodyLarge: { fontFamily: fonts.regular } },
                }}
                secureTextEntry={secureConfirmPassword}
                right={
                  <TextInput.Icon
                    icon={secureConfirmPassword ? "eye-off" : "eye"}
                    onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}
                  />
                }
                error={!!errors.confirmPassword && touched.confirmPassword}
                style={styles.passwordInput}
              />
              {!!errors.confirmPassword && touched.confirmPassword && (
                <HelperText type="error" visible={!!errors.confirmPassword && touched.confirmPassword}>
                  {errors.confirmPassword}
                </HelperText>
              )}
              {errorText && (
                <HelperText type="error" visible={!!errorText}>
                  {errorText}
                </HelperText>
              )}
              <Button
                mode="contained"
                //@ts-ignore
                onPress={handleSubmit}
                loading={isLoading}
                style={styles.button}
                textColor={colors.white}
                labelStyle={{ fontFamily: fonts.bold }}
                buttonColor={colors.darkBlue}>
                Submit
              </Button>
              <Row style={styles.signUpRow}>
                <Text style={{ fontFamily: fonts.regular }}>Already have an account?</Text>
                <Button mode="text" labelStyle={styles.login} onPress={navigateLogin} textColor={colors.darkBlue}>
                  Login
                </Button>
              </Row>
            </View>
          )}
        </Formik>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: colors.white,
    marginHorizontal: 30,
  },
  text: { fontSize: 20 },
  passwordInput: {
    marginTop: 10,
    backgroundColor: colors.lightBlue,
  },
  signUpRow: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 5,
  },
  login: { textDecorationLine: "underline", paddingBottom: 1, fontFamily: fonts.medium },
  button: { marginTop: 10 },
});
