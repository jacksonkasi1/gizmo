import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";

export default function LikeSaveComment({
  likes,
  dislikes,
  add,
  data,
  id,
  navigation,
  func,
  funcVal,
}) {
  const [savePost, setSavePost] = useState(false);
  const [like, setLike] = useState(false);
  const [unLike, setUnLike] = useState(false);
  return (
    <>
      <View style={styles.mainleft}>
        <View style={styles.slignt}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setLike(!like);
            }}
          >
            <Ionicons
              name={like ? "thumbs-up" : "thumbs-up-outline"}
              color={like ? Colors.third : Colors.lightgrey}
              size={RFPercentage(3)}
            />
            {/* <Foundation
              name="like"
              size={35}
              color={like == false ? Colors.grey : Colors.third}
            /> */}
          </TouchableOpacity>
          <Text style={styles.likdis}>{likes}</Text>
        </View>
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
              size={RFPercentage(3)}
            />
            {/* <Foundation
              name="dislike"
              size={35}
              color={like == true ? Colors.grey : Colors.third}
            /> */}
          </TouchableOpacity>
          <Text style={styles.likdis}>{dislikes}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            // func ? (func(!funcVal)) : null;
            func&&(func(!funcVal)),
            id(data?.comments_id)
          }}
          style={styles.slignt}
        >
          <Image
            style={styles.addshricon}
            source={require("../../assets/images/addposticon.png")}
          />
          <Text style={styles.addshrtext}>Reply</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainleft: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
    justifyContent: "space-between",
  },
  slignt: { alignItems: "center", justifyContent: "center" },
  likdis: {
    fontSize: RFPercentage(1.5),
    fontWeight: "600",
    color: Colors.black,
    fontFamily: FontFamily.semiBold,
  },
  addshricon: { width: RFPercentage(3), height: RFPercentage(3) },
  addshrtext: {
    fontSize: RFPercentage(1.5),
    fontWeight: "600",
    color: Colors.black,
    marginTop: RFPercentage(0.5),
    fontFamily: FontFamily.semiBold,
  },

  //save
  mainright: { width: "40%", alignItems: "flex-end", justifyContent: "center" },
  savetext: {
    fontSize: RFPercentage(1.5),
    fontWeight: "600",
    color: Colors.black,
    fontFamily: FontFamily.semiBold,
    marginRight: RFPercentage(0.5),
    marginTop: RFPercentage(0.5),
  },
});
