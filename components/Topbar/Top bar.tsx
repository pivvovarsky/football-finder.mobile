import React from "react";
import {
  StyleSheet,
  TouchableOpacityProps,
  View,
  ViewProps,
} from "react-native";
import { Row } from "../Containers/Row";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../constants/Colors";
import { Appbar } from "react-native-paper";

const MIN_TOP_MARGIN = 30;
interface TopbarProps extends TouchableOpacityProps {
  title: string;
}
export const Topbar = ({ title, onPress }: TopbarProps) => {
  const _goBack = () => console.log("Went back");

  const _handleSearch = () => console.log("Searching");

  const _handleMore = () => console.log("Shown more");

  return (
    <Appbar.Header
      statusBarHeight={0}
      shouldRasterizeIOS
      style={styles.container}
      dark={false}
      theme={{
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
