import React from "react";
import { FlatList, RefreshControl, StyleSheet, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { TeamData, useGetTeams } from "../../../hooks/api/teams/getTeams";
import { TeamItem } from "./TeamItem";
import { useRefreshQuery } from "../../../hooks/useRefreshQuery";
interface TeamsListProps {
  items: TeamData[];
  loading: boolean;
}
export function TeamsList({ items, loading }: TeamsListProps) {
  const { refresh, isFetching } = useRefreshQuery([["getFavouriteTeams"], ["getUpcomingMatches"], ["getTeams"]]);
  return (
    <FlatList
      data={items}
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refresh} />}
      horizontal
      contentContainerStyle={styles.container}
      renderItem={(data) => <TeamItem team={data.item} />}
      ListEmptyComponent={<ActivityIndicator size="large" />}
      keyExtractor={(item, index) => item.id + index}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", marginTop: 10 },
});
