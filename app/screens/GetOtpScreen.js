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
import { Formik } from "formik";
import * as yup from "yup";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//Components
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";

//config
import Colors from "../config/Colors";
import { ButtonSizes, FontFamily, FontSizes } from "../config/font";

//Paper
import { Checkbox } from "react-native-paper";
import MainHeader from "../components/MainHeader";

export default function GetOtpScreen(props) {
  let validationSchema = yup.object().shape({
    otp: yup.string().required().label("otp"),
  });
  return (
    <Screen style={styles.screen}>
      <MainHeader
        prevScreen="LoginScreen"
        title=""
        navigation={props.navigation}
        noThirdIcon={true}
      />
      <View style={styles.logocontainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/gizmologoorange.png")}
        />
      </View>
      <Text
        style={{
          color: Colors.black,
          fontSize: FontSizes.large,
          fontFamily: FontFamily.medium,
          marginTop: RFPercentage(3),
        }}
      >
        Login With OTP
      </Text>
      {/* //email input */}
      <Formik
        initialValues={{ otp: "" }}
        onSubmit={() => {
          //   props.navigation.navigate("SideDrawer", {
          //     screen: "BottomTab",
          //     params: { screen: "HomeScreen" },
          //   });
          props.navigation.navigate("OTPScreen");
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <View style={styles.inputmaincontainer}>
              <View style={styles.emailmain}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("otp")}
                  onBlur={() => setFieldTouched("otp")}
                  // value={text}
                  placeholder="Mobile Number"
                  placeholderTextColor={Colors.placeholder}
                />
              </View>
              <View style={{ width: "90%" }}>
                {touched.otp && <Text style={styles.error}>{errors.otp}</Text>}
              </View>
            </View>

            <AppButton
              title="Get OTP"
              bgColor={Colors.third}
              txtColor={Colors.purewhite}
              btnWidth={ButtonSizes.large}
              btnFunc={handleSubmit}
              btnStyle={{ marginTop: RFPercentage(5) }}
            />
          </>
        )}
      </Formik>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  logocontainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFPercentage(10),
  },
  logo: {
    width: RFPercentage(21),
    height: RFPercentage(5),
  },
  inputmaincontainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFPercentage(10),
  },

  emailmain: {
    width: "90%",
    height: RFPercentage(7.5),
    backgroundColor: Colors.white,
    borderWidth: RFPercentage(0.1),
    borderColor: Colors.lightWhite,
    color: Colors.black,
    paddingLeft: RFPercentage(3),
    borderRadius: RFPercentage(1.5),
    justifyContent: "center",
  },
  input: { fontFamily: FontFamily.regular },

  passwordmain: {
    width: "90%",
    height: RFPercentage(7.5),
    backgroundColor: Colors.white,
    borderWidth: RFPercentage(0.1),
    borderColor: Colors.lightWhite,
    color: Colors.black,
    paddingLeft: RFPercentage(3),
    borderRadius: RFPercentage(1.5),
    justifyContent: "center",
    marginTop: RFPercentage(2),
  },
  error: {
    color: "#FF0000",
    fontSize: RFPercentage(1.3),
    marginTop: RFPercentage(0.5),
    fontFamily: FontFamily.regular,
  },

  loginbutton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFPercentage(3),
  },
});
