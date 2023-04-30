import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";
import { Divider } from "react-native-paper";
import { RFPercentage } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Ionicons";
//Components
import LikeSavepost from "../components/LikeSavepost";
import ProfileData from "../components/ProfileData";

//config
import Colors from "../config/Colors";
import { FontFamily, FontSizes } from "../config/font";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function PostCard({
  children,
  style,
  photo,
  videoDetails,
  profileImage,
  mainImage,
  title,
  subtitle,
  likes,
  dislikes,
  content,
  contentDescription,
  add,
  navigation,
  poll,
  pollContent,
  video,
  review,
  overallReview,
  post,
  setBottomModalVisible,
  modalVisible,
  watched,
  data,
  user_id,
  post_id,
  tabName,
  comment,
  itemCategory,
  type,
  uId,
  pId,
}) {
  const [selected, setSelected] = useState("");
  // console.log("comment", data)
  return (
    <View style={[styles.cardmain, style]}>
      <ProfileData
        image={profileImage}
        title={title}
        subtitle={subtitle}
        navigation={navigation}
        userId={user_id}
        postId={post_id}
        category={itemCategory}
        //bottomFixed Modal
        setBottomModalVisible={setBottomModalVisible}
        //success modal
        modalVisible={modalVisible}
        type={type}
      />

      {/* line */}
      <Divider style={{ width: "100%" }} />
      {/* big image */}
      {mainImage && (
        <TouchableOpacity
          onPress={() => {
            // console.log(itemCategory);
            switch (itemCategory) {
              case "Video":
                navigation.navigate("VideoDetailsScreen", {
                  data: data,
                  id: user_id,
                  prev: "HomeScreen",
                });
                break;
              case "Review":
                navigation.navigate("ReviewMain", {
                  image: profileImage,
                  title: title,
                  subtitle: subtitle,
                  data: data,
                });
                break;
              case "Status":
                // navigation.navigate("ReviewMain");
                break;
              default:
            }
          }}
          style={styles.secmainbg}
        >
          {/* image */}
          <ImageBackground
            style={styles.seccardbg}
            resizeMode="contain"
            source={
              mainImage == "require"
                ? require("../../assets/images/person1.png")
                : { uri: mainImage }
            }
          >
            {photo && (
              <>
                {/* DropBack */}
                <View style={styles.dropBack} />
                {/* View and Watch Icon */}
                <View style={styles.viewmain}>
                  <Image
                  resizeMode="contain"
                    style={styles.viewicon}
                    source={require("../../assets/images/eyeicon.png")}
                  />
                  <Text style={styles.viewtext}>2.6M</Text>
                </View>
                {videoDetails && (
                  <View style={styles.watchAgain}>
                    <Image
                      style={styles.viewicon}
                      source={require("../../assets/images/play.png")}
                    />
                    <Text style={styles.watchText}>Video Details</Text>
                  </View>
                )}
              </>
            )}
            {watched && (
              <Text
                style={{
                  color: Colors.purewhite,
                  fontFamily: FontFamily.regular,
                  position: "absolute",
                  top: RFPercentage(24),
                  left: windowWidth / 2.9,
                }}
              >
                Watch Again
              </Text>
            )}
            {/* Review Content */}
            {review && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: "25%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: FontSizes.regular,
                      color: Colors.purewhite,
                      fontFamily: FontFamily.regular,
                      textAlign: "center",
                      textAlignVertical: "center",
                      width: RFPercentage(7),
                      height: RFPercentage(5),
                      backgroundColor: Colors.olive,
                      borderRadius: RFPercentage(1),
                      marginLeft: RFPercentage(2),
                    }}
                  >
                    {overallReview}
                  </Text>
                  <Text
                    style={{
                      fontSize: FontSizes.small,
                      color: Colors.purewhite,
                      fontFamily: FontFamily.regular,
                      textAlign: "center",
                      textAlignVertical: "center",
                      borderRadius: RFPercentage(1),
                      marginLeft: RFPercentage(2),
                    }}
                  >
                    Expert Review
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: RFPercentage(1),
                  }}
                >
                  <Text
                    style={{
                      fontSize: FontSizes.small,
                      color: Colors.purewhite,
                      fontFamily: FontFamily.regular,
                      textAlign: "center",
                      textAlignVertical: "center",
                      borderRadius: RFPercentage(1),
                      marginLeft: RFPercentage(2),
                    }}
                  >
                    Detail Review
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={17}
                    color={Colors.purewhite}
                  />
                </TouchableOpacity>
              </View>
            )}
            {/* Post Content */}
            {post && (
              <TouchableOpacity
                style={{
                  width: RFPercentage(30),
                  position: "absolute",
                  bottom: RFPercentage(1),
                  left: RFPercentage(2),
                }}
              >
                <Image
                  source={require("../../assets/images/shopping.png")}
                  style={{ width: RFPercentage(8), height: RFPercentage(8) }}
                />
              </TouchableOpacity>
            )}
          </ImageBackground>
        </TouchableOpacity>
      )}

      {/* HashTags seperator .replace(/#(\w+)/g, "") */}
      <View style={styles.sectextmain}>
        <Text style={styles.seccardtext}>
          {review
            ? `${
                contentDescription.length >= 30
                  ? contentDescription.slice(0, 30)
                  : contentDescription
              }....`
            : contentDescription}
        </Text>
        <Text
          style={{
            fontSize: FontSizes.regular,
            color: Colors.primary,
            fontFamily: FontFamily.regular,
          }}
        >
          {content}
        </Text>
      </View>

      {/* Poll */}
      {poll && (
        <View
          style={{
            justifyContent: "center",
            width: "95%",
            marginTop: RFPercentage(-2),
          }}
        >
          {pollContent?.map((itm, indx) => (
            <TouchableOpacity
            onPress={() => setSelected(itm.id)}
            style={{
              flexDirection: "row",
              margin: RFPercentage(1),
              justifyContent: "space-around",
            }}
            key={indx}
            >
              {/* {console.log("poll content", itm)} */}
              <View style={{ width: "20%" }}>
                <Image
                  style={{
                    height: RFPercentage(8),
                    width: RFPercentage(8),
                    borderRadius: RFPercentage(2),
                  }}
                  source={{ uri: itm?.image_url?.url }}
                />
              </View>
              <LinearGradient
                style={{
                  width: "80%",
                  borderWidth: 0.2,
                  borderColor: Colors.lightgrey,
                  borderRadius: RFPercentage(0.6),
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: RFPercentage(1),
                }}
                colors={
                  selected == itm.id
                    ? [Colors.primary, Colors.secondary]
                    : [Colors.white, Colors.white]
                }
                start={[1, 1]}
                end={[0.2, 1.5]}
              >
                <Text
                  style={{
                    fontSize: FontSizes.small,
                    color: Colors.black,
                    fontFamily: FontFamily.regular,
                    textAlignVertical: "center",
                  }}
                >
                  {itm.title}
                </Text>
                <Text
                  style={{
                    fontSize: FontSizes.small,
                    color: Colors.black,
                    fontFamily: FontFamily.regular,
                    textAlignVertical: "center",
                  }}
                >
                  {itm.count == [] ? itm.count : "0%"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {/* line */}
      <Divider style={{ width: "100%" }} />

      {/* bottom like save unlike */}
      <View style={styles.likesavemain}>
        <LikeSavepost
          likes={likes}
          dislikes={dislikes}
          add={add}
          data={data}
          comment={comment}
          navigation={navigation}
          user_id={user_id}
          post_id={post_id}
          tabName={tabName}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardmain: {
    width: "90%",
    backgroundColor: Colors.purewhite,
    borderRadius: RFPercentage(1),
    alignItems: "center",
    elevation: 5,
  },
  forcardbg: { width: "100%", height: RFPercentage(50) },

  firstmainimg: {
    width: "100%",
    height: RFPercentage(40),
    marginBottom: RFPercentage(10),
  },
  secmainbg: { width: "100%", height: RFPercentage(40) },

  seccardbg: { width: "100%", height: RFPercentage(40) },
  sectextmain: {
    width: "90%",
    marginTop: RFPercentage(2),
    marginBottom: RFPercentage(1),
  },
  viewicon: { width: RFPercentage(2), height: RFPercentage(2) },
  viewtext: {
    fontSize: RFPercentage(1.5),
    fontWeight: "600",
    color: Colors.purewhite,
    marginLeft: RFPercentage(0.5),
    zIndex: 999,
  },
  watchText: {
    fontSize: FontSizes.smaller,
    fontFamily: FontFamily.regular,
    color: Colors.purewhite,
    marginLeft: RFPercentage(0.5),
    zIndex: 999,
  },
  dropBack: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,.3)",
    position: "absolute",
  },
  viewmain: {
    width: RFPercentage(8),
    height: RFPercentage(4),
    flexDirection: "row",
    marginLeft: RFPercentage(1),
    marginTop: RFPercentage(1),
    borderRadius: RFPercentage(1),
    backgroundColor: "rgba(0,0,0,.4)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
  },
  watchAgain: {
    width: RFPercentage(20),
    height: RFPercentage(5),
    flexDirection: "row",
    position: "absolute",
    top: RFPercentage(18),
    left: windowWidth / 3.5,
    borderRadius: RFPercentage(1),
    backgroundColor: "rgba(0,0,0,.4)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
  },
  seccardtext: {
    fontSize: FontSizes.regular,
    color: Colors.black,
    fontFamily: FontFamily.regular,
  },
  likesavemain: {
    width: "90%",
    height: RFPercentage(11),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
