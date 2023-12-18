import React, { useEffect, useMemo, useState } from "react";
import { Image, SectionList, StatusBar, StyleSheet, Text, View } from "react-native";
import { Topbar } from "../../components/Topbar/Topbar";
import { StadiumData, useGetStadiums } from "../../hooks/api/stadiums/getStadiums";
import { MatchData, useGetMatches } from "../../hooks/api/matches/getMatches";
import { TeamData, useGetTeams } from "../../hooks/api/teams/getTeams";
import { layout } from "../../constants/Layout";
import dayjs from "dayjs";
import { Row } from "../../components/Containers/Row";
import { colors } from "../../constants/Colors";
import { ActivityIndicator } from "react-native-paper";
import { fonts } from "../../constants/Fonts";

export function Home() {
  const { data: matchesData } = useGetMatches();
  const { data: stadiumsData } = useGetStadiums();
  const { data: teamsData } = useGetTeams();

  const DATA = [
    {
      title: "Upcoming games",
      data: matchesData?.data ?? [],
      renderItem: ({ item }: { item: MatchData }) => (
        <View style={styles.matchItem}>
          <Text style={styles.matchInfo}>{`${item.host.country}, ${item.host.league}`}</Text>
          <Row style={styles.matchRow}>
            <View style={{ justifyContent: "center", alignItems: "center", width: "50%" }}>
              <Image
                source={{ uri: item?.host?.imageUrl ?? "" }}
                resizeMethod="resize"
                resizeMode="cover"
                style={styles.itemImage}
              />
              <Text style={styles.fontFamilyBold}>{`${item?.host?.name}`}</Text>
            </View>
            <Text style={styles.scoreSeparator}>-</Text>
            <View style={{ justifyContent: "center", alignItems: "center", width: "50%" }}>
              <Image
                source={{ uri: item?.guest?.imageUrl ?? "" }}
                resizeMethod="resize"
                resizeMode="cover"
                style={styles.itemImage}
              />
              <Text style={styles.fontFamilyBold}>{`${item?.guest?.name}`}</Text>
            </View>
          </Row>
          <View style={styles.bottomMatchInfo}>
            <Text style={styles.fontFamily}>{`${item?.host.stadium?.name}`}</Text>
            <Text style={styles.fontFamily}>{`${dayjs(item?.date).format("DD/MM/YYYY, HH:mm")}`}</Text>
          </View>
        </View>
      ),
    },
    {
      title: "Stadiums",
      data: stadiumsData?.data ?? [],
      renderItem: ({ item }: { item: StadiumData }) => (
        <View style={styles.stadiumItem}>
          <Text style={styles.fontFamily}>{item?.name}</Text>
        </View>
      ),
    },
    {
      title: "Teams",
      data: teamsData?.data ?? [],
      renderItem: ({ item }: { item: TeamData }) => (
        <View style={styles.teamItem}>
          <Text style={styles.fontFamily}> {item?.name}</Text>
        </View>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <Topbar title={"Home"} arrowIcon={false} />
      <SectionList
        sections={DATA}
        ListEmptyComponent={<ActivityIndicator size={"large"} />}
        keyExtractor={(item, index) => item.id + index}
        renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: layout.screenHorizontalPadding,
  },
  matchRow: { width: "100%", justifyContent: "space-around" },
  matchItem: {
    flex: 1,
    backgroundColor: colors.elixir,
    padding: 20,
    marginVertical: 8,
    borderRadius: 30,
  },
  matchInfo: {
    alignSelf: "center",
    paddingBottom: 10,
    fontFamily: fonts.regular,
  },
  bottomMatchInfo: { padding: 10, alignItems: "center", fontFamily: fonts.regular },
  itemImage: { backgroundColor: colors.transparent, width: 50, height: 50 },
  teamItem: {
    backgroundColor: colors.heal,
    padding: 20,
    marginVertical: 8,
    borderRadius: 30,
  },
  stadiumItem: {
    backgroundColor: colors.heal,
    padding: 20,
    marginVertical: 8,
    borderRadius: 30,
  },
  header: {
    fontSize: 32,
    fontFamily: fonts.regular,
    alignSelf: "center",
  },
  scoreSeparator: { alignSelf: "center", fontSize: 40 },
  fontFamily: { fontFamily: fonts.regular },
  fontFamilyBold: { fontFamily: fonts.bold },
});
