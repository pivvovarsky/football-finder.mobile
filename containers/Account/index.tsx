import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";
import { useUser } from "../../hooks/context/useUser";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export function Account() {
  const { login, isError, isLoading, logout } = useUser();
  return (
    <View>
      <Button onPress={logout}>Logout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
