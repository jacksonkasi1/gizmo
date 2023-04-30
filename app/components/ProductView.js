import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

//config
import Colors from "../config/Colors";
import { FontFamily, FontSizes } from "../config/font";
import { FontAwesome } from "@expo/vector-icons";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function ProductView({ i }) {
  return (
    <View style={styles.productContainer}>
      <View>
        <Image source={i?.image} style={styles.productImage} />
      </View>
      <View>
        <View style={styles.nameContainer}>
          <Text style={styles.title}>{i?.name}</Text>
        </View>
        {/* views section */}
        <View style={styles.viewsContainer}>
          <View style={styles.rateView}>
            <Text style={styles.rateText}>{i?.star}</Text>
          </View>
          <Text style={styles.viewText}>{i?.reviews} Views</Text>
        </View>
        {/* price section */}
        <View style={styles.priceContainer}>
          <FontAwesome
            name="rupee"
            size={18}
            color={Colors.third}
            style={styles.rupees}
          />
          <Text style={styles.priceText}>
            {"\b"}
            {i?.discountedPrice}
            {"\b\b\b"}
          </Text>
          <FontAwesome
            name="rupee"
            size={18}
            color={Colors.grey}
            style={styles.rupees}
          />
          <Text style={styles.discountPrice}>
            {"\b"}
            {i?.originalPrice}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productImage: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: windowHeight / 5,
    width: windowWidth / 2.8,
  },
  productContainer: {
    flexDirection: "row",
    alignSelf: "center",
    width: windowWidth / 1.1,
    height: windowHeight / 5,
    margin: 10,
    borderColor: "#E3E3E3",
    borderWidth: 1,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  nameContainer: {
    marginLeft: 10,
    marginTop: 10,
    flexWrap: "wrap",
  },
  title: {
    alignSelf: "flex-start",
    width: "60%",
    fontSize: FontSizes.regular,
    fontFamily: FontFamily.semiBold,
    color: Colors.black,
  },
  viewsContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: 13,
  },
  priceContainer: {
    flexDirection: "row",
    marginLeft: 15,
  },
  priceText: {
    alignSelf: "center",
    marginTop: 5,
    fontSize: FontSizes.small,
    fontFamily: FontFamily.semiBold,
    color: Colors.third,
  },
  rateText: {
    alignSelf: "center",
    fontSize: FontSizes.small,
    fontFamily: FontFamily.semiBold,
    color: Colors.white,
  },
  rateView: {
    height: 30,
    width: 30,
    padding: 3,
    alignSelf: "center",
    backgroundColor: "#56BA6A",
    borderRadius: 5,
  },
  viewText: {
    alignSelf: "center",
    marginLeft: 10,
    marginTop: 5,
    fontSize: FontSizes.small,
    fontFamily: FontFamily.semiBold,
    color: Colors.grey,
  },
  discountPrice: {
    alignSelf: "center",
    marginTop: 5,
    fontSize: FontSizes.small,
    fontFamily: FontFamily.semiBold,
    textDecorationLine: "line-through",
    textDecorationColor: "grey",
    color: Colors.grey,
  },
  rupees: {
    alignSelf: "center",
  },
});
