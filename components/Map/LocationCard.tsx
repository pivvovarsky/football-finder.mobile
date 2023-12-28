import React, { useEffect, useState } from "react";
import { StyleSheet, ViewProps, Text } from "react-native";
import { ActivityIndicator, Card, Chip } from "react-native-paper";
import { colors } from "../../constants/Colors";
import { StadiumData } from "../../hooks/api/stadiums/getStadiums";
import { openAddressOnMap } from "../../containers/Map/map.utils";
import { StarsRating } from "../Ratings/StarsRating";
import { fonts } from "../../constants/Fonts";
import { Row } from "../Containers/Row";
import { CardButton } from "../Buttons/CardButton";
import { useLikeStadium } from "../../hooks/useLikeStadium";
import { window } from "../../constants/Layout";
import { openLocationWebsite } from "../../containers/Home/utils/Home.utils";
import { HomeScreenNavigationProp } from "../../navigation/Logged/Home";
import { useNavigation } from "@react-navigation/native";
import { usePutStadiumRating } from "../../hooks/usePutRating";
import { useGetNextMatch } from "../../hooks/api/stadiums/getNextMatch";
import { MatchData } from "../../hooks/api/matches/getMatches";
interface MapButtonProps extends ViewProps {
  locationDetails: StadiumData | null;
  updateLocationDetails: (stadium: StadiumData | null) => void;
}
export function LocationCard({ locationDetails, style, updateLocationDetails }: MapButtonProps) {
  const { icon: heartIcon, like: likeStadium, isLoading, isError } = useLikeStadium(locationDetails?.id ?? "");
  const [nextMatchInfo, setNextMatchInfo] = useState<MatchData | null>(null);
  const { data: nextMatchData } = useGetNextMatch(locationDetails?.id ?? "");
  const { avgRating } = usePutStadiumRating(locationDetails?.id ?? "");
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  useEffect(() => {
    if (nextMatchData) setNextMatchInfo(nextMatchData);
  }, [nextMatchData]);

  return (
    <Card style={[styles.container, style]}>
      <Card.Content>
        <Text style={styles.cardTitle}>{locationDetails?.name ?? ""}</Text>
        <Text style={styles.description}>{locationDetails?.description ?? ""}</Text>
      </Card.Content>
      <Row style={styles.chipRow}>
        <Chip icon={"information"} textStyle={styles.chipText} rippleColor={colors.orange} style={styles.likeChip}>
          Rating <Text style={styles.ratingScore}>{avgRating}</Text>
        </Chip>
        <Chip
          icon={heartIcon}
          textStyle={styles.chipText}
          rippleColor={colors.orange}
          style={styles.likeChip}
          onPress={likeStadium}>
          {`${heartIcon === "cards-heart" ? "Remove from favourites" : "Add to favourites"}`}
        </Chip>
      </Row>
      {nextMatchInfo ? (
        !!nextMatchInfo?.host?.name && (
          <Chip
            icon={"information"}
            textStyle={styles.chipText}
            rippleColor={colors.orange}
            style={styles.nextMatchChip}
            disabled={isLoading || isError || heartIcon === "cards-heart-outline"}
            onPress={navigateToHome}>
            <Text>
              Next match: {nextMatchInfo?.host?.name ?? ""} vs {nextMatchInfo?.guest?.name ?? ""}
            </Text>
          </Chip>
        )
      ) : (
        <ActivityIndicator size={"small"} />
      )}
      {!locationDetails?.imageUrl ? (
        <ActivityIndicator size={"small"} />
      ) : (
        <Card.Cover
          source={{ uri: locationDetails?.imageUrl ?? "" }}
          resizeMethod="resize"
          resizeMode="cover"
          style={styles.cardImage}
        />
      )}
      {locationDetails?.id && <StarsRating stadiumId={locationDetails.id} />}
      <Card.Actions>
        <Row
          style={{
            justifyContent: "space-around",
            width: "100%",
          }}>
          <CardButton
            label="Navigate"
            onPress={() =>
              openAddressOnMap(
                locationDetails?.name ?? "",
                locationDetails?.latitude ?? 0,
                locationDetails?.longitude ?? 0,
              )
            }
          />
          <CardButton label="Buy ticket" onPress={() => openLocationWebsite(locationDetails?.websiteUrl ?? "")} />
          <CardButton label="Close" onPress={() => updateLocationDetails(null)} />
        </Row>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingBottom: 30,
    paddingTop: 10,
    paddingHorizontal: 10,
    borderRadius: 60,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  cardImage: { height: 200, width: 400, padding: 20, alignSelf: "center", backgroundColor: colors.white },
  cardTitle: { marginBottom: 10, fontFamily: fonts.medium, fontSize: 26, alignSelf: "center" },
  description: { fontFamily: fonts.regular },
  fontFamily: {
    fontFamily: fonts.medium,
  },
  chipRow: {
    paddingTop: 20,
    paddingBottom: 5,
  },
  likeChip: {
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  chipText: {
    fontSize: window.height * 0.015,
    fontFamily: fonts.regular,
  },
  ratingScore: {
    fontFamily: fonts.bold,
  },
  nextMatchChip: {
    marginTop: 5,
    marginHorizontal: 10,
    backgroundColor: colors.lightCream,
  },
});
