import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../config/Colors";
import BottomModal from "../../components/BottomModal";
import { FontFamily, FontSizes } from "../../config/font";
import CustomHeader from "../../components/CustomHeader";
import ViewProfileTopContainer from "../../components/ViewProfileComponent/ViewProfileTopContainer";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import Videos from "./Videos";
import Photo from "./Photo";
import Status from "./Status";
import Review from "./Review";
import Poll from "./Poll";
import Screen from "../../components/Screen";
import { useSelector } from "react-redux";
import { selectUserId } from "../../../redux/slices/userSlice";

const items = [
  "Quality Tech Videos",
  "Geeks",
  "Youtuber",
  "Tech Head",
  "Electronics",
];
const categoryList = [
  {
    id: 1,
    title: "Videos",
  },
  {
    id: 2,
    title: "Photo",
  },
  {
    id: 3,
    title: "Status",
  },
  {
    id: 4,
    title: "Review",
  },
  {
    id: 5,
    title: "poll",
  },
];
const postList = [];

const ViewProfile = ({ route, navigation }) => {
  const [list, setList] = useState(postList);
  const { name, image, screenName } = route.params;
  const [menuid, setmenuid] = useState(1);
  const [index, setIndex] = useState(0);
  const [bottomModal, setBottomModal] = useState(false);
  const userId = useSelector(selectUserId);

  const bottomList = [
    {
      id: 1,
      imageSource: require("../../../assets/images/edit.png"),
      text: "Edit",
    },
    {
      id: 2,
      imageSource: require("../../../assets/images/delete.png"),
      text: "Delete",
    },
  ];
  const del = () => {
    console.log("deleted");
  };
  const handlePress = (itm) => {
    // console.log(props);
    switch (itm.text) {
      case "Edit":
        // console.log("fdsg");
        {
          setBottomModal(!bottomModal);
          navigation.navigate("EditProfile");
        }

        break;
      case "Delete":
        {
          setBottomModal(!bottomModal);
          del();
        }
        break;
      default:
        break;
    }
  };
  console.log(route.params);
  return (
    <Screen style={styles.container}>
      <CustomHeader
        backButton={() =>
          navigation.navigate("BottomTab", { screen: "HomeScreen" })
        }
        headerName={name}
        rightbutton={true}
        rightbuttonNavigation={() => setBottomModal(true)}
      />
      <ScrollView>
        <ViewProfileTopContainer
          profileImage={
            image ? image : require("../../../assets/images/person1.png")
          }
          name={name}
          verified={true}
          followers={"56.7K"}
          videos={"256.6K"}
          rank={"#5 Most Popular Creator 2022"}
          monthlyViewer={" 4.6M Monthly Viewers"}
          tags={items.map((i) => i.concat("|"))}
        />
        <View style={styles.horizocategory}>
          {categoryList.map((item, i) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setmenuid(item.id), setIndex(i);
              }}
              key={i}
              style={{ width: "20%", justifyContent: "center" }}
            >
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: index === i ? Colors.third : Colors.black,
                    fontSize: RFPercentage(2),
                    fontWeight: "600",
                    fontFamily: FontFamily.medium,
                  }}
                >
                  {item.title}
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: RFPercentage(0.4),
                  backgroundColor:
                    index === i ? Colors.third : Colors.lightWhite,
                  marginTop: RFPercentage(1),
                  borderRadius: RFPercentage(1),
                }}
              ></View>
            </TouchableOpacity>
          ))}
        </View>
        {index === 0 && (
          <Videos
            id={userId ? userId : null}
            data={"Video"}
            screenName={screenName}
            route={route}
          />
        )}
        {index === 1 && (
          <Photo
            id={userId ? userId : null}
            data={"Photo"}
            name={name}
            screenName={screenName}
            route={route}
          />
        )}
        {index === 2 && (
          <Status
            id={userId ? userId : null}
            data={"Status"}
            screenName={screenName}
            route={route}

          />
        )}
        {index === 3 && (
          <Review
            id={userId ? userId : null}
            data={"Review"}
            screenName={screenName}
            route={route}

          />
        )}
        {index === 4 && (
          <Poll
            id={userId ? userId : null}
            data={"Poll"}
            screenName={screenName}
            route={route}

          />
        )}
        {/* <ProfileTopTab/> */}
        <BottomModal
          modalVisible={bottomModal}
          setBottomModalVisible={setBottomModal}
        >
          <View
            style={{
              marginTop: RFPercentage(1),
              alignSelf: "flex-start",
            }}
          >
            {bottomList.map((itm, indx) => (
              <TouchableOpacity
                key={indx}
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  width: "70%",
                  padding: 20,
                  marginLeft: RFPercentage(-2.5),
                }}
                onPress={() => {
                  handlePress(itm);
                }}
              >
                <Image
                  style={{
                    width: RFPercentage(2.7),
                    height: RFPercentage(3),
                  }}
                  source={itm.imageSource}
                />
                <Text
                  style={{
                    fontFamily: FontFamily.medium,
                    textAlign: "left",
                    textAlignVertical: "center",
                    marginLeft: RFPercentage(2),
                    color: Colors.grey,
                  }}
                >
                  {itm.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </BottomModal>
      </ScrollView>
    </Screen>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  horizocategory: {
    flexDirection: "row",
    width: "100%",
    marginTop: RFPercentage(3),
  },
});
