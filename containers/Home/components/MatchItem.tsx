import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Row } from "../../../components/Containers/Row";
import { MatchData } from "../../../hooks/api/matches/getMatches";
import { fonts } from "../../../constants/Fonts";
import { colors } from "../../../constants/Colors";
import { TeamContainer } from "../containers/TeamContainer";
import { MatchDetails } from "./MatchDetails";
import { Skeleton } from "../../../components/Loaders/MySkeletonContent";

interface MatchItemProps {
  match: MatchData;
}
export function MatchItem({ match }: MatchItemProps) {
  return (
    <View style={styles.matchItem}>
      <Text style={styles.matchInfo}>{`${match?.host?.country}, ${match?.host?.league}`}</Text>
      <Row style={styles.matchRow}>
        <TeamContainer team={match.host} />
        <Text style={styles.scoreSeparator}>-</Text>
        <TeamContainer team={match.guest} />
      </Row>
      <MatchDetails match={match} />
    </View>
  );
}

const styles = StyleSheet.create({
  matchItem: {
    backgroundColor: colors.elixir,
    padding: 20,
    marginVertical: 8,
    borderRadius: 30,
  },

  matchRow: { justifyContent: "space-around" },
  matchInfo: {
    alignSelf: "center",
    paddingBottom: 10,
    fontFamily: fonts.regular,
  },
  scoreSeparator: { alignSelf: "center", fontSize: 40 },
});
