import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Button } from "react-native-paper";
import { openEmailbox } from "../account.utils";
import { colors } from "../../../constants/Colors";

export function Contact() {
  return (
    <View style={styles.formContainer}>
      <Text
        lineBreakMode="head"
        variant="titleSmall"
        style={{ color: colors.darkBlue, paddingHorizontal: 5, paddingVertical: 10, textAlign: "center" }}>
        {`Have you encountered a problem?\nReport the problem to us, we will try to solve the problem.`}
      </Text>
      <Text
        lineBreakMode="head"
        variant="titleSmall"
        style={{
          color: colors.simple,
          paddingHorizontal: 5,
          fontWeight: "700",
          paddingVertical: 10,
          textAlign: "center",
        }}>
        {`Would you like to share your opinion?\n Send us an email!`}
      </Text>
      <Button mode="contained" onPress={openEmailbox}>
        Open email box
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: { marginVertical: 10 },
  formContainer: {
    padding: 20,
  },
});
