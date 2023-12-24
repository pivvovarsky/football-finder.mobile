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
}
export function TeamsList({ items }: TeamsListProps) {
  return (
    <FlatList
      data={items}
      horizontal
      contentContainerStyle={{ width: "100%", justifyContent: "space-between" }}
      renderItem={(data) => <TeamItem team={data.item} />}
      ListEmptyComponent={<ActivityIndicator size="large" />}
      keyExtractor={(item, index) => item.id + index}
    />
  );
}

const styles = StyleSheet.create({});
