import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NotLoggedNavigator } from "./NotLogged";
import { useUser } from "../hooks/context/useUser";
import { LoggedNavigator } from "./Logged";
import { CustomTheme } from "../constants/Themes";

export default function Navigation() {
  const { isAuthenticated } = useUser();
  return (
    <NavigationContainer theme={CustomTheme}>
      {isAuthenticated ? <LoggedNavigator /> : <NotLoggedNavigator />}
    </NavigationContainer>
  );
}
