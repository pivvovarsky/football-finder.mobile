import React from "react";
import { FlatList, RefreshControl, StyleSheet, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { TeamData } from "../../../hooks/api/teams/getTeams";
import { TeamItem } from "./TeamItem";
import { useRefreshQuery } from "../../../hooks/useRefreshQuery";
interface TeamsListProps {
  items: TeamData[];
}
export function TeamsList({ items }: TeamsListProps) {
  const { refresh, isFetching } = useRefreshQuery([["getFavouriteTeams"], ["getUpcomingMatches"], ["getTeams"]]);
  return (
    <FlatList
      data={items}
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refresh} />}
      numColumns={2}
      contentContainerStyle={styles.container}
      renderItem={(data) => <TeamItem team={data.item} />}
      ListEmptyComponent={<ActivityIndicator size="large" />}
      keyExtractor={(item, index) => item.id + index}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 10, paddingBottom: 20 },
});
