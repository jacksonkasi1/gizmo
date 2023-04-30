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

//Third Party
import { Timer } from "react-native-stopwatch-timer";
import MainHeader from "../components/MainHeader";
import { useVerifyOtpMutation } from "../../redux/api/apiSlice";

export default function VerifySignup(props) {
  const [timeStart, setTimeStart] = useState(false);
  const [timeStop, setTimeStop] = useState(false);
  const [otp, setOtp] = useState(null);
  const [verifyOtp, { isLoading, isSuccess }] = useVerifyOtpMutation();

  const handleOtp = () => {
    // console.log("hi");
    verifyOtp({ otp: `${otp}` })
      .unwrap()
      .then((payload) => {
        console.log(payload);
        if (payload.success) {
          props.navigation.navigate("LoginScreen");
        }
      });
  };
  const options = {
    container: {
      backgroundColor: Colors.white,
      height: 17,
    },
    text: {
      fontSize: FontSizes.small,
      color: Colors.third,
    },
  };
  return (
    <Screen
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: Colors.white,
      }}
    >
      <MainHeader
        prevScreen="SignupScreen"
        title="Verify Code"
        navigation={props.navigation}
      />
      <Image
        style={{
          width: RFPercentage(16),
          height: RFPercentage(16),
          marginTop: RFPercentage(10),
        }}
        source={require("../../assets/images/mobile.png")}
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
        A code has been sent to your mobile
      </Text>
      <OTPInputView
        style={{ width: "70%", height: 100, marginTop: RFPercentage(2) }}
        pinCount={4}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={(code) => {
          setOtp(code);
        }}
      />

      <Text
        style={{ textAlign: "center", color: Colors.primary }}
        onPress={() => setTimeStart(true)}
      >
        Resend Code(
        <Timer
          totalDuration={30000}
          start={timeStart}
          options={options}
          handleFinish={() => setTimeStop(true)}
        />
        )
      </Text>

      {/* button */}

      <AppButton
        title="Confirm"
        bgColor={Colors.third}
        txtColor={Colors.purewhite}
        btnWidth={ButtonSizes.large}
        btnStyle={{ marginTop: RFPercentage(3) }}
        btnFunc={handleOtp}
        loading={isLoading}
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
    backgroundColor: Colors.third,
    borderRadius: RFPercentage(1),
  },

  underlineStyleHighLighted: {
    borderColor: Colors.third,
  },
});
