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
const day = ["today", "week", "month", "earlier"];
export default function NotificationList({ data }) {
  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: Colors.purewhite,
        marginTop: Spaces.small,
      }}
    >
      {day.map((itm, indx) => (
        <View
          key={`day_${indx}`}
          style={{ width: "90%", marginTop: Spaces.medium }}
        >
          {itm == "today" || itm == "earlier" ? (
            <Text
              style={{
                fontFamily: FontFamily.medium,
                fontSize: FontSizes.regular,
              }}
            >
              {itm.charAt(0).toUpperCase() + itm.slice(1)}
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: FontFamily.medium,
                fontSize: FontSizes.regular,
              }}
            >
              This {itm.charAt(0).toUpperCase() + itm.slice(1)}
            </Text>
          )}
          {data
            .filter((d) => {
              if (itm == "week") {
                return d.day == "week";
              } else if (itm == "month") {
                return d.day == "month";
              } else if (itm == "today") {
                return d.day == "today";
              } else if (itm == "earlier") {
                return d.day == "earlier";
              }
            })
            .map((i, ind) => (
              <View
                key={`not_${ind}`}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: Spaces.smaller,
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{
                    width: RFPercentage(9),
                    height: RFPercentage(9),
                    marginRight: Spaces.smaller,
                  }}
                  source={i.image}
                />
                <View>
                  <Text
                    style={{
                      fontFamily: FontFamily.regular,
                      fontSize: FontSizes.smaller,
                    }}
                  >
                    {i.details}
                  </Text>
                  <Text
                    style={{
                      fontFamily: FontFamily.semiBold,
                      fontSize: FontSizes.smaller,
                    }}
                  >
                    {i.time}
                  </Text>
                </View>
              </View>
            ))}
        </View>
      ))}
    </View>
  );
}
