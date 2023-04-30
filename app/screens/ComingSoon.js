import { View, Text, Dimensions } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import { FontFamily, FontSizes } from "../config/font";
import Colors from "../config/Colors";
import MainHeader from "../components/MainHeader";
import { RFPercentage } from "react-native-responsive-fontsize";
const windowHeight = Dimensions.get("window").height;
export default function ComingSoon(props) {
  return (
    <Screen
      style={{
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: Colors.purewhite,
      }}
    >
      <MainHeader
        prevScreen="HomeScreen"
        bottmTabScreen={true}
        title=""
        navigation={props.navigation}
        noThirdIcon={true}
      />
      <Text
        style={{
          fontFamily: FontFamily.semiBold,
          fontSize: FontSizes.large,
          color: Colors.third,
          alignSelf: "center",
          marginTop: windowHeight / 3,
        }}
      >
        Coming Soon...
      </Text>
    </Screen>
  );
}
