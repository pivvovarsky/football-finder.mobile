import React, { useEffect } from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { Account } from "../../containers/Account";

export type AccountScreenNavigationProp = StackNavigationProp<AccountStackList>;
const AccountStack = createStackNavigator<AccountStackList>();

type AccountStackList = {
  Account: undefined;
};

export const AccountNavigator = () => {
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AccountStack.Screen name="Account" component={Account} />
    </AccountStack.Navigator>
  );
};
