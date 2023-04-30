import { Ionicons } from "@expo/vector-icons";
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
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/slices/mainSlice";

export default function ForgetPassword(props) {
  const [number, onChangeNumber] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const dispatch = useDispatch();
  const onSubmit = async() => {
    await dispatch(forgotPassword({ formData: number }));
    props.navigation.navigate("VerifyForgetPassword",{email:number})
  };
  return (
    <Screen style={styles.screen}>
      <MainHeader
        prevScreen="LoginScreen"
        title="Verify Code"
        navigation={props.navigation}
      />
      <Image
        style={{
          width: RFPercentage(16),
          height: RFPercentage(16),
          marginTop: RFPercentage(10),
        }}
        source={require("../../assets/images/lock.png")}
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
        Please enter your email id or mobile number to receive a verification
        code
      </Text>
      <View
        style={{
          width: "80%",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: RFPercentage(5),
        }}
      >
        <TextInput
          style={{
            width: "100%",
            height: RFPercentage(8),
            borderWidth: RFPercentage(0.1),
            borderColor: Colors.grey,
            backgroundColor: Colors.white,
            borderRadius: RFPercentage(1),
            padding: RFPercentage(1),
          }}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Email Id/Mobile Number"
          placeholderTextColor={Colors.placeholder}
          keyboardType="default"
        />
      </View>

      <AppButton
        title="Confirm"
        bgColor={Colors.third}
        txtColor={Colors.purewhite}
        btnWidth={ButtonSizes.large}
        btnStyle={{ marginTop: RFPercentage(3) }}
        btnFunc={() => {onSubmit()}}
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
});
