import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ResourcesLoader } from "../components/Loaders/ResourcesLoader";
import { UserProvider } from "./UserContext";
import { MapProvider } from "./MapContext";

export function AppProviders({ children }: React.PropsWithChildren<unknown>) {
  const queryClient = new QueryClient();
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <MapProvider>
            <ResourcesLoader>{children}</ResourcesLoader>
          </MapProvider>
        </UserProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
