import React from "react";
import { SectionList, StatusBar, StyleSheet, Text, View } from "react-native";
import { StadiumData } from "../../../hooks/api/stadiums/getStadiums";

interface TeamItem {
  id: string;
  name: String;
  imageUrl: String;
  description?: string;
  league: string;
  country: string;
  stadium: StadiumData;
}
export function TeamItem({}: TeamItem) {
  return <></>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
});
