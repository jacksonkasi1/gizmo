import React, { useState } from "react";
import { Alert, View, Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import AppButton from "../components/AppButton";
import Ionicons from "react-native-vector-icons/Ionicons";
//Components
import Screen from "../components/Screen";

//config
import Colors from "../config/Colors";
//3rd Party
import Modal from "react-native-modal";
import { Spaces } from "../config/font";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function PopModal({
  children,
  modalVisible,
  setPopModalVisible,
  style,
}) {
  return (
    <Modal
      animationIn="fadeInRightBig"
      animationOut="fadeOutRightBig"
      isVisible={modalVisible}
      onBackdropPress={() => {
        // Alert.alert("Modal has been closed.");
        setPopModalVisible(!modalVisible);
      }}
      style={{
        position: "absolute",
        top: Spaces.medium,
        right: 0,
        width: windowWidth / 2.5,
      }}
    >
      <View style={[{ flex: 1, alignItems: "center", marginTop: 29 }, style]}>
        <View
          style={{
            width: "90%",
            backgroundColor: Colors.purewhite,
            padding: 35,
            alignItems: "flex-start",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            borderRadius: Spaces.smaller,
          }}
        >
          <View
            style={{
              width: 10,
              height: 10,
              position: "absolute",
              top: -10,
              right: Spaces.small,
              borderLeftWidth: 10,
              borderLeftColor: "transparent",
              borderRightWidth: 10,
              borderRightColor: "transparent",
              borderBottomWidth: 10,
              borderBottomColor: Colors.purewhite,
            }}
          />
          {children}
        </View>
      </View>
    </Modal>
  );
}
