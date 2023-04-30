import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  ImageBackground,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import OTPInputView from "@twotalltotems/react-native-otp-input";

//config
import Colors from "../config/Colors";

//Components
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import { ButtonSizes, FontFamily, FontSizes } from "../config/font";

export default function OTPScreen(props) {
  return (
    <Screen
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: Colors.white,
      }}
    >
      <Image
        style={{
          width: RFPercentage(16),
          height: RFPercentage(16),
          marginTop: RFPercentage(10),
        }}
        source={require("../../assets/images/whatsapp.png")}
      />
      <Text
        style={{
          width: RFPercentage(40),
          fontFamily: FontFamily.regular,
          fontSize: FontSizes.regular,
          color: Colors.darkgrey,
          marginTop: RFPercentage(4),
          textAlign: "center",
        }}
      >
        A code has been sent to your +91 934-856-4214 via whatsapp
      </Text>
      <OTPInputView
        style={{ width: "70%", height: 100, marginTop: RFPercentage(2) }}
        pinCount={4}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={(code) => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
      />

      {/* button */}

      <AppButton
        title="Confirm"
        bgColor={Colors.third}
        txtColor={Colors.purewhite}
        btnWidth={ButtonSizes.large}
        btnStyle={{ marginTop: RFPercentage(3) }}
        btnFunc={() =>
          props.navigation.navigate("SideDrawer", {
            screen: "BottomTab",
            params: { screen: "HomeScreen" },
          })
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: Colors.grey,
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    backgroundColor: Colors.lightWhite,
    borderRadius: RFPercentage(1),
  },

  underlineStyleHighLighted: {
    borderColor: Colors.third,
  },
});
