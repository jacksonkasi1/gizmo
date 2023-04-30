import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import Colors from "../../config/Colors";
import { FontFamily, FontSizes } from "../../config/font";
import { AntDesign } from "@expo/vector-icons";

const BrandComponent = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{props.headerName}</Text>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.viewallText} onPress={props.viewAllNav}>View All</Text>
          <AntDesign
            name="right"
            size={16}
            color={Colors.third}
            style={styles.icon}
          />
        </View>
      </View>
      <View style={styles.flatlist}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {props?.data ? (
          <>
            {props?.data?.map((i) => {
              return (
                <View style={{flexDirection:'column'}}>
                <TouchableOpacity style={styles.itemContainer}>
                  <Image source={{uri:i?.image}} style={styles.itemImage} resizeMode="contain" />
                </TouchableOpacity>
                  <Text style={styles.brandName}>{i?.name}</Text>
                  </View>
              );
            })}
          </>
        ) : null}
        </ScrollView>
      </View>
    </View>
  );
};

export default BrandComponent;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: "5%",
  },
  header: {
    alignSelf: "flex-start",
    width: windowWidth / 1.1,
    flexDirection: "row",
    padding: 5,
    marginLeft: "5%",
    justifyContent: "space-between",
  },
  headerText: {
    marginTop: "1%",
    alignSelf: "center",
    color: Colors.black,
    fontSize: FontSizes.small,
    fontFamily: FontFamily.semiBold,
  },
  viewallText: {
    width: "41%",
    alignSelf: "flex-start",
    textAlign: "left",
    marginTop: "2%",
    color: Colors.third,
    fontSize: FontSizes.small,
    fontFamily: FontFamily.semiBold,
  },
  icon: {
    alignSelf: "center",
  },
  flatlist: {
    flexDirection: "row",
    marginLeft:10,
  },
  itemContainer: {
    backgroundColor: "#fff",
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    margin: 10,
    borderColor: Colors.third,
  },
  itemImage: {
    height: 50,
    width: 50,
    margin: 2,
  },
  brandName:{
    alignSelf:'center',
    marginTop: 5,
    color: Colors.black,
    fontSize: FontSizes.small,
    fontFamily: FontFamily.semiBold,
  }
});
