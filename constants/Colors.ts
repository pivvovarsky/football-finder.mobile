import { DefaultTheme } from "@react-navigation/native";

export const colors = {
  white: "#FFFFFF",
  beige: "#d6d3c5",
  cream: "#EEDEC8",
  lightCream: "#eae8e0",
  darkBlue: "#0F284B",
  black: "#000000",
  transparent: "transparent",
  orange: "#ffcc00",
  lightBrown: "#c3b091",
  brown: "#9c7248",
  darkBrown: "#5C4033",
};

export const CustomTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};
