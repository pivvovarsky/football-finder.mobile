import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { colors } from "../../constants/Colors";
import { StadiumData } from "../../hooks/api/stadiums/getStadiums";
import Geolocation from "@react-native-community/geolocation";

interface MapCoordinates {
  latitude: number;
  latitudeDelta: number;
  longitude: number;
  longitudeDelta: number;
}
interface MapProps {
  stadiums: StadiumData[];
  onMarkerPress: (stadium: StadiumData | null) => void;
}
export function CustomMap({ stadiums, onMarkerPress }: MapProps) {
  const [position, setPosition] = useState<MapCoordinates>({
    latitude: 50.266224524369505,
    longitude: 19.025359168395223,
    latitudeDelta: 0.0421,
    longitudeDelta: 0.0421,
  }); //spodek

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (pos) => {
        const crd = pos.coords;
        setPosition({
          latitude: crd.latitude,
          longitude: crd.longitude,
          latitudeDelta: 0.0421,
          longitudeDelta: 0.0421,
        });
      },
      () => {},
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  }, []);

  return (
    <>
      <MapView
        // remove if not using Google Maps
        provider={PROVIDER_GOOGLE}
        region={position}
        style={styles.map}
        loadingBackgroundColor={colors.white}
        initialRegion={position}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        onPress={(e) => {
          e.stopPropagation();
          onMarkerPress(null);
        }}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        loadingIndicatorColor={colors.black}
        rotateEnabled={true}
        loadingEnabled={true}>
        {stadiums.map((stadium) => {
          return (
            <Marker
              key={stadium.id}
              onSelect={() => onMarkerPress(stadium)}
              onPress={(e) => {
                e.stopPropagation();
                onMarkerPress(stadium);
              }}
              style={styles.markerPadding}
              coordinate={{ latitude: stadium.latitude, longitude: stadium.longitude }}>
              <Image style={{ height: 35, width: 35 }} source={require("../../assets/images/stadium.png")} />
            </Marker>
          );
        })}
        <Marker
          isPreselected={true}
          title="Yor are here"
          description="Let's look for some football game!"
          coordinate={position}
        />
      </MapView>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
  },
  markerPadding: { padding: 20 },
});
