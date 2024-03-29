import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useUser } from "../../hooks/context/useUser";
import { SegmentedButtons } from "react-native-paper";
import { Button } from "react-native-paper";
import { Topbar } from "../../components/Topbar/Topbar";
import { Contact } from "./screens/Contact";
import { Settings } from "./screens/Settings";
import { fonts } from "../../constants/Fonts";
import { colors } from "../../constants/Colors";
import { layout } from "../../constants/Layout";
enum NavTab {
  Settings = "Settings",
  Contact = "Contact",
}

export function Account() {
  const { logout } = useUser();
  const [value, setValue] = useState<string>(NavTab.Settings);
  const HEADER_BUTTONS = [
    {
      value: NavTab.Settings,
      label: NavTab.Settings,
      icon: "cog",
      style: {
        ...styles.segmentButtons,
        backgroundColor: value === NavTab.Settings ? colors.lightBrown : colors.cream,
      },
    },
    {
      value: NavTab.Contact,
      label: NavTab.Contact,
      icon: "comment-processing",
      style: { ...styles.segmentButtons, backgroundColor: value === NavTab.Contact ? colors.lightBrown : colors.cream },
    },
  ];

  return (
    <>
      <Topbar title={"Account"} />
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        density="regular"
        style={{ paddingHorizontal: 30 }}
        buttons={HEADER_BUTTONS}
      />
      <View style={styles.container}>
        {value === NavTab.Settings && <Settings />}
        {value === NavTab.Contact && <Contact />}
        <Button labelStyle={styles.logout} style={styles.buttonLogout} onPress={logout}>
          Logout
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "space-between", marginVertical: layout.publicScreenHorizontalPadding },
  buttonLogout: { width: "40%", alignSelf: "center", borderColor: colors.brown, borderWidth: 2 },
  logout: { fontFamily: fonts.bold },
  segmentButtons: {
    borderColor: colors.white,
  },
});
