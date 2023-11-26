import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useUser } from "../../hooks/context/useUser";
import { SegmentedButtons, TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import { Topbar } from "../../components/Topbar/Topbar";
import { openEmailbox } from "./account.utils";
import { Contact } from "./screens/Contact";
import { Profile } from "./screens/Profile";
import { Settings } from "./screens/Settings";
enum NavTab {
  Settings = "Settings",
  Profile = "Profile",
  Contact = "Contact",
}

export function Account() {
  const { login, isError, isLoading, logout, user } = useUser();
  const HEADER_BUTTONS = [
    { value: NavTab.Settings, label: NavTab.Settings, icon: "cog" },
    {
      value: NavTab.Profile,
      label: NavTab.Profile,
      icon: "account",
    },
    { value: NavTab.Contact, label: NavTab.Contact, icon: "comment-processing" },
  ];

  const [value, setValue] = useState<NavTab>(NavTab.Profile);
  return (
    <View>
      <Topbar title={"Account"} />
      <SegmentedButtons
        value={value}
        //@ts-ignore
        onValueChange={setValue}
        style={{ paddingHorizontal: 30 }}
        buttons={HEADER_BUTTONS}
      />
      {value === NavTab.Settings && <Settings />}
      {value === NavTab.Profile && <Profile />}
      {value === NavTab.Contact && <Contact />}

      <Button onPress={openEmailbox}>open email box</Button>
      <Button onPress={logout}>Logout</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
