import { DefaultTheme as NavigationTheme } from "@react-navigation/native";
import { DefaultTheme as ThemePaper, configureFonts } from "react-native-paper";
import { colors } from "./Colors";
import { fonts } from "./Fonts";

export const CustomTheme = {
  dark: false,
  colors: {
    ...NavigationTheme.colors,
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
    ...ThemePaper.colors,
    primary: colors.lightBrown,
    secondaryContainer: colors.cream,
    text: colors.brown,
  },
};
