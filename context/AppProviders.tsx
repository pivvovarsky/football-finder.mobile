import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ResourcesLoader } from "../components/Loaders/ResourcesLoader";
import { UserProvider } from "./UserContext";

export function AppProviders({ children }: React.PropsWithChildren<unknown>) {
  const queryClient = new QueryClient();
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ResourcesLoader>{children}</ResourcesLoader>
        </UserProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
