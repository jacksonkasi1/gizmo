import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
  ImageBackground,
  ScrollView,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

//Components
import Screen from "../components/Screen";

//config
import Colors from "../config/Colors";
import { FontFamily, FontSizes, Spaces } from "../config/font";
import NotificationList from "../components/NotificationList";
const categoryList = [
  {
    //Fix Me:
    id: 1,
    title: "All",
  },
  {
    //Fix Me:
    id: 2,
    title: "Following",
  },
  {
    //Fix Me:
    id: 3,
    title: "Mentions",
  },
];
const notiFyList = [
  {
    id: 1,
    image: require("../../assets/images/person5.png"),
    details: "Tamaru maru and  Like your status post",
    time: "22min ago",
    day: "today",
  },
  {
    id: 1,
    image: require("../../assets/images/person2.png"),
    details: "Tamaru maru and  Like your status post",
    time: "22min ago",
    day: "today",
  },
  {
    id: 1,
    image: require("../../assets/images/person3.png"),
    details: "Tamaru maru and  Like your status post",
    time: "22min ago",
    day: "today",
  },
  {
    id: 1,
    image: require("../../assets/images/person5.png"),
    details: "Tamaru maru and  Like your status post",
    time: "1 week ago",
    day: "week",
  },
  {
    id: 1,
    image: require("../../assets/images/person4.png"),
    details: "Tamaru maru and  Like your status post",
    time: "1 week ago",
    day: "week",
  },
  {
    id: 1,
    image: require("../../assets/images/person1.png"),
    details: "Tamaru maru and  Like your status post",
    time: "2 month ago",
    day: "month",
  },
  {
    id: 1,
    image: require("../../assets/images/person2.png"),
    details: "Tamaru maru and  Like your status post",
    time: "2 month ago",
    day: "month",
  },
  ,
  {
    id: 1,
    image: require("../../assets/images/person4.png"),
    details: "Tamaru maru and  Like your status post",
    time: "1 year ago",
    day: "earlier",
  },
  {
    id: 1,
    image: require("../../assets/images/person5.png"),
    details: "Tamaru maru and  Like your status post",
    time: "1 year ago",
    day: "earlier",
  },
];
export default function NotificationScreen() {
  const [menuid, setmenuid] = useState(1);

  return (
    <Screen style={styles.screen}>
      {/* flatlist Card selection */}

      <Text
        style={{
          fontFamily: FontFamily.semiBold,
          fontSize: FontSizes.large,
          marginVertical: Spaces.small,
        }}
      >
        Notifications
      </Text>
      {/* Top Menu */}
      <FlatList
        scrollEnabled={false}
        contentContainerStyle={{
          width: "90%",
          justifyContent: "flex-start",
        }}
        style={{ marginTop: RFPercentage(2), flexGrow: 0 }}
        data={categoryList}
        keyExtractor={(categoryList) => categoryList.id.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setmenuid(item.id);
            }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: RFPercentage(1.9),
              height: RFPercentage(6.2),
              borderRadius: RFPercentage(3),
              backgroundColor: menuid === item.id ? Colors.third : Colors.white,
              borderColor: Colors.third,
              borderWidth: RFPercentage(0.3),
              marginHorizontal: Spaces.smaller,
              marginBottom: Spaces.small,
            }}
          >
            <Text
              style={{
                fontSize: FontSizes.small,
                fontFamily: FontFamily.regular,
                fontWeight: "500",
                color: menuid === item.id ? Colors.white : Colors.third,
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          backgroundColor: Colors.purewhite,
        }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        <NotificationList data={notiFyList} />
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
