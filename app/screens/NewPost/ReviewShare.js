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
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from "expo-image-picker";
import { FontFamily, FontSizes, Spaces } from "../../config/font";
import ChooseChip from "../../components/ChooseChip";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../../redux/slices/userSlice";
import { addReview } from "../../../redux/slices/reviewSlice";
import { useNavigation } from "@react-navigation/native";
//const
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ReviewShareScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [text, setText] = React.useState("");
  const [desc, setDesc] = useState("");
  const [hashtags, setHashtags] = React.useState([]);
  const [reviewProd, setReviewProd] = useState("");
  const [prodCategory, setProdCatgeory] = useState([]);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [bs64, setBs64] = useState("");
  const [ext, setExt] = useState("");
  const userId = useSelector(selectUserId);
  const pickImage = async () => {
    // const fileToUpload = await DocumentPicker.getDocumentAsync({});
    // setImage(fileToUpload.uri);
    // setFile(fileToUpload);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    // console.log(result);

    if (!result.canceled) {
      setBs64(result.assets[0].base64);
      const extension = result.assets[0].uri.split(".").pop();
      setExt(extension);
      setImage(result.assets[0].uri);
    }
  };
  console.log("base 64", `data:image/jpeg;base64,${bs64.slice(0,40)}`)
  let cat = reviewProd?.label;
  let formData = {
    image: `data:image/jpeg;base64,${bs64}`,
    title: text,
    description: desc,
    category: cat,
    hashtags: hashtags,
    product_tag: prodCategory,
  };
  useEffect(() => {
    setImage(null);
    setBs64("")
    setReviewProd("");
    setProdCatgeory([]);
    setHashtags([]);
    setText("");
    setDesc("");
  }, []);
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
        {/* Choose Product review*/}
        <View style={{ width: "90%", marginVertical: Spaces.small }}>
          <Text
            style={{
              fontFamily: FontFamily.medium,
              fontSize: FontSizes.smaller,
              color: Colors.placeholder,
            }}
          >
            Product in this review
          </Text>
          <ChooseChip
            handleSelect={(pd) => {
              setReviewProd(pd);
            }}
            tab={"Photo"}
          />
        </View>
        {/* chose product catgeory */}
        <View style={{ width: "90%", marginVertical: Spaces.small }}>
          <Text
            style={{
              fontFamily: FontFamily.medium,
              fontSize: FontSizes.smaller,
              color: Colors.placeholder,
            }}
          >
            Product Category
          </Text>
          <ChooseChip
            handleSelect={(pd) => {
              setProdCatgeory(pd);
            }}
          />
        </View>

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

        {/* Description */}
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
            onChangeText={(e) => setDesc(e)}
            mode="outlined"
            multiline
            numberOfLines={8}
            placeholder="Write a Description..."
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
            onChangeText={(hashtags) => setHashtags(hashtags.split(","))}
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
            backgroundColor: Colors.third,
            marginTop: Spaces.medium,
            marginBottom: Spaces.small,
          }}
          onPress={() => {
            // selectFile()
            props.navigation.navigate("ReviewSetScreen", {
              formData: formData,
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
