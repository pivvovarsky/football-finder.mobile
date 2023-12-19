import React, { useCallback, useEffect, useState } from "react";
import { Alert, BackHandler, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { initLoginFormData } from "./Login.utils";
import { useUser } from "../../hooks/context/useUser";
import { DefaultTheme, TextInput, Text, HelperText, Snackbar, Tooltip, IconButton } from "react-native-paper";
import { Button } from "react-native-paper";
import { colors } from "../../constants/Colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NotLoggedNavigationProp } from "../../navigation/NotLogged";
import { Topbar } from "../../components/Topbar/Topbar";
import { Row } from "../../components/Containers/Row";
import { fonts } from "../../constants/Fonts";
import { layout } from "../../constants/Layout";

export function Login() {
  const navigation = useNavigation<NotLoggedNavigationProp>();
  const { login, isLoading, isCreatedAccount, isError, cleanState, setIsCreatedAccount } = useUser();
  const [securePassword, setSecurePassword] = useState(true);

  const goBack = () => {
    navigation.goBack();
  };

  const navigateSignUp = () => {
    navigation.navigate("SignUp");
  };

  useFocusEffect(
    useCallback(() => {
      return cleanState();
    }, []),
  );

  const closeSnackBar = () => {
    setIsCreatedAccount(false);
  };

  return (
    <>
      <Topbar title={"Login"} onPress={goBack} arrowIcon />
      <View style={styles.container}>
        <Snackbar
          visible={isCreatedAccount}
          onDismiss={closeSnackBar}
          duration={4000}
          action={{
            label: "close",
            onPress: () => {
              closeSnackBar();
            },
          }}>
          The account has been successfully created.
        </Snackbar>
        <Formik initialValues={initLoginFormData} onSubmit={login}>
          {({ handleChange, handleSubmit, values }) => (
            <>
              <TextInput
                label="Email"
                returnKeyType="next"
                value={values.email}
                onChangeText={handleChange("email")}
                autoCapitalize="none"
                textContentType="emailAddress"
                keyboardType="email-address"
                mode="outlined"
                activeOutlineColor={colors.black}
                autoFocus
                error={isError}
                theme={{
                  roundness: 30,
                  fonts: { bodyLarge: { fontFamily: fonts.regular } },
                }}
                style={styles.emailInput}
              />
              <TextInput
                onChangeText={handleChange("password")}
                value={values.password}
                label="Password"
                returnKeyType="done"
                mode="outlined"
                activeOutlineColor={colors.black}
                theme={{
                  roundness: 30,
                  fonts: { bodyLarge: { fontFamily: fonts.regular } },
                }}
                secureTextEntry={securePassword}
                right={
                  <TextInput.Icon
                    icon={securePassword ? "eye-off" : "eye"}
                    onPress={() => setSecurePassword(!securePassword)}
                  />
                }
                error={false}
                style={styles.passwordInput}
              />
              <HelperText visible={isError} type={"error"}>
                Invalid email or password. Please try again.
              </HelperText>
              <Button
                mode="contained"
                //@ts-ignore
                onPress={handleSubmit}
                loading={isLoading}
                style={styles.buttonSubmit}
                textColor={colors.white}
                labelStyle={{ fontFamily: fonts.bold }}
                buttonColor={colors.brown}>
                Submit
              </Button>
              <Row style={styles.signUpRow}>
                <Text style={styles.textStyle}>Don't have an account?</Text>
                <Button mode="text" labelStyle={styles.signUp} onPress={navigateSignUp} textColor={colors.brown}>
                  Sign up
                </Button>
              </Row>
            </>
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
  emailInput: {
    backgroundColor: colors.lightCream,
    marginTop: 10,
  },
  passwordInput: {
    backgroundColor: colors.lightCream,
    marginTop: 10,
  },
  buttonSubmit: { marginTop: 10 },
  signUpRow: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 20,
  },
  signUp: { textDecorationLine: "underline", paddingBottom: 1, fontFamily: fonts.medium },
  textStyle: { fontFamily: fonts.regular },
});
