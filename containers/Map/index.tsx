import React, { useEffect, useState } from "react";
import { PermissionsAndroid, StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";
import { useUser } from "../../hooks/context/useUser";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import MapView, {
  Callout,
  Circle,
  Geojson,
  Heatmap,
  Marker,
  Overlay,
  PROVIDER_GOOGLE,
  Polygon,
} from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

export function Map() {
  const { login, isError, isLoading } = useUser();
  const [position, setPosition] = useState({
    latitude: 50.19293799535422,
    latitudeDelta: 0.0421,
    longitude: 18.974965056422143,
    longitudeDelta: 0.0421, //to change
  });
  useEffect(() => {
    console.log(position);
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords;

      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
    });
  }, []);

  return (
    <MapView
      // remove if not using Google Maps
      provider={PROVIDER_GOOGLE}
      region={position}
      style={styles.map}
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
    ...StyleSheet.absoluteFillObject,
  },
});
