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

export default function InputIcon({ title, imageSource,onChangeLink,link,style,textInputStyle }) {
  return (
    <View style={[styles.searchmain,style]}>
      <View style={styles.innermain}>
        <Image style={styles.img} source={imageSource} />
          <TextInput
            style={[styles.inputtext,textInputStyle]}
            onChangeText={onChangeLink}
            value={link}
            placeholder={title}
            placeholderTextColor={"#ffff"}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchmain: {
    width: "75%",
    backgroundColor: "#2D2D2D4D",
    padding: RFPercentage(1),
    borderRadius: RFPercentage(5),
    height: RFPercentage(6),
    justifyContent: "center",
    alignSelf: "center",
  },

  innermain: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: RFPercentage(2),
  },

  img: { width: RFPercentage(3), height: RFPercentage(3) },

  inputtext: {
    width: "110%",
    paddingLeft: RFPercentage(1),
    fontSize: RFPercentage(1.6),
    color: "#fff",
    fontFamily: FontFamily.regular,
  },
});
