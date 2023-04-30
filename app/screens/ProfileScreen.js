import { View, Text } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import { FontFamily, FontSizes } from "../config/font";
import Colors from "../config/Colors";

export default function ProfileScreen() {
  return (
    <Screen
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.purewhite,
      }}
    >
      <Text
        style={{
          fontFamily: FontFamily.semiBold,
          fontSize: FontSizes.large,
          color: Colors.third,
        }}
      >
        Coming Soon...
      </Text>
    </Screen>
  );
}
