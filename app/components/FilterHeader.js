import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
  } from "react-native";
  import React from "react";
  import AntDesign from "@expo/vector-icons/AntDesign";
  import { RFPercentage } from "react-native-responsive-fontsize";
  import Feather from "@expo/vector-icons/Feather";
  import { Spaces } from "../config/font";
import Colors from "../config/Colors";
  
  const FilterHeader = (props) => {
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
        <View style={{flexDirection:'row'}}>
        <Text style={styles.headerName}>{props.headerName}</Text>
        <Text style={[styles.headerName,{color:Colors.grey}]}>{'\b'}{props.subHeader}</Text>
        </View>
        {props.rightbutton ? (
          <TouchableOpacity
          onPress={props.filter}
            style={[styles.backButton, { marginRight: Spaces.small }]}
          >
           <Image
            style={{
              width: RFPercentage(6),
              height: RFPercentage(6),
              marginRight: RFPercentage(-7),
            }}
            source={require("../../assets/images/equalizer.png")}
          />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };
  
  export default FilterHeader;
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
      textAlign: "center",
    },
  });
  