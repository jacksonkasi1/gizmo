import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

//Components
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";

//config
import Colors from "../config/Colors";
import { ButtonSizes, FontFamily, FontSizes } from "../config/font";

//Paper
import { Checkbox } from "react-native-paper";
import MainHeader from "../components/MainHeader";
import { Ionicons } from "@expo/vector-icons";

export default function PickTopicSignup(props) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selected, setSelected] = useState(false);
  const handlePress = (item) => {
    console.log(selectedItems, item);

    if (selectedItems.includes(item.id)) {
      setSelectedItems(selectedItems.filter((i) => i !== item.id));
    } else {
      setSelectedItems([...selectedItems, item.id]);
    }
  };

  const list = [
    {
      id: "1",
      imageSource: require("../../assets/images/bluephone.png"),
      title: "Mobile",
    },
    {
      id: "2",
      imageSource: require("../../assets/images/airpod.png"),
      title: "Airpods",
    },
    {
      id: "3",
      imageSource: require("../../assets/images/ipad.png"),
      title: "IPad",
    },
    {
      id: "4",
      imageSource: require("../../assets/images/blackwatch.png"),
      title: "Smartwatch",
    },
    {
      id: "5",
      imageSource: require("../../assets/images/laptopselect.png"),
      title: "Laptop",
    },
    {
      id: "6",
      imageSource: require("../../assets/images/cameraselect.png"),
      title: "Camera",
    },
    {
      id: "7",
      imageSource: require("../../assets/images/headphone.png"),
      title: "Headphone",
    },
    {
      id: "8",
      imageSource: require("../../assets/images/headset.png"),
      title: "Headset",
    },
  ];
  return (
    <Screen style={styles.screen}>
      <MainHeader
        prevScreen="ChooseUserNameSignup"
        title=" "
        navigation={props.navigation}
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
        Pick Topics
      </Text>

      <View style={{ flex: 1 }}>
        <FlatList
          data={list}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handlePress(item)}
              style={{ margin: RFPercentage(1.5) }}
            >
              <View style={{ alignItems: "center" }}>
                <Image
                  source={item.imageSource}
                  style={{ width: 100, height: 100 }}
                />
                <Text style={{ marginTop: 10 }}>{item.title}</Text>
                {selectedItems.includes(item.id) && (
                  <View
                    style={{
                      position: "absolute",
                      top: 30,
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor: Colors.third,
                    }}
                  >
                    <Ionicons
                      name="md-checkmark"
                      size={25}
                      color={Colors.purewhite}
                    />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
          numColumns={3}
          contentContainerStyle={{ padding: 10 }}
        />
      </View>
      <View
        style={{ marginTop: RFPercentage(2), marginBottom: RFPercentage(2) }}
      >
        <AppButton
          title="Next"
          bgColor={Colors.third}
          txtColor={Colors.purewhite}
          btnWidth={RFPercentage(55)}
          btnFunc={() => props.navigation.navigate("SignupQuestion")}
        />
      </View>
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
    marginTop: RFPercentage(-4),
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
