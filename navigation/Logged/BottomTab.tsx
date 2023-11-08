import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { BottomNavigation, Text } from "react-native-paper";
import MapView from "react-native-maps";

const FavoritesRoute = () => <Text>FavoritesRoute</Text>;

const MapRoute = () => (
  <MapView
    // remove if not using Google Maps
    style={styles.map}
    region={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    }}
  ></MapView>
);

const AccountRoute = () => <Text>AccountRoute</Text>;

export const BottomTab = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "favorites",
      title: "Favorites",
      focusedIcon: "heart-multiple",
      unfocusedIcon: "heart-multiple-outline",
    },
    {
      key: "map",
      title: "Map",
      focusedIcon: "map-marker-radius",
      unfocusedIcon: "map-marker-radius-outline",
    },
    {
      key: "account",
      title: "Account",
      focusedIcon: "account-cog",
      unfocusedIcon: "account-cog-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    favorites: FavoritesRoute,
    map: MapRoute,
    account: AccountRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
