import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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
  TextInput,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import MainHeader from "../../components/MainHeader";
import Screen from "../../components/Screen";
import Colors from "../../config/Colors";
import { FontFamily, FontSizes, Spaces } from "../../config/font";
import * as DocumentPicker from "expo-document-picker";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addPoll, selectLoading } from "../../../redux/slices/pollSlice";
import { selectUserId } from "../../../redux/slices/userSlice";
import { ActivityIndicator } from "react-native-paper";
import AppModal from "../../components/AppModal";
import * as ImagePicker from "expo-image-picker";


//const
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function PollShareScreen(props) {
  const dispatch = useDispatch();
  const [modalVisible2, setModalVisible2] = useState(false);
  const [text, setText] = React.useState("");
  const [hashtags, setHashtags] = React.useState([]);
  const userId = useSelector(selectUserId);
  const [specification, setSpecification] = useState([{ data: "", title: "" }]);
  const [image, setImage] = useState("");
  const [bs64, setBs64] = useState("");
  const [ext, setExt] = useState("");
  const loading = useSelector(selectLoading);

  const pickImage = async (name, i) => {
    // const fileToUpload = await DocumentPicker.getDocumentAsync({});
    // setImage(fileToUpload.uri);
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
    handleChange(name, `data:image/jpeg;base64,${result.assets[0].base64}`, i);
  };

  let handleChange = (name, e, i) => {
    let newFormValues = [...specification];
    newFormValues[i][name] = e;
    setSpecification(newFormValues);
  };
  const handleRemoveClick = (index) => {
    const list = [...specification];
    list.splice(index, 1);
    setSpecification(list);
  };
  const addSpecification = () => {
    setSpecification([...specification, { data: "", title: "" }]);
  };
  const onSubmit = () => {
    let formData = {
      question: text,
      hashtag: hashtags,
    };
    dispatch(
      addPoll({
        formData: { ...formData, options: specification },
        user_id: userId,
      })
    ).then((res) => {
      // console.log(res)
      try {
        if (res.payload.success) {
          setModalVisible2(!modalVisible2);
        }
      } catch (error) {
        console.log(error);
      }
    });
    setText("");
    setHashtags([]);
    setSpecification([{ data: "", title: "" }]);
  };
  return (
    <Screen style={styles.screen}>
      {/* headerComponent */}
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        {/* Upload Tex */}
        <View style={{ width: "90%", marginVertical: Spaces.small }}>
          <Text
            style={{
              fontFamily: FontFamily.medium,
              fontSize: FontSizes.smaller,
              color: Colors.placeholder,
            }}
          >
            Question
          </Text>
          <TextInput
            value={text}
            onChangeText={(text) => setText(text)}
            mode="outlined"
            multiline
            textAlignVertical="top"
            numberOfLines={8}
            placeholder="Ask a question..."
            placeholderTextColor={Colors.placeholder}
            outlineColor={Colors.lightWhite}
            activeOutlineColor={Colors.placeholder}
            style={{
              backgroundColor: Colors.white,
              marginTop: 10,
              padding: 10,
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
            {text.length}/500
          </Text>
        </View>

        {/* Poll list */}

        <View
          style={{
            width: "90%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {specification?.map((element, i) => {
            return (
              <View style={styles.optionsView}>
                <TouchableOpacity
                  style={styles.optionImageView}
                  onPress={() => {
                    pickImage("data", i);
                  }}
                >
                  <Image
                    source={{
                      uri:
                        element?.data == ""
                          ? "https://i.ibb.co/JdR2jzg/image-plus.png"
                          : element?.data,
                    }}
                    style={styles.imageOptions}
                  />
                </TouchableOpacity>
                <View
                  style={[
                    styles.textInputView,
                    {
                      flexDirection: "row",
                      width: windowWidth / 1.5,
                      height: 50,
                      marginTop: "5%",
                    },
                  ]}
                >
                  <TextInput
                    placeholder={`Options\b${i + 1}`}
                    placeholderTextColor={"grey"}
                    maxLength={25}
                    textAlignVertical="center"
                    style={[
                      styles.textInput,
                      { height: 40, width: windowWidth / 1.9 },
                    ]}
                    value={element?.title ? element?.title : ""}
                    multiline={true}
                    onChangeText={(e) => handleChange("title", e, i)}
                  />
                  <Text
                    style={{ alignSelf: "center", color: "grey", fontSize: 14 }}
                  >
                    {element.title.length}/25
                  </Text>
                </View>
                {specification.length - 1 === i ? (
                  <TouchableOpacity
                    onPress={() => {
                      addSpecification();
                    }}
                    style={styles.addButton}
                  >
                    <AntDesign name="plus" size={24} color={"#EF7E46"} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      handleRemoveClick(i);
                    }}
                    style={styles.addButton}
                  >
                    <AntDesign name="closecircle" size={24} color={"#EF7E46"} />
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
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
            textAlignVertical="top"
            mode="outlined"
            multiline
            numberOfLines={5}
            placeholder="Your fav hashtags"
            placeholderTextColor={Colors.placeholder}
            outlineColor={Colors.lightWhite}
            activeOutlineColor={Colors.placeholder}
            style={{
              backgroundColor: Colors.white,
              marginTop: 10,
              padding: 10,
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
            onSubmit();
          }}
        >
          {loading ? (
            <ActivityIndicator animating={true} color={Colors.primary} />
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
              Poll Shared Successfully!
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
  optionImageView: {
    height: 50,
    width: 50,
    alignSelf: "center",
    padding: 10,
    marginTop: "5%",
    marginRight: "2%",
    borderColor: "#afafaf",
    borderWidth: 1,
    borderRadius: 10,
  },
  image: {
    borderRadius: 10,
    height: windowHeight / 3,
    width: windowWidth / 1.1,
    alignSelf: "center",
  },
  imageOptions: {
    alignSelf: "center",
    height: 30,
    width: 30,
  },
  limitText: {
    alignSelf: "flex-end",
    margin: 10,
    color: "grey",
    fontSize: 14,
    fontWeight: "500",
  },
  shareButton: {
    alignSelf: "center",
    marginTop: "50%",
    width: windowWidth / 1.2,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#EF7E46",
    marginBottom: "2%",
  },
  shareText: {
    padding: 5,
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  optionsView: {
    flexDirection: "row",
    alignSelf: "flex-start",
    // marginLeft: '5%',
  },
  addButton: {
    alignSelf: "center",
    height: 50,
    width: 50,
    alignSelf: "center",
    padding: 10,
    marginTop: "5%",
  },
  textInput: {
    height: 40,
    backgroundColor: "#f7f7f7",
    width: windowWidth / 1.15,
    alignSelf: "center",
    padding: 5,
    borderRadius: 10,
    color: "black",
  },
  textInputView: {
    height: 100,
    backgroundColor: "#f7f7f7",
    width: windowWidth / 1.1,
    alignSelf: "center",
    padding: 10,
    borderColor: "#afafaf",
    borderWidth: 1,
    borderRadius: 10,
  },
});