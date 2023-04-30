import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//config
import Colors from "../../config/Colors";
import { FontFamily } from "../../config/font";
import { Feather } from "@expo/vector-icons";
import { useLikeVideoMutation } from "../../../redux/api/apiSlice";

export default function VideoLikeSave({
  likes,
  dislikes,
  add,
  data,
  navigation,
  user_id,
}) {
  const [savePost, setSavePost] = useState(false);
  const [like, setLike] = useState(false);
  const [unLike, setUnLike] = useState(false);
  const [likeVideo, { isLoading, isSuccess }] = useLikeVideoMutation();

  return (
    <>
      <View style={styles.mainleft}>
        <View style={{ flexDirection: "row" }}>
          {/* like video */}
          <View style={styles.slignt}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                // console.log({
                //   formData: { user_id: user_id },
                //   vdId: data.id,
                // });
                likeVideo({
                  formData: { user_id: user_id },
                  vdId: data.id,
                })
                  .unwrap()
                  .then((payload) => {
                    console.log("liked");
                    setLike(!like);
                  });
              }}
            >
              <Ionicons
                name={
                  like || data.likes.includes(user_id)
                    ? "thumbs-up"
                    : "thumbs-up-outline"
                }
                color={
                  like || data.likes.includes(user_id)
                    ? Colors.third
                    : Colors.lightgrey
                }
                size={25}
              />
            </TouchableOpacity>
            <Text style={styles.likdis}>{likes}</Text>
          </View>
          {/* unlike video */}
          <View style={styles.slignt}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setUnLike(!unLike);
              }}
            >
              <Ionicons
                name={unLike ? "thumbs-down" : "thumbs-down-outline"}
                color={unLike ? Colors.third : Colors.lightgrey}
                size={25}
              />
            </TouchableOpacity>
            <Text style={styles.likdis}>{dislikes}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          {/* share video */}
          <TouchableOpacity style={styles.mainright}>
            <Image
              style={styles.addshricon}
              source={require("../../../assets/images/shareicon.png")}
            />
            {/* <Text style={styles.addshrtext}>share</Text> */}
          </TouchableOpacity>
          {/* saveicon */}
          <TouchableOpacity style={styles.mainright}>
            {savePost == true ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSavePost(false);
                }}
              >
                <MaterialCommunityIcons
                  name="bookmark"
                  size={32}
                  color={Colors.third}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSavePost(true);
                }}
              >
                <MaterialCommunityIcons
                  name="bookmark-outline"
                  size={32}
                  color={Colors.grey}
                />
              </TouchableOpacity>
            )}
            {/* <Text style={styles.savetext}>Save</Text> */}
          </TouchableOpacity>
          {/* more option */}
          <TouchableOpacity style={[styles.mainright, { marginRight: "1%" }]}>
            <Feather name="more-vertical" size={30} color={Colors.darkGrey} />
            {/* <Text style={styles.addshrtext}>share</Text> */}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
const windowWidth = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  mainleft: {
    flexDirection: "row",
    width: windowWidth / 1,
    marginTop: "5%",
  },
  slignt: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "10%",
    marginRight: "1%",
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 10,
    padding: 5,
    alignSelf: "center",
    flexDirection: "row",
  },
  likdis: {
    fontSize: RFPercentage(2),
    fontWeight: "600",
    marginLeft: "5%",
    marginTop: "5%",
    textAlign: "center",
    color: Colors.black,
    fontFamily: FontFamily.semiBold,
  },
  addshricon: {
    width: RFPercentage(4.7),
    height: RFPercentage(4),
    alignSelf: "center",
    justifyContent: "center",
  },
  addshrtext: {
    fontSize: RFPercentage(1.7),
    fontWeight: "600",
    color: Colors.black,
    marginTop: RFPercentage(1),
    fontFamily: FontFamily.semiBold,
  },

  //save
  mainright: {
    // width: "40%",
    marginRight: "10%",
    backgroundColor: "#fff",
    elevation: 2,
    borderRadius: 5,
    padding: 5,
    justifyContent: "center",
    alignSelf: "center",
  },
  savetext: {
    fontSize: RFPercentage(1.5),
    fontWeight: "600",
    color: Colors.black,
    fontFamily: FontFamily.semiBold,
    marginRight: RFPercentage(0.5),
    marginTop: RFPercentage(0.5),
  },
});
