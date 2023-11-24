import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";
import { useUser } from "../../hooks/context/useUser";
import { Portal, TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export function Home() {
  const { login, isError, isLoading } = useUser();
  return (
    <>
      <Text>Home</Text>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
