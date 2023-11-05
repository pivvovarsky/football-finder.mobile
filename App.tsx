import React from "react";
import { StatusBar, StyleSheet, useColorScheme } from "react-native";

import { AppProviders } from "./context/AppProviders";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigation from "./navigation";

function App(): JSX.Element {
  return (
    <AppProviders>
      <PaperProvider>
        <SafeAreaView
          style={styles.safeArea}
          edges={["left", "right", "top", "bottom"]}
        >
          <StatusBar hidden barStyle="dark-content" />
          <Navigation />
        </SafeAreaView>
      </PaperProvider>
    </AppProviders>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
