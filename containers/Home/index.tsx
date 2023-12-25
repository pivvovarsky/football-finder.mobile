import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Topbar } from "../../components/Topbar/Topbar";
import { MatchData } from "../../hooks/api/matches/getMatches";
import { TeamData, useGetTeams } from "../../hooks/api/teams/getTeams";
import { layout } from "../../constants/Layout";
import { colors } from "../../constants/Colors";
import { SegmentedButtons } from "react-native-paper";
import { fonts } from "../../constants/Fonts";
import { useGetUpcomingMatches } from "../../hooks/api/matches/getUpcomingMatches";
import { MatchesList } from "./components/MatchesList";
import { TeamsList } from "./components/TeamsList";

enum HomeTab {
  Matches = "Upcoming Matches",
  Teams = "Teams",
}

export function Home() {
  const {
    data: upcomingMatchesData,
    isLoading: upcomingMatchesLoading,
    isError: isErrorUpcomingMatches,
    isFetched: isFetchedUpcomingMatches,
  } = useGetUpcomingMatches();
  const { data: teamsData, isLoading: teamsLoading, isError: isErrorTeams } = useGetTeams();
  const [upcomingMatches, setUpcomingMatches] = useState<MatchData[]>([]);
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [value, setValue] = useState<string>(HomeTab.Matches);
  const HEADER_BUTTONS = [
    {
      value: HomeTab.Matches,
      label: HomeTab.Matches,
      icon: "volleyball",
      style: {
        ...styles.segmentButtons,
        backgroundColor: value === HomeTab.Matches ? colors.lightBrown : colors.cream,
      },
    },
    {
      value: HomeTab.Teams,
      label: HomeTab.Teams,
      icon: "vuetify",
      style: { ...styles.segmentButtons, backgroundColor: value === HomeTab.Teams ? colors.lightBrown : colors.cream },
    },
  ];

  useEffect(() => {
    if (upcomingMatchesData) setUpcomingMatches(upcomingMatchesData.data);
    if (teamsData) setTeams(teamsData.data);
  }, [upcomingMatchesData, teamsData]);

  return (
    <View style={styles.container}>
      <Topbar title={"Home"} arrowIcon={false} />
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        density="regular"
        style={{ paddingHorizontal: 5 }}
        buttons={HEADER_BUTTONS}
      />
      {value === HomeTab.Matches ? (
        <MatchesList
          isFetched={isFetchedUpcomingMatches}
          loading={upcomingMatchesLoading || isErrorUpcomingMatches}
          items={upcomingMatches}
        />
      ) : (
        <TeamsList loading={teamsLoading || isErrorTeams} items={teams} />
      )}
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
  segmentButtons: {
    borderColor: colors.white,
  },
});
