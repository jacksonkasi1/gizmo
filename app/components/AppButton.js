import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";
import { ActivityIndicator } from "react-native-paper";

export default function AppButton({
  title,
  bgColor,
  txtColor,
  btnWidth,
  btnFunc,
  btnStyle,
  loading,
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        btnFunc();
      }}
      style={{
        width: btnWidth,
        height: RFPercentage(7),
        borderRadius: RFPercentage(1),
        alignItems: "center",
        justifyContent: "center",
        marginTop: RFPercentage(2),
        backgroundColor: bgColor,
        ...btnStyle,
      }}
    >
      {loading ? (
        <ActivityIndicator animating={true} color={Colors.purewhite} />
      ) : (
        <Text
          style={{
            color: txtColor,
            fontSize: RFPercentage(2.2),
            fontWeight: "700",
            fontFamily: FontFamily.semiBold,
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
// const styles = StyleSheet.create({
//   buttonmain: {

//   },

//   buttontext: {

//   },
// });
