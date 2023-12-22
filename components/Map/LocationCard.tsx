import React from "react";
import { Linking, StyleSheet, ViewProps, Text } from "react-native";
import { Card, Chip } from "react-native-paper";
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
import { LoggedScreenNavigationProp } from "../../navigation/Logged";
import { HomeScreenNavigationProp } from "../../navigation/Logged/Home";
import { useNavigation } from "@react-navigation/native";
interface MapButtonProps extends ViewProps {
  locationDetails: StadiumData | null;
  updateLocationDetails: (stadium: StadiumData | null) => void;
  version: "public" | "logged";
}
export function LocationCard({ locationDetails, version, style, updateLocationDetails }: MapButtonProps) {
  const { icon: heartIcon, like: likeStadium, isLoading, isError } = useLikeStadium(locationDetails?.id ?? "");
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const navigateToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <>
      {version === "public" ? (
        <Card style={[styles.container, style]}>
          <Card.Content>
            <Text style={styles.cardTitle}>{locationDetails?.name ?? ""}</Text>
            <Text style={styles.description}>{locationDetails?.description ?? ""}</Text>
          </Card.Content>
          <Card.Cover
            source={{ uri: locationDetails?.imageUrl ?? "" }}
            resizeMethod="resize"
            resizeMode="cover"
            style={styles.cardImage}
          />
          <Card.Actions>
            <CardButton label="Close" onPress={() => updateLocationDetails(null)} />
          </Card.Actions>
        </Card>
      ) : (
        <Card style={[styles.container, style]}>
          <Card.Content>
            <Text style={styles.cardTitle}>{locationDetails?.name ?? ""}</Text>
            <Text style={styles.description}>{locationDetails?.description ?? ""}</Text>
          </Card.Content>
          <Row style={styles.chipRow}>
            <Chip icon={"information"} textStyle={styles.chipText} rippleColor={colors.orange} style={styles.likeChip}>
              Rating <Text style={styles.ratingScore}>{3.7}</Text>
            </Chip>
            <Chip
              icon={heartIcon}
              textStyle={styles.chipText}
              rippleColor={colors.orange}
              style={styles.likeChip}
              onPress={likeStadium}>
              {`${heartIcon === "cards-heart" ? "Remove from favourites" : "Add to favourites"}`}
            </Chip>
            {/* <Chip icon={"information"}>
              <StarsRating />
            </Chip> */}
          </Row>
          <Card.Cover
            source={{ uri: locationDetails?.imageUrl ?? "" }}
            resizeMethod="resize"
            resizeMode="cover"
            style={styles.cardImage}
          />
          {/* <Chip icon="information">Opinions:</Chip> */}
          <Chip
            icon={"information"}
            textStyle={styles.chipText}
            rippleColor={colors.orange}
            style={styles.nextMatchChip}
            disabled={isLoading || isError || heartIcon === "cards-heart-outline"}
            onPress={navigateToHome}>
            Next match: {"GKS Katowice vs Tychy 18.02.2023, 18:30"}
          </Chip>
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
      )}
    </>
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
  },
  ratingScore: {
    fontFamily: fonts.bold,
  },
  nextMatchChip: {
    marginBottom: 20,
    backgroundColor: colors.lightCream,
  },
});
