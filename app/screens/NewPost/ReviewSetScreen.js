import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
  Switch,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import { RFPercentage } from "react-native-responsive-fontsize";
import MainHeader from "../../components/MainHeader";
import Screen from "../../components/Screen";
import Colors from "../../config/Colors";
import { FontFamily, FontSizes, Spaces } from "../../config/font";
import { DataTable } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
//const
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ReviewSetScreen = ({props,route})=>{
  const {formData} = route.params
  const navigation = useNavigation()
  console.log("formdata", formData)
  const [avgRate, setAvgRate] = useState(0);
  const scoreList = [
    {
      title: "Display",
      rating: 0,
      review:'',
      image:null
    },
    {
      title: "Front Camera",
      rating: 0,
      review:'',
      image:null
    },
    {
      title: "Back Camera",
      rating: 0,
      review:'',
      image:null
    },
    {
      title: "Battery Performance",
      rating: 0,
      review:'',
      image:null
    },
    {
      title: "RAM",
      rating: 0,
      review:'',
      image:null
    },
    {
      title: "Core",
      rating: 0,
      review:'',
      image:null
    },
    {
      title: "Call Time",
      rating: 0,
      review:'',
      image:null
    },
    {
      title: "Sturdy",
      rating: 0,
      review:'',
      image:null
    },
    {
      title: "Screen Res",
      rating: 0,
      review:'',
      image:null
    },
  ];
  const [list, setList] = useState(scoreList);
  let tmp = 0;
  list.map((itm) => (tmp = tmp + itm.rating));
  useEffect(() => {
    setAvgRate((tmp / list.length).toFixed(2));
    // console.log(list);
  }, [list]);
  // console.log("avg", avgRate)
  // console.log("list",list)
  return (
    <Screen style={styles.screen}>
      {/* headerComponent */}
      <MainHeader
        prevScreen="NewPostMainScreen"
        bottmTabScreen={false}
        title="Apple 13 pro"
        navigation={navigation}
        param={{ screen: "ReviewShareScreen" }}
        noThirdIcon={true}
      />

      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
        style={{ width: "90%" }}
      >
        {/* Avg Score Table */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            borderWidth: 1,
            borderColor: Colors.lightPlaceHolder,
            borderRadius: Spaces.smaller,
            marginVertical: Spaces.small,
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 6,
            }}
          >
            <Text> Overall Score</Text>
          </View>
          <View
            style={{
              height: RFPercentage(6),
              backgroundColor: Colors.lightPlaceHolder,
              width: 1,
            }}
          />
          <View
            numeric
            style={{
              flex: 2,
            }}
          >
            <Text
              style={{
                width: RFPercentage(8),
                height: RFPercentage(5),
                backgroundColor:
                  avgRate > 5 && avgRate < 8
                    ? "yellow"
                    : avgRate > 7
                    ? Colors.green
                    : Colors.red,
                textAlign: "center",
                textAlignVertical: "center",
                borderRadius: RFPercentage(1),
                marginLeft: Spaces.medium,
                color: Colors.purewhite,
              }}
            >
              {avgRate}
            </Text>
          </View>
        </View>

        <Text
          style={{
            marginVertical: Spaces.small,
            fontFamily: FontFamily.regular,
            fontSize: FontSizes.regular,
          }}
        >
          Details Ratings
        </Text>

        {/* Details Score Table */}

        {scoreList.map((itm, listIndx) => (
          <View
            key={listIndx}
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                alignSelf: "flex-start",
                marginVertical: Spaces.small,
                fontFamily: FontFamily.regular,
                fontSize: FontSizes.regular,
              }}
            >
              {itm.title}
            </Text>
            <View style={{ width: "100%", flexDirection: "row" }}>
              {[...Array(10)].map((item, index) => (
                <Text
                  key={index}
                  style={{
                    width: windowWidth / 12,
                    height: RFPercentage(5),
                    backgroundColor:
                      index + 1 <= list[listIndx].rating &&
                      list[listIndx].rating > 5 &&
                      list[listIndx].rating < 8
                        ? Colors.darkYellow
                        : index + 1 <= list[listIndx].rating &&
                          list[listIndx].rating > 7
                        ? Colors.green
                        : index + 1 <= list[listIndx].rating &&
                          list[listIndx].rating < 6
                        ? Colors.red
                        : Colors.lightPlaceHolder,
                    textAlign: "center",
                    textAlignVertical: "center",
                    marginLeft: 1,
                  }}
                  onPress={() => {
                    list[listIndx] = {
                      ...itm,
                      rating: index + 1,
                    };
                    setList([...list]);
                  }}
                >
                  {index + 1}
                </Text>
              ))}
            </View>
          </View>
        ))}
        <TouchableOpacity
          style={{
            width: RFPercentage(55),
            height: RFPercentage(7),
            borderRadius: RFPercentage(1),
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.third,
            marginTop: Spaces.medium,
            marginBottom: Spaces.small,
          }}
          onPress={() => {
            navigation.navigate("ReviewTableScreen", {
              data: list,
              formData:formData
            });
          }}
        >
          <Text
            style={{
              color: Colors.purewhite,
              fontSize: RFPercentage(2.2),
              fontWeight: "700",
              fontFamily: FontFamily.semiBold,
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
}

export default ReviewSetScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.purewhite,
  },
});
