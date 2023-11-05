import React, { useState, useEffect, Fragment } from "react";
import { Platform, UIManager } from "react-native";

export function ResourcesLoader({
  children,
}: React.PropsWithChildren<unknown>) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  //   const { setUser } = useUser();

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      //   const user = await storage.getUser();
      //   const tokens = await storage.getTokens();
      //   setUser(user);
      //   if (tokens) {
      //     api.setTokens(tokens.token, tokens.refreshToken);
      //   }
      setIsLoading(false);
      //   SplashScreen.hide();
    }

    loadResourcesAndDataAsync().catch(console.error);
  }, []);

  if (isLoading) return null;

  return <Fragment>{children}</Fragment>;
}
