import React from "react";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { NotLoggedNavigator } from "./NotLogged";
import { useUser } from "../hooks/context/useUser";
import { LoggedNavigator } from "./Logged";

export default function Navigation() {
  const CustomTheme = {
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };
  const { isAuthenticated } = useUser();
  return (
    <NavigationContainer theme={CustomTheme}>
      {!isAuthenticated ? (
        <NotLoggedNavigator />
      ) : (
        <LoggedNavigator></LoggedNavigator>
      )}
    </NavigationContainer>
  );
}
