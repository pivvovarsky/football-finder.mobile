import React, { useEffect } from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { Home } from "../../containers/Home";
import { Favorites } from "../../containers/Favorites";

export type HomeScreenNavigationProp = StackNavigationProp<HomeStackList>;
const HomeStack = createStackNavigator<HomeStackList>();

type HomeStackList = {
  Home: undefined;
  Favorites: undefined;
};

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Favorites" component={Favorites} />
    </HomeStack.Navigator>
  );
};
