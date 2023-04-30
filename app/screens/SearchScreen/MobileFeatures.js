import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { mobileFeature } from "../../components/MockData/mockData";
import CustomHeader from "../../components/CustomHeader";
import { FontFamily, FontSizes } from "../../config/font";
import Colors from "../../config/Colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const MobileFeature = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* header Section */}
      <CustomHeader
        backButton={() => navigation.goBack()}
        headerName="Mobile Brands"
      />
      <View style={styles.flatlist}>
        {mobileFeature === undefined ? null : (
          <>
            {mobileFeature.map((i, idx) => {
              return (
                <View style={{ flexDirection: "column" }} key={idx}>
                  <TouchableOpacity style={styles.itemContainer}>
                    <Image
                      source={i.img}
                      style={styles.itemImage}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <Text style={styles.brandName}>{i.brand}</Text>
                </View>
              );
            })}
          </>
        )}
      </View>
    </View>
  );
};

export default MobileFeature;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flatlist: {
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  itemContainer: {
    backgroundColor: "#fff",
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    margin: 20,
    borderColor: Colors.third,
  },
  itemImage: {
    alignSelf: "center",
    height: 50,
    width: 50,
    margin: 5,
  },
  brandName: {
    alignSelf: "center",
    textAlign: "center",
    marginTop: 5,
    width: 77,
    color: Colors.black,
    fontSize: FontSizes.small,
    fontFamily: FontFamily.semiBold,
  },
});
