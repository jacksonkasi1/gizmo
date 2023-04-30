import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { FontFamily, FontSizes } from "../../config/font";
import Colors from "../../config/Colors";
import HorizontalDivider from "../HorizontalDivider";

const VideoDescriptionComponent = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.horizontalLine} />
      <View
        style={{
          flexDirection: "row",
          alignSelf: "flex-start",
          width: windowWidth / 1,
        }}
      >
        <Text style={styles.contentTitle}>Description</Text>
        <TouchableOpacity
          onPress={props.descriptionModal}
          style={{ alignSelf: "center" }}
        >
          <Entypo name="cross" size={34} color={Colors.third} />
        </TouchableOpacity>
      </View>
      <HorizontalDivider />
      <Text style={styles.contentTitle}>{props.contentTitle}</Text>
      <View style={styles.descriptionContainer}>
        <View>
          <Text style={styles.decpCount}>{props.data.likes.length}</Text>
          <Text style={styles.decpText}>Likes</Text>
        </View>
        <View>
          <Text style={styles.decpCount}>53.6K</Text>
          <Text style={styles.decpText}>Views</Text>
        </View>
        <View>
          <Text style={styles.decpCount}>20 dec</Text>
          <Text style={styles.decpText}>Years</Text>
        </View>
      </View>
      <HorizontalDivider />
      <Text style={styles.descriptionText}>{props.data.description}</Text>
    </View>
  );
};

export default VideoDescriptionComponent;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.purewhite,
  },
  horizontalLine: {
    alignSelf: "center",
    borderColor: Colors.third,
    borderWidth: 3,
    width: "20%",
    borderRadius: 20,
    marginTop: "2%",
  },
  contentTitle: {
    textAlign: "left",
    flexWrap: "wrap",
    marginLeft: "5%",
    marginRight: 5,
    fontSize: FontSizes.regular,
    fontFamily: FontFamily.semiBold,
    color: Colors.black,
    marginTop: "5%",
    width: "80%",
  },
  descriptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: windowWidth / 1.2,
    alignSelf: "center",
    marginTop: "5%",
  },
  decpText: {
    fontSize: FontSizes.small,
    fontFamily: FontFamily.semiBold,
    color: Colors.grey,
  },
  decpCount: {
    fontSize: FontSizes.regular,
    fontFamily: FontFamily.semiBold,
    color: Colors.black,
  },
  descriptionText: {
    marginTop: "5%",
    fontSize: FontSizes.small,
    fontFamily: FontFamily.regular,
    color: Colors.black,
    alignSelf: "center",
    marginLeft: "5%",
  },
});
