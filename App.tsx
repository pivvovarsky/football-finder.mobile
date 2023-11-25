import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { AppProviders } from "./context/AppProviders";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { colors } from "./constants/Colors";

function App(): JSX.Element {
  const theme = {
    ...DefaultTheme,
    // Specify custom property
    dark: false,
    // Specify custom property in nested object
    colors: {
      ...DefaultTheme.colors,
      primary: colors.darkBlue,
      text: colors.darkBlue,
    },
  };

  return (
    <AppProviders>
      <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
        <PaperProvider theme={theme}>
          <StatusBar barStyle="dark-content" />
          <Navigation />
        </PaperProvider>
      </SafeAreaView>
    </AppProviders>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default App;
