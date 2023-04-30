import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";

export default function HeaderMode({ title, onpress }) {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onpress}
        style={styles.headermain}
      >
        <Image
          style={styles.imgicon}
          source={require("../../assets/images/backarrowlogo.png")}
        />
      </TouchableOpacity>

      <Text style={styles.texthead}>{title}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  headermain: {
    position: "absolute",
    left: RFPercentage(2),
    alignItems: "center",
    justifyContent: "center",
    width: RFPercentage(6),
    height: RFPercentage(6),
    borderRadius: RFPercentage(4),
    backgroundColor: Colors.purewhite,
    elevation: 5,
  },

  imgicon: {
    width: RFPercentage(3.5),
    height: RFPercentage(3.5),
  },

  texthead: {
    fontWeight: "600",
    fontSize: RFPercentage(2.5),
    color: Colors.black,
    fontFamily: FontFamily.medium,
  },
});
