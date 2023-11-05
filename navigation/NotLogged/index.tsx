import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { Login } from "../../containers/Login";

export type NotLoggedNavigationProp = StackNavigationProp<NotLoggedStackList>;

type NotLoggedStackList = {
  Login: undefined;
};

const NotLoggedStack = createStackNavigator<NotLoggedStackList>();

export const NotLoggedNavigator = () => {
  return (
    <NotLoggedStack.Navigator>
      <NotLoggedStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </NotLoggedStack.Navigator>
  );
};
