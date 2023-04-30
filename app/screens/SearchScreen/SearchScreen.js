import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Screen from "../../components/Screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../../config/Colors";
import InputIcon from "../../components/InputIcon";
import { FontFamily, FontSizes } from "../../config/font";
import SearchVideo from "./SearchVideo";
import SearchReview from "./SearchReview";
import SearchDiscover from "./SearchDiscover";
import SearchPosts from "./SearchPosts";

const SearchScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const categoryList = ["Discover", "Video", "Review", "Posts"];
  return (
    <Screen style={styles.container}>
      {/* <ScrollView> */}
      {/* top header section  */}
      <View style={{ backgroundColor: "#58CC70", alignSelf: "center" }}>
        <View style={styles.headermain}>
          <TouchableOpacity onPress={() => {}} style={styles.gridicon}>
            <Ionicons name="md-grid-outline" size={25} color={Colors.third} />
          </TouchableOpacity>
          <InputIcon
            imageSource={require("../../../assets/images/searchicon2.png")}
            title={"Search for Smart Phones"}
            onChangeLink={(e) => {
              setText(e)
            }}
            link={text}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.openDrawer()}
            style={styles.logomain}
          >
            <Image
              style={styles.profileicon}
              source={require("../../../assets/images/person1.png")}
            />
          </TouchableOpacity>
        </View>
        {/* top container below searchbar section */}
        {text.length > 0 ? null : (
          <View style={[styles.headermain, { marginTop: "6%" }]}>
            <Image
              source={require("../../../assets/images/Category-Phone-1.png")}
            />
            <Text style={styles.headerText}>Smart Phones</Text>
            <Image
              source={require("../../../assets/images/Category-Phone-2.png")}
            />
          </View>
        )}
      </View>
      {text.length > 0 ? null : (
        <>
          {/* top tabs section */}
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
          {index === 0 && <SearchDiscover />}
          {index === 1 && <SearchVideo />}
          {index === 2 && <SearchReview />}
          {index === 3 && <SearchPosts />}
        </>
      )}
      {/* </ScrollView> */}
    </Screen>
  );
};

export default SearchScreen;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gridicon: {
    alignItems: "center",
    justifyContent: "center",
    width: RFPercentage(6),
    height: RFPercentage(6),
    borderRadius: RFPercentage(4),
    backgroundColor: Colors.purewhite,
  },
  headermain: {
    width: windowWidth / 1,
    paddingHorizontal: 10,
    backgroundColor: "#58CC70",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: RFPercentage(2),
    justifyContent: "space-between",
  },
  logomain: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 5,
  },
  profileicon: {
    width: RFPercentage(7),
    height: RFPercentage(7),
  },
  headerText: {
    alignSelf: "center",
    fontSize: FontSizes.large,
    fontFamily: FontFamily.semiBold,
    color: Colors.white,
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
    width: windowWidth / 4.8,
    height: 40,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#EF7E46",
    backgroundColor: "#fef8f5",
    borderWidth: 1,
    marginLeft: 10,
  },
  tabButtonActive: {
    borderRadius: 100 / 2,
    width: windowWidth / 4.8,
    height: 40,
    padding: 5,
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
