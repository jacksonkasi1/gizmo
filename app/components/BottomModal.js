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
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function BottomModal({
  children,
  modalVisible,
  setBottomModalVisible,
  style,
  bgColor,
  altWidth,
  noTopDvd,
  altPadding,
}) {
  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={() => {
        // Alert.alert("Modal has been closed.");
        setBottomModalVisible(!modalVisible);
      }}
      style={{
        position: "absolute",
        bottom: -10,
        margin: 0,
        width: windowWidth,
      }}
    >
      <View style={[{ flex: 1, alignItems: "center", marginTop: 29 }, style]}>
        <View
          style={{
            width: altWidth ? altWidth : "90%",
            backgroundColor: bgColor ? bgColor : "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: altPadding ? altPadding : 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          {!noTopDvd && (
            <View
              style={{
                width: windowWidth / 5,
                height: RFPercentage(0.5),
                backgroundColor: Colors.primary,
                position: "absolute",
                top: RFPercentage(2),
              }}
            />
          )}
          {children}
        </View>
      </View>
    </Modal>
  );
}
