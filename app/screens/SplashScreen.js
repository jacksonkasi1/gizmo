import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
//config
import Colors from "../config/Colors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDetails } from "../../redux/slices/userSlice";
import { useFocusEffect } from "@react-navigation/native";
export default function SplashScreen(props) {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    AsyncStorage.getItem("token").then((value) => {
      // console.log("tkkk", value);
      if (value) {
        dispatch(getUserDetails(value)).then((res) => {
          try {
            if (res?.payload?.success) {
              console.log("spl", res.payload);
              setData(res.payload.data.getParticularUser.user_id);
            } else {
              setData("");
            }
          } catch (error) {
            console.log(error);
          }
        });
      } else {
        setData("");
      }
    });
  }, []);
  useEffect(() => {
    data != null &&
      setTimeout(() => {
        props.navigation.navigate("SplashScreen2", { data: data });
      }, 2000);
  }, [data]);
  return (
    <View style={styles.background}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
        <Image
          style={{ width: RFPercentage(30), height: RFPercentage(30) }}
          source={require("../../assets/images/home_logo.png")}
          resizeMode="contain"
        />
        {/* <Splash width={RFPercentage(30)} height={RFPercentage(7)} /> */}
      </TouchableOpacity>
    </View>
  );
}

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
