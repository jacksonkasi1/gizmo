import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FontFamily, FontSizes } from "../../config/font";
import Colors from "../../config/Colors";
import VideoLikeSave from "./VideoLikeSave";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const VideoBottomSection = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "flex-start",
          width: windowWidth / 1,
        }}
      >
        <Text style={styles.contentTitle}>{props.contentTitle}</Text>
        <TouchableOpacity
          onPress={props.descriptionModal}
          style={{ alignSelf: "center" }}
        >
          <AntDesign name="down" size={20} color={Colors.third} />
        </TouchableOpacity>
      </View>
      <Text style={styles.followerVideoStyle}>
        {props.views ? props.views + "\b" + "Views \b\u2022\b" : null}
        {"\b"}
        {props.duration}
      </Text>
      <VideoLikeSave
        likes={props.data.likes.length}
        dislikes={props.data.dislikes.length}
        data={props.data}
        user_id={props.user_id}
      />
    </View>
  );
};

export default VideoBottomSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.purewhite,
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
    width: "83%",
  },
  followerVideoStyle: {
    marginTop: "1%",
    marginLeft: "5%",
    color: Colors.darkGrey,
    fontSize: FontSizes.smaller,
    fontFamily: FontFamily.medium,
  },
});
