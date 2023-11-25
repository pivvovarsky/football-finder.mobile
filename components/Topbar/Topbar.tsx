import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { Appbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
      style={[styles.container, { marginTop: Math.max(insets.top - 20, 0) }]}
      dark={false}
      theme={{
        //@ts-ignore
        colors: colors.white,
      }}>
      {arrowIcon && <Appbar.BackAction onPress={onPress} iconColor={colors.darkBlue} />}
      <Appbar.Content title={title} titleStyle={styles.title} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  title: { fontWeight: "700", color: colors.darkBlue, alignSelf: "center" },
});
