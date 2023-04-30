import { Ionicons } from "@expo/vector-icons";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AppButton from "../components/AppButton";
import AppModal from "../components/AppModal";

//Components

//config

import MainHeader from "../components/MainHeader";
import Screen from "../components/Screen";
import Colors from "../config/Colors";
import { ButtonSizes, FontFamily, FontSizes } from "../config/font";

export default function VerifyForgetPassword(props) {
  const {email} = props.route.params
  return (
    <Screen style={styles.screen}>
      <MainHeader
        prevScreen="ForgetPassword"
        title="Verify Code"
        navigation={props.navigation}
      />
      <Image
        style={{
          width: RFPercentage(16),
          height: RFPercentage(16),
          marginTop: RFPercentage(10),
        }}
        source={require("../../assets/images/message.png")}
      />
      <Text
        style={{
          width: RFPercentage(50),
          fontFamily: FontFamily.regular,
          fontSize: FontSizes.regular,
          color: Colors.darkgrey,
          marginTop: RFPercentage(4),
          textAlign: "center",
        }}
      >
        Please enter the 4 digit code sent to {email}
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

      <AppButton
        title="Confirm"
        bgColor={Colors.third}
        txtColor={Colors.purewhite}
        btnWidth={ButtonSizes.large}
        btnStyle={{ marginTop: RFPercentage(3) }}
        btnFunc={() => {
          props.navigation.navigate("ResetPassword");
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    backgroundColor: Colors.white,
    backgroundColor: Colors.purewhite,
    justifyContent: "flex-start",
    alignItems: "center",
  },
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
    backgroundColor: Colors.third,
    borderRadius: RFPercentage(1),
  },

  underlineStyleHighLighted: {
    borderColor: Colors.third,
  },
});
