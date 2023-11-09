import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeNavigator } from "./Home";
import { MapNavigator } from "./Map";
import { AccountNavigator } from "./Account";
import { Icon } from "react-native-paper";

export type BottomTabNavigationProp = StackNavigationProp<BottomTabList>;

type BottomTabList = {
  HOME: undefined;
  MAP: undefined;
  ACCOUNT: undefined;
};

const Tab = createMaterialBottomTabNavigator();

export function BottomTab() {
  const getTabBarIcon = (focused: boolean, name: string) => {
    let iconName;

    if (name === "MAP") {
      iconName = focused ? "map-marker-radius" : "map-marker-radius-outline";
    } else if (name === "ACCOUNT") {
      iconName = focused ? "account-cog" : "account-cog-outline";
    } else {
      iconName = focused ? "home" : "home-outline";
    }

    return <Icon source={iconName} size={26} color="black" />;
  };
  return (
    <Tab.Navigator
      initialRouteName="HOME"
      // activeColor="#f0edf6"
      // inactiveColor="#3e2465"
    >
      <Tab.Screen
        name="HOME"
        component={HomeNavigator}
        options={({ route }) => ({
          tabBarTestID: "HomeTab",
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => getTabBarIcon(focused, route.name),
        })}
      />
      <Tab.Screen
        name="MAP"
        component={MapNavigator}
        options={({ route }) => ({
          tabBarTestID: "MapTab",
          tabBarLabel: "Map",
          tabBarIcon: ({ focused }) => getTabBarIcon(focused, route.name),
        })}
      />
      <Tab.Screen
        name="ACCOUNT"
        component={AccountNavigator}
        options={({ route }) => ({
          tabBarTestID: "AccountTab",
          tabBarLabel: "Account",
          tabBarIcon: ({ focused }) => getTabBarIcon(focused, route.name),
        })}
      />
    </Tab.Navigator>
  );
}
