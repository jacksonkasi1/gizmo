import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
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
import { FontFamily, FontSizes, Spaces } from "../config/font";

//Paper
import { Button, Checkbox, RadioButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment/moment";
import { useSignUpMutation } from "../../redux/api/apiSlice";
export default function SignupScreen(props) {
  const [eyeIcon, setEyeIcon] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [dateSelected, setDateselected] = useState(false);
  const [signUp, { isLoading, isSuccess }] = useSignUpMutation();
  const [gender, setGender] = useState("male");
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateselected(true);
    setShow(false);
    setDate(currentDate);
  };

  let validationSchema = yup.object().shape({
    name: yup.string().required().min(4).label("Name"),
    email: yup.string().required().email().label("Email"),
    mobile: yup.string().required().min(4).label("Mobile Number"),
    password: yup.string().required().min(4).label("Password"),
    referral_code: yup.string().label("Referral"),
  });
  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          backgroundColor: Colors.purewhite,
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: Colors.white,
        }}
      >
        <View style={styles.logocontainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/gizmologoorange.png")}
          />
        </View>
        {/* //email input */}
        <Formik
          initialValues={{
            name: "",
            email: "",
            mobile: "",
            password: "",
            referral_code: "",
          }}
          onSubmit={(values) => {
            // console.log("fdsg");
            console.log({
              ...values,
              bio: "",
              dob: moment(date).format("DD/MM/YYYY"),
              gender: gender,
            });
            signUp({
              ...values,
              bio: "",
              dob: moment(date).format("DD/MM/YYYY"),
              gender: gender,
            })
              .unwrap()
              .then((payload) => {
                console.log("P", payload);
                if (payload.status) {
                  props.navigation.navigate("VerifySignup");
                }
              })
              .catch((e) => console.log(e));
          }}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleSubmit,
            errors,
            setFieldTouched,
            touched,
          }) => (
            <>
              <View style={styles.inputmaincontainer}>
                <View style={styles.emailmain}>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange("name")}
                    onBlur={() => setFieldTouched("name")}
                    // value={text}
                    placeholder="Name"
                    placeholderTextColor={Colors.placeholder}
                  />
                </View>
                <View style={{ width: "90%" }}>
                  {touched.name && (
                    <Text style={styles.error}>{errors.name}</Text>
                  )}
                </View>
                <View style={styles.emailmain}>
                  <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    onBlur={() => setFieldTouched("email")}
                    // value={text}
                    placeholder="Email"
                    placeholderTextColor={Colors.placeholder}
                  />
                </View>
                <View style={{ width: "90%" }}>
                  {touched.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.emailmain}>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange("mobile")}
                    onBlur={() => setFieldTouched("mobile")}
                    // value={text}
                    placeholder="Mobile Number"
                    placeholderTextColor={Colors.placeholder}
                  />
                </View>
                <View style={{ width: "90%" }}>
                  {touched.mobile && (
                    <Text style={styles.error}>{errors.mobile}</Text>
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
                <View style={styles.emailmain}>
                  <Button
                    onPress={() => setShow(!show)}
                    buttonColor={Colors.white}
                    textColor={Colors.placeholder}
                    style={{ alignSelf: "flex-start" }}
                    labelStyle={{
                      fontFamily: FontFamily.regular,
                      marginLeft: -1,
                    }}
                  >
                    {dateSelected
                      ? moment(date).format("DD/MM/YYYY")
                      : "Date of Birth"}
                  </Button>
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode="date"
                      is24Hour={true}
                      onChange={onChange}
                    />
                  )}
                </View>
                <View style={styles.gender}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        color: Colors.placeholder,
                        fontFamily: FontFamily.regular,
                      }}
                    >
                      Male
                    </Text>
                    <RadioButton
                      value="Male"
                      status={gender === "Male" ? "checked" : "unchecked"}
                      onPress={() => setGender("Male")}
                    />
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        color: Colors.placeholder,
                        fontFamily: FontFamily.regular,
                      }}
                    >
                      Female
                    </Text>
                    <RadioButton
                      value="Female"
                      status={gender === "Female" ? "checked" : "unchecked"}
                      onPress={() => setGender("Female")}
                    />
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        color: Colors.placeholder,
                        fontFamily: FontFamily.regular,
                      }}
                    >
                      Others
                    </Text>
                    <RadioButton
                      value="Others"
                      status={gender === "Others" ? "checked" : "unchecked"}
                      onPress={() => setGender("Others")}
                    />
                  </View>
                </View>
                <View style={styles.emailmain}>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange("referral_code")}
                    onBlur={() => setFieldTouched("referral_code")}
                    // value={text}
                    placeholder="Referral code (Optional)"
                    placeholderTextColor={Colors.placeholder}
                  />
                </View>
                <View style={{ width: "90%" }}>
                  {touched.referral_code && (
                    <Text style={styles.error}>{errors.referral_code}</Text>
                  )}
                </View>
              </View>

              <Text
                style={{
                  color: Colors.grey,
                  width: "90%",
                  fontFamily: FontFamily.regular,
                  marginTop: RFPercentage(2),
                }}
              >
                By Continuing, You agree to Gizmo 360's
                <Text style={{ color: Colors.primary }}>
                  {" "}
                  Terms & Conditions{" "}
                </Text>
                and
                <Text style={{ color: Colors.primary }}> Privacy Policy. </Text>
              </Text>

              <TouchableOpacity style={styles.loginbutton} activeOpacity={0.7}>
                <AppButton
                  title="Continue"
                  bgColor={Colors.third}
                  txtColor={Colors.purewhite}
                  btnWidth={RFPercentage(40)}
                  btnFunc={handleSubmit}
                  loading={isLoading}
                />
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
          <View style={styles.appfbgcontainer}>
            <Image
              style={styles.fbglogo}
              source={require("../../assets/images/fblogo.png")}
            />
          </View>
          <View style={styles.appfbgcontainer}>
            <Image
              style={styles.fbglogo}
              source={require("../../assets/images/glogo.png")}
            />
          </View>
          <View style={styles.appfbgcontainer}>
            <Image
              style={styles.applelogo}
              source={require("../../assets/images/applelogo.png")}
            />
          </View>
        </View>
      </ScrollView>
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
    marginTop: RFPercentage(2),
  },
  gender: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    height: RFPercentage(7.5),
    backgroundColor: Colors.white,
    borderWidth: RFPercentage(0.1),
    borderColor: Colors.lightWhite,
    color: Colors.black,
    paddingLeft: RFPercentage(3),
    borderRadius: RFPercentage(1.5),
    marginTop: RFPercentage(2),
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
    marginTop: RFPercentage(5),
    marginBottom: RFPercentage(3),
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
