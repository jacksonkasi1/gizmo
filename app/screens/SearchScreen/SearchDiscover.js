import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontFamily, FontSizes } from "../../config/font";
import Colors from "../../config/Colors";
import { mobileBrand, mobileFeature } from "../../components/MockData/mockData";
import BrandComponent from "../../components/SearchComponent/BrandComponent";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import RangeSlider from "../../components/RangeSlider";
import { useDispatch } from "react-redux";
import { getCategoryBrand } from "../../../redux/slices/mainSlice";

const SearchDiscover = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [brandName, setBrandName] = useState([]);
  const image = [
    require("../../../assets/images/phone1.png"),
    require("../../../assets/images/phone2.png"),
    require("../../../assets/images/phone3.png"),
    require("../../../assets/images/phone4.png"),
  ];
  const upcoming = [
    require("../../../assets/images/upcoming1.png"),
    require("../../../assets/images/upcoming2.png"),
    require("../../../assets/images/upcoming3.png"),
    require("../../../assets/images/upcoming4.png"),
  ];
  const fetchMobileBrand = () => {
    dispatch(getCategoryBrand({ category: "Mobile" }))
      .then((res) => {
        setBrandName(res.payload.data.brand_name);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    fetchMobileBrand();
  }, []);
  // console.log("resssssssssss", brandName);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.showText}>
          Find your smartphone that fits your budget
        </Text>
        <Text style={styles.rangeText}>All Range</Text>
        {/* range selector section  */}
        <RangeSlider from={4} to={3000} />
        {/* find mobiles button */}
        <TouchableOpacity
          style={styles.findMobileButton}
          onPress={() => {
            navigation.navigate("ResultScreen");
          }}
        >
          <Text style={styles.findMobileButtonText}>Find Mobiles</Text>
        </TouchableOpacity>
        {/* popular by brand section  */}
        <BrandComponent
          headerName="Find by popular Mobile Brands"
          data={brandName.slice(0,7)}
          viewAllNav={() => navigation.navigate("MobileBrand",{brandName:brandName})}
        />
        {/* popular by features section */}
        <BrandComponent
          headerName="Find by popular Mobile Feature"
          data={mobileFeature}
          viewAllNav={() => navigation.navigate("MobileFeature")}
        />
        {/* forum section */}
        <View style={styles.forumView}>
          <Text style={styles.forumText}>Forum</Text>
          <View style={styles.forumContainer}>
            <Image source={require("../../../assets/images/phone1.png")} />
            <View style={{ marginLeft: 20, alignSelf: "center", width: "50%" }}>
              <Text style={styles.forumHeaderText}>Smart Phones</Text>
              <Text style={styles.forumMemberText}>63K Members</Text>
            </View>
            <TouchableOpacity style={styles.joinButton}>
              <AntDesign
                name="plus"
                size={18}
                color={"#fff"}
                style={{ alignSelf: "center", marginRight: 5 }}
              />
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Image
          source={require("../../../assets/images/sliderpic.png")}
          style={styles.sliderPic}
          resizeMode="stretch"
        />
        <Image
          source={require("../../../assets/images/Launch1.png")}
          style={styles.sliderPic}
          resizeMode="stretch"
        />
        {/* best in 2023 section */}
        <View>
          <ImageBackground
            style={styles.imageBackground}
            source={require("../../../assets/images/searchBackground.png")}
            resizeMode="stretch"
          >
            <Text style={styles.bestText}>Best in 2023</Text>
            <Text
              style={[
                styles.bestDes,
                { fontSize: FontSizes.small, marginTop: 1, paddingVertical: 1 },
              ]}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultrices
              nisl ut dignissim vulputate nascetur turpis.
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                width: windowWidth / 1,
              }}
            >
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
              >
                {image.map((i) => {
                  return (
                    <Image
                      source={i}
                      resizeMode="contain"
                      style={styles.bestImage}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </ImageBackground>
        </View>
        {/* banner section */}
        <Image
          source={require("../../../assets/images/sliderpic.png")}
          style={styles.sliderPic}
          resizeMode="stretch"
        />
        {/* upcoming phones section */}
        <Text
          style={[styles.forumText, { marginTop: 10, paddingVertical: 10 }]}
        >
          Upcoming Phones
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignSelf: "center",
          }}
        >
          {upcoming.map((i) => {
            return (
              <TouchableOpacity>
                <Image
                  source={i}
                  resizeMode="contain"
                  style={[styles.bestImage, { height: 170, width: 170 }]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchDiscover;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  showText: {
    alignSelf: "center",
    fontSize: FontSizes.small,
    color: Colors.black,
    fontFamily: FontFamily.semiBold,
    marginTop: 15,
  },
  rangeText: {
    alignSelf: "center",
    fontSize: FontSizes.small,
    color: Colors.third,
    fontFamily: FontFamily.semiBold,
    marginTop: 15,
  },
  text: {
    fontSize: FontSizes.small,
    fontFamily: FontFamily.small,
    color: Colors.grey,
  },
  findMobileButton: {
    marginTop: 10,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: Colors.third,
    width: windowWidth / 1.1,
    padding: 5,
  },
  findMobileButtonText: {
    fontSize: FontSizes.regular,
    fontFamily: FontFamily.semiBold,
    color: Colors.white,
    alignSelf: "center",
    padding: 5,
  },
  forumView: {
    marginTop: 15,
    marginLeft: 10,
  },
  forumText: {
    alignSelf: "flex-start",
    marginLeft: 15,
    fontSize: FontSizes.small,
    color: Colors.black,
    fontFamily: FontFamily.semiBold,
  },
  forumContainer: {
    flexDirection: "row",
    elevation: 5,
    backgroundColor: "#fff",
    width: windowWidth / 1.1,
    alignSelf: "center",
    marginTop: 10,
  },
  forumHeaderText: {
    alignSelf: "flex-start",
    fontSize: FontSizes.small,
    color: Colors.black,
    fontFamily: FontFamily.semiBold,
  },
  forumMemberText: {
    alignSelf: "flex-start",
    fontSize: FontSizes.smaller,
    color: Colors.black,
    fontFamily: FontFamily.medium,
  },
  joinButton: {
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: Colors.third,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
  },
  joinButtonText: {
    alignSelf: "center",
    textAlign: "center",
    marginRight: 5,
    marginTop: 2,
    fontSize: FontSizes.small,
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  sliderPic: {
    width: windowWidth / 1,
    height: windowHeight / 3.5,
    marginTop: 13,
  },
  imageBackground: {
    height: windowHeight / 2.5,
    width: windowWidth / 1,
    marginTop: 10,
  },
  bestText: {
    alignSelf: "flex-start",
    padding: 10,
    marginTop: 10,
    fontSize: FontSizes.regular,
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  bestDes: {
    alignSelf: "flex-start",
    padding: 10,
    marginTop: 10,
    fontSize: FontSizes.regular,
    color: Colors.white,
    fontFamily: FontFamily.medium,
  },
  bestImage: {
    height: 150,
    width: 150,
    borderRadius: 10,
    marginLeft: 20,
    padding: 10,
    margin: 10,
    marginBottom: 10,
  },
});
