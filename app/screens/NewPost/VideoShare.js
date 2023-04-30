import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
  Animated,
} from "react-native";
import {
  ActivityIndicator,
  IconButton,
  ProgressBar,
  TextInput,
} from "react-native-paper";
import { RFPercentage } from "react-native-responsive-fontsize";
import MainHeader from "../../components/MainHeader";
import Screen from "../../components/Screen";
import Colors from "../../config/Colors";
import { FontFamily, FontSizes, Spaces } from "../../config/font";
import * as ImagePicker from "expo-image-picker";
import ChooseChip from "../../components/ChooseChip";
import AppModal from "../../components/AppModal";

//expo-vdo
import { Video, AVPlaybackStatus } from "expo-av";
import * as VideoThumbnails from "expo-video-thumbnails";
import * as FileSystem from "expo-file-system";
import {
  useShareVideoMutation,
  useUploadVideoMutation,
} from "../../../redux/api/apiSlice";
import * as DocumentPicker from "expo-document-picker";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading, upVideo } from "../../../redux/slices/videoSlice";
import { selectUserId } from "../../../redux/slices/userSlice";
import Category from "../../components/New Post/Category";
//const
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function VideoShareScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [ext, setExt] = useState(null);
  const [video, setVideo] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image, setImage] = useState(null);
  const [bs1, setBs1] = useState("");
  const [bs2, setBs2] = useState("");
  const [bs3, setBs3] = useState("");
  const [bs4, setBs4] = useState("");

  const [bs64, setBs64] = useState("");
  const [extPic, setExtPic] = useState("");
  const [prod, setProd] = useState([]);

  const [status, setStatus] = useState({});
  const videoRef = useRef();
  const [userId, setUserId] = useState(null);
  const user_id = useSelector(selectUserId);

  const [shareVideo, { isLoading, isSuccess }] = useShareVideoMutation();

  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  // useEffect(() => {
  //   console.log("vd", user_id);
  // }, []);
  const selectFile = useCallback(async () => {
    const fileToUpload = await DocumentPicker.getDocumentAsync({});
    // console.log(fileToUpload);
    const formData = new FormData();

    formData.append("file", {
      uri: fileToUpload.uri,
      type: fileToUpload.mimeType,
      name: fileToUpload.name,
    });

    dispatch(upVideo(formData))
      .then((res) => {
        console.log("P", res);
        if (res.payload.success) {
          setVideo(res.payload.data.file);
        }
      })
      .catch((e) => console.log("f", e));
  }, []);
  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });

    if (!result.canceled) {
      const extension = result.assets[0].uri.split(".").pop();
      setExt(extension);
      // console.log({ file: result.assets[0].uri });
      let formData = new FormData();

      formData.append("file", { uri: result.assets[0].uri });
      // console.log(formData);

      // setVideo(result.assets[0].uri);
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      setBs64(result.assets[0].base64);
      const extension = result.assets[0].uri.split(".").pop();
      setExtPic(extension);
      setImage(result.assets[0].uri);
    }
  };

  const generateThumbnail = async (time) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(video, {
        time: time,
      });
      return uri;
    } catch (e) {
      console.warn(e);
    }
  };
  useEffect(() => {
    if (video) {
      generateThumbnail(1000).then(async (uri) => {
        setImage1(uri);
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: "base64",
        }).then((dt) => setBs1(dt));
      });
      generateThumbnail(2000).then(async (uri) => {
        setImage2(uri);
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: "base64",
        }).then((dt) => setBs2(dt));
      });
      generateThumbnail(3000).then(async (uri) => {
        setImage3(uri);
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: "base64",
        }).then((dt) => setBs3(dt));
      });
      generateThumbnail(4000).then(async (uri) => {
        setImage4(uri);
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: "base64",
        }).then((dt) => setBs4(dt));
      });
    }

    if (user_id) {
      setUserId(user_id);
    }
  }, [video]);
  let newCat = cat?.label;
  // console.log("newCat", title,desc,prod,hashtags,newCat)
  return (
    <Screen style={styles.screen}>
      {/* headerComponent */}
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        {/* Upload photo */}
        {!video && !loading && (
          <View
            style={{
              width: "90%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: Spaces.small,
            }}
          >
            <Text
              style={{
                fontFamily: FontFamily.semiBold,
                fontSize: FontSizes.regular,
              }}
            >
              Upload Video
            </Text>
            <TouchableOpacity onPress={selectFile} style={{}}>
              <Image
                style={{
                  width: RFPercentage(7),
                  height: RFPercentage(7),
                  elevation: 5,
                }}
                source={require("../../../assets/images/upload.png")}
              />
            </TouchableOpacity>
          </View>
        )}
        {!video && loading && (
          <View
            style={{
              width: "90%",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginTop: Spaces.small,
            }}
          >
            <Text
              style={{
                fontFamily: FontFamily.semiBold,
                fontSize: FontSizes.regular,
              }}
            >
              Uploading Video...
            </Text>
            <TouchableOpacity
              style={{ width: "100%", marginTop: Spaces.smaller }}
            >
              <ProgressBar
                progress={0.6}
                color={Colors.third}
                style={{
                  width: "100%",
                  height: RFPercentage(3),
                  backgroundColor: Colors.white,
                  borderRadius: RFPercentage(1),
                }}
              />
            </TouchableOpacity>
          </View>
        )}
        {video && (
          <View>
            <Video
              ref={videoRef}
              style={{
                width: windowWidth / 1.1,
                height: windowHeight / 2.3,
                borderRadius: RFPercentage(2),
                marginTop: Spaces.small,
              }}
              source={{
                uri: video,
              }}
              useNativeControls
              resizeMode="contain"
              isLooping
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
            <IconButton
              style={{
                position: "absolute",
                top: Spaces.large,
                right: RFPercentage(1),
              }}
              icon="close"
              mode="contained"
              iconColor={Colors.purewhite}
              containerColor={Colors.primary}
              size={20}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          </View>
        )}

        {/* Upload Tex */}
        <View style={{ width: "90%", marginVertical: Spaces.small }}>
          <Text
            style={{
              fontFamily: FontFamily.medium,
              fontSize: FontSizes.smaller,
              color: Colors.placeholder,
            }}
          >
            Title
          </Text>
          <TextInput
            value={title}
            onChangeText={(text) => setTitle(text)}
            mode="outlined"
            multiline
            numberOfLines={4}
            placeholder="Write a title..."
            placeholderTextColor={Colors.placeholder}
            outlineColor={Colors.lightWhite}
            activeOutlineColor={Colors.placeholder}
            style={{
              backgroundColor: Colors.white,
            }}
            maxLength={200}
          />
          <Text
            style={{
              fontFamily: FontFamily.medium,
              fontSize: FontSizes.smaller,
              color: Colors.placeholder,
              position: "absolute",
              bottom: 0,
              right: Spaces.smaller,
            }}
          >
            {title.length}/200
          </Text>
        </View>

        {/* Description */}
        {/* Upload Tex */}
        <View style={{ width: "90%", marginVertical: Spaces.small }}>
          <Text
            style={{
              fontFamily: FontFamily.medium,
              fontSize: FontSizes.smaller,
              color: Colors.placeholder,
            }}
          >
            Description
          </Text>
          <TextInput
            value={desc}
            onChangeText={(text) => setDesc(text)}
            mode="outlined"
            multiline
            numberOfLines={8}
            placeholder="Write a description..."
            placeholderTextColor={Colors.placeholder}
            outlineColor={Colors.lightWhite}
            activeOutlineColor={Colors.placeholder}
            style={{
              backgroundColor: Colors.white,
            }}
            maxLength={500}
          />
          <Text
            style={{
              fontFamily: FontFamily.medium,
              fontSize: FontSizes.smaller,
              color: Colors.placeholder,
              position: "absolute",
              bottom: 0,
              right: Spaces.smaller,
            }}
          >
            {desc.length}/500
          </Text>
        </View>

        {/* Video Thumbnail */}

        {(image1 || image2 || image3 || image4) && (
          <View
            style={{
              flex: 4, // the number of columns you want to devide the screen i
              width: "90%",
              alignItems: "center",
            }}
          >
            {/* First Row */}
            <View style={{ flexDirection: "row" }}>
              {(!image1 || !image2 || !image3 || !image4) && (
                <>
                  {image ? (
                    <View style={{ flex: 2 }}>
                      <Image
                        source={{ uri: image }}
                        style={{
                          width: "96%",
                          height: windowHeight / 5,
                          borderRadius: RFPercentage(2),
                          marginTop: Spaces.small,
                        }}
                      />
                      <IconButton
                        style={{
                          position: "absolute",
                          top: Spaces.small,
                          right: Spaces.small,
                        }}
                        icon="close"
                        mode="contained"
                        iconColor={Colors.purewhite}
                        containerColor={Colors.primary}
                        size={20}
                        onPress={() => {
                          setImage(null);
                        }}
                      />
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={pickImage}
                      style={{
                        flex: 2,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: Colors.white,
                        margin: Spaces.smaller,
                        borderRadius: 10,
                      }}
                    >
                      <Image
                        source={require("../../../assets/images/skeleton_image.png")}
                        style={{}}
                      />
                      <Text>Custom Thumbnail</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}

              {image1 && (
                <View style={{ flex: 2 }}>
                  <Image
                    source={{ uri: image1 && image1 }}
                    style={{
                      width: "96%",
                      height: windowHeight / 5,
                      borderRadius: RFPercentage(2),
                      marginTop: Spaces.small,
                    }}
                  />
                  <IconButton
                    style={{
                      position: "absolute",
                      top: Spaces.small,
                      right: Spaces.small,
                    }}
                    icon="close"
                    mode="contained"
                    iconColor={Colors.purewhite}
                    containerColor={Colors.primary}
                    size={20}
                    onPress={() => {
                      setImage1(null);
                    }}
                  />
                </View>
              )}
              {image2 && (
                <View style={{ flex: 2 }}>
                  <Image
                    source={{ uri: image2 && image2 }}
                    style={{
                      width: "96%",
                      height: windowHeight / 5,
                      borderRadius: RFPercentage(2),
                      marginTop: Spaces.small,
                    }}
                  />
                  <IconButton
                    style={{
                      position: "absolute",
                      top: Spaces.small,
                      right: Spaces.small,
                    }}
                    icon="close"
                    mode="contained"
                    iconColor={Colors.purewhite}
                    containerColor={Colors.primary}
                    size={20}
                    onPress={() => {
                      setImage2(null);
                    }}
                  />
                </View>
              )}
            </View>
            {/* Second Row */}

            <View style={{ flexDirection: "row" }}>
              {image3 && (
                <View style={{ flex: 2 }}>
                  <Image
                    source={{ uri: image3 && image3 }}
                    style={{
                      width: "96%",
                      height: windowHeight / 5,
                      borderRadius: RFPercentage(2),
                      marginTop: Spaces.small,
                    }}
                  />
                  <IconButton
                    style={{
                      position: "absolute",
                      top: Spaces.small,
                      right: Spaces.small,
                    }}
                    icon="close"
                    mode="contained"
                    iconColor={Colors.purewhite}
                    containerColor={Colors.primary}
                    size={20}
                    onPress={() => {
                      setImage3(null);
                    }}
                  />
                </View>
              )}
              {image4 && (
                <View style={{ flex: 2 }}>
                  <Image
                    source={{ uri: image4 && image4 }}
                    style={{
                      width: "96%",
                      height: windowHeight / 5,
                      borderRadius: RFPercentage(2),
                      marginTop: Spaces.small,
                    }}
                  />
                  <IconButton
                    style={{
                      position: "absolute",
                      top: Spaces.small,
                      right: Spaces.small,
                    }}
                    icon="close"
                    mode="contained"
                    iconColor={Colors.purewhite}
                    containerColor={Colors.primary}
                    size={20}
                    onPress={() => {
                      setImage4(null);
                    }}
                  />
                </View>
              )}
            </View>
          </View>
        )}

        {/* Choose Product */}
        <View style={{ width: "90%", marginVertical: Spaces.small }}>
          <ChooseChip
            handleSelect={(pd) => {
              setProd(pd);
            }}
          />
        </View>
        {/* choose product category section */}
        <View style={{ width: "90%", marginVertical: Spaces.small }}>
          <Category handleSelect={(pd) => setCat(pd)} />
        </View>
        {/* #HashTag */}
        <View style={{ width: "90%", marginVertical: Spaces.small }}>
          <Text
            style={{
              fontFamily: FontFamily.medium,
              fontSize: FontSizes.smaller,
              color: Colors.placeholder,
            }}
          >
            #HashTag
          </Text>
          <TextInput
            value={hashtags}
            onChangeText={(text) => setHashtags(text.split(","))}
            mode="outlined"
            multiline
            numberOfLines={5}
            placeholder="Your fav hashtags"
            placeholderTextColor={Colors.placeholder}
            outlineColor={Colors.lightWhite}
            activeOutlineColor={Colors.placeholder}
            style={{
              backgroundColor: Colors.white,
            }}
            maxLength={200}
          />
          <Text
            style={{
              fontFamily: FontFamily.medium,
              fontSize: FontSizes.smaller,
              color: Colors.placeholder,
              position: "absolute",
              bottom: 0,
              right: Spaces.smaller,
            }}
          >
            {hashtags.length}/200
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: RFPercentage(55),
            height: RFPercentage(7),
            borderRadius: RFPercentage(1),
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              !bs1 && !bs2 && !bs3 && !bs64 ? Colors.placeholder : Colors.third,
            marginTop: Spaces.medium,
            marginBottom: Spaces.small,
          }}
          disabled={!bs1 && !bs2 && !bs3 && !bs64}
          onPress={() => {
            let tm = {
              video: video,
              title: title,
              description: desc,
              category: newCat,
              thumbnail: [{ file: bs1 }, { file: bs2 }, { file: bs3 }],
              hashtag: hashtags,
              product_tag: prod,
            };
            console.log(tm);
            shareVideo({ formData: tm, userId: userId })
              .unwrap()
              .then((payload) => {
                console.log("share", payload);
                setModalVisible2(!modalVisible2);
              });
          }}
        >
          {isLoading ? (
            <ActivityIndicator animating={true} color={Colors.purewhite} />
          ) : (
            <Text
              style={{
                color: Colors.purewhite,
                fontSize: RFPercentage(2.2),
                fontWeight: "700",
                fontFamily: FontFamily.semiBold,
              }}
            >
              Share
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
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
            backgroundColor: Colors.third,
          }}
        >
          <Ionicons name="alert" size={80} color={Colors.white} />
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
              color: Colors.blacky,
            }}
          >
            Confirmation
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
              Are you sure you want to delete the{" "}
              <Text style={{ color: Colors.primary }}>video</Text>?
            </Text>
          </View>
        </View>

        {/* button */}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={{
              width: RFPercentage(20),
              height: RFPercentage(6),
              borderRadius: RFPercentage(1),
              backgroundColor: Colors.purewhite,
              justifyContent: "center",
              alignItems: "center",
              marginTop: RFPercentage(3),
              borderColor: Colors.primary,
              borderWidth: 2,
            }}
          >
            <Text style={{ color: Colors.third }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setModalVisible(!modalVisible);
              setVideo(null);
              setImage1(null);
              setImage2(null);
              setImage3(null);
              setImage4(null);
              setBs1(null);
              setBs2(null);
              setBs3(null);
              setBs4(null);
              setBs64(null);
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
            <Text style={{ color: Colors.purewhite }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </AppModal>
      <AppModal
        modalVisible={modalVisible2}
        setModalVisible={setModalVisible2}
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
          <Ionicons name="checkmark-outline" size={80} color={Colors.white} />
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
              color: Colors.green,
            }}
          >
            Success
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
              Video Uploaded Successfully!
            </Text>
          </View>
        </View>

        {/* button */}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setModalVisible2(!modalVisible2);
              props.navigation.navigate("BottomTab", { screen: "HomeScreen" });
            }}
            style={{
              width: RFPercentage(20),
              height: RFPercentage(6),
              borderRadius: RFPercentage(1),
              backgroundColor: Colors.green,
              justifyContent: "center",
              alignItems: "center",
              marginTop: RFPercentage(3),
            }}
          >
            <Text style={{ color: Colors.purewhite }}>Ok</Text>
          </TouchableOpacity>
        </View>
      </AppModal>
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
