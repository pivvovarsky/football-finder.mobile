import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Switch, Platform } from "react-native";
import { Formik, FormikState } from "formik";
import { HelperText, TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { ChangePasswordValidationSchema, initChangePasswordFormData } from "./utils/ChangePassword.utils";
import { ChangePasswordEntry, useChangePassword } from "../../../../hooks/api/auth/useChangePassword";
import { colors } from "../../../../constants/Colors";
import { fonts } from "../../../../constants/Fonts";
import { layout, window } from "../../../../constants/Layout";
import { Row } from "../../../../components/Containers/Row";
import { useUser } from "../../../../hooks/context/useUser";
import { useGetSubscription } from "../../../../hooks/api/newsletters/useGetSubscription";
import { usePatchSubscriptionNewsletter } from "../../../../hooks/api/newsletters/usePatchSubscription";

export function Settings() {
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const { mutate: chPassword, isLoading } = useChangePassword();
  const { logout } = useUser();
  const [errorText, setErrorText] = useState<string | null>(null);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const { user } = useUser();
  const { data: subscriptionInfo, isLoading: isLoadingSubscription } = useGetSubscription(user?.uid ?? null);
  const { mutate: patchSubscribtion } = usePatchSubscriptionNewsletter();

  useEffect(() => {
    if (subscriptionInfo?.newsletterSubscribed) {
      setIsSwitchOn(subscriptionInfo?.newsletterSubscribed);
    }
  }, [subscriptionInfo]);

  const onToggleSwitch = useCallback(() => {
    const value = !isSwitchOn;
    patchSubscribtion({ newsletterSubscribed: value });
    setIsSwitchOn(value);
  }, [isSwitchOn]);

  const changePassoword = (
    values: ChangePasswordEntry,
    resetForm: (nextState?: Partial<FormikState<ChangePasswordEntry>> | undefined) => void,
  ) => {
    const changePasswordData: ChangePasswordEntry = {
      ...values,
    };

    setErrorText(null);
    chPassword(changePasswordData, {
      onSuccess: () => {
        resetForm();
        logout();
      },
      onError: (error: any) => {
        setErrorText("Something went wrong. Try again later.");
      },
    });
  };

  return (
    <View>
      <Text adjustsFontSizeToFit style={styles.title}>
        Change Password
      </Text>
      <Formik
        initialValues={initChangePasswordFormData}
        validationSchema={ChangePasswordValidationSchema}
        onSubmit={(values, { resetForm }) => {
          changePassoword(values, resetForm);
        }}>
        {({ handleChange, handleBlur, handleSubmit, errors, values, touched }) => (
          <>
            <TextInput
              onChangeText={handleChange("password")}
              value={values.password}
              label="Password"
              theme={{
                roundness: 30,
                fonts: { bodyLarge: { fontFamily: fonts.regular } },
              }}
              activeOutlineColor={colors.black}
              onBlur={handleBlur("password")}
              returnKeyType="done"
              mode="outlined"
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
              <HelperText style={{ alignSelf: "center" }} type="error" visible={!!errors.password && touched.password}>
                {errors.password}
              </HelperText>
            )}
            <TextInput
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              label="Confirm Password"
              returnKeyType="done"
              mode="outlined"
              activeOutlineColor={colors.black}
              theme={{
                roundness: 30,
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
              <HelperText
                style={{ alignSelf: "center" }}
                type="error"
                visible={!!errors.confirmPassword && touched.confirmPassword}>
                {errors.confirmPassword}
              </HelperText>
            )}
            {errorText && (
              <HelperText style={{ alignSelf: "center" }} type="error" visible={!!errorText}>
                {errorText}
              </HelperText>
            )}
            {values.password && values.confirmPassword && (
              <Button
                //@ts-ignore
                onPress={handleSubmit}
                loading={isLoading}
                style={styles.buttonSubmit}
                textColor={colors.white}
                labelStyle={{ fontFamily: fonts.bold }}
                buttonColor={colors.brown}>
                Submit
              </Button>
            )}
          </>
        )}
      </Formik>
      <View style={styles.switchContainer}>
        <Text adjustsFontSizeToFit style={styles.title}>
          Settings
        </Text>
        <Row style={{ justifyContent: "space-evenly", width: "50%" }}>
          <Text style={styles.text}>Newsletters</Text>
          <Switch
            trackColor={{ true: colors.cream }}
            style={styles.switch}
            thumbColor={colors.brown}
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
          />
        </Row>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: window.width * 0.05, alignSelf: "center", fontFamily: fonts.medium },
  buttonSubmit: { marginHorizontal: layout.publicScreenHorizontalPadding, marginTop: 30 },
  passwordInput: {
    backgroundColor: colors.lightCream,
    marginTop: 10,
    marginHorizontal: layout.publicScreenHorizontalPadding,
  },
  switch: { alignSelf: "center", marginTop: Platform.OS === "android" ? 5 : 0 },
  text: { fontFamily: fonts.light, marginVertical: 10, fontSize: window.width * 0.05 },
  switchContainer: { alignItems: "center", marginTop: 30 },
});
