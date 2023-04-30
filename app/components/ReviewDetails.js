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
import ReviewSingle from "./ReviewSingle";
import BottomModal from "./BottomModal";
//const
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ReviewDetails(props) {
  const [menuid, setmenuid] = useState(0);
  const [item, setItem] = useState(props.data[0]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: Colors.purewhite,
      }}
    >
      <FlatList
        scrollEnabled
        style={{ marginTop: RFPercentage(5), flexGrow: 0 }}
        data={props.data}
        keyExtractor={(item) => item.name}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setmenuid(item.id);
                setItem(item);
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: RFPercentage(1.9),
                height: RFPercentage(6.2),
                borderRadius: RFPercentage(3),
                backgroundColor:
                  menuid === item.id ? Colors.third : Colors.white,
                borderColor: Colors.third,
                borderWidth: RFPercentage(0.3),
                margin: Spaces.smaller,
              }}
            >
              <Text
                style={{
                  fontSize: FontSizes.small,
                  fontFamily: FontFamily.regular,
                  fontWeight: "500",
                  color: menuid === item.id ? Colors.white : Colors.third,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <ReviewSingle data={item} />
    </View>
  );
}
