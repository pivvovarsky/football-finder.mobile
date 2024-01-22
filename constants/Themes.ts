import { DefaultTheme } from "@react-navigation/native";
import { DefaultTheme as ThemePaper, configureFonts } from "react-native-paper";
import { colors } from "./Colors";
import { fonts } from "./Fonts";

export const CustomTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

const fontConfig = {
  fontFamily: fonts.regular,
};

export const DEFAULT_THEME = {
  ...ThemePaper,
  dark: false,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...DefaultTheme.colors,
    primary: colors.lightBrown,
    secondaryContainer: colors.cream,
    text: colors.brown,
  },
};
