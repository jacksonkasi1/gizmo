import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
  Switch,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import { RFPercentage } from "react-native-responsive-fontsize";
import Colors from "../config/Colors";
import { FontFamily, FontSizes, Spaces } from "../config/font";
//const
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ReviewSingle({ data }) {
  const [menuid, setmenuid] = useState(1);

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.purewhite,
      }}
    >
      {/* Score Card */}
      <View
        style={{
          width: windowWidth / 1.17,
          flexDirection: "row",
          justifyContent: "space-between",
          borderWidth: 1.5,
          borderColor: Colors.lightPlaceHolder,
          borderRadius: Spaces.smaller,
          padding: RFPercentage(1.5),
          marginVertical: Spaces.small,
        }}
      >
        <View>
          <Text
            style={{
              textAlign: "left",
              fontFamily: FontFamily.semiBold,
              color: Colors.placeholder,
              fontSize: FontSizes.regular,
            }}
          >
            {data.name}:
          </Text>
        </View>
        <View
          style={{
            width: 2,
            height: RFPercentage(9),
            backgroundColor: Colors.lightPlaceHolder,
            position: "absolute",
            left: windowWidth / 1.7,
          }}
        />
        <View>
          <Text
            style={{
              textAlign: "center",
              backgroundColor:
                data.score > 5 && data.score < 8
                  ? Colors.darkYellow
                  : data.score < 6
                  ? Colors.red
                  : Colors.green,
              width: Spaces.large,
              fontFamily: FontFamily.semiBold,
              color: Colors.placeholder,
              fontSize: FontSizes.regular,
              textAlignVertical: "center",
              color: Colors.purewhite,
              borderRadius: RFPercentage(1),
              paddingVertical: 2,
            }}
          >
            {data.score}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontFamily: FontFamily.regular,
          fontSize: FontSizes.regular,
          textAlign: "justify",
        }}
      >
        {data.id == 0
          ? data.details
          : data.details.slice(0, data.details.length / 2)}
      </Text>
      <Image
        style={{ marginVertical: Spaces.small }}
        resizeMode="contain"
        source={data.image}
      />
      <Text
        style={{
          fontFamily: FontFamily.regular,
          fontSize: FontSizes.regular,
          textAlign: "justify",
          marginBottom: RFPercentage(20),
        }}
      >
        {data.id != 0 &&
          data.details.slice(data.details.length / 2, data.details.length - 1)}
      </Text>
    </View>
  );
}
