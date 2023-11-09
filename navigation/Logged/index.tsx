import React, { useEffect } from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { BottomTab } from "./BottomTab";

export type LoggedScreenNavigationProp = StackNavigationProp<LoggedStackList>;
const LoggedStack = createStackNavigator<LoggedStackList>();

type LoggedStackList = {
  BottomNavigator: undefined;
};

export const LoggedNavigator = () => {
  return (
    <LoggedStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <LoggedStack.Screen name="BottomNavigator" component={BottomTab} />
    </LoggedStack.Navigator>
  );
};
