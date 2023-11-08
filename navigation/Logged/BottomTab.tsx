import * as React from "react";
import { useState } from "react";
import { BottomNavigation, Text } from "react-native-paper";

const FavoritesRoute = () => <Text>FavoritesRoute</Text>;

const MapRoute = () => <Text>Map route</Text>;

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
