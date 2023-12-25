import React from "react";
import { Image, SectionList, StatusBar, StyleSheet, Text, View } from "react-native";
import { StadiumData } from "../../../hooks/api/stadiums/getStadiums";
import { TeamData } from "../../../hooks/api/teams/getTeams";
import { colors } from "../../../constants/Colors";
import { window } from "../../../constants/Layout";
import { fonts } from "../../../constants/Fonts";
import { IconButton } from "react-native-paper";
import { useLikeTeam } from "../../../hooks/useLikeTeam";

interface TeamItemProps {
  team: TeamData;
}

export function TeamItem({ team }: TeamItemProps) {
  const { icon: heartIcon, like: likeTeam, isLoading } = useLikeTeam(team.id);
  return (
    <View style={styles.container}>
      <IconButton style={styles.heartIcon} icon={heartIcon} onPress={likeTeam} disabled={isLoading} />
      <Image source={{ uri: team?.imageUrl ?? "" }} resizeMethod="resize" resizeMode="cover" style={styles.itemImage} />
      <Text style={styles.nameText} numberOfLines={2}>
        {team.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: window.width * 0.44,
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    backgroundColor: "#dedede",
    borderRadius: 20,
    margin: 5,
  },
  heartIcon: { position: "absolute", right: 0, top: 0 },
  nameText: { fontSize: window.height * 0.02, fontFamily: fonts.regular, textAlign: "center", paddingHorizontal: 20 },
  itemImage: { backgroundColor: colors.transparent, width: 50, height: 50 },
});
