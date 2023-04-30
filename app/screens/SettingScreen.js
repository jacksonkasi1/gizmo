import { MaterialIcons } from "@expo/vector-icons";
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
  KeyboardAvoidingView,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import AppButton from "../components/AppButton";

//Components
import HeaderMode from "../components/HeaderMode";
import InputField from "../components/InputField";
import MainHeader from "../components/MainHeader";
import Screen from "../components/Screen";

//config
import Colors from "../config/Colors";
import { Spaces } from "../config/font";

export default function SettingScreen(props) {
  //FIX ME
  const activityList = [
    {
      title: "Notifications",
      imagSource: require("../../assets/images/Bell.png"),
    },
    {
      title: "Security",
      imagSource: require("../../assets/images/security.png"),
    },
    {
      title: "Privacy & policy",
      imagSource: require("../../assets/images/privacy.png"),
    },
    {
      title: "About",
      imagSource: require("../../assets/images/about.png"),
    },
  ];
  const handleAccountListPress = (itm) => {
    switch (itm.title) {
      case "Notifications":
        props.navigation.navigate("NotificationSetting");
        break;
      case "Security":
        props.navigation.navigate("SecurityScreen");
        break;
      case "Privacy & policy":
        props.navigation.navigate("PrivacyAndPolicyScreen");
        break;
      case "About":
        props.navigation.navigate("AboutScreen");
        break;
      default:
        break;
    }
  };
  return (
    <Screen style={styles.screen}>
      {/* headerComponent */}
      <MainHeader
        prevScreen="HomeScreen"
        bottmTabScreen={true}
        title="Settings"
        navigation={props.navigation}
        noThirdIcon={true}
      />

      <View
        style={{
          width: "90%",
          marginTop: Spaces.small,
          justifyContent: "center",
        }}
      >
        {/* Watch History */}
        {activityList.map((itm, indx) => (
          <TouchableOpacity
            onPress={() => handleAccountListPress(itm)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            key={indx}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: RFPercentage(0.7),
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: RFPercentage(9),
                  height: RFPercentage(8),
                  elevation: 5,
                }}
                source={itm.imagSource}
              />

              <Text
                style={{
                  fontSize: RFPercentage(2.2),
                  fontWeight: "400",
                  fontFamily: "Poppins_500Medium",
                  color: Colors.black,
                  marginLeft: RFPercentage(2),
                }}
              >
                {itm.title}
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: RFPercentage(0.3),
              }}
            >
              <MaterialIcons
                name="keyboard-arrow-right"
                size={32}
                color={Colors.third}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* InputFields */}
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
});
