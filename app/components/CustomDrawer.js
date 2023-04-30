import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { RFPercentage } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//config
import Colors from "../config/Colors";
import { FontFamily, FontSizes, Spaces } from "../config/font";
import AppModal from "./AppModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawer = (props) => {
  const [buttonClick, setButtonClick] = useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);

  //FIX ME
  const activityList = [
    {
      title: "Watch History",
      imagSource: require("../../assets/images/history.png"),
    },
    {
      title: "Liked",
      imagSource: require("../../assets/images/liked.png"),
    },
    {
      title: "Saved",
      imagSource: require("../../assets/images/saved.png"),
    },
  ];
  //FIX ME
  const accountList = [
    {
      title: "Personal Information",
      imagSource: require("../../assets/images/perInfo.png"),
    },
    {
      title: "Settings",
      imagSource: require("../../assets/images/settings.png"),
    },
  ];
  const handleActivityListPress = (itm) => {
    switch (itm.title) {
      case "Watch History":
        props.navigation.navigate("WatchHistory");
        break;
      case "Liked":
        props.navigation.navigate("ScreenStack", { screen: "LikeScreen" });
        break;
      case "Saved":
        props.navigation.navigate("ScreenStack", { screen: "SaveScreen" });
        break;
      default:
        break;
    }
  };
  const handleAccountListPress = (itm) => {
    switch (itm.title) {
      case "Settings":
        props.navigation.navigate("ScreenStack", { screen: "SettingScreen" });
        break;
      case "Personal Information":
        props.navigation.navigate("ScreenStack", {
          screen: "PersonalInformationScreen",
        });
        break;
      default:
        break;
    }
  };

  const onSubmit = async () => {
    await AsyncStorage.clear().then(() => {
      setModalVisible(!modalVisible);
      props.navigation.navigate("ScreenStack", {
        screen: "LoginScreen",
      });
    });
  };
  return (
    <View style={styles.screen}>
      <View style={styles.headermain}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            position: "absolute",
            left: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() =>
            props.navigation.getParent("RightDrawer").closeDrawer()
          }
        >
          <Image
            style={{
              width: RFPercentage(6.5),
              height: RFPercentage(6.5),
              elevation: 5,
            }}
            source={require("../../assets/images/cancel_btn.png")}
          />
        </TouchableOpacity>

        <Text style={styles.headertext}>My Profile</Text>
      </View>

      {/* //profile */}
      <View
        style={{
          width: "90%",
          height: RFPercentage(14),
          borderWidth: RFPercentage(0.1),
          marginTop: RFPercentage(5),
          alignItems: "center",
          justifyContent: "center",
          borderColor: Colors.lightWhite,
          borderRadius: RFPercentage(2),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "90%",
          }}
        >
          <Image
            style={styles.profimg}
            source={require("../../assets/images/person5.png")}
          />

          <View style={{ marginLeft: Spaces.small }}>
            <View style={styles.darltextmain}>
              <Text style={styles.darltext}>Darlene Robertson</Text>
              <View style={{ marginLeft: RFPercentage(1) }}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={Colors.green}
                />
              </View>
            </View>
            <Text
              style={{
                fontSize: FontSizes.smaller,
                marginTop: RFPercentage(0.4),
                fontFamily: FontFamily.medium,
              }}
            >
              @mkbhd
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("ScreenStack", {
                  screen: "ViewProfileMain",
                  params: {
                    name: "Darlene Robertson",
                    image: require("../../assets/images/person5.png"),
                    screenName: "ProfileDetails",
                  },
                });
              }}
              style={styles.vptextmain}
            >
              <Text style={styles.vptext}>View Profile</Text>
              <View style={{ marginLeft: RFPercentage(0.1) }}>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={23}
                  color={Colors.third}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Text
        style={{
          fontFamily: FontFamily.medium,
          color: Colors.third,
          alignSelf: "flex-start",
          marginLeft: Spaces.small,
          fontSize: FontSizes.regular,
          marginTop: Spaces.small,
        }}
      >
        Activity
      </Text>

      {/* Activity list */}
      <View
        style={{
          width: "90%",
          marginTop: Spaces.small,
          justifyContent: "center",
        }}
      >
        {/* Watch History */}
        {activityList.map((itm, indx) => (
          <TouchableOpacity
            style={styles.watchlistmain}
            key={indx}
            onPress={() => handleActivityListPress(itm)}
          >
            <View style={styles.rowline}>
              <Image
                style={{
                  width: RFPercentage(9),
                  height: RFPercentage(8),
                  elevation: 5,
                }}
                source={itm.imagSource}
              />

              <Text style={styles.listtext}>{itm.title}</Text>
            </View>
            <View style={styles.arrowicon}>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={32}
                color={Colors.third}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <Text
        style={{
          fontFamily: FontFamily.medium,
          color: Colors.third,
          alignSelf: "flex-start",
          marginLeft: Spaces.small,
          fontSize: FontSizes.regular,
          marginTop: Spaces.small,
        }}
      >
        Accounts
      </Text>

      {/* Account list */}
      <View
        style={{
          width: "90%",
          marginTop: Spaces.small,
          justifyContent: "center",
        }}
      >
        {/* Watch History */}
        {accountList.map((itm, indx) => (
          <TouchableOpacity
            onPress={() => handleAccountListPress(itm)}
            style={styles.watchlistmain}
            key={indx}
          >
            <View style={styles.rowline}>
              <Image
                style={{
                  width: RFPercentage(9),
                  height: RFPercentage(8),
                  elevation: 5,
                }}
                source={itm.imagSource}
              />

              <Text style={styles.listtext}>{itm.title}</Text>
            </View>
            <View style={styles.arrowicon}>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={32}
                color={Colors.third}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* bottom button */}
      <View style={styles.mainbutton}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.buttoncon}>
            <Text style={styles.buttontextmain}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
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
            backgroundColor: Colors.red,
          }}
        >
          <Ionicons name="alert-outline" size={80} color={Colors.white} />
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
            Confirmation
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
              Are you sure you want to log out?
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
            <Text style={{ color: Colors.third }}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onSubmit()}
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
            <Text style={{ color: Colors.purewhite }}>Yes</Text>
          </TouchableOpacity>
        </View>
      </AppModal>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center" },

  //header
  headermain: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFPercentage(6),
  },

  headertext: {
    fontWeight: "600",
    fontSize: RFPercentage(2.5),
    color: Colors.black,
    fontFamily: FontFamily.semiBold,
  },

  //profile

  profimg: {
    width: RFPercentage(10),
    height: RFPercentage(10),
  },

  darltextmain: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  darltext: {
    fontWeight: "600",
    fontFamily: "Poppins_600SemiBold",
    fontSize: RFPercentage(2),
  },

  vptextmain: {
    flexDirection: "row",
    marginTop: RFPercentage(0.4),
    alignItems: "center",
  },
  vptext: {
    fontWeight: "400",
    fontFamily: "Poppins_500Medium",
    color: Colors.third,
  },

  watchlistmain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listmain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: RFPercentage(3),
  },
  rowline: {
    flexDirection: "row",
    marginTop: RFPercentage(0.7),
    alignItems: "center",
  },
  circleiconlist: {
    alignItems: "center",
    justifyContent: "center",
    width: RFPercentage(4.7),
    height: RFPercentage(4.7),
    borderRadius: RFPercentage(4),
    backgroundColor: Colors.white,
  },
  listtext: {
    fontSize: RFPercentage(2.2),
    fontWeight: "400",
    fontFamily: "Poppins_500Medium",
    color: Colors.black,
    marginLeft: RFPercentage(2),
  },
  arrowicon: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFPercentage(0.3),
  },

  //button
  mainbutton: { width: "90%", position: "absolute", bottom: RFPercentage(2) },
  buttoncon: {
    width: "100%",
    height: RFPercentage(6),
    borderRadius: RFPercentage(1),
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFPercentage(2),
    backgroundColor: Colors.third,
  },
  buttontextmain: {
    fontSize: 15,
    color: Colors.white,
    fontFamily: "Poppins_600SemiBold",
  },
});
