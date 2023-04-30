import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import BottomModal from "../components/BottomModal";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../config/Colors";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FontFamily, FontSizes } from "../config/font";

export default function AddScreen({ props }) {
  const [bottomModal, setBottomModal] = React.useState(false);
  const [bottomSubj, setBottomSubj] = React.useState("");

  const bottomList = [
    {
      id: 1,
      imageSource: require("../../assets/images/status.png"),
      text: "Status",
    },
    {
      id: 2,
      imageSource: require("../../assets/images/photo.png"),
      text: "Photo",
    },
    {
      id: 3,
      imageSource: require("../../assets/images/video.png"),
      text: "Video",
    },
    {
      id: 4,
      imageSource: require("../../assets/images/review.png"),
      text: "Review",
    },
    {
      id: 5,
      imageSource: require("../../assets/images/poll.png"),
      text: "Poll",
    },
  ];
  const handlePress = (itm) => {
    // console.log(props);
    switch (itm.text) {
      case "Status":
        // console.log("fdsg");
        {
          setBottomModal(!bottomModal);
          props.navigation.navigate("NewPostMainScreen", {
            screen: "StatusShareScreen",
          });
        }

        break;
      case "Photo":
        {
          setBottomModal(!bottomModal);
          props.navigation.navigate("NewPostMainScreen", {
            screen: "PhotoShareScreen",
          });
        }
        break;
      case "Video":
        {
          setBottomModal(!bottomModal);
          props.navigation.navigate("NewPostMainScreen", {
            screen: "VideoShareScreen",
          });
        }
        break;
      case "Review":
        {
          setBottomModal(!bottomModal);
          props.navigation.navigate("NewPostMainScreen", {
            screen: "ReviewShareScreen",
          });
        }
        break;
      case "Poll":
        {
          setBottomModal(!bottomModal);
          props.navigation.navigate("NewPostMainScreen", {
            screen: "PollShareScreen",
          });
        }
        break;
      default:
        break;
    }
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setBottomModal(!bottomModal);
        }}
        style={styles.activeIcon}
      >
        <Ionicons name="add-circle-outline" size={35} color={Colors.third} />
      </TouchableOpacity>

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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: FontFamily.medium,
                color: Colors.black,
                fontSize: FontSizes.large,
              }}
            >
              Upload New Post
            </Text>
            <TouchableOpacity
              onPress={() => setBottomModal(!bottomModal)}
              style={{}}
            >
              <Ionicons name="close-outline" color={Colors.blacki} size={30} />
            </TouchableOpacity>
          </View>
          {bottomList.map((itm, indx) => (
            <TouchableOpacity
              key={indx}
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "70%",
                marginLeft: RFPercentage(-2.5),
              }}
              onPress={() => {
                handlePress(itm);
              }}
            >
              <Image
                style={{
                  width: RFPercentage(10),
                  height: RFPercentage(10),
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
    </View>
  );
}
const styles = StyleSheet.create({
  activeIcon: {
    width: RFPercentage(6),
    height: RFPercentage(6),
    backgroundColor: Colors.purewhite,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFPercentage(1.5),
  },
});
