import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

export function Login() {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={MD2Colors.red800} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
