import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as VideoThumbnails from "expo-video-thumbnails";
import Screen from "../../components/Screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FontFamily, FontSizes, Spaces } from "../../config/font";
import { Video } from "expo-av";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import Colors from "../../config/Colors";
import VideoBottomSection from "../../components/ViewProfileComponent/VideoBottomSection";
import { postList, productShowed } from "../../components/MockData/mockData";
import HorizontalDivider from "../../components/HorizontalDivider";
import PhotoCard from "../../components/PhotoCard";
import VideoDescriptionComponent from "../../components/ViewProfileComponent/VideoDescriptionComponent";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const VideoDetailsScreen = ({ navigation, route }) => {
  const { data, id, prev } = route.params;
  const player = useRef(null);
  const [image, setImage] = useState(null);
  const [list, setList] = useState(postList);
  const [bottomModal, setBottomModal] = useState(false);
  const [status, setStatus] = useState({});
  const [description, setDescription] = useState(false);
  const generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        {
          time: 15000,
        }
      );
      setImage(uri);
      console.log("iamge", image);
    } catch (e) {
      console.warn(e);
    }
  };
  // console.log("data", id);
  useEffect(() => {
    if (image == null) {
      generateThumbnail();
    } else {
      null;
    }
  }, []);
  return (
    <Screen style={styles.container}>
      <ScrollView>
        {/* Video section */}
        <Video
          ref={player}
          style={styles.videoContainer}
          source={{
            uri: data.video
              ? data.video
              : "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          useNativeControls
          resizeMode="cover"
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <TouchableOpacity
          onPress={() => {
            if (prev == "HomeScreen") {
              navigation.navigate("BottomTab", {
                screen: "HomeScreen",
              });
            } else {
              navigation.goBack();
            }
          }}
          style={styles.backIcon}
        >
          <AntDesign name="left" size={24} color={Colors.white} />
        </TouchableOpacity>
        {description ? (
          <VideoDescriptionComponent
            contentTitle={data.title ? data.title : "Demo Title"}
            descriptionModal={() => setDescription(false)}
            data={data}
          />
        ) : (
          <VideoBottomSection
            contentTitle={data.title ? data.title : "Demo Title"}
            views={"90.4K"}
            duration={"1 week ago"}
            descriptionModal={() => setDescription(true)}
            data={data}
            user_id={id}
          />
        )}
        {/* product showed section */}
        <View style={styles.productView}>
          <Text style={styles.productText}>Product in this Video</Text>
          <Text style={styles.viewAllText}>View all</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {productShowed.map((i) => {
            return (
              <View style={styles.productContainer}>
                <View>
                  <Image source={i?.image} style={styles.productImage} />
                </View>
                <View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.title}>{i?.name}</Text>
                  </View>
                  {/* views section */}
                  <View style={styles.viewsContainer}>
                    <View style={styles.rateView}>
                      <Text style={styles.rateText}>{i?.star}</Text>
                    </View>
                    <Text style={styles.viewText}>{i?.reviews} Views</Text>
                  </View>
                  {/* price section */}
                  <View style={styles.priceContainer}>
                    <FontAwesome
                      name="rupee"
                      size={18}
                      color={Colors.third}
                      style={styles.rupees}
                    />
                    <Text style={styles.priceText}>
                      {"\b"}
                      {i?.discountedPrice}
                      {"\b\b\b"}
                    </Text>
                    <FontAwesome
                      name="rupee"
                      size={18}
                      color={Colors.grey}
                      style={styles.rupees}
                    />
                    <Text style={styles.discountPrice}>
                      {"\b"}
                      {i?.originalPrice}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
        {/* about section */}
        <HorizontalDivider />
        <View style={styles.profileSection}>
          <View>
            <Image
              source={require("../../../assets/images/person4.png")}
              style={styles.profileImage}
            />
          </View>
          <View style={{ alignSelf: "center", width: "40%" }}>
            <Text style={styles.nameText}>MKBHD</Text>
            <Text style={styles.followerText}>50K Followers</Text>
          </View>
          <TouchableOpacity onPress={() => {}} style={styles.followButton}>
            <Image
              source={require("../../../assets/images/follow.png")}
              style={styles.follow}
            />
            <Text style={styles.followText}>Follow</Text>
          </TouchableOpacity>
        </View>
        <HorizontalDivider />
        {/* comments sections */}
        <View style={styles.commentContainer}>
          <View style={styles.commentInnerContent}>
            <Text style={styles.commentHeaderText}>Comments</Text>
            <Text style={styles.commentCountText}>2.34K</Text>
            <TouchableOpacity>
              <AntDesign name="up" size={14} color={Colors.third} />
              <AntDesign name="down" size={14} color={Colors.third} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: windowWidth / 1,
              alignSelf: "center",
              marginLeft: "6%",
            }}
            onPress={() =>
              navigation.navigate("CommentScreen", { data: postList[0] })
            }
          >
            <Image
              source={require("../../../assets/images/person4.png")}
              style={[
                styles.profileImage,
                { height: 60, width: 60, marginLeft: 5 },
              ]}
            />
            <Text
              style={[
                styles.nameText,
                {
                  flexWrap: "wrap",
                  fontSize: FontSizes.small,
                  fontFamily: FontFamily.medium,
                  alignSelf: "center",
                  marginTop: "5%",
                  width: "73%",
                },
              ]}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </Text>
          </TouchableOpacity>
        </View>
        {/* suggested videos section */}
        <View>
          <Text
            style={[
              styles.commentHeaderText,
              { alignSelf: "flex-start", marginLeft: "7%", width: "60%" },
            ]}
          >
            Suggested Videos
          </Text>
          {list.map((itm, indx) => (
            <View style={{ width: "100%", alignItems: "center" }} key={indx}>
              <PhotoCard
                style={{ marginTop: RFPercentage(3) }}
                profileImage={itm.profileImage}
                mainImage={itm.mainImage}
                title={itm.title}
                subtitle={itm.subtitle}
                likes={itm.likes}
                dislikes={itm.dislikes}
                add={itm.add}
                content={itm.content}
                navigation={navigation}
                poll={false}
                pollContent={itm.pollContent}
                review={false}
                video={false}
                views={true}
                post={false}
                hashTag={false}
                setBottomModalVisible={setBottomModal}
                modalVisible={bottomModal}
                watched={false}
                data={itm}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
};

export default VideoDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth / 1,
    backgroundColor: Colors.purewhite,
  },
  topContainer: {
    alignSelf: "center",
  },
  backIcon: {
    position: "absolute",
    top: 15,
    left: 15,
    bottom: 0,
  },
  pauseButton: {
    position: "absolute",
    alignSelf: "center",
  },
  videoContainer: {
    alignSelf: "center",
    width: windowWidth / 1,
    height: windowHeight / 3.45,
  },
  image: {
    height: 100,
    width: 100,
  },
  productView: {
    width: windowWidth / 1,
    marginTop: "8%",
    marginLeft: "5%",
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  productText: {
    width: "75%",
    fontSize: FontSizes.regular,
    fontFamily: FontFamily.semiBold,
    color: Colors.black,
  },
  viewAllText: {
    alignSelf: "center",
    fontSize: FontSizes.small,
    fontFamily: FontFamily.medium,
    color: Colors.third,
  },
  productImage: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: windowHeight / 5,
    width: windowWidth / 2.8,
  },
  productContainer: {
    flexDirection: "row",
    alignSelf: "center",
    width: windowWidth / 1.1,
    height: windowHeight / 5,
    margin: 10,
    borderColor: "#E3E3E3",
    borderWidth: 1,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  nameContainer: {
    marginLeft: 10,
    marginTop: 10,
    flexWrap: "wrap",
  },
  title: {
    alignSelf: "flex-start",
    width: "60%",
    fontSize: FontSizes.regular,
    fontFamily: FontFamily.semiBold,
    color: Colors.black,
  },
  viewsContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: 13,
  },
  priceContainer: {
    flexDirection: "row",
    marginLeft: 15,
  },
  priceText: {
    alignSelf: "center",
    marginTop: 5,
    fontSize: FontSizes.small,
    fontFamily: FontFamily.semiBold,
    color: Colors.third,
  },
  rateText: {
    alignSelf: "center",
    fontSize: FontSizes.small,
    fontFamily: FontFamily.semiBold,
    color: Colors.white,
  },
  rateView: {
    height: 30,
    width: 30,
    padding: 3,
    alignSelf: "center",
    backgroundColor: "#56BA6A",
    borderRadius: 5,
  },
  viewText: {
    alignSelf: "center",
    marginLeft: 10,
    marginTop: 5,
    fontSize: FontSizes.small,
    fontFamily: FontFamily.semiBold,
    color: Colors.grey,
  },
  discountPrice: {
    alignSelf: "center",
    marginTop: 5,
    fontSize: FontSizes.small,
    fontFamily: FontFamily.semiBold,
    textDecorationLine: "line-through",
    textDecorationColor: "grey",
    color: Colors.grey,
  },
  rupees: {
    alignSelf: "center",
  },
  profileSection: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 5,
  },
  profileImage: {
    alignSelf: "flex-start",
    margin: "5%",
    height: 80,
    width: 80,
    borderRadius: 100 / 2,
  },
  nameView: {
    alignSelf: "center",
    margin: "5%",
  },
  nameText: {
    alignSelf: "flex-start",
    color: Colors.black,
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.regular,
  },
  followerText: {
    alignSelf: "flex-start",
    color: Colors.lightgrey,
    fontFamily: FontFamily.medium,
    fontSize: FontSizes.smaller,
  },
  followText: {
    alignSelf: "center",
    marginTop: 4,
    color: Colors.white,
    fontFamily: FontFamily.medium,
    fontSize: FontSizes.small,
  },
  followButton: {
    alignSelf: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 5,
    backgroundColor: Colors.third,
  },
  follow: {
    alignSelf: "center",
    height: 28,
    width: 28,
  },
  commentContainer: {
    margin: "6%",
  },
  commentHeaderText: {
    alignSelf: "center",
    color: Colors.black,
    width: "40%",
    fontFamily: FontFamily.semiBold,
    fontSize: FontSizes.regular,
  },
  commentCountText: {
    alignSelf: "center",
    textAlign: "left",
    width: "45%",
    color: Colors.grey,
    fontFamily: FontFamily.medium,
    fontSize: FontSizes.regular,
  },
  commentInnerContent: {
    alignSelf: "flex-start",
    flexDirection: "row",
    width: windowWidth / 1,
  },
});
