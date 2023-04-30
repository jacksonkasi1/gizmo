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
import Colors from "../config/Colors";
import { FontFamily, FontSizes, Spaces } from "../config/font";
import Screen from "./Screen";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

//const
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ReviewInput({ name, rate, cStyle,desc,imagePic,description,selectedImage,removeImg}) {
  const [text, setText] = useState({ name: name, text: "" });
  const [image, setImage] = useState({ name: name, image: null });
  const [bs64, setBs64] = useState({ name: name, bs64: "" });
  const [ext, setExt] = useState({ name: name, ext: "" });

  const pickImage = async () => {
    const fileToUpload = await DocumentPicker.getDocumentAsync({});
    setImage({ name: name, image:fileToUpload.uri});
  };
  return (
    <Screen style={[styles.screen, cStyle]}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
        style={{ width: "90%" }}
      >
        {/* Avg Score Table */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            borderWidth: 1,
            borderColor: Colors.lightPlaceHolder,
            borderRadius: Spaces.smaller,
            marginVertical: Spaces.small,
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 6,
            }}
          >
            <Text>{name}</Text>
          </View>
          <View
            style={{
              height: RFPercentage(6),
              backgroundColor: Colors.lightPlaceHolder,
              width: 1,
            }}
          />
          <View
            numeric
            style={{
              flex: 2,
            }}
          >
            <Text
              style={{
                width: RFPercentage(8),
                height: RFPercentage(5),
                backgroundColor:
                  rate > 5 && rate < 8
                    ? "yellow"
                    : rate > 7
                    ? Colors.green
                    : Colors.red,
                textAlign: "center",
                textAlignVertical: "center",
                borderRadius: RFPercentage(1),
                color: Colors.purewhite,
                marginLeft: Spaces.medium,
              }}
            >
              {rate}
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", marginVertical: Spaces.small }}>
          <Text
            style={{
              fontFamily: FontFamily.medium,
              fontSize: FontSizes.smaller,
              color: Colors.placeholder,
              alignSelf: "flex-start",
            }}
          >
            Review
          </Text>
          <View
            style={{
              width: "100%",
              borderWidth: 2,
              borderRadius: RFPercentage(1),
              borderColor: Colors.lightPlaceHolder,
            }}
          >
            <TextInput
              value={description}
              onChangeText={desc}
              mode="flat"
              multiline
              numberOfLines={4}
              placeholder="Write a title..."
              placeholderTextColor={Colors.placeholder}
              outlineColor={Colors.lightWhite}
              activeOutlineColor={Colors.placeholder}
              style={{
                backgroundColor: Colors.purewhite,
              }}
              maxLength={200}
              activeUnderlineColor={Colors.purewhite}
              underlineStyle={{ display: "none" }}
            />
            {selectedImage && (
              <View>
                <Image
                  source={{ uri: selectedImage }}
                  style={{
                    width: "90%",
                    height: windowHeight / 2.8,
                    borderRadius: RFPercentage(2),
                    marginVertical: Spaces.small,
                    alignSelf: "center",
                  }}
                />
                <IconButton
                  style={{
                    position: "absolute",
                    top: Spaces.small,
                    right: RFPercentage(2),
                  }}
                  icon="close"
                  mode="contained"
                  iconColor={Colors.purewhite}
                  containerColor={Colors.primary}
                  size={20}
                  onPress={removeImg}
                />
              </View>
            )}
            <TouchableOpacity
              onPress={imagePic}
              style={{ margin: Spaces.smaller }}
            >
              <Image
                source={require("../../assets/images/skeleton_color.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.purewhite,
  },
});
