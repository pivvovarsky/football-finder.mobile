import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { Login } from "../../containers/Login";
import { SignUp } from "../../containers/SignUp";
import { Welcome } from "../../containers/Welcome";

export type NotLoggedNavigationProp = StackNavigationProp<NotLoggedStackList>;

type NotLoggedStackList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
};

const NotLoggedStack = createStackNavigator<NotLoggedStackList>();

export const NotLoggedNavigator = () => {
  return (
    <NotLoggedStack.Navigator initialRouteName="Welcome">
      <NotLoggedStack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
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
