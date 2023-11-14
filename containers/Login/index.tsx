import React, { useEffect, useState } from "react";
import { Alert, BackHandler, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import { initLoginFormData } from "./Login.utils";
import { useUser } from "../../hooks/context/useUser";
import { DefaultTheme, TextInput, Text } from "react-native-paper";
import { Button } from "react-native-paper";
import { colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { NotLoggedNavigationProp } from "../../navigation/NotLogged";
import { Topbar } from "../../components/Topbar/Topbar";
import { Row } from "../../components/Containers/Row";

export function Login() {
  const navigation = useNavigation<NotLoggedNavigationProp>();
  const { login, isError, isLoading } = useUser();
  const [securePassword, setSecurePassword] = useState(true);
  const goBack = () => {
    navigation.goBack();
  };
  const navigateSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <>
      <Topbar title={"Login"} onPress={goBack} />
      <View style={styles.container}>
        <Formik initialValues={initLoginFormData} onSubmit={login}>
          {({ handleChange, handleSubmit, values }) => (
            <View style={styles.formikContainer}>
              <TextInput
                label="Email"
                returnKeyType="next"
                value={values.email}
                onChangeText={handleChange("email")}
                autoCapitalize="none"
                textContentType="emailAddress"
                keyboardType="email-address"
                autoFocus
                error={false}
                style={{
                  backgroundColor: "#D5E4FF",
                }}
              />
              <TextInput
                onChangeText={handleChange("password")}
                value={values.password}
                label="Password"
                returnKeyType="done"
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
              <Button
                mode="contained"
                //@ts-ignore
                onPress={handleSubmit}
                loading={isLoading}
                style={styles.button}
                textColor={colors.white}
                buttonColor={colors.darkBlue}
              >
                Submit
              </Button>
              <Row style={styles.signUpRow}>
                <Text>Don't have an account?</Text>
                <Button
                  mode="text"
                  labelStyle={styles.signUp}
                  onPress={navigateSignUp}
                  loading={isLoading}
                  textColor={colors.darkBlue}
                >
                  Sign up
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
  formikContainer: {},
  passwordInput: {
    marginTop: 10,
    backgroundColor: "#D5E4FF",
  },
  signUpRow: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 5,
  },
  signUp: { textDecorationLine: "underline", paddingBottom: 1 },
  button: { marginTop: 10 },
});
