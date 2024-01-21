import React from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { Home } from "../../containers/Home";

export type HomeScreenNavigationProp = StackNavigationProp<HomeStackList>;
const HomeStack = createStackNavigator<HomeStackList>();

type HomeStackList = {
  Home: undefined;
};

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
};
