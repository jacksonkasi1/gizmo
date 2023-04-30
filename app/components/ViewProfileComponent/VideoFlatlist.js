import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FontFamily, FontSizes } from "../../config/font";
import Colors from "../../config/Colors";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { postList } from "../MockData/mockData";
import PhotoCard from "../PhotoCard";
import { RFPercentage } from "react-native-responsive-fontsize";
import BottomModal from "../../components/BottomModal";
import moment from "moment";

const VideoFlatlist = ({ data, section, screenName, screen, user_id }) => {
  const navigation = useNavigation();
  const [list, setList] = useState(postList);
  const [bottomModal, setBottomModal] = useState(false);
  const [bottomModal2, setBottomModal2] = useState(false);
  const [bottomModal3, setBottomModal3] = useState(false);
  const [bottomModal4, setBottomModal4] = useState(false);
  // console.log("datayyyyyyyyyyyyiii", data)
  let today = moment().format("DD/MM/YYYY");
  let yesterday = moment().subtract(0, "days").format("DD/MM/YYYY");
  const bottomList = [
    {
      id: 1,
      imageSource: require("../../../assets/images/delete.png"),
      text: "Remove from like videos",
    },
    {
      id: 2,
      imageSource: require("../../../assets/images/reporticon.png"),
      text: "Report",
    },
  ];
  const bottomListSaved = [
    {
      id: 1,
      imageSource: require("../../../assets/images/delete.png"),
      text: "Remove from saved videos",
    },
    {
      id: 2,
      imageSource: require("../../../assets/images/reporticon.png"),
      text: "Report",
    },
  ];
  const bottomListWatch = [
    {
      id: 1,
      imageSource: require("../../../assets/images/delete.png"),
      text: "Remove from Watch History",
    },
    {
      id: 2,
      imageSource: require("../../../assets/images/reporticon.png"),
      text: "Report",
    },
  ];
  const more = (name) => {
    if (screen === "Like") {
      if (name == "Remove") {
        console.log("removed like");
      } else {
        console.log("reported like");
      }
    } else if (screen === "Saved") {
      if (name == "Remove") {
        console.log("removed saved");
      } else {
        console.log("reported saved");
      }
    } else {
      if (name == "Remove") {
        console.log("removed saved");
      } else {
        console.log("reported saved");
      }
    }
    // console.log("first")
  };
  const handlePress = (itm) => {
    if (screen === "Like") {
      switch (itm.text) {
        case "Remove from like videos":
          {
            setBottomModal2(!bottomModal2);
            more("Remove");
          }

          break;
        case "Report":
          {
            setBottomModal2(!bottomModal2);
            more("Report");
          }
          break;
        default:
          break;
      }
    } else if (screen === "Saved") {
      switch (itm.text) {
        case "Remove from saved videos":
          {
            setBottomModal3(!bottomModal3);
            more("Remove", screen);
          }

          break;
        case "Report":
          {
            setBottomModal3(!bottomModal3);
            more("Report", screen);
          }
          break;
        default:
          break;
      }
    } else {
      switch (itm.text) {
        case "Remove from Watch History":
          {
            setBottomModal4(!bottomModal4);
            more("Remove", screen);
          }
          break;
        case "Report":
          {
            setBottomModal4(!bottomModal4);
            more("Report", screen);
          }
          break;
        default:
          break;
      }
    }
  };
  return (
    <View style={styles.container}>
      {/* Video Section */}
      {section === "Video" ? (
        <>
          {screen === "WatchHistory" ? (
            <>
              <TouchableOpacity
                style={styles.container}
                onPress={() =>
                  navigation.navigate("VideoDetailsScreen", {
                    data: data,
                    id: user_id,
                    prev: "WatchHistory",
                  })
                }
              >
                <View style={{ flexDirection: "row" }}>
                  <ImageBackground
                    source={{
                      uri: data?.thumbnail
                        ? data?.thumbnail[0]?.file
                        : "https://cdn.thewirecutter.com/wp-content/media/2022/07/laptop-under-500-2048px-acer-1.jpg",
                    }}
                    style={styles.image}
                  >
                    <Text style={styles.bottomText}>
                      {data.videoTime ? data.videoTime : "5:45"}
                    </Text>
                  </ImageBackground>
                  <View style={{ marginLeft: "3%", width: "53%" }}>
                    <Text style={styles.description}>
                      {data.description
                        ? data.description
                        : "Demo Description | Title Watch History"}
                    </Text>
                    <Text style={styles.text}>
                      {data.views ? data.views : "4.3k"}
                      {"\b"}Views{"\b\u2022\b"}
                      {data.hoursAgo ? data.hoursAgo : "1h"}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      screenName == "ProfileDetails"
                        ? null
                        : screen === "Like"
                        ? setBottomModal2(true)
                        : screen === "Saved"
                        ? setBottomModal3(true)
                        : setBottomModal4(true);
                    }}
                  >
                    <Feather
                      name="more-vertical"
                      size={24}
                      color={Colors.darkGrey}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                navigation.navigate("VideoDetailsScreen", {
                  data: data,
                  id: user_id,
                  prev: "ViewProfileMain",
                })
              }
            >
              <View style={{ flexDirection: "row" }}>
                <ImageBackground
                  source={{
                    uri: data?.thumbnail
                      ? data?.thumbnail[0]?.file
                      : "https://cdn.thewirecutter.com/wp-content/media/2022/07/laptop-under-500-2048px-acer-1.jpg",
                  }}
                  style={styles.image}
                >
                  <Text style={styles.bottomText}>
                    {data.videoTime ? data.videoTime : "5:45"}
                  </Text>
                </ImageBackground>
                <View style={{ marginLeft: "3%", width: "53%" }}>
                  <Text style={styles.description}>
                    {data.description
                      ? data.description
                      : "Demo Description | Title"}
                  </Text>
                  <Text style={styles.text}>
                    {data.views ? data.views : "4.3k"}
                    {"\b"}Views{"\b\u2022\b"}
                    {data.hoursAgo ? data.hoursAgo : "1h"}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    screenName == "ProfileDetails"
                      ? null
                      : screen === "Like"
                      ? setBottomModal2(true)
                      : setBottomModal3(true);
                  }}
                >
                  <Feather
                    name="more-vertical"
                    size={24}
                    color={Colors.darkGrey}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        </>
      ) : null}
      {/* Status Section */}
      {section === "Status" ? (
        <>
            <View style={{ width: "100%", alignItems: "center" }}>
              <PhotoCard
                style={{
                  marginTop: RFPercentage(1),
                  width: windowW / 1.1,
                  borderColor: "#f4f4f4",
                  borderWidth: 1,
                }}
                profileImage={data.profileImage}
                mainImage={null}
                title={data.title?data?.title:'Jhon Doe'}
                subtitle={data.subtitle}
                likes={data.likes.length}
                dislikes={data.dislikes.length}
                add={data.add}
                contentDescription={data.status}
                content={data.hashtag
                  ? data.hashtag.map((i) => (i.includes("#") ? i : `#${i}`))
                  : "#hashtag"}
                navigation={navigation}
                poll={false}
                pollContent={data.pollContent}
                review={false}
                video={false}
                views={false}
                post={false}
                hashTag={true}
                setBottomModalVisible={setBottomModal}
                modalVisible={bottomModal}
                watched={false}
                data={data}
              />
            </View>
        </>
      ) : null}
      {/* Review section */}
      {section === "Review" ? (
        <>
            <View style={{ width: "100%", alignItems: "center" }}>
              <PhotoCard
                style={{
                  marginTop: RFPercentage(1),
                  width: windowW / 1.1,
                  borderColor: "#f4f4f4",
                  borderWidth: 1,
                }}
                profileImage={data.profileImage}
                mainImage={{uri:data.image}}
                title={data.title}
                subtitle={data.subtitle}
                likes={data.likes.length}
                dislikes={data.dislikes.length}
                add={data.add}
                contentDescription={data.description}
                content={data.hashtag
                  ? data.hashtag.map((i) => (i.includes("#") ? i : `#${i}`))
                  : "#hashtag"}
                navigation={navigation}
                poll={false}
                pollContent={data.pollContent}
                review={true}
                video={false}
                views={true}
                post={false}
                hashTag={true}
                setBottomModalVisible={setBottomModal}
                modalVisible={bottomModal}
                watched={false}
                data={data}
              />
            </View>
        </>
      ) : null}
      {/* poll section  */}
      {section === "Poll" ? (
        <>
          <View style={{ width: "100%", alignItems: "center" }}>
            <PhotoCard
              style={{
                marginTop: RFPercentage(1),
                width: windowW / 1.1,
                borderColor: "#f4f4f4",
                borderWidth: 1,
              }}
              profileImage={data.profileImage}
              mainImage={null}
              title={data.title?data.title:'Jhon Doe'}
              subtitle={data.subtitle}
              likes={data.likes.length}
              dislikes={data.dislikes.length}
              add={data.add}
              contentDescription={data.question}
              content={data.hashtag
                ? data.hashtag.map((i) => (i.includes("#") ? i : `#${i}`))
                : "#hashtag"}
              navigation={navigation}
              poll={true}
              pollContent={data.options}
              review={false}
              video={false}
              views={false}
              post={false}
              hashTag={true}
              setBottomModalVisible={setBottomModal}
              modalVisible={bottomModal}
              watched={false}
              data={data}
            />
          </View>
        </>
      ) : null}
      {section === "VideoAnother" ? (
        <>
          <View style={{ width: "100%", alignItems: "center" }}>
            <PhotoCard
              style={{
                marginTop: RFPercentage(1),
                width: windowW / 1.1,
                borderColor: "#f4f4f4",
                borderWidth: 1,
              }}
              profileImage={data.profileImage}
              mainImage={data.mainImage}
              title={data.title}
              subtitle={data.subtitle}
              likes={data.likes}
              dislikes={data.dislikes}
              add={data.add}
              content={data.content}
              navigation={navigation}
              poll={false}
              pollContent={data.pollContent}
              review={false}
              video={false}
              views={true}
              post={false}
              hashTag={false}
              setBottomModalVisible={setBottomModal}
              modalVisible={bottomModal}
              watched={false}
              data={data}
            />
          </View>
        </>
      ) : null}
      {section === "Posts" ? (
        <>
          <View style={{ width: "100%", alignItems: "center" }}>
            <PhotoCard
              style={{
                marginTop: RFPercentage(1),
                width: windowW / 1.1,
                borderColor: "#f4f4f4",
                borderWidth: 1,
              }}
              profileImage={data.profileImage}
              mainImage={data.mainImage}
              title={data.title}
              subtitle={data.subtitle}
              likes={data.likes}
              dislikes={data.dislikes}
              add={data.add}
              contentDescription={data.content}
              // content={data.}
              navigation={navigation}
              poll={true}
              pollContent={data.pollContent}
              review={data.review}
              video={data.video}
              views={data.view}
              post={data.post}
              hashTag={true}
              setBottomModalVisible={setBottomModal}
              modalVisible={bottomModal}
              watched={data.watched}
              shoppingicon={false}
              data={data}
            />
          </View>
        </>
      ) : null}
      <BottomModal
        modalVisible={
          screen == "Like"
            ? bottomModal2
            : screen == "Saved"
            ? bottomModal3
            : bottomModal4
        }
        setBottomModalVisible={() => {
          screen === "Like"
            ? setBottomModal2()
            : screen == "Saved"
            ? setBottomModal3()
            : setBottomModal4();
        }}
      >
        <View
          style={{
            marginTop: RFPercentage(1),
            alignSelf: "flex-start",
          }}
        >
          {screen === "Like" ? (
            <>
              {bottomList.map((itm, indx) => {
                return (
                  <TouchableOpacity
                    key={indx}
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      width: "80%",
                      padding: 15,
                      marginLeft: RFPercentage(-2.5),
                    }}
                    onPress={() => {
                      handlePress(itm, screen);
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
                );
              })}
            </>
          ) : (
            <>
              {screen === "Saved" ? (
                <>
                  {bottomListSaved.map((itm, indx) => (
                    <TouchableOpacity
                      key={indx}
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        width: "80%",
                        padding: 15,
                        marginLeft: RFPercentage(-2.5),
                      }}
                      onPress={() => {
                        handlePress(itm, screen);
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
                </>
              ) : (
                <>
                  {bottomListWatch.map((itm, indx) => (
                    <TouchableOpacity
                      key={indx}
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        width: "80%",
                        padding: 15,
                        marginLeft: RFPercentage(-2.5),
                      }}
                      onPress={() => {
                        handlePress(itm, screen);
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
                </>
              )}
            </>
          )}
        </View>
      </BottomModal>
    </View>
  );
};

export default VideoFlatlist;
const windowW = Dimensions.get("window").width;
const windowH = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    margin: "2%",
    padding: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    alignSelf: "center",
  },
  image: {
    height: 100,
    width: 130,
    // backgroundColor: 'red',
    borderRadius: 10,
  },
  description: {
    fontFamily: FontFamily.semiBold,
    color: Colors.black,
    fontSize: FontSizes.small,
  },
  text: {
    fontFamily: FontFamily.medium,
    color: Colors.darkGrey,
    fontSize: FontSizes.smaller,
  },
  bottomText: {
    position: "absolute",
    bottom: 0,
    padding: 5,
    margin: "1%",
    right: 0,
    backgroundColor: "#000",
    color: "#fff",
  },
});
