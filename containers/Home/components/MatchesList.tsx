import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { colors } from "../../../constants/Colors";
import { fonts } from "../../../constants/Fonts";
import { MatchData } from "../../../hooks/api/matches/getMatches";
import { MatchItem } from "./MatchItem";
import { window } from "../../../constants/Layout";
interface MatchesListProps {
  items: MatchData[];
  title: string;
}
export function MatchesList({ items, title }: MatchesListProps) {
  return (
    <FlatList
      data={items}
      renderItem={(data) => <MatchItem match={data.item} />}
      ListHeaderComponent={<Text style={styles.title}>{title}</Text>}
      // onScrollBeginDrag={Keyboard.dismiss}
      // ListFooterComponent={
      //   <Conditional
      //     condition={isFetching}
      //     trueRender={<QueryLoader isLoading={true} isError={false} style={styles.fetchLoader} />}
      //   />
      // }
    />
  );
}

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    fontFamily: fonts.regular,
    fontSize: window.height * 0.035,
  },
  stadiumItem: {
    backgroundColor: colors.cream,
    padding: 20,
    marginVertical: 8,
    borderRadius: 30,
  },
  fontFamily: { fontFamily: fonts.regular },
});
