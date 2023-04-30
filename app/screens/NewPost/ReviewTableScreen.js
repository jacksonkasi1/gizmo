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
import { colors } from "react-native-swiper-flatlist/src/themes";
//const
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ReviewTableScreen(props) {
  const [avgRate, setAvgRate] = useState(0);
  const { data,formData } = props.route.params;
  let tmp = 0;
  data?.map((itm) => (tmp = tmp + itm.rating));
  useEffect(() => {
    setAvgRate((tmp / data?.length).toFixed(2));
  }, []);
  return (
    <Screen style={styles.screen}>
      {/* headerComponent */}
      <MainHeader
        prevScreen="NewPostMainScreen"
        bottmTabScreen={false}
        title="Apple 13 pro"
        navigation={props.navigation}
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
            borderColor: Colors.lightplaceholder,
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
              backgroundColor: colors.lightPlaceHolder,
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
                color: Colors.purewhite,
                marginLeft: Spaces.medium,
              }}
            >
              {avgRate}
            </Text>
          </View>
        </View>

        <Text
          style={{
            alignSelf: "flex-start",
            marginVertical: Spaces.small,
            fontFamily: FontFamily.regular,
            fontSize: FontSizes.regular,
          }}
        >
          Details Ratings
        </Text>

        {/* Details Score Table */}

        {data.map((itm, indx) => (
          <View
            key={indx}
            style={{
              flexDirection: "row",
              width: "100%",
              borderWidth: 1,
              borderBottomWidth: 0.5,
              borderColor: Colors.lightPlaceHolder,
              borderTopRadius: Spaces.smaller,
              borderBottomEndRadius: 0,
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 6,
              }}
            >
              <Text
                style={{
                  fontFamily: FontFamily.medium,
                  fontSize: RFPercentage(2.5),
                  color: Colors.placeholder,
                  marginLeft: Spaces.small,
                }}
              >
                {" "}
                {itm.title}
              </Text>
            </View>
            <View
              style={{
                height: RFPercentage(7),
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
                    itm.rating > 5 && itm.rating < 8
                      ? Colors.darkYellow
                      : itm.rating > 7
                      ? Colors.green
                      : "red",
                  textAlign: "center",
                  textAlignVertical: "center",
                  borderRadius: RFPercentage(1),
                  marginLeft: Spaces.medium,
                  color: Colors.purewhite,
                  fontFamily: FontFamily.medium,
                }}
              >
                {itm.rating} &#8744;
              </Text>
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
            props.navigation.navigate("ReviewDetailScreen", {
              data: data,
              formData: formData
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.purewhite,
  },
});
