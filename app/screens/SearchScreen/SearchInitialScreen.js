import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Screen from "../../components/Screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import AllCategory from "./SearchCategory/AllCategory";
import TopCategories from "./SearchCategory/TopCategories";
import RecentlyViewed from "./SearchCategory/RecentlyViewed";
import PortableGadgets from "./SearchCategory/PortableGadgets";
import PopularCategories from "./SearchCategory/PopularCategories";
import AutoDevices from "./SearchCategory/AutoDevices";
import ComputerComponents from "./SearchCategory/ComputerComponents";
import ComputerPeripherals from "./SearchCategory/ComputerPeripherals";
import Gaming from "./SearchCategory/Gaming";
import Application from "./SearchCategory/Application";
import { FontFamily } from "../../config/font";
import { useState } from "react";

const SearchInitialScreen = () => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const categoryList = [
    "All",
    "Recently viewed",
    "Popular categories",
    "Top Categories",
    "Portable Gadgets",
    "Audio Devices",
    "Application",
    "Gaming",
    "Computer Peripherals",
    "Computer Components",
  ];
  return (
    <Screen style={styles.container}>
      <View style={[styles.searchmain]}>
        <View style={styles.innermain}>
          <Image
            style={styles.img}
            source={require("../../../assets/images/search_grey.png")}
          />
          <TextInput
            style={[styles.inputtext]}
            onChangeText={(e) => setText(e)}
            value={text}
            placeholder={"Search Videos, Creators or Products, Wishlist "}
            placeholderTextColor={"grey"}
          />
        </View>
      </View>
      <View style={styles.tabHead}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categoryList.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={styles.tabBox}
                activeOpacity={1}
                underlayColor=""
                onPress={() => {
                  setIndex(i);
                }}
              >
                <View
                  style={[
                    styles.tabButton,
                    index === i && styles.tabButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      index === i && styles.tabTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      {index === 0 && <AllCategory />}
      {index === 1 && <RecentlyViewed />}
      {index === 2 && <PopularCategories />}
      {index === 3 && <TopCategories />}
      {index === 4 && <PortableGadgets />}
      {index === 5 && <AutoDevices />}
      {index === 6 && <Application />}
      {index === 7 && <Gaming />}
      {index === 8 && <ComputerPeripherals />}
      {index === 9 && <ComputerComponents />}
    </Screen>
  );
};

export default SearchInitialScreen;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchmain: {
    width: windowWidth / 1.1,
    marginTop: "5%",
    backgroundColor: "#fef3ed",
    padding: RFPercentage(1),
    fontFamily: FontFamily.semiBold,
    borderRadius: RFPercentage(5),
    height: RFPercentage(6),
    justifyContent: "center",
    alignSelf: "center",
  },

  innermain: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: RFPercentage(2),
  },

  img: { width: RFPercentage(3), height: RFPercentage(3) },

  inputtext: {
    width: "110%",
    paddingLeft: RFPercentage(1),
    fontSize: RFPercentage(1.6),
    color: "grey",
    fontFamily: FontFamily.regular,
  },
  tabHead: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
    padding: 10,
    width: windowWidth / 1,
  },
  tabBox: {},
  tabButton: {
    borderRadius: 100 / 2,
    width: "auto",
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#EF7E46",
    backgroundColor: "#fef8f5",
    borderWidth: 1,
    marginLeft: 10,
  },
  tabButtonActive: {
    borderRadius: 100 / 2,
    width: "auto",
    height: 40,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderColor: "#EF7E46",
    borderWidth: 1,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF7E46",
  },
  tabTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  tabText: {
    color: "#EF7E46",
    fontWeight: "600",
  },
  tabContainer: {
    flex: 1,
    width: windowWidth / 1,
  },
});
