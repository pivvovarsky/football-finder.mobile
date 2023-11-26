import { Linking } from "react-native";
const CONTACT_MAIL = "pivvovarski@gmail.com";

export const openEmailbox = () => {
  Linking.openURL(`mailto:${CONTACT_MAIL}`).catch(console.error);
};
