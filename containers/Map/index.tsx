import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";
import { useUser } from "../../hooks/context/useUser";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

export function Map() {
  const { login, isError, isLoading } = useUser();
  const [position, setPosition] = useState({
    latitude: 0,
    latitudeDelta: 0,
    longitude: 0,
    longitudeDelta: 0,
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
    >
      <Marker
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
