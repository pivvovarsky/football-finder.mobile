import React, { useEffect, useState } from "react";
import { FlatList, SectionList, StyleSheet, Text, View } from "react-native";
import { Topbar } from "../../components/Topbar/Topbar";
import { MatchData } from "../../hooks/api/matches/getMatches";
import { TeamData, useGetTeams } from "../../hooks/api/teams/getTeams";
import { layout } from "../../constants/Layout";
import { colors } from "../../constants/Colors";
import { ActivityIndicator } from "react-native-paper";
import { fonts } from "../../constants/Fonts";
import { useGetUpcomingMatches } from "../../hooks/api/matches/getUpcomingMatches";
import { TeamItem } from "./components/TeamItem";
import { MatchesList } from "./components/MatchesList";

type Section = {
  title: string;
  data: any[];
  isLoading: boolean;
  renderItem: ({ item }: { item: any }) => JSX.Element;
};

export function Home() {
  const { data: upcomingMatchesData, isLoading: upcomingMatchesLoading } = useGetUpcomingMatches();
  const { data: teamsData, isLoading: teamsLoading } = useGetTeams();
  const [upcomingMatches, setUpcomingMatches] = useState<MatchData[]>([]);
  const [teams, setTeams] = useState<TeamData[]>([]);

  useEffect(() => {
    if (upcomingMatchesData) setUpcomingMatches(upcomingMatchesData.data);
    if (teamsData) setTeams(teamsData.data);
  }, [upcomingMatchesData, teamsData]);

  return (
    <View style={styles.container}>
      <Topbar title={"Home"} arrowIcon={false} />
      <MatchesList items={upcomingMatches} title={"Upcoming matches"} />
      {/* <SectionList
        sections={sections}
        renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
        renderSectionFooter={({ section: { isLoading } }) => {
          if (isLoading) {
            return <ActivityIndicator />;
          }
          return null;
        }}
        ListEmptyComponent={<ActivityIndicator size="large" />}
        keyExtractor={(item, index) => item.id + index}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: layout.screenHorizontalPadding,
  },
  header: {
    fontSize: 32,
    fontFamily: fonts.regular,
    alignSelf: "center",
  },
});
