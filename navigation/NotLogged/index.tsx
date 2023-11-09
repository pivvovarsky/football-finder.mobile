import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { Login } from "../../containers/Login";
import { SignUp } from "../../containers/SignUp";

export type NotLoggedNavigationProp = StackNavigationProp<NotLoggedStackList>;

type NotLoggedStackList = {
  Login: undefined;
  SignUp: undefined;
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
      <NotLoggedStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </NotLoggedStack.Navigator>
  );
};
