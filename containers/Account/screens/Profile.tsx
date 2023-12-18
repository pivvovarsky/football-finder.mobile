import React from "react";
import { StyleSheet, View } from "react-native";
import { useUser } from "../../../hooks/context/useUser";

export function Profile() {
  const { user } = useUser();
  return <View></View>;
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
