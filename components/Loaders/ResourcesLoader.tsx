import React, { useState, useEffect, Fragment } from "react";
import { Platform, UIManager } from "react-native";

export function ResourcesLoader({ children }: React.PropsWithChildren<unknown>) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      setIsLoading(false);
    }

    loadResourcesAndDataAsync().catch(console.error);
  }, []);

  if (isLoading) return null;

  return <Fragment>{children}</Fragment>;
}
