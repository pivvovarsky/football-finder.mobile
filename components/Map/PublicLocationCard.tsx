import React from "react";
import { StyleSheet, ViewProps, Text } from "react-native";
import { ActivityIndicator, Card } from "react-native-paper";
import { colors } from "../../constants/Colors";
import { StadiumData } from "../../hooks/api/stadiums/getStadiums";
import { fonts } from "../../constants/Fonts";
import { CardButton } from "../Buttons/CardButton";

interface PublicLocationCardProps extends ViewProps {
  locationDetails: StadiumData | null;
  updateLocationDetails: (stadium: StadiumData | null) => void;
}

export function PublicLocationCard({ locationDetails, style, updateLocationDetails }: PublicLocationCardProps) {
  return (
    <Card style={[styles.container, style]}>
      <Card.Content>
        <Text style={styles.cardTitle}>{locationDetails?.name ?? ""}</Text>
        <Text style={styles.description}>{locationDetails?.description ?? ""}</Text>
      </Card.Content>
      {!locationDetails?.imageUrl ? (
        <ActivityIndicator size={"small"} color={colors.black} />
      ) : (
        <Card.Cover
          source={{ uri: locationDetails?.imageUrl ?? "" }}
          resizeMethod="resize"
          resizeMode="cover"
          style={styles.cardImage}
        />
      )}
      <Card.Actions>
        <CardButton label="Close" onPress={() => updateLocationDetails(null)} />
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
});
