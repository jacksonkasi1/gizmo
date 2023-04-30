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

export default function SecurityScreen(props) {
  //FIX ME
  const activityList = [
    {
      title: "Password",
      imagSource: require("../../assets/images/password.png"),
    },
    {
      title: "Login activity",
      imagSource: require("../../assets/images/login_set.png"),
    },
    {
      title: "Two-factor authentication",
      imagSource: require("../../assets/images/two_fact.png"),
    },
    {
      title: "Delete Account",
      imagSource: require("../../assets/images/delete_set.png"),
    },
  ];
  const handleAccountListPress = (itm) => {
    switch (itm.title) {
      case "Password":
        props.navigation.navigate("SecurityPasswordScreen");
        break;
      case "Login activity":
        // props.navigation.navigate("NotificationSetting");
        break;
      case "Two-factor authentication":
        // props.navigation.navigate("NotificationSetting");
        break;
      case "Delete Account":
        // props.navigation.navigate("NotificationSetting");
        break;
      default:
        break;
    }
  };
  return (
    <Screen style={styles.screen}>
      {/* headerComponent */}
      <MainHeader
        prevScreen="SettingScreen"
        bottmTabScreen={false}
        title="Security"
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
