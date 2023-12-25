import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { colors } from "../../../constants/Colors";
import { fonts } from "../../../constants/Fonts";
import { MatchData } from "../../../hooks/api/matches/getMatches";
import { MatchItem } from "./MatchItem";
import { window } from "../../../constants/Layout";
import { ActivityIndicator } from "react-native-paper";
import { TeamData } from "../../../hooks/api/teams/getTeams";
import { TeamItem } from "./TeamItem";
interface TeamsListProps {
  items: TeamData[];
  loading: boolean;
}
export function TeamsList({ items, loading }: TeamsListProps) {
  return (
    <FlatList
      data={items}
      horizontal
      contentContainerStyle={styles.container}
      renderItem={(data) => <TeamItem team={data.item} />}
      ListEmptyComponent={<ActivityIndicator size="large" style={styles.activityIndicator} />}
      keyExtractor={(item, index) => item.id + index}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  activityIndicator: {},
});
