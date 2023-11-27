import * as React from "react";
import { MapContext } from "../../context/MapContext";

export const useMap = () => {
  const context = React.useContext(MapContext);
  if (!context) {
    throw new Error("MapContext must be within MapContextProvider");
  }
  return context;
};
