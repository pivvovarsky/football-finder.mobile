import React, { useEffect } from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { ActivityIndicator } from "react-native";
import { BottomTab } from "./BottomTab";
import { Map } from "../../containers/Map";

export type MapScreenNavigationProp = StackNavigationProp<MapStackList>;
const MapStack = createStackNavigator<MapStackList>();

type MapStackList = {
  Map: undefined;
};

export const MapNavigator = () => {
  return (
    <MapStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MapStack.Screen name="Map" component={Map} />
    </MapStack.Navigator>
  );
};
