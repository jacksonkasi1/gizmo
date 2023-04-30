import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomDrawer from "../components/CustomDrawer";

import Ionicons from "react-native-vector-icons/Ionicons";

// import ProfileScreen from '../screens/ProfileScreen';
// import MessagesScreen from '../screens/MessagesScreen';
// import SettingsScreen from '../screens/SettingsScreen';

import LeftCustomDrawer from "../components/LeftCustomDrawer";
import ScreenStack from "./NavigationStack";
import BottomTab from "./BottomTab";

const Drawer = createDrawerNavigator();

const LeftSideDrawer = (props) => {
  return (
    <Drawer.Navigator
      id="LeftDrawer"
      screenOptions={{
        headerShown: false,
        drawerPosition: "left",
        drawerStyle: { width: "80%" },
      }}
      overlayColor="transparent"
      initialRouteName="ScreenStack"
      drawerContent={(props) => <LeftCustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="BottomTab"
        component={BottomTab}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="timer-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ScreenStack"
        component={ScreenStack}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="timer-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default LeftSideDrawer;
