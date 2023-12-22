import React from "react";
import { StyleSheet, Text, TouchableOpacityProps, View } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../../constants/Colors";
import { fonts } from "../../constants/Fonts";
interface CardButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  label: string;
}

export function CardButton({ label, onPress }: CardButtonProps) {
  return (
    <Button
      style={styles.button}
      textColor={colors.white}
      buttonColor={colors.brown}
      labelStyle={styles.fontFamily}
      onPress={onPress}>
      {label}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: { width: "30%" },
  fontFamily: {
    fontFamily: fonts.medium,
  },
});
