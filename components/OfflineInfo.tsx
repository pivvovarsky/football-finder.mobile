import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/Colors";
import { fonts } from "../constants/Fonts";
import { useNetworkConnection } from "../hooks/useNetworkConnection";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function OfflineInfo() {
  const { isOffline } = useNetworkConnection();
  const insets = useSafeAreaInsets();
  if (!isOffline) return null;
  return (
    <View style={[styles.container, { paddingTop: Platform.OS === "ios" ? Math.max(insets.top, 15) : 5 }]}>
      <Text style={styles.text}>No network connection</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    backgroundColor: colors.cream,
  },
  text: {
    textAlign: "center",
    textAlignVertical: "bottom",
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.black,
  },
});
