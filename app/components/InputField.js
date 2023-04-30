import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  ImageBackground,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";

export default function InputField({ placeholder, disabled }) {
  const [Name, onChangeName] = useState("");
  return (
    <View style={styles.inputmain}>
      <TextInput
        style={styles.inpotext}
        onChangeText={onChangeName}
        value={Name}
        placeholder={placeholder}
        placeholderTextColor={Colors.placeholder}
        editable={!disabled}
        selectTextOnFocus={!disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputmain: {
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
  inpotext: {
    width: RFPercentage(45),
    fontFamily: FontFamily.regular,
  },
});
