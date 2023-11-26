import Geolocation from "@react-native-community/geolocation";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacityProps, View } from "react-native";
import MapView, { MapMarker, MapMarkerProps, MapViewProps, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { colors } from "../../../constants/Colors";
import { StadiumData } from "../../../hooks/api/stadiums/getStadiums";
import StadiumIcon from "react-native-vector-icons/MaterialIcons";
//https://www.freepik.com/icon/stadium_1259792#fromView=keyword&term=Stadium&page=1&position=16&uuid=7781b235-bbc4-42f5-891e-eed440467d34
interface MapProps extends MapViewProps {
  stadiums: StadiumData[];
}
export function Map({ stadiums }: MapProps) {
  const [position, setPosition] = useState({
    latitude: 50.19293799535422,
    latitudeDelta: 0.0421,
    longitude: 18.974965056422143,
    longitudeDelta: 0.0421, //to change
  });

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
      showsCompass={true}
      scrollEnabled={true}
      zoomEnabled={true}
      pitchEnabled={true}
      rotateEnabled={true}
      loadingEnabled={true}>
      {stadiums.map((stadium) => {
        console.log(stadium.name);
        return (
          <Marker
            key={2}
            title={`Stadion ${stadium.name}`}
            description={stadium.description ?? `Stadium of ${stadium.name}`}
            coordinate={{ latitude: stadium.latitude, longitude: stadium.longitude }}>
            <Image style={{ height: 35, width: 35 }} source={require("../../../assets/images/stadium.png")} />
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
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
  },
});
