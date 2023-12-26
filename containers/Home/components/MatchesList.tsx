import React from "react";
import { FlatList, RefreshControl, StyleSheet, Text } from "react-native";
import { colors } from "../../../constants/Colors";
import { fonts } from "../../../constants/Fonts";
import { MatchData } from "../../../hooks/api/matches/getMatches";
import { MatchItem } from "./MatchItem";
import { window } from "../../../constants/Layout";
import { Skeleton } from "../../../components/Loaders/MySkeletonContent";
import { useRefreshQuery } from "../../../hooks/useRefreshQuery";
interface MatchesListProps {
  items: MatchData[];
  loading: boolean;
  isFetched: boolean;
}
export function MatchesList({ items, loading }: MatchesListProps) {
  const { refresh, isFetching } = useRefreshQuery([["getUpcomingMatches"]]);

  return (
    <FlatList
      data={items}
      refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refresh} />}
      renderItem={(data) => <MatchItem match={data.item} />}
      contentContainerStyle={styles.listStyle}
      keyExtractor={(item, index) => item.id + index}
      ListEmptyComponent={
        <Text style={styles.listEmptyText}>
          {"We strongly encourage you to like the stadium or the match to see the upcoming matches."}
        </Text>
      }
      ListFooterComponent={() => loading && <Skeleton loading={loading} style={styles.skeleton} />}
    />
  );
}

const styles = StyleSheet.create({
  listStyle: { marginTop: 10 },
  title: {
    alignSelf: "center",
    fontFamily: fonts.regular,
    fontSize: window.height * 0.035,
  },
  listEmptyText: { fontFamily: fonts.bold, fontSize: 15, paddingHorizontal: 20, textAlign: "center", paddingTop: 10 },
  skeleton: { width: "100%", height: 200, padding: 20, marginVertical: 8, borderRadius: 30 },
});
