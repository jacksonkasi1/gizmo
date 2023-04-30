import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  KeyboardAvoidingViewComponent,
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
import AppModal from "../components/AppModal";
import { Ionicons } from "@expo/vector-icons";

export default function ResetPassword(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(false);
  const [eyeIcon1, setEyeIcon1] = useState(false);

  let validationSchema = yup.object().shape({
    password: yup.string().required().min(4).label("Password"),
    confirmPassword: yup.string().required().min(4).label("Confirm Password"),
  });
  return (
    <Screen style={styles.screen}>
      <MainHeader
        prevScreen="LoginScreen"
        title="Reset Password"
        navigation={props.navigation}
      />
      <Image
        style={{
          width: RFPercentage(16),
          height: RFPercentage(16),
          marginTop: RFPercentage(10),
        }}
        source={require("../../assets/images/unlock.png")}
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
        Your new password must be different from previously used password
      </Text>
      {/* //email input */}

      <Formik
        initialValues={{ otp: "" }}
        onSubmit={() => {
          //   props.navigation.navigate("SideDrawer", {
          //     screen: "BottomTab",
          //     params: { screen: "HomeScreen" },
          //   });
          setModalVisible(true);
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <View style={styles.inputmaincontainer}>
              <View style={styles.passwordmain}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                  // value={Password}
                  placeholder="Password"
                  placeholderTextColor={Colors.placeholder}
                  secureTextEntry={true && !eyeIcon}
                />
                <TouchableOpacity
                  onPress={() => setEyeIcon(!eyeIcon)}
                  activeOpacity={0.7}
                  style={styles.eyeicon}
                >
                  <MaterialCommunityIcons
                    color={Colors.grey}
                    style={{ right: RFPercentage(1) }}
                    size={RFPercentage(3)}
                    name={eyeIcon ? "eye-outline" : "eye-off-outline"}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: "90%" }}>
                {touched.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
              </View>

              <View style={styles.passwordmain}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={() => setFieldTouched("confirmPassword")}
                  // value={Password}
                  placeholder="Confirm Password"
                  placeholderTextColor={Colors.placeholder}
                  secureTextEntry={true && !eyeIcon1}
                />
                <TouchableOpacity
                  onPress={() => setEyeIcon1(!eyeIcon1)}
                  activeOpacity={0.7}
                  style={styles.eyeicon}
                >
                  <MaterialCommunityIcons
                    color={Colors.grey}
                    style={{ right: RFPercentage(1) }}
                    size={RFPercentage(3)}
                    name={eyeIcon1 ? "eye-outline" : "eye-off-outline"}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: "90%" }}>
                {touched.confirmPassword && (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                )}
              </View>
            </View>

            <TouchableOpacity
              style={{
                width: RFPercentage(55),
                height: RFPercentage(7),
                borderRadius: RFPercentage(1),
                alignItems: "center",
                justifyContent: "center",
                marginTop: RFPercentage(2),
                backgroundColor: Colors.third,
              }}
              onPress={handleSubmit}
            >
              <Text
                style={{
                  color: Colors.purewhite,
                  fontSize: RFPercentage(2.2),
                  fontWeight: "700",
                  fontFamily: FontFamily.semiBold,
                }}
              >
                Reset Password
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <AppModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        style={{ justifyContent: "center" }}
      >
        <View
          style={{
            width: RFPercentage(18),
            height: RFPercentage(18),
            borderRadius: RFPercentage(9),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.green,
          }}
        >
          <Ionicons name="checkmark" size={80} color={Colors.white} />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: RFPercentage(3),
          }}
        >
          <Text
            style={{
              fontFamily: FontFamily.medium,
              fontSize: FontSizes.large,
              color: Colors.blacky,
            }}
          >
            Password Updated
          </Text>
          <View style={styles.firlighttextmain}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: FontFamily.regular,
                fontSize: FontSizes.small,
                color: Colors.grey,
                marginTop: RFPercentage(2),
              }}
            >
              Your Password has been updated successfully.
            </Text>
          </View>
        </View>

        {/* button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setModalVisible(!modalVisible);
            props.navigation.navigate("SideDrawer", {
              screen: "BottomTab",
              params: { screen: "HomeScreen" },
            });
          }}
          style={{
            width: RFPercentage(20),
            height: RFPercentage(6),
            borderRadius: RFPercentage(1),
            backgroundColor: Colors.third,
            justifyContent: "center",
            alignItems: "center",
            marginTop: RFPercentage(3),
          }}
        >
          <Text style={{ color: Colors.purewhite }}>Continue</Text>
        </TouchableOpacity>
      </AppModal>
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
    marginTop: RFPercentage(0),
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
  eyeicon: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: RFPercentage(1),
    width: RFPercentage(5),
    height: RFPercentage(5),
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
