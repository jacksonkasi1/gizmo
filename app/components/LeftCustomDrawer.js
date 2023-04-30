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

const LeftCustomDrawer = (props) => {
  const [buttonClick, setButtonClick] = useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);

  //FIX ME
  const activityList = [
    {
      title: "Following",
      imagSource: require("../../assets/images/following.png"),
    },
    {
      title: "Help Center",
      imagSource: require("../../assets/images/help_cntr.png"),
    },
    {
      title: "Invite Friends",
      imagSource: require("../../assets/images/invite.png"),
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
      case "Following":
        props.navigation.navigate("ComingSoon");
        break;
      case "Help Center":
        props.navigation.navigate("ComingSoon");
        break;
      case "Invite Friends":
        props.navigation.navigate("ComingSoon");
        break;
      default:
        break;
    }
  };
  const logoList = [
    {
      name: "Instagram",
      image: require("../../assets/images/instagram.png"),
    },
    {
      name: "Twitter",
      image: require("../../assets/images/twitter.png"),
    },
    {
      name: "Reddit",
      image: require("../../assets/images/reddit.png"),
    },
    {
      name: "Facebook",
      image: require("../../assets/images/fb.png"),
    },
    {
      name: "Youtube",
      image: require("../../assets/images/utube.png"),
    },
  ];
  const btmList = [
    { id: 1, title: "Privacy Policy" },
    { id: 2, title: "Terms of Service" },
    { id: 2, title: "Copyrights" },
  ];
  return (
    <View style={styles.screen}>
      <View style={styles.headermain}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            position: "absolute",
            right: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => props.navigation.getParent("LeftDrawer").closeDrawer()}
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

        <Text style={styles.headertext}>Menu</Text>
      </View>

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

      {/* bottom button */}
      <View style={styles.mainbutton}>
        <Text style={styles.headertext}>Follow Us</Text>
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            justifyContent: "space-around",
            marginVertical: Spaces.small,
          }}
        >
          {logoList.map((itm, indx) => (
            <Image key={indx} source={itm.image} />
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
            marginVertical: Spaces.small,
          }}
        >
          {btmList.map((itm, indx) => (
            <Text
              key={indx}
              style={{
                color: Colors.third,
                fontSize: FontSizes.smaller,
                fontFamily: FontFamily.semiBold,
              }}
            >
              {itm.title}
            </Text>
          ))}
        </View>
        <Text
          style={{
            color: Colors.black,
            fontSize: FontSizes.small,
            fontFamily: FontFamily.semiBold,
          }}
        >
          Gizmo 360 <Text style={{ color: Colors.third }}>V2.0</Text>
        </Text>
      </View>
    </View>
  );
};

export default LeftCustomDrawer;

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
  mainbutton: {
    width: "90%",
    position: "absolute",
    bottom: "3%",
    alignItems: "center",
  },
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
