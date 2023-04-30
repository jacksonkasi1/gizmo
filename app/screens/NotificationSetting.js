import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
  Switch,
  ImageBackground,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

//screens

//Components
import HeaderMode from "../components/HeaderMode";
import Screen from "../components/Screen";
import AppSwitch from "../components/AppSwitch";

//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";

export default function NotificationSetting(props) {
  const NotificationList = [
    {
      id: "1",
      title: "Reminder Email",
    },
    {
      id: "2",
      title: "App Update",
    },
    {
      id: "3",
      title: "Referral Notification ",
    },
    {
      id: "4",
      title: "Channel notification ",
    },
    {
      id: "5",
      title: "Recommended videos",
    },
    {
      id: "6",
      title: "Community post Suggestion ",
    },
    {
      id: "7",
      title: "Replies to my comments",
    },
  ];
  return (
    <Screen style={styles.screen}>
      {/* headerComponent */}
      <View style={styles.headermain}>
        <HeaderMode
          title="Notification Setting"
          onpress={() => {
            props.navigation.navigate("SettingScreen");
          }}
        />
      </View>

      {/* flatlist NotificationSwitches */}

      <FlatList
        scrollEnabled={false}
        style={styles.flatstyl}
        data={NotificationList}
        keyExtractor={(NotificationList) => NotificationList.id.toString()}
        showsVerticalScrollIndicator={false}
        vertical
        renderItem={({ item }) => (
          <View>
            <View style={styles.textswitmain}>
              <Text style={styles.textswit}>{item.title}</Text>

              <AppSwitch />
            </View>
          </View>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.purewhite,
  },

  //header
  headermain: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFPercentage(4),
  },

  //switchlines
  flatstyl: { width: "90%", marginTop: RFPercentage(4), flexGrow: 0 },
  textswit: {
    fontSize: RFPercentage(2.3),
    fontWeight: "600",
    color: Colors.black,
    fontFamily: FontFamily.medium,
  },
  textswitmain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? 20 : 10,
  },
});
