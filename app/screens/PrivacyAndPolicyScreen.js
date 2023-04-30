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
  ScrollView,
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
import { FontFamily, FontSizes, Spaces } from "../config/font";

export default function PrivacyAndPolicyScreen(props) {
  return (
    <Screen style={styles.screen}>
      {/* headerComponent */}
      <MainHeader
        prevScreen="SettingScreen"
        bottmTabScreen={false}
        title="Privacy & Policy"
        navigation={props.navigation}
        noThirdIcon={true}
      />
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        <Text
          style={{
            fontFamily: FontFamily.regular,
            fontSize: FontSizes.small,
            color: Colors.black,
            lineHeight: Spaces.medium,
            padding: Spaces.small,
          }}
        >
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.Amet minim mollit non deserunt
          ullamco est sit aliqua dolor do amet sint. Velit officia consequat
          duis enim velit mollit. Exercitation veniam consequat sunt nostrud
          amet.
        </Text>
        <Text
          style={{
            fontFamily: FontFamily.regular,
            fontSize: FontSizes.small,
            color: Colors.black,
            lineHeight: Spaces.medium,
            padding: Spaces.small,
          }}
        >
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.Amet minim mollit non deserunt
          ullamco est sit aliqua dolor do amet sint. Velit officia consequat
          duis enim velit mollit. Exercitation veniam consequat sunt nostrud
          amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do
          amet sint. Velit officia consequat duis enim velit mollit.
          Exercitation veniam consequat sunt nostrud amet.Amet minim mollit non
          deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
          consequat duis enim velit mollit. Exercitation veniam consequat sunt
          nostrud amet.
        </Text>
      </ScrollView>
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
