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
import { LinearGradient } from "expo-linear-gradient";
import AppModal from "../components/AppModal";

export default function SignupQuestion(props) {
  const [selected, setSelected] = useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisible1, setModalVisible1] = React.useState(false);

  const list = [
    {
      id: "1",
      title: "6 Months",
    },
    {
      id: "2",
      title: "1 Year",
    },
    {
      id: "3",
      title: "3 Year",
    },
    {
      id: "4",
      title: "5 Year",
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
          width: "80%",
          textAlign: "center",
          fontSize: FontSizes.large,
          fontFamily: FontFamily.medium,
          marginTop: RFPercentage(3),
        }}
      >
        How frequently do you upgrade your electronics?
      </Text>

      {list.map((itm, indx) => (
        <TouchableOpacity
          onPress={() => {
            setSelected(itm.id);
            setModalVisible(!modalVisible);
          }}
          key={indx}
          style={{
            width: "90%",
          }}
        >
          <LinearGradient
            style={{
              borderWidth: 0.6,
              borderColor: Colors.lightgrey,
              margin: RFPercentage(1),
            }}
            colors={
              selected == itm.id
                ? [Colors.primary, Colors.secondary]
                : [Colors.white, Colors.white]
            }
            start={[2, 1]}
            end={[0.2, 1.5]}
          >
            <Text
              style={{
                fontFamily: FontFamily.regular,
                fontSize: FontSizes.regular,
                padding: RFPercentage(1.5),
              }}
            >
              {itm.title}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
      <View style={{ position: "absolute", bottom: RFPercentage(2) }}>
        <AppButton
          title="Next"
          bgColor={Colors.third}
          txtColor={Colors.purewhite}
          btnWidth={RFPercentage(55)}
          btnFunc={() =>
            props.navigation.navigate("SideDrawer", {
              screen: "BottomTab",
              params: { screen: "HomeScreen" },
            })
          }
        />
      </View>

      <AppModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        style={{ justifyContent: "center" }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: RFPercentage(1),
          }}
        >
          <Text
            style={{
              fontFamily: FontFamily.medium,
              fontSize: FontSizes.large,
              color: Colors.blacky,
            }}
          >
            “GIZMO” would like to send you notification
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
              Notifications may include alerts, sounds, and icon badges. these
              can be configured in settings.
            </Text>
          </View>
        </View>

        {/* button */}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={{
              width: RFPercentage(20),
              height: RFPercentage(6),
              borderRadius: RFPercentage(1),
              backgroundColor: Colors.white,
              justifyContent: "center",
              alignItems: "center",
              marginTop: RFPercentage(3),
              borderWidth: 1,
              borderColor: Colors.third,
            }}
          >
            <Text style={{ color: Colors.third }}>DON'T ALLOW</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setModalVisible(!modalVisible);
              setModalVisible1(!modalVisible1);
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
            <Text style={{ color: Colors.purewhite }}>ALLOW</Text>
          </TouchableOpacity>
        </View>
      </AppModal>
      <AppModal
        modalVisible={modalVisible1}
        setModalVisible={setModalVisible1}
        style={{ justifyContent: "center" }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: RFPercentage(1),
          }}
        >
          <Text
            style={{
              fontFamily: FontFamily.medium,
              fontSize: FontSizes.large,
              color: Colors.blacky,
            }}
          >
            Allow “GIZMO” to track your activity across other companies' apps
            and websites?
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
              This allows GIZMO to provide you with a more personalized ads
              experience.
            </Text>
          </View>
        </View>

        {/* button */}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setModalVisible1(!modalVisible1);
            }}
            style={{
              width: RFPercentage(20),
              height: RFPercentage(6),
              borderRadius: RFPercentage(1),
              backgroundColor: Colors.white,
              justifyContent: "center",
              alignItems: "center",
              marginTop: RFPercentage(3),
              borderWidth: 1,
              borderColor: Colors.third,
            }}
          >
            <Text style={{ color: Colors.third }}>DON'T ALLOW</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setModalVisible1(!modalVisible1);
              // props.navigation.navigate("SideDrawer", {
              //   screen: "BottomTab",
              //   params: { screen: "HomeScreen" },
              // });
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
            <Text style={{ color: Colors.purewhite }}>ALLOW</Text>
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
    marginTop: RFPercentage(2),
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
});
