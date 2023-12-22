import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StadiumData } from "../../../hooks/api/stadiums/getStadiums";
import { IconButton } from "react-native-paper";
import { colors } from "../../../constants/Colors";
import { fonts } from "../../../constants/Fonts";
import { useLikeStadium } from "../../../hooks/useLikeStadium";

interface StadiumItem {
  item: StadiumData;
}

export function StadiumItem({ item }: StadiumItem) {
  const { icon: heartIcon, like: likeStadium } = useLikeStadium(item.id);
  return (
    <View style={styles.stadiumItem}>
      <Text style={styles.fontFamily}>{item?.name}</Text>
      <IconButton icon={heartIcon} onPress={likeStadium} />
    </View>
  );
}

const styles = StyleSheet.create({
  stadiumItem: {
    backgroundColor: colors.cream,
    padding: 20,
    marginVertical: 8,
    borderRadius: 30,
  },
  fontFamily: { fontFamily: fonts.regular },
});
