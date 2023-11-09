import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";
import { initRegisterFormData } from "./Signup.utils";
import { useUser } from "../../hooks/context/useUser";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { colors } from "../../constants/Colors";

export function SignUp() {
  const [securePassword, setSecurePassword] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Football Finder</Text>
      <Formik initialValues={initRegisterFormData} onSubmit={login}>
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
              style={styles.passwordInput}
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
              style={styles.passwordInput}
            />
            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={isLoading}
              style={styles.button}
            >
              Submit
            </Button>
            <Button
              mode="text"
              onPress={handleSubmit}
              loading={isLoading}
              style={styles.buttonSignUp}
            >
              Sign up
            </Button>
          </View>
        )}
      </Formik>
    </View>
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
  passwordInput: { marginTop: 10 },
  button: { marginTop: 10 },
  buttonSignUp: {},
});
