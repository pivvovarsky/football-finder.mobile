/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { StyleSheet, useColorScheme } from "react-native";

import { AppProviders } from "./context/AppProviders";

function App(): JSX.Element {
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return <AppProviders></AppProviders>;
}

const styles = StyleSheet.create({});

export default App;
