import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";
import { useUser } from "../../hooks/context/useUser";
import { SegmentedButtons, TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Topbar } from "../../components/Topbar/Topbar";

export function Account() {
  const { login, isError, isLoading, logout, user } = useUser();

  const [value, setValue] = useState("Profile");
  return (
    <View>
      <Topbar title={"Account"} />
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        style={{ paddingHorizontal: 30 }}
        theme={{ colors: { primary: "green" } }}
        buttons={[
          { value: "drive", label: "Driving" },
          {
            value: "Profile",
            label: "Profile",
            icon: "account",
          },
          { value: "Contact", label: "Contact", icon: "comment-processing" },
        ]}
      />

      <Button onPress={logout}>Logout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
