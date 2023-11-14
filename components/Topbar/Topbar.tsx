import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";
import { Appbar } from "react-native-paper";

interface TopbarProps {
  title: string;
  onPress: () => void;
}

export const Topbar = ({ title, onPress }: TopbarProps) => {
  return (
    <Appbar.Header
      statusBarHeight={0}
      shouldRasterizeIOS
      style={styles.container}
      dark={false}
      theme={{
        //@ts-ignore
        colors: colors.white,
      }}
    >
      <Appbar.BackAction onPress={onPress} iconColor={colors.darkBlue} />
      <Appbar.Content title={title} titleStyle={styles.title} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  title: { fontWeight: "700", color: colors.darkBlue },
});
