import React from "react";
import { Image, SectionList, StatusBar, StyleSheet, Text, View } from "react-native";
import { StadiumData } from "../../../hooks/api/stadiums/getStadiums";
import { TeamData } from "../../../hooks/api/teams/getTeams";
import { colors } from "../../../constants/Colors";
import { window } from "../../../constants/Layout";
import { fonts } from "../../../constants/Fonts";
import { Chip } from "react-native-paper";

interface TeamItemProps {
  team: TeamData;
}
export function TeamItem({ team }: TeamItemProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: team?.imageUrl ?? "" }} resizeMethod="resize" resizeMode="cover" style={styles.itemImage} />
      <View>
        <Text style={styles.nameText}>{team.name}</Text>
        <Chip icon={"information"}>
          <Text style={styles.details}>
            {team.league}
            {team.country}
          </Text>
        </Chip>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: window.width * 0.3,
    height: 120,
    backgroundColor: "#dedede",
    borderRadius: 15,
    margin: 5,
  },
  nameText: { fontSize: window.height * 0.03, fontFamily: fonts.regular },
  details: {},
  itemImage: { backgroundColor: colors.transparent, width: 50, height: 50 },
});
