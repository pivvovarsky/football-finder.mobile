import * as React from "react";
import { UserContext } from "../../context/UserContext";

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("UserContext must be within UserContextProvider");
  }

  return context;
};
