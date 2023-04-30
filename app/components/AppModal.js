import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
  Switch,
  Modal,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import AppButton from "../components/AppButton";
import Ionicons from "react-native-vector-icons/Ionicons";

//Components
import Screen from "../components/Screen";

//config
import Colors from "../config/Colors";

export default function AppModal({
  children,
  modalVisible,
  setModalVisible,
  style,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
      statusBarTranslucent={true}
    >
      <View
        style={[
          {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          style,
        ]}
      >
        <View
          style={{
            width: "90%",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
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
          {children}
        </View>
      </View>
    </Modal>
  );
}
