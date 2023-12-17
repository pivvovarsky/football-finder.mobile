import React from "react";
import { Linking, StyleSheet, ViewProps } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { colors } from "../../constants/Colors";
import { StadiumData } from "../../hooks/api/stadiums/getStadiums";
import { openAddressOnMap } from "../../containers/Map/map.utils";
import { StarsRating } from "../Ratings/StarsRating";
interface MapButtonProps extends ViewProps {
  locationDetails: StadiumData | null;
  updateLocationDetails: (stadium: StadiumData | null) => void;
  version: "public" | "logged";
}
export function LocationCard({ locationDetails, version, style, updateLocationDetails }: MapButtonProps) {
  const openLocationWebsite = (url: string) => {
    Linking.openURL(url).catch(console.error);
  };

  return (
    <>
      {version === "public" ? (
        <Card style={[styles.container, style]}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              {locationDetails?.name ?? ""}
            </Text>
            <Text variant="bodyMedium">{locationDetails?.description ?? ""}</Text>
          </Card.Content>
          <Card.Cover
            source={{ uri: locationDetails?.imageUrl ?? "" }}
            resizeMethod="resize"
            resizeMode="cover"
            style={styles.cardImage}
          />
          <Card.Actions>
            <Button buttonColor={colors.darkBlue} textColor={colors.white} onPress={() => updateLocationDetails(null)}>
              Close
            </Button>
          </Card.Actions>
        </Card>
      ) : (
        <Card style={[styles.container, style]}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.cardTitle}>
              {locationDetails?.name ?? ""}
            </Text>
            <Text variant="bodyMedium">{locationDetails?.description ?? ""}</Text>
          </Card.Content>
          <Card.Cover
            source={{ uri: locationDetails?.imageUrl ?? "" }}
            resizeMethod="resize"
            resizeMode="cover"
            style={styles.cardImage}
          />
          <StarsRating />
          <Card.Actions>
            <Button
              buttonColor={colors.darkBlue}
              textColor={colors.orange}
              onPress={() =>
                openAddressOnMap(
                  locationDetails?.name ?? "",
                  locationDetails?.latitude ?? 0,
                  locationDetails?.longitude ?? 0,
                )
              }>
              Navigate
            </Button>
            <Button textColor={colors.white} onPress={() => openLocationWebsite(locationDetails?.websiteUrl ?? "")}>
              Buy ticket
            </Button>
            <Button textColor={colors.white} onPress={() => updateLocationDetails(null)}>
              Close
            </Button>
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
  cardTitle: { marginBottom: 10, fontWeight: "700" },
});
