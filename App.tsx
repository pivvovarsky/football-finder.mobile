import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { AppProviders } from "./context/AppProviders";
import { DefaultTheme, PaperProvider, configureFonts } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { colors } from "./constants/Colors";
import { fonts } from "./constants/Fonts";
import { OfflineInfo } from "./components/OfflineInfo";
const fontConfig = {
  fontFamily: fonts.regular,
};

function App(): JSX.Element {
  const theme = {
    ...DefaultTheme,
    dark: false,
    fonts: configureFonts({ config: fontConfig }),
    colors: {
      ...DefaultTheme.colors,
      primary: colors.lightBrown,
      secondaryContainer: colors.cream,
      text: colors.brown,
    },
  };

  return (
    <AppProviders>
      <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
        <PaperProvider theme={theme}>
          <StatusBar barStyle="dark-content" />
          <OfflineInfo />
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
