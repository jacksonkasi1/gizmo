import React, { useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";

//config
import Colors from "../config/Colors";
import { useFocusEffect } from "@react-navigation/native";

const SplashScreen2 = ({ route, navigation }) => {
  const { data } = route.params;
  console.log("data splash 2", data);
  useEffect(() => {
    try {
      if (data !== "") {
        navigation.navigate("BottomTab", { screen: "HomeScreen" });
      } else {
        navigation.navigate("OnBoardingScreen", { data: data });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <View style={styles.background}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate("OnBoardingScreen", { data: data });
        }}
      >
        <Image
          style={{ width: RFPercentage(30), height: RFPercentage(30) }}
          source={require("../../assets/images/main_log.png")}
          resizeMode="contain"
        />
        {/* <Splash width={RFPercentage(30)} height={RFPercentage(7)} /> */}
      </TouchableOpacity>
    </View>
  );
};
export default SplashScreen2;
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.purewhite,
  },

  logo: {
    width: RFPercentage(30),
    height: RFPercentage(7),
  },
});
