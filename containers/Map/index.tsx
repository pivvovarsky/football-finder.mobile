import React, { useState } from "react";
import { CustomMap } from "../../components/Map/CustomMap";
import { useMap } from "../../hooks/context/useMap";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-paper";
import { LocationCard } from "../../components/Map/LocationCard";

export function Map() {
  const { stadiumsData, isLoadingStadiumsData, locationDetails, updateLocationDetails } = useMap();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 15) }]}>
      {isLoadingStadiumsData ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <>
          <CustomMap stadiums={stadiumsData} onMarkerPress={updateLocationDetails} />
          {!!locationDetails && (
            <LocationCard locationDetails={locationDetails} updateLocationDetails={updateLocationDetails} />
          )}
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, ...StyleSheet.absoluteFillObject, justifyContent: "flex-end" },
});
