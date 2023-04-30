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
import { FontFamily, FontSizes } from "../config/font";

//Paper
import { Checkbox } from "react-native-paper";
import { useLogInMutation } from "../../redux/api/apiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import AppModal from "../components/AppModal";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen(props) {
  const [eyeIcon, setEyeIcon] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const [checked, setChecked] = React.useState(false);
  const [msg, setMsg] = useState("");

  let validationSchema = yup.object().shape({
    email: yup.string().required().email().label("Email"),
    password: yup.string().required().min(4).label("Password"),
  });
  const [logIn, { isLoading, isSuccess }] = useLogInMutation();
  return (
    <Screen style={styles.screen}>
      <View style={styles.logocontainer}>
        <Image
          style={{ width: RFPercentage(30), height: RFPercentage(7) }}
          source={require("../../assets/images/main_log.png")}
          resizeMode="contain"
        />
      </View>
      {/* //email input */}
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { resetForm }) => {
          logIn({ ...values })
            .unwrap()
            .then(async (payload) => {
              console.log("P", payload);
              if (payload.success) {
                try {
                  await AsyncStorage.setItem("token", payload.token).then(
                    () => {
                      console.log("tkn");
                      props.navigation.navigate("BottomTab", {
                        screen: "HomeScreen",
                      });
                    }
                  );
                } catch (error) {
                  console.log(error);
                }
              } else {
                if (payload.status) {
                  setMsg(payload.status);
                  setModalVisible2(!modalVisible2);
                } else {
                  setMsg(payload.message);
                  setModalVisible2(!modalVisible2);
                }
              }
            })
            .catch((e) => console.log(e));
          // props.navigation.navigate("BottomTab", {
          //   screen: "NotificationScreen",
          // });
          resetForm({ values: "" });
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <View style={styles.inputmaincontainer}>
              <View style={styles.emailmain}>
                <TextInput
                  style={styles.input}
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                  // value={text}
                  placeholder="User Name or Email"
                  placeholderTextColor={Colors.placeholder}
                />
              </View>
              <View style={{ width: "90%" }}>
                {touched.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
              </View>

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
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: RFPercentage(5),
                marginBottom: RFPercentage(-3),
              }}
            >
              <Checkbox.Item
                status={checked ? "checked" : "unchecked"}
                label="Remember me"
                onPress={() => {
                  setChecked(!checked);
                }}
                color={Colors.third}
                position="leading"
                labelStyle={{ color: Colors.grey }}
                uncheckedColor={Colors.grey}
              />
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("ForgetPassword");
                }}
                style={{
                  marginTop: RFPercentage(2),
                  marginRight: RFPercentage(2),
                }}
              >
                <Text
                  style={{
                    fontFamily: FontFamily.regular,
                    color: Colors.primary,
                    textAlignVertical: "center",
                  }}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.loginbutton} activeOpacity={0.7}>
              <AppButton
                title="LOG IN"
                bgColor={Colors.third}
                txtColor={Colors.purewhite}
                btnWidth={"90%"}
                btnFunc={handleSubmit}
                loading={isLoading}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("GetOtpScreen")}
            >
              <Text
                style={{
                  color: Colors.third,
                  fontSize: FontSizes.small,
                  fontFamily: FontFamily.medium,
                  marginTop: RFPercentage(3),
                }}
              >
                Login with OTP
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <View style={{ alignItems: "center", marginBottom: RFPercentage(5) }}>
        <View
          style={{
            width: RFPercentage(55),
            marginTop: RFPercentage(5),
            borderWidth: 0.5,
            borderColor: Colors.lightgrey,
          }}
        />
        <Text
          style={{
            fontFamily: FontFamily.medium,
            fontSize: FontSizes.small,
            color: Colors.lightgrey,
            position: "absolute",
            top: 10,
            backgroundColor: Colors.white,
            padding: RFPercentage(2),
          }}
        >
          or continue with
        </Text>
      </View>

      {/* authetication by google apple fb */}

      <View style={styles.socialmain}>
        <TouchableOpacity style={styles.appfbgcontainer}>
          <Image
            style={styles.fbglogo}
            source={require("../../assets/images/fblogo.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.appfbgcontainer}>
          <Image
            style={styles.fbglogo}
            source={require("../../assets/images/glogo.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.appfbgcontainer}>
          <Image
            style={styles.applelogo}
            source={require("../../assets/images/applelogo.png")}
          />
        </TouchableOpacity>
      </View>
      <AppModal
        modalVisible={modalVisible2}
        setModalVisible={setModalVisible2}
        style={{ justifyContent: "center" }}
      >
        <View
          style={{
            width: RFPercentage(18),
            height: RFPercentage(18),
            borderRadius: RFPercentage(9),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.red,
          }}
        >
          <Ionicons name="alert" size={80} color={Colors.white} />
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
              color: Colors.red,
            }}
          >
            Error!
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
              {msg}
            </Text>
          </View>
        </View>

        {/* button */}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setModalVisible2(!modalVisible2);
            }}
            style={{
              width: RFPercentage(20),
              height: RFPercentage(6),
              borderRadius: RFPercentage(1),
              backgroundColor: Colors.red,
              justifyContent: "center",
              alignItems: "center",
              marginTop: RFPercentage(3),
            }}
          >
            <Text style={{ color: Colors.purewhite }}>Ok</Text>
          </TouchableOpacity>
        </View>
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
    marginTop: RFPercentage(15),
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
  eyeicon: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: RFPercentage(1),
    width: RFPercentage(5),
    height: RFPercentage(5),
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
  appfbgcontainer: {
    width: RFPercentage(15),
    height: RFPercentage(8),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: RFPercentage(0.1),
    borderColor: Colors.lightWhite,
    borderRadius: RFPercentage(2),
  },
  socialmain: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: RFPercentage(7),
  },
  fbglogo: {
    width: RFPercentage(4),
    height: RFPercentage(4),
  },
  applelogo: {
    width: RFPercentage(3.2),
    height: RFPercentage(4),
  },
});
