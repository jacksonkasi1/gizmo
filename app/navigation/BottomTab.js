import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";

//screens
import AddScreen from "../screens/AddScreen";
import NotificationScreen from "../screens/NotificationScreen";
import SearchStack from "./SearchStack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

//config
import Colors from "../config/Colors";
import BottomModal from "../components/BottomModal";

const Tab = createBottomTabNavigator();
const FakeComponent = () => {
  return null;
};
export default function BottomTab(props) {
  // console.log("bt", props.navigation);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "#A0A3B1",
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          height: wp("15%"),
          marginBottom: RFPercentage(2),
          width: "90%",
          borderRadius: RFPercentage(10),
          alignItems: "center",
          justifyContent: "center",
          marginLeft: RFPercentage(2.7),
          marginTop: RFPercentage(1),
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={(route) => ({
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <View style={focused && styles.activeIcon}>
                  <Image
                    style={{
                      width: RFPercentage(4),
                      height: RFPercentage(4),
                    }}
                    source={require("../../assets/images/homeicon.png")}
                  />
                </View>
              ) : (
                <View style={focused && styles.activeIcon}>
                  <Image
                    style={{
                      width: RFPercentage(4.2),
                      height: RFPercentage(4.2),
                    }}
                    source={require("../../assets/images/homeredicon.png")}
                  />
                </View>
              )}
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="search"
        component={SearchStack}
        options={(route) => ({
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <View style={focused && styles.activeIcon}>
                  <Ionicons
                    name="search"
                    size={27}
                    color={focused ? "white" : Colors.third}
                  />
                </View>
              ) : (
                <View style={focused && styles.activeIcon}>
                  <Ionicons
                    name="search"
                    size={27}
                    color={focused ? "white" : Colors.third}
                  />
                </View>
              )}
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Add"
        component={FakeComponent}
        options={(route) => ({
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <View style={focused && styles.activeIcon}>
                  <Ionicons
                    name="add-circle-outline"
                    size={35}
                    color={focused ? "white" : Colors.third}
                  />
                </View>
              ) : (
                <View style={focused && styles.activeIcon}>
                  <Ionicons
                    name="add-circle-outline"
                    size={35}
                    color={focused ? "white" : Colors.third}
                  />
                </View>
              )}
            </View>
          ),
          tabBarButton: () => <AddScreen props={props} />,
        })}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={(route) => ({
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <View style={focused && styles.activeIcon}>
                  <Ionicons
                    name="notifications-outline"
                    size={27}
                    color={focused ? "white" : Colors.third}
                  />
                </View>
              ) : (
                <View style={focused && styles.activeIcon}>
                  <Ionicons
                    name="notifications-outline"
                    size={27}
                    color={focused ? "white" : Colors.third}
                  />
                </View>
              )}
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={(route) => ({
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <View style={focused && styles.activeIcon}>
                  <Image
                    style={{
                      width: RFPercentage(3.3),
                      height: RFPercentage(3),
                    }}
                    source={require("../../assets/images/peoplewhiteicon.png")}
                  />
                </View>
              ) : (
                <View style={focused && styles.activeIcon}>
                  <Image
                    style={{
                      width: RFPercentage(4.2),
                      height: RFPercentage(4.2),
                    }}
                    source={require("../../assets/images/peoplethird.png")}
                  />
                </View>
              )}
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  activeIcon: {
    width: RFPercentage(6),
    height: RFPercentage(6),
    backgroundColor: Colors.third,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
  },
});
