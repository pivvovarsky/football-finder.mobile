import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useUser } from "../../hooks/context/useUser";
import { SegmentedButtons } from "react-native-paper";
import { Button } from "react-native-paper";
import { Topbar } from "../../components/Topbar/Topbar";
import { openEmailbox } from "./account.utils";
import { Contact } from "./screens/Contact";
import { Profile } from "./screens/Profile";
import { Settings } from "./screens/Settings";
import { fonts } from "../../constants/Fonts";
import { colors } from "../../constants/Colors";
enum NavTab {
  Settings = "Settings",
  Profile = "Profile",
  Contact = "Contact",
}

export function Account() {
  const { login, isError, isLoading, logout, user } = useUser();
  const [value, setValue] = useState<NavTab>(NavTab.Settings);
  const HEADER_BUTTONS = [
    {
      value: NavTab.Settings,
      label: NavTab.Settings,
      icon: "cog",
      style: { ...styles.segmentButtons, backgroundColor: value === NavTab.Settings ? colors.brown : colors.cream },
    },
    {
      value: NavTab.Contact,
      label: NavTab.Contact,
      icon: "comment-processing",
      style: { ...styles.segmentButtons, backgroundColor: value === NavTab.Contact ? colors.brown : colors.cream },
    },
  ];

  return (
    <View>
      <Topbar title={"Account"} />
      <SegmentedButtons
        value={value}
        //@ts-ignore
        onValueChange={setValue}
        checkedColor={colors.darkBlue}
        uncheckedColor={colors.darkBlue}
        style={{ paddingHorizontal: 30 }}
        buttons={HEADER_BUTTONS}
      />
      {value === NavTab.Settings && <Settings />}
      {value === NavTab.Profile && <Profile />}
      {value === NavTab.Contact && <Contact />}

      <Button labelStyle={styles.logout} style={styles.buttonLogout} onPress={logout}>
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonLogout: { width: "50%", padding: 15, alignSelf: "center" },
  logout: { fontFamily: fonts.bold, width: "50%" },
  segmentButtons: {},
});
