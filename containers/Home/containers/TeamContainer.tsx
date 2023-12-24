import React from "react";
import { Image, StyleSheet, Text, View, ViewProps } from "react-native";
import { colors } from "../../../constants/Colors";
import { fonts } from "../../../constants/Fonts";
import { TeamDetails } from "../../../hooks/api/matches/getMatches";

interface TeamContainerProps extends ViewProps {
  team: TeamDetails;
}

const IMG_RESIZE_METHOD = "resize";
const IMG_RESIZE_MODE = "cover";

export function TeamContainer({ team, style }: TeamContainerProps) {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: team?.imageUrl ?? "" }}
        resizeMethod={IMG_RESIZE_METHOD}
        resizeMode={IMG_RESIZE_MODE}
        style={styles.itemImage}
      />
      <Text style={styles.fontFamilyBold} numberOfLines={1}>
        {team?.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center", width: 100, height: 80 },
  itemImage: { backgroundColor: colors.transparent, width: 50, height: 50, paddingBottom: 20 },
  fontFamilyBold: { fontFamily: fonts.bold, textAlign: "center" },
});
