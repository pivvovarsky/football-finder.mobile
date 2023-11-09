import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { AppProviders } from "./context/AppProviders";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigation from "./navigation";

function App(): JSX.Element {
  return (
    <AppProviders>
      <SafeAreaView style={styles.safeArea} edges={["left", "right", "top"]}>
        <PaperProvider>
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
