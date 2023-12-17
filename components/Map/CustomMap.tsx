import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { colors } from "../../constants/Colors";
import { StadiumData } from "../../hooks/api/stadiums/getStadiums";

interface MapProps {
  stadiums: StadiumData[];
  onMarkerPress: (stadium: StadiumData | null) => void;
}
export function CustomMap({ stadiums, onMarkerPress }: MapProps) {
  const [position, setPosition] = useState({
    latitude: 50.19293799535422,
    latitudeDelta: 0.0421,
    longitude: 18.974965056422143,
    longitudeDelta: 0.0421, //to change
  });

  // useEffect(() => {
  //   Geolocation.getCurrentPosition(
  //     (pos) => {
  //       const crd = pos.coords;
  //       setPosition({
  //         latitude: crd.latitude,
  //         longitude: crd.longitude,
  //         latitudeDelta: 0.0421,
  //         longitudeDelta: 0.0421,
  //       });
  //     },
  //     () => {},
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 10000,
  //     },
  //   );
  // }, []);

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
