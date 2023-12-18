import React from "react";
import { Linking, StyleSheet, ViewProps, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { colors } from "../../constants/Colors";
import { StadiumData } from "../../hooks/api/stadiums/getStadiums";
import { openAddressOnMap } from "../../containers/Map/map.utils";
import { StarsRating } from "../Ratings/StarsRating";
import { fonts } from "../../constants/Fonts";
import { Row } from "../Containers/Row";
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
            <Button buttonColor={colors.darkBlue} textColor={colors.white} onPress={() => updateLocationDetails(null)}>
              Close
            </Button>
          </Card.Actions>
        </Card>
      ) : (
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
          <StarsRating />
          <Card.Actions>
            <Row
              style={{
                justifyContent: "space-around",
                width: "100%",
              }}>
              <Button
                style={styles.button}
                buttonColor={colors.darkBlue}
                textColor={colors.orange}
                labelStyle={styles.fontFamily}
                onPress={() =>
                  openAddressOnMap(
                    locationDetails?.name ?? "",
                    locationDetails?.latitude ?? 0,
                    locationDetails?.longitude ?? 0,
                  )
                }>
                Navigate
              </Button>
              <Button
                style={styles.button}
                textColor={colors.white}
                buttonColor={colors.darkBlue}
                labelStyle={styles.fontFamily}
                onPress={() => openLocationWebsite(locationDetails?.websiteUrl ?? "")}>
                Buy ticket
              </Button>
              <Button
                style={styles.button}
                textColor={colors.white}
                buttonColor={colors.darkBlue}
                labelStyle={styles.fontFamily}
                onPress={() => updateLocationDetails(null)}>
                Close
              </Button>
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
  button: { width: "30%" },
  cardImage: { height: 200, width: 400, padding: 20, alignSelf: "center", backgroundColor: colors.white },
  cardTitle: { marginBottom: 10, fontFamily: fonts.medium, fontSize: 26 },
  description: { fontFamily: fonts.regular },
  fontFamily: {
    fontFamily: fonts.medium,
  },
});
