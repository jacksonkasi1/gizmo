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

//Components
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";

//config
import Colors from "../config/Colors";
import { ButtonSizes, FontFamily, FontSizes } from "../config/font";
import { useFocusEffect } from "@react-navigation/native";
import { useEffect } from "react";

const OnBoardingScreen = ({ navigation, route }) => {
  const { data } = route.params;
  console.log("datataaaaaa", data);
  const [val, setVal] = useState(0);
  const onBoardingArr = [
    {
      content: "One stop for all your Electronics& Gadgets needs",
    },
    {
      content: "Create, Grow & Monetize your passion!",
    },
    {
      content: "Save time and energy by using Gizmo360 APP",
    },
  ];
  useEffect(() => {
    console.log("hello");
  }, []);
  return (
    <Screen style={styles.screen}>
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Image
          style={styles.logo}
          source={require("../../assets/images/gizmologoorange.png")}
        />
        <TouchableOpacity
          onPress={() => {
            if (val < 2) {
              setVal(val + 1);
            }
          }}
        >
          {val == 0 && (
            <Image
              style={{ height: RFPercentage(52) }}
              source={require(`../../assets/images/onBoarding1.png`)}
            />
          )}
          {val == 1 && (
            <Image
              style={{ height: RFPercentage(52) }}
              source={require(`../../assets/images/onBoarding2.png`)}
            />
          )}
          {val == 2 && (
            <Image
              style={{ height: RFPercentage(52) }}
              source={require(`../../assets/images/onBoarding3.png`)}
            />
          )}
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: FontFamily.semiBold,
            fontSize: RFPercentage(3),
            width: RFPercentage(60),
            textAlign: "center",
            color: Colors.grey,
          }}
        >
          {onBoardingArr[val].content}
        </Text>

        {val == 0 && (
          <Image
            style={{ width: RFPercentage(8) }}
            source={require("../../assets/images/dot1.png")}
          />
        )}
        {val == 1 && (
          <Image
            style={{ width: RFPercentage(8) }}
            source={require("../../assets/images/dot1.png")}
          />
        )}
        {val == 2 && (
          <Image
            style={{ width: RFPercentage(8) }}
            source={require("../../assets/images/dot1.png")}
          />
        )}

        <View
          style={{
            width: "90%",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <AppButton
            title="Log In"
            bgColor={Colors.purewhite}
            txtColor={Colors.third}
            btnWidth={ButtonSizes.small}
            btnFunc={() => navigation.navigate("LoginScreen")}
          />
          <AppButton
            title="Sign Up"
            bgColor={Colors.third}
            txtColor={Colors.purewhite}
            btnWidth={ButtonSizes.medium}
            btnFunc={() => navigation.navigate("SignupScreen")}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("BottomTab", { screen: "HomeScreen" })
          }
          style={{ width: "50%", marginBottom: RFPercentage(2) }}
        >
          <Text
            style={{
              color: Colors.primary,
              fontSize: FontSizes.regular,
            }}
          >
            Skip Now &#62;
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};
export default OnBoardingScreen;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  logo: {
    width: RFPercentage(21),
    height: RFPercentage(5),
  },
});
