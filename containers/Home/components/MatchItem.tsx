import React from "react";
import { SectionList, StatusBar, StyleSheet, Text, View } from "react-native";
import { StadiumData } from "../../../hooks/api/stadiums/getStadiums";

interface MatchItem {
  id: string;
  stadium: StadiumData;

  //   guest: TeamData
  //   host: TeamData;
  hostGoals?: number;
  guestGoals?: number;
  date: Date;
}
export function TeamItem({ stadium }: MatchItem) {
  return <View>{stadium.name}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
});
