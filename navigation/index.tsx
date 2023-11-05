import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { NotLoggedNavigator } from "./NotLogged";
import { useUser } from "../hooks/context/useUser";
import { LoggedNavigator } from "./Logged";

export default function Navigation() {
  const { isAuthenticated } = useUser();
  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <NotLoggedNavigator />
      ) : (
        <LoggedNavigator></LoggedNavigator>
      )}
    </NavigationContainer>
  );
}
