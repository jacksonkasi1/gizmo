import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useCallback } from "react";
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
import ActivityIndicator from "react-native-paper";
import { IconButton, TextInput } from "react-native-paper";
import { RFPercentage } from "react-native-responsive-fontsize";
import MainHeader from "../../components/MainHeader";
import Screen from "../../components/Screen";
import Colors from "../../config/Colors";
import { FontFamily, FontSizes, Spaces } from "../../config/font";
import * as ImagePicker from "expo-image-picker";
import ChooseChip from "../../components/ChooseChip";
import { useSharePhotoMutation } from "../../../redux/api/apiSlice";
import {
  selectLoading,
  setPhoto,
  upPhoto,
} from "../../../redux/slices/photoSlice";
import { useDispatch, useSelector } from "react-redux";
import * as DocumentPicker from "expo-document-picker";
import { selectUserId } from "../../../redux/slices/userSlice";
import { useNavigation } from "@react-navigation/native";
//const
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function PhotoShareScreen(props) {
  const navigation = useNavigation();
  const [file, setFile] = useState(null);
  const [text, setText] = React.useState("");
  const [hashtags, setHashtags] = React.useState([]);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [prod, setProd] = useState([]);
  const [bs64, setBs64] = useState("");
  const [ext, setExt] = useState("");
  const [photo, setPhoto] = useState(null);
  const userId = useSelector(selectUserId);
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const pickImage = async () => {
    const fileToUpload = await DocumentPicker.getDocumentAsync({});
    setImage(fileToUpload.uri);
    setFile(fileToUpload);
  };
  let cat = category?.label;
  // console.log("title", text);
  // console.log("cat", category);
  // console.log("hash", hashtags), console.log("product", prod);
  const selectFile = () => {
    const formData = new FormData();
    formData.append("image", {
      uri: file.uri,
      type: file.mimeType,
      name: file.name,
    });
    formData.append("title", text);
    formData.append("category", cat);
    hashtags.forEach((item) => {
      formData.append("hashtag", item);
    });
    prod.forEach((item) => {
      formData.append("product_tag", item);
    });
    dispatch(upPhoto({ formData: formData, user_id: userId ? userId : "" }))
    .then((res)=>{
      console.log("res", res)
    })
    .catch((error)=>{
      console.log("error", error)
    })
    navigation.navigate("BottomTab", { screen: "HomeScreen" });
    setFile(null);
    setText("");
    setImage("");
    setHashtags([]);
    setProd([]);
    setCategory("");
  };
  return (
    <Screen style={styles.screen}>
      {/* headerComponent */}
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        {/* Upload photo */}
        {!image && (
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
              Upload Photo
            </Text>
            <TouchableOpacity onPress={pickImage} style={{}}>
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
        {image && (
          <View>
            <Image
              source={{ uri: image }}
              style={{
                width: windowWidth / 1.1,
                height: windowHeight / 2.3,
                borderRadius: RFPercentage(2),
                marginTop: Spaces.small,
              }}
            />
            <IconButton
              style={{
                position: "absolute",
                top: Spaces.small,
                right: RFPercentage(1),
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
            value={text}
            onChangeText={(text) => setText(text)}
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
            {text.length}/200
          </Text>
        </View>

        {/* Choose Product */}
        <View style={{ width: "90%", marginVertical: Spaces.small }}>
          <ChooseChip handleSelect={(pd) => setCategory(pd)} tab={"Photo"} />
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
            onChangeText={(hash) => {
              setHashtags([hash.split(",")]);
            }}
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
        {/* product tag */}
        <View style={{ width: "90%", marginVertical: Spaces.small }}>
          <Text
            style={{
              fontFamily: FontFamily.medium,
              fontSize: FontSizes.smaller,
              color: Colors.placeholder,
            }}
          >
            Product Tag
          </Text>
          <TextInput
            value={prod}
            onChangeText={(pro) => setProd([pro.split(",")])}
            mode="outlined"
            multiline
            numberOfLines={5}
            placeholder="Your product tag"
            placeholderTextColor={Colors.placeholder}
            outlineColor={Colors.lightWhite}
            activeOutlineColor={Colors.placeholder}
            style={{
              backgroundColor: Colors.white,
            }}
            maxLength={200}
          />
        </View>
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
            selectFile();
          }}
        >
          {/* {isLoading ? (
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
              Create
            </Text>
          )} */}
          <Text
            style={{
              color: Colors.purewhite,
              fontSize: RFPercentage(2.2),
              fontWeight: "700",
              fontFamily: FontFamily.semiBold,
            }}
          >
            Create
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
