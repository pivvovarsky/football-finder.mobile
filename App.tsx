import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { AppProviders } from "./context/AppProviders";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { OfflineInfo } from "./components/OfflineInfo";
import { DEFAULT_THEME } from "./constants/Themes";
import { colors } from "./constants/Colors";

function App(): JSX.Element {
  return (
    <AppProviders>
      <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
        <PaperProvider theme={DEFAULT_THEME}>
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
    backgroundColor: colors.white,
  },
});

export default App;
