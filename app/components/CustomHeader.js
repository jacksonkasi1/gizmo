import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { Spaces } from "../config/font";

const CustomHeader = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={props.backButton}>
        <AntDesign
          name="left"
          size={20}
          color={"#ef7e46"}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text style={styles.headerName}>{props.headerName}</Text>
      {props.rightbutton ? (
        <TouchableOpacity
          style={[styles.backButton, { marginRight: Spaces.small }]}
        >
          <Feather
            name="more-vertical"
            size={24}
            color={"#ef7e46"}
            style={[styles.icon]}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default CustomHeader;
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    width: width / 1,
    flexDirection: "row",
    alignSelf: "flex-start",
    padding: 10,
    margin: 10,
    justifyContent: "space-between",
  },
  backButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  icon: {
    alignSelf: "center",
  },
  headerName: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    width: "65%",
    marginLeft: "15%",
    textAlign: "left",
  },
});
