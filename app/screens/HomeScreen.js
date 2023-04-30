import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
//screens

//Components
import PostCard from "../components/PostCard";
import Screen from "../components/Screen";
import CardSwiper from "../components/CardSwiper";
import ImageSelectPoint from "../components/ImageSelectPoint";

//config
import Colors from "../config/Colors";
import { FontFamily, FontSizes, Spaces } from "../config/font";
import BottomModal from "../components/BottomModal";
import { ActivityIndicator, RadioButton } from "react-native-paper";
import AppButton from "../components/AppButton";
import AppModal from "../components/AppModal";
import {
  useGetFollowVideoQuery,
  useLikeVideoMutation,
} from "../../redux/api/apiSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollowersContent,
  getUserDetails,
  selectFollowersContent,
  selectLoading,
  selectUserId,
} from "../../redux/slices/userSlice";
import {
  addReport,
  selectId,
  selectReport,
} from "../../redux/slices/mainSlice";

//3rd Party App

//const
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function HomeScreen({ navigation, route }) {
  const [menuid, setmenuid] = useState(1);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [bottomModal, setBottomModal] = React.useState(false);
  const [bottomSubj, setBottomSubj] = React.useState("");
  const [usrId, setUsrId] = useState([]);
  const [pstId, setPstId] = useState("");
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [reportOptions, setReportOptions] = useState("");
  const options = [
    {
      label: "Sexual content",
      value: "Sexual content",
    },
    {
      label: "Violent or repulsive content",
      value: "Violent or repulsive content",
    },
    {
      label: "Hateful or abusive content",
      value: "Hateful or abusive content",
    },
    { label: "Harmful or dangerous acts", value: "Harmful or dangerous acts" },
    { label: "Misinformation", value: "Misinformation" },
    { label: "Spam or misleading", value: "Spam or misleading" },
  ];
  const [value, setValue] = React.useState(options[0].value);
  // console.log(navigation);
  const categoryList = [
    {
      //Fix Me:
      id: 1,
      title: "All",
    },
    {
      //Fix Me:
      id: 2,
      title: "Videos",
    },
    {
      //Fix Me:
      id: 3,
      title: "Reviews",
    },
    {
      //Fix Me:
      id: 4,
      title: "Posts",
    },
  ];

  const bottomList = [
    {
      id: 1,
      imageSource: require("../../assets/images/sadicon.png"),
      text: "Not Interested",
    },
    {
      id: 2,
      imageSource: require("../../assets/images/xpersonicon.png"),
      text: "Unfollow",
    },
    {
      id: 3,
      imageSource: require("../../assets/images/reporticon.png"),
      text: "Report",
    },
  ];
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const loading = useSelector(selectLoading);
  const id = useSelector((state) => state?.main);
  const contents = useSelector(selectFollowersContent);
  const [list, setList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("token").then((value) => {
        dispatch(getUserDetails(value)).then((res) => {
          try {
            if (res?.payload?.success) {
              dispatch(
                getFollowersContent(res.payload.data.getParticularUser.user_id)
              ).then((res2) => {
                try {
                  if (res2.payload.success) {
                    setList([
                      ...res2.payload.data[0].users_reviews,
                      ...res2.payload.data[0].users_photos,
                      ...res2.payload.data[0].users_videos,
                      ...res2.payload.data[0].users_status,
                      ...res2.payload.data[0].users_polls,
                    ]);
                  }
                } catch (error) {
                  console.log("err", error);
                }
              });
            }
          } catch (error) {
            console.log(error);
          }
        });
      });
    }, [dispatch])
  );
  const onReport = () => {
    let form = {
      reporter_id: userId,
      post_id: id?.id[0]?.id,
      report: value,
      category: id?.id[0]?.category,
    };
    dispatch(addReport({ formData: form }));
  };
  return (
    <Screen style={styles.screen}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%",marginBottom:'15%' }}
      >
        {/* header */}
        <View style={styles.headermain}>
          <TouchableOpacity
            onPress={() => navigation.getParent("LeftDrawer").openDrawer()}
            style={styles.gridicon}
          >
            <Ionicons name="md-grid-outline" size={25} color={Colors.third} />
          </TouchableOpacity>
          <View style={styles.logomain}>
            <Image
              style={{ width: RFPercentage(25), height: RFPercentage(6) }}
              source={require("../../assets/images/main_log.png")}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.getParent("RightDrawer").openDrawer()}
            style={styles.logomain}
          >
            <Image
              style={styles.profileicon}
              source={require("../../assets/images/person1.png")}
            />
          </TouchableOpacity>
        </View>

        {/* flatlist categories */}

        <FlatList
          scrollEnabled={false}
          contentContainerStyle={{
            width: "90%",
            justifyContent: "space-between",
          }}
          style={{ marginTop: RFPercentage(5), flexGrow: 0 }}
          data={categoryList}
          keyExtractor={(categoryList) => categoryList.id.toString()}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setmenuid(item.id);
                  item.id == 1
                    ? setList([
                        ...contents[0].users_reviews,
                        ...contents[0].users_photos,
                        ...contents[0].users_videos,
                        ...contents[0].users_status,
                        ...contents[0].users_polls,
                      ])
                    : item.id == 2
                    ? setList([...contents[0].users_videos])
                    : item.id == 3
                    ? setList([...contents[0].users_reviews])
                    : //  setList(postList.filter((itm) => itm.review))
                      // flwData ? flwData.data[0].users_reviews : []
                      setList([...contents[0].users_photos]);
                  // setList([...contents[0].users_status]);
                  // setList(postList.filter((itm) => itm.post));
                  // flwData ? flwData.data[0].users_status : [];
                }}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: RFPercentage(3),
                  paddingVertical: RFPercentage(1),
                  borderRadius: RFPercentage(3),
                  backgroundColor:
                    menuid === item.id ? Colors.third : Colors.white,
                  borderColor: Colors.third,
                  borderWidth: RFPercentage(0.3),
                }}
              >
                <Text
                  style={{
                    fontSize: FontSizes.small,
                    fontFamily: FontFamily.regular,
                    fontWeight: "500",
                    color: menuid === item.id ? Colors.white : Colors.third,
                    textAlignVertical: "center",
                  }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />

        {/* card  */}

        {loading ? (
          <View style={{ marginTop: RFPercentage(35) }}>
            <ActivityIndicator color={Colors.primary} />
          </View>
        ) : (
          list?.map((itm, indx) => (
            <View style={{ width: "100%", alignItems: "center"}} key={indx}>
              {/* {console.log("itm", itm)} */}
              <PostCard
                style={{ marginTop: RFPercentage(3) }}
                profileImage={itm.profileImage}
                mainImage={
                  itm.image_url
                    ? itm.image_url
                    : itm.thumbnail
                    ? itm.thumbnail[1].file
                    : itm?.image
                    ? itm?.image
                    : null
                }
                photo={itm.image_url ? false : true}
                // title={itm?.users?.name?itm?.users?.name:itm?.title}
                title={contents[0]?.name}
                subtitle={itm.createdAt}
                likes={itm.likes.length}
                dislikes={itm.dislikes ? itm.dislikes.length : "5"}
                add={
                  itm.users_video_comments
                    ? itm.users_video_comments.length
                    : itm.users_photos_comments
                    ? itm.users_photos_comments.length
                    : itm.users_review_comments
                    ? itm.users_review_comments.length
                    : itm.users_polls_comments
                    ? itm.users_polls_comments.length
                    : itm.users_status_comments
                    ? itm.users_status_comments.length
                    : "0"
                }
                videoDetails={itm?.image ? false : true}
                contentDescription={
                  itm?.description
                    ? itm?.description
                    : itm?.question
                    ? itm?.question
                    : itm?.status
                    ? itm?.status
                    : itm?.title
                    ? itm?.title
                    : null
                }
                content={
                  itm?.hashtag
                    ? itm.hashtag.map((i) => (i.includes("#") ? i : `#${i}`))
                    : "#hashtag"
                }
                navigation={navigation}
                poll={itm?.options ? true : false}
                pollContent={itm.options ? itm?.options : itm?.pollContent}
                review={itm?.image ? true : false}
                overallReview={"9.6"}
                video={false}
                post={false}
                setBottomModalVisible={setBottomModal}
                modalVisible={bottomModal}
                watched={itm.watched}
                data={itm}
                comment={
                  itm?.users_video_comments
                    ? itm?.users_video_comments
                    : itm.users_photos_comments
                    ? itm.users_photos_comments
                    : itm.users_review_comments
                    ? itm.users_review_comments
                    : itm.users_polls_comments
                    ? itm.users_polls_comments
                    : itm.users_status_comments
                    ? itm.users_status_comments
                    : null
                }
                tabName={
                  itm?.users_video_comments
                    ? "Video"
                    : itm.users_photos_comments
                    ? "Photo"
                    : itm.users_review_comments
                    ? "Review"
                    : itm.users_polls_comments
                    ? "Polls"
                    : itm.users_status_comments
                    ? "Status"
                    : "Nothing"
                }
                itemCategory={
                  itm?.users_video_comments
                    ? "Video"
                    : itm.users_photos_comments
                    ? "Photo"
                    : itm.users_review_comments
                    ? "Review"
                    : itm.users_polls_comments
                    ? "Polls"
                    : itm.users_status_comments
                    ? "Status"
                    : "Nothing"
                }
                user_id={userId ? userId : null}
                post_id={itm.id ? itm.id : null}
                // uId={()=>usrId.push(itm.id)}
                type={
                  menuid == 2
                    ? "video"
                    : menuid == 3
                    ? "review"
                    : menuid == 4
                    ? "status"
                    : "all"
                }
              />
              {itm.swiper ? <CardSwiper /> : null}
            </View>
          ))
        )}
      </ScrollView>
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
          {bottomSubj == "" &&
            bottomList.map((itm, indx) => (
              <TouchableOpacity
                key={indx}
                style={{
                  flexDirection: "row",
                  marginVertical: RFPercentage(2.5),
                  justifyContent: "flex-start",
                  width: "70%",
                }}
                onPress={() => {
                  setBottomSubj(itm.text);
                }}
              >
                <Image
                  style={{ width: RFPercentage(5), height: RFPercentage(5) }}
                  source={itm.imageSource}
                />
                <Text
                  style={{
                    fontFamily: FontFamily.medium,
                    textAlign: "left",
                    textAlignVertical: "center",
                    marginLeft: RFPercentage(4),
                    color: Colors.grey,
                  }}
                >
                  {itm.text}
                </Text>
              </TouchableOpacity>
            ))}
          {bottomSubj == "Report" && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: FontFamily.medium,
                    color: Colors.black,
                    fontSize: FontSizes.large,
                  }}
                >
                  Report Video
                </Text>
                <TouchableOpacity
                  onPress={() => setBottomSubj("")}
                  style={{ position: "absolute", right: RFPercentage(-3) }}
                >
                  <Ionicons
                    name="close-outline"
                    color={Colors.black}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
              <RadioButton.Group
                onValueChange={(newValue) => setValue(newValue)}
                value={value}
              >
                {options.map((option, indx) => (
                  <View key={indx}>
                    <RadioButton.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      uncheckedColor={Colors.primary}
                      color={Colors.primary}
                      labelStyle={{
                        fontSize: FontSizes.small,
                        fontFamily: FontFamily.regular,
                        color: Colors.grey,
                        textAlign: "left",
                        marginLeft: RFPercentage(2),
                      }}
                      style={{
                        marginTop: RFPercentage(0.2),
                        marginLeft: -windowWidth / 18,
                      }}
                      position="leading"
                    />
                  </View>
                ))}
              </RadioButton.Group>
              <Text
                style={{
                  fontSize: FontSizes.smaller,
                  fontFamily: FontFamily.regular,
                  color: Colors.grey,
                  textAlign: "left",
                }}
              >
                If you are the copyright owner of this video and believe that it
                has been uploaded without your permission, please follow{" "}
                <Text
                  style={{
                    color: Colors.primary,
                  }}
                >
                  these directions{" "}
                </Text>{" "}
                to submit a copyright infringement notice.
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <AppButton
                  title="CANCEL"
                  bgColor={Colors.white}
                  txtColor={Colors.lightgrey}
                  btnWidth={windowWidth / 3}
                  btnFunc={() => {
                    setBottomModal(!bottomModal);
                    setBottomSubj("");
                  }}
                />
                <AppButton
                  title="REPORT"
                  bgColor={Colors.third}
                  txtColor={Colors.purewhite}
                  btnWidth={windowWidth / 3}
                  btnFunc={() => {
                    onReport();
                    setBottomModal(!bottomModal);
                    setBottomSubj("");
                    setModalVisible(!modalVisible);
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </BottomModal>
      <AppModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        style={{ justifyContent: "center" }}
      >
        <View
          style={{
            width: RFPercentage(18),
            height: RFPercentage(18),
            borderRadius: RFPercentage(9),
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.green,
          }}
        >
          <Ionicons name="checkmark" size={80} color={Colors.white} />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: RFPercentage(3),
          }}
        >
          <Text
            style={{
              fontFamily: FontFamily.medium,
              fontSize: FontSizes.large,
              color: Colors.black,
            }}
          >
            Thanks for Reporting
          </Text>
          <View style={styles.firlighttextmain}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: FontFamily.regular,
                fontSize: FontSizes.small,
                color: Colors.grey,
                marginTop: RFPercentage(2),
              }}
            >
              If we find this content to be in violation of our Community
              Guidelines, we will rewove it.
            </Text>
          </View>
        </View>

        {/* button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={{
            width: RFPercentage(20),
            height: RFPercentage(6),
            borderRadius: RFPercentage(1),
            backgroundColor: Colors.third,
            justifyContent: "center",
            alignItems: "center",
            marginTop: RFPercentage(3),
          }}
        >
          <Text style={{ color: Colors.purewhite }}>Got it</Text>
        </TouchableOpacity>
      </AppModal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  logo: {
    width: RFPercentage(17),
    height: RFPercentage(4),
  },
  profileicon: {
    width: RFPercentage(7),
    height: RFPercentage(7),
  },
  logomain: { alignItems: "center", justifyContent: "center" },
  gridicon: {
    alignItems: "center",
    justifyContent: "center",
    width: RFPercentage(6),
    height: RFPercentage(6),
    borderRadius: RFPercentage(4),
    backgroundColor: Colors.purewhite,
  },
  headermain: {
    width: "90%",
    alignItems: "center",
    flexDirection: "row",
    marginTop: RFPercentage(3),
    justifyContent: "space-between",
  },

  threetextorg: {
    fontSize: RFPercentage(2.3),
    fontWeight: "600",
    color: Colors.third,
    fontFamily: FontFamily.regular,
  },
  threecardtext: {
    fontSize: RFPercentage(2.3),
    fontFamily: FontFamily.regular,
    fontWeight: "400",
    color: Colors.black,
    lineHeight: RFPercentage(3.4),
  },

  threecardmain: {
    width: "90%",
    marginTop: RFPercentage(2),
    marginBottom: RFPercentage(2),
  },

  viewicon: { width: RFPercentage(2), height: RFPercentage(2) },

  viewmain: {
    width: RFPercentage(8),
    height: RFPercentage(4),
    flexDirection: "row",
    marginLeft: RFPercentage(1),
    marginTop: RFPercentage(1),
    opacity: 0.4,
    borderRadius: RFPercentage(1),
    backgroundColor: Colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  macbookcolor: {
    fontSize: RFPercentage(2.3),
    fontWeight: "600",
    color: Colors.third,
  },

  lasttextcont: {
    width: "90%",
    marginTop: RFPercentage(2),
    marginBottom: RFPercentage(2),
  },
  lastcardtext: {
    fontSize: RFPercentage(2.3),
    fontWeight: "600",
    color: Colors.black,
    lineHeight: RFPercentage(3),
    fontFamily: FontFamily.medium,
  },

  sololinegrad: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: RFPercentage(2),
  },

  gradsideimg: { width: RFPercentage(6), height: RFPercentage(6) },

  gradimage: {
    width: RFPercentage(6),
    height: RFPercentage(6),
    borderRadius: RFPercentage(1),
  },

  gradchoice: {
    width: "80%",
    height: RFPercentage(6),
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderWidth: RFPercentage(0.1),
    borderColor: Colors.white,
    borderRadius: RFPercentage(1),
    paddingHorizontal: RFPercentage(1.5),
  },

  percenttext: {
    fontSize: RFPercentage(2),
    fontWeight: "400",
    color: Colors.white,
    lineHeight: RFPercentage(3),
    fontFamily: FontFamily.regular,
  },
  votes: {
    fontSize: RFPercentage(2),
    fontWeight: "500",
    color: Colors.black,
    marginTop: RFPercentage(2),
    fontFamily: FontFamily.medium,
  },
});
