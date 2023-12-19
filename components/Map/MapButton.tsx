import React from "react";
import { StyleSheet, Text, TouchableOpacityProps, View } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../../constants/Colors";
import { fonts } from "../../constants/Fonts";
interface MapButtonProps extends TouchableOpacityProps {
  text: string;
  isLoading: boolean;
}
export function MapButton({ style, text, isLoading, onPress }: MapButtonProps) {
  return (
    <View style={[styles.container, style]}>
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={{ fontFamily: fonts.medium }}
        onPress={onPress}
        textColor={colors.black}
        loading={isLoading}>
        <Text style={styles.textButton}>{text}</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 5 },
  textButton: { fontFamily: fonts.bold },
  button: {
    borderRadius: 60,
    backgroundColor: "rgba(238, 222, 200, 0.9)",
    borderWidth: 3,
    borderColor: colors.brown,
  },
});
