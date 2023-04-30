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
import { ButtonSizes, FontFamily, FontSizes, Spaces } from "../config/font";

//Paper
import { Checkbox } from "react-native-paper";
import MainHeader from "../components/MainHeader";
import AppModal from "../components/AppModal";
import { Ionicons } from "@expo/vector-icons";

export default function SecurityPasswordScreen(props) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [eyeIcon, setEyeIcon] = useState(false);
  const [eyeIcon1, setEyeIcon1] = useState(false);
  const [eyeIcon2, setEyeIcon2] = useState(false);

  let validationSchema = yup.object().shape({
    currentPassword: yup.string().required().min(4).label("CurrentPassword"),
    newPassword: yup.string().required().min(4).label("NewPassword"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required()
      .min(4)
      .label("ConfirmPassword"),
  });

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <MainHeader
        prevScreen="SecurityScreen"
        title="Password"
        navigation={props.navigation}
      />

      {/* //email input */}

      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
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
          <View
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.inputmaincontainer}>
              {/* CUrrent PAss */}
              <Text
                style={{
                  alignSelf: "flex-start",
                  fontSize: FontSizes.smaller,
                  fontFamily: FontFamily.medium,
                  color: Colors.placeholder,
                  marginLeft: Spaces.medium,
                  marginTop: Spaces.small,
                  marginBottom: Spaces.nSmaller,
                }}
              >
                Current Password
              </Text>
              <View style={styles.passwordmain}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("currentPassword")}
                  onBlur={() => setFieldTouched("currentPassword")}
                  // value={Password}
                  placeholder="Current Password"
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
                {touched.currentPassword && (
                  <Text style={styles.error}>{errors.currentPassword}</Text>
                )}
              </View>
              {/* New PAss */}
              <Text
                style={{
                  alignSelf: "flex-start",
                  fontSize: FontSizes.smaller,
                  fontFamily: FontFamily.medium,
                  color: Colors.placeholder,
                  marginLeft: Spaces.medium,
                  marginTop: Spaces.small,
                  marginBottom: Spaces.nSmaller,
                }}
              >
                New Password
              </Text>

              <View style={styles.passwordmain}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange("newPassword")}
                  onBlur={() => setFieldTouched("newPassword")}
                  // value={Password}
                  placeholder="New Password"
                  placeholderTextColor={Colors.placeholder}
                  secureTextEntry={true && !eyeIcon2}
                />
                <TouchableOpacity
                  onPress={() => setEyeIcon2(!eyeIcon2)}
                  activeOpacity={0.7}
                  style={styles.eyeicon}
                >
                  <MaterialCommunityIcons
                    color={Colors.grey}
                    style={{ right: RFPercentage(1) }}
                    size={RFPercentage(3)}
                    name={eyeIcon2 ? "eye-outline" : "eye-off-outline"}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: "90%" }}>
                {touched.password && (
                  <Text style={styles.error}>{errors.newPassword}</Text>
                )}
              </View>
              {/* Confirm PAss */}
              <Text
                style={{
                  alignSelf: "flex-start",
                  fontSize: FontSizes.smaller,
                  fontFamily: FontFamily.medium,
                  color: Colors.placeholder,
                  marginLeft: Spaces.medium,
                  marginTop: Spaces.small,
                  marginBottom: Spaces.nSmaller,
                }}
              >
                Confirm Password
              </Text>

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
                backgroundColor: Colors.third,
                marginBottom: Spaces.medium,
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
                Create
              </Text>
            </TouchableOpacity>
          </View>
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.purewhite,
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
