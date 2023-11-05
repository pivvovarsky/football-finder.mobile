import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { NotLoggedNavigator } from "./NotLogged";

export default function Navigation() {
  const isAuthenticated = true;
  return (
    <NavigationContainer>
      {isAuthenticated && <NotLoggedNavigator />}
    </NavigationContainer>
  );
}
