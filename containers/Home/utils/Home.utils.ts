import { Linking } from "react-native";

export const openLocationWebsite = (url: string) => {
  Linking.openURL(url).catch(console.error);
};
