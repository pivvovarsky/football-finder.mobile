import React from "react";
import { StyleSheet, TouchableOpacityProps, View } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../../constants/Colors";
interface MapButtonProps extends TouchableOpacityProps {
  text: string;
  isLoading: boolean;
}
export function MapButton({ style, text, isLoading, onPress }: MapButtonProps) {
  return (
    <View style={[styles.container, style]}>
      <Button
        mode="contained"
        onPress={onPress}
        buttonColor="rgba(255, 255, 255, 0.7)"
        labelStyle={{ fontWeight: "600" }}
        textColor={colors.darkBlue}
        loading={isLoading}
      >
        {text}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 5 },
});
