import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";

import { SegmentedButtons, TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

enum NavTab {
  Profile = "Profile",
  Contact = "Contact",
}

export function Settings() {
  return (
    <View>
      {/* <Button onPress={openEmailbox}>open email box</Button>
      <Button onPress={logout}>Logout</Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
