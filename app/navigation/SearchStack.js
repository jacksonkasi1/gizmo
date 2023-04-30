import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React,{useLayoutEffect} from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { StyleSheet, View, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SearchScreen from "../screens/SearchScreen/SearchScreen";
import ResultSccreen from "../screens/SearchScreen/ResultSccreen";
import MobileBrands from "../screens/SearchScreen/MobileBrands";
import MobileFeatures from "../screens/SearchScreen/MobileFeatures";
import SearchInitialScreen from "../screens/SearchScreen/SearchInitialScreen";

const Stack = createNativeStackNavigator();
const tabHiddenRoutes = ["ResultScreen"];
export default function SearchStack({navigation,route}) {
  useLayoutEffect(() => {
    // const routeName = getFocusedRouteNameFromRoute(route);
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: {  height: wp("15%"),
      marginBottom: RFPercentage(2),
      width: "90%",
      borderRadius: RFPercentage(10),
      alignItems: "center",
      justifyContent: "center",
      marginLeft: RFPercentage(2.7),
      marginTop: RFPercentage(1),} });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SearchInitialScreen"
    >
      <Stack.Screen name="SearchInitialScreen" component={SearchInitialScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="ResultScreen" component={ResultSccreen} />
      <Stack.Screen name="MobileBrand" component={MobileBrands} />
      <Stack.Screen name="MobileFeature" component={MobileFeatures} />

      </Stack.Navigator>
  )}