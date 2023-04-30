import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { mobileBrand } from "../../components/MockData/mockData";
import CustomHeader from "../../components/CustomHeader";
import { FontFamily, FontSizes } from "../../config/font";
import Colors from "../../config/Colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const MobileBrands = ({ navigation,route }) => {
  const {brandName} = route.params
  return (
    <View style={styles.container}>
      {/* header Section */}
      <CustomHeader
        backButton={() => navigation.goBack()}
        headerName="Mobile Brands"
      />
      <ScrollView>
      <View style={styles.flatlist}>
        {brandName.map((i, idx) => {
          return (
            <View style={{ flexDirection: "column"}} key={idx}>
              <TouchableOpacity style={styles.itemContainer}>
                <Image
                  source={{uri:i?.image}}
                  style={styles.itemImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={styles.brandName}>{i?.name}</Text>
            </View>
          );
        })}
      </View>
      </ScrollView>
    </View>
  );
};

export default MobileBrands;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flatlist: {
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: '5%',
    marginLeft:'5%',
    marginRight:'5%'
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
    alignSelf:'center',
    height: 50,
    width: 50,
    margin: 5,
  },
  brandName: {
    alignSelf: "center",
    marginTop: 5,
    textAlign:'center',
    color: Colors.black,
    width:77,
    fontSize: FontSizes.small,
    fontFamily: FontFamily.semiBold,
  },
});
