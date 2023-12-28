import React from "react";
import { Platform, StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { Appbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fonts } from "../../constants/Fonts";

interface TopbarProps {
  title: string;
  arrowIcon?: boolean;
  onPress?: () => void;
}

export const Topbar = ({ title, arrowIcon = false, onPress }: TopbarProps) => {
  const insets = useSafeAreaInsets();
  return (
    <Appbar.Header
      statusBarHeight={0}
      shouldRasterizeIOS
      style={[styles.container, { marginTop: Math.max(insets.top, 0) }]}
      dark={false}
      theme={{
        //@ts-ignore
        colors: colors.white,
      }}>
      {arrowIcon && <Appbar.BackAction onPress={onPress} iconColor={colors.black} />}
      <Appbar.Content
        title={title}
        titleStyle={[styles.title, { marginRight: !arrowIcon ? 0 : Platform.OS === "android" ? 40 : 0 }]}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  title: {
    color: colors.darkBrown,
    alignSelf: "center",
    paddingRight: 15,
    fontFamily: fonts.medium,
  },
});
