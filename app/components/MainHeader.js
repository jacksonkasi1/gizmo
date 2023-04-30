import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Children } from "react/cjs/react.production.min";
import Colors from "../config/Colors";
import { FontFamily, FontSizes, Spaces } from "../config/font";

//config

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function MainHeader({
  navigation,
  title,
  prevScreen,
  children,
  param,
  subTitle,
  modalFunc,
  modalVisible,
  bottmTabScreen,
  noThirdIcon,
}) {
  return (
    <View
      style={{
        width: windowWidth,
        height: Spaces.medium,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: RFPercentage(4),
        marginBottom: RFPercentage(3),
        marginLeft: RFPercentage(-6),
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (!bottmTabScreen) {
            navigation.navigate(prevScreen);
          } else {
            navigation.navigate("BottomTab", { screen: "HomeScreen" });
          }
        }}
        style={{
          width: RFPercentage(6),
          height: RFPercentage(6),
          borderRadius: RFPercentage(3),
          borderWidth: RFPercentage(0.2),
          borderColor: Colors.white,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.purewhite,
          shadowColor: Colors.grey,
          elevation: 2,
        }}
      >
        <Image
          style={{
            width: RFPercentage(2),
            height: RFPercentage(3.2),
          }}
          source={require("../../assets/images/backarrowlogo.png")}
        />
      </TouchableOpacity>

      <Text
        style={{
          fontFamily: FontFamily.regular,
          fontSize: RFPercentage(3),
          color: Colors.black,
          fontFamily: FontFamily.medium,
        }}
      >
        {title}{" "}
        {subTitle ? (
          <Text
            style={{
              fontFamily: FontFamily.regular,
              fontSize: RFPercentage(3),
              color: Colors.grey,
              fontFamily: FontFamily.medium,
            }}
          >
            {subTitle}
          </Text>
        ) : null}
      </Text>
      <TouchableOpacity onPress={() => modalFunc(!modalVisible)}>
        {!noThirdIcon ? (
          <Image
            style={{
              width: RFPercentage(6),
              height: RFPercentage(6),
              marginRight: RFPercentage(-7),
            }}
            source={require("../../assets/images/equalizer.png")}
          />
        ) : null}
      </TouchableOpacity>

      {children}
    </View>
  );
}
