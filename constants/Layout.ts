import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const BIG_HEIGHT_MIN = 750;

export const window = {
  width,
  height,
};

export const isSmallDeviceHeight = height < BIG_HEIGHT_MIN;

export const layout = {
  screenHorizontalPadding: 15,
  publicScreenHorizontalPadding: 32, // login, signup, onBoarding, forgotPassword etc.
  screenTopPadding: "10%",
  screenBottomPadding: "10%",
  separator: 15,
};

export const DEFAULT_ICON_SIZE = 25;
