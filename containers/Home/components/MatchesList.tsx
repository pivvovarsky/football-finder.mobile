import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { colors } from "../../../constants/Colors";
import { fonts } from "../../../constants/Fonts";
import { MatchData } from "../../../hooks/api/matches/getMatches";
import { MatchItem } from "./MatchItem";
import { window } from "../../../constants/Layout";
import { ActivityIndicator } from "react-native-paper";
interface MatchesListProps {
  items: MatchData[];
  loading: boolean;
}
export function MatchesList({ items, loading }: MatchesListProps) {
  return (
    <FlatList
      data={items}
      renderItem={(data) => <MatchItem match={data.item} />}
      contentContainerStyle={styles.listStyle}
      ListEmptyComponent={
        <Text style={styles.listEmptyText}>
          {"We strongly encourage you to like the stadium or the match to see the upcoming matches."}
        </Text>
      }
      keyExtractor={(item, index) => item.id + index}
      ListFooterComponent={() => loading && <ActivityIndicator size="large" />}
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
});
