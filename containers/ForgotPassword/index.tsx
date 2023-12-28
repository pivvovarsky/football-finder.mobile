import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Formik, FormikState } from "formik";
import { HelperText, TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { colors } from "../../constants/Colors";
import { Topbar } from "../../components/Topbar/Topbar";
import { useNavigation } from "@react-navigation/native";
import { NotLoggedNavigationProp } from "../../navigation/NotLogged";
import { Row } from "../../components/Containers/Row";
import { fonts } from "../../constants/Fonts";
import { ForgotPasswordEntry, useForgotPassword } from "../../hooks/api/auth/useForgotPassword";
import { ForgotPasswordValidationSchema, initForgotPassword } from "./ForgotPassword.utils";
import { window } from "../../constants/Layout";

export function ForgotPassword() {
  const navigation = useNavigation<NotLoggedNavigationProp>();
  const { mutate: forgotPassword, isLoading } = useForgotPassword();
  const [errorText, setErrorText] = useState<string | null>(null);
  const [infoText, setInfoText] = useState<string | null>(null);
  const goBack = () => {
    navigation.goBack();
  };

  const resetPassword = (
    values: ForgotPasswordEntry,
    resetForm: (nextState?: Partial<FormikState<ForgotPasswordEntry>> | undefined) => void,
  ) => {
    const forgotPasswordData: ForgotPasswordEntry = {
      ...values,
    };

    setErrorText(null);
    setInfoText(null);
    forgotPassword(forgotPasswordData, {
      onSuccess: () => {
        resetForm();
        setInfoText("An email has been sent to reset the password.");
      },
      onError: (error: any) => {
        const { response } = error;

        if (response.status === 404) {
          setErrorText("Invalid email. Please try again.");
        } else setErrorText("Something went wrong. Try again later.");
      },
    });
  };
  const navigateLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <>
      <Topbar title={"Forgot Password"} onPress={goBack} arrowIcon />
      <View style={styles.container}>
        <Formik
          initialValues={initForgotPassword}
          validationSchema={ForgotPasswordValidationSchema}
          onSubmit={(values, { resetForm }) => {
            resetPassword(values, resetForm);
          }}>
          {({ handleChange, handleBlur, handleSubmit, errors, values, touched }) => (
            <View>
              {infoText ? (
                <HelperText style={styles.infoText} visible type="info">
                  {infoText}
                </HelperText>
              ) : (
                <>
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
                    mode="outlined"
                    activeOutlineColor={colors.black}
                    theme={{
                      roundness: 30,
                      fonts: { bodyLarge: { fontFamily: fonts.regular } },
                    }}
                    style={styles.emailInput}
                  />
                  {!!errors.email && touched.email && (
                    <HelperText type="error" visible={!!errors.email && !!touched.email}>
                      {errors.email}
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
                    buttonColor={colors.brown}>
                    Submit
                  </Button>
                </>
              )}
              <Row style={styles.loginRow}>
                <Text style={{ fontFamily: fonts.regular }}>Back to</Text>
                <Button mode="text" labelStyle={styles.login} onPress={navigateLogin} textColor={colors.brown}>
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
  emailInput: {
    backgroundColor: colors.lightCream,
    marginTop: 10,
  },
  loginRow: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 5,
  },
  login: { textDecorationLine: "underline", paddingBottom: 1, fontFamily: fonts.medium },
  button: { marginTop: 40 },
  infoText: {
    fontFamily: fonts.regular,
    fontSize: window.height * 0.017,
    alignSelf: "center",
    color: colors.darkBrown,
  },
});
