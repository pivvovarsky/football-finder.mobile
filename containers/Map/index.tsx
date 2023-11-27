import React, { useState } from "react";
import { CustomMap } from "../../components/Map/CustomMap";
import { useMap } from "../../hooks/context/useMap";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../../constants/Colors";
import { LocationCard } from "../../components/Map/LocationCard";
import { StadiumData } from "../../hooks/api/stadiums/getStadiums";

export function Map() {
  const { stadiumsData, isLoadingStadiumsData } = useMap();
  const [locationDetails, setLocationDetails] = useState<StadiumData | null>(null);

  const updateLocationDetails = (stadium: StadiumData | null) => {
    if (!stadium) {
      setLocationDetails(null);
    } else setLocationDetails(stadium);
  };
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 15) }]}>
      {isLoadingStadiumsData ? (
        <ActivityIndicator size={"large"} color={colors.darkGreen} />
      ) : (
        <>
          <CustomMap stadiums={stadiumsData} onMarkerPress={updateLocationDetails} />
          {!!locationDetails ? (
            <LocationCard
              style={styles.card}
              locationDetails={locationDetails}
              updateLocationDetails={updateLocationDetails}
              version={"logged"}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, ...StyleSheet.absoluteFillObject, justifyContent: "flex-end" },
  card: {},
});
