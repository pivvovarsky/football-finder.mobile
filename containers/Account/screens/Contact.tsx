import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";
import { openEmailbox } from "../account.utils";
import { colors } from "../../../constants/Colors";
import { fonts } from "../../../constants/Fonts";
import { layout } from "../../../constants/Layout";

export function Contact() {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.topText}>
        {`Have you encountered a problem?\nReport the problem to us, we will try to solve the problem.`}
      </Text>
      <Text style={styles.bottomText}>{`Would you like to share your opinion?\n Send us an email!`}</Text>
      <Button mode="contained" style={styles.button} labelStyle={{ fontFamily: fonts.medium }} onPress={openEmailbox}>
        Open email box
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  topText: {
    color: colors.darkBlue,
    paddingHorizontal: 5,
    paddingVertical: 10,
    textAlign: "center",
    fontFamily: fonts.medium,
  },
  bottomText: {
    color: colors.darkBrown,
    paddingHorizontal: 5,
    paddingVertical: 10,
    textAlign: "center",
    fontFamily: fonts.regular,
  },
  button: {
    backgroundColor: colors.brown,
    marginHorizontal: layout.publicScreenHorizontalPadding,
    marginTop: layout.publicScreenHorizontalPadding,
  },
  formContainer: {
    padding: 20,
    flex: 1,
  },
});
