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

//config
import Colors from "../config/Colors";
import { FontFamily, FontSizes, Spaces } from "../config/font";
import { useNavigation } from "@react-navigation/native";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { setId } from "../../redux/slices/mainSlice";

export default function ProfileData({
  image,
  title,
  subtitle,
  userId,
  postId,
  setBottomModalVisible,
  modalVisible,
  data,
  comment,
  type,
  followers,
  category,
  width,
  noBottomModal,
}) {
  // console.log("category", category)
  const navigation = useNavigation();
  const dispatch=useDispatch()
  const funcId = () =>{
    dispatch(setId({id:postId,category:category}))
  }
  return (
    <View
      style={{
        width: width ? width : "95%",
        marginTop: RFPercentage(1),
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={styles.innermain}
        onPress={() => {
          navigation.navigate("ViewProfileMain", {
            name: title,
            image: image,screenName:'ProfileDetails',
          });
        }}
      >
        {/* picture */}
        <View style={styles.imgmain}>
          <Image
            style={{ width: RFPercentage(8), height: RFPercentage(8) }}
            source={require("../../assets/images/person1.png")}
          />
        </View>

        {/* text */}
        <View
          style={
            comment ? { flexDirection: "row", marginTop: Spaces.nSmall } : {}
          }
        >
          <Text
            style={{
              fontSize: comment ? RFPercentage(2.3) : RFPercentage(2),
              color: comment ? Colors.primary : Colors.black,
              fontFamily: comment ? FontFamily.regular : FontFamily.semiBold,
            }}
          >
            {title}
          </Text>
          <View style={{ flexDirection: "row" }}>
            {followers && (
              <Text
                style={{
                  fontFamily: FontFamily.medium,
                  fontSize: FontSizes.smaller,
                  color: Colors.grey,
                  marginTop: comment ? RFPercentage(0) : RFPercentage(0.6),
                  marginLeft: comment ? RFPercentage(1) : 0,
                  textAlignVertical: "center",
                }}
              >
                53K followers.
              </Text>
            )}
            <Text
              style={{
                fontFamily: FontFamily.medium,
                fontSize: FontSizes.smaller,
                color: Colors.grey,
                marginTop: comment ? RFPercentage(0) : RFPercentage(0.6),
                marginLeft: comment ? RFPercentage(1) : 0,
                textAlignVertical: "center",
              }}
            >
              {moment(subtitle).format("Do MMM")}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* //editicon */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          if (!noBottomModal) {
            !comment ? (setBottomModalVisible(!modalVisible),funcId()) : null;
          }
        }}
        style={
          comment
            ? { alignItems: "flex-end", width: "20%", marginTop: Spaces.nSmall }
            : { alignItems: "flex-end", width: "20%" }
        }
      >
        <Image
          style={styles.editicon}
          source={require("../../assets/images/3dot.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profiledatamain: {
    width: "95%",
    marginTop: RFPercentage(1),
    flexDirection: "row",
    alignItems: "center",
  },
  innermain: { flexDirection: "row", alignItems: "center", width: "80%" },
  imgmain: {
    width: RFPercentage(10),
    height: RFPercentage(10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RFPercentage(5),
    overflow: "hidden",
  },

  editicon: { width: RFPercentage(6), height: RFPercentage(6) },
});
