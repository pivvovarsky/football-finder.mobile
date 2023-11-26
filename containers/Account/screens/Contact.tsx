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

export function Contact() {
  const [value, setValue] = useState<NavTab>(NavTab.Profile);
  return (
    <View>
      <TextInput
        multiline
        mode="outlined"
        label={"Contact"}
        dense
        style={{ height: 100 }}
        placeholder="Enter the message here..."
      />
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
