import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { fonts } from "../../../constants/Fonts";
import { MatchData } from "../../../hooks/api/matches/getMatches";
import { Chip } from "react-native-paper";
import { Row } from "../../../components/Containers/Row";
import { openLocationWebsite } from "../utils/Home.utils";
import dayjs from "dayjs";
import { useMap } from "../../../hooks/context/useMap";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "../../../navigation/Logged/BottomTab";

interface MatchDetailsProps {
  match: MatchData;
}
export function MatchDetails({ match }: MatchDetailsProps) {
  const navigation = useNavigation<BottomTabNavigationProp>();
  const { updateLocationDetails } = useMap();

  const navigateToStadiumDetails = () => {
    navigation.navigate("MAP");
    updateLocationDetails(match.host.stadium);
  };

  return (
    <>
      <View style={styles.bottomMatchInfo}>
        <Text style={styles.fontFamily}>{match?.host.stadium?.name}</Text>
        <Text style={styles.fontFamily}>{dayjs(match?.date).format("DD/MM/YYYY, HH:mm")}</Text>
      </View>
      <Row style={styles.rowChip}>
        <Chip icon={"ticket"} onPress={() => openLocationWebsite(match.host?.stadium?.websiteUrl ?? "")}>
          Buy tickets
        </Chip>
        {match.host.stadium && (
          <Chip icon={"information"} onPress={navigateToStadiumDetails}>
            More Details
          </Chip>
        )}
      </Row>
    </>
  );
}

const styles = StyleSheet.create({
  bottomMatchInfo: { padding: 10, alignItems: "center", fontFamily: fonts.regular },
  fontFamily: { fontFamily: fonts.regular },
  rowChip: { justifyContent: "space-around" },
});
