import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState, useCallback } from "react";
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
import { FontFamily, FontSizes, Spaces } from "../../config/font";
import { DataTable } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import ReviewInput from "../../components/ReviewInput";
import * as DocumentPicker from "expo-document-picker";
import { selectUserId } from "../../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { addReview, setReviewImage } from "../../../redux/slices/reviewSlice";
import AppModal from "../../components/AppModal";
//const
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ReviewDetailScreen(props) {
  const [avgRate, setAvgRate] = useState(0);
  const [modalVisible2, setModalVisible2] = useState(false);
  const dispatch = useDispatch();
  const [menuid, setmenuid] = useState(0);
  const { data, formData } = props.route.params;
  const [screen, setScreen] = useState(data[0].title);
  const [pic, setPic] = useState(null);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [bs64, setBs64] = useState("");
  const [ext, setExt] = useState("");
  const [text, setText] = useState("");
  const userId = useSelector(selectUserId);
  const handleEdit = useCallback(
    (msg, indx) => {
      setText(msg);
      let i = 0;
      for (i = 0; i < data.length; i++) {
        if (data[indx].title == screen) {
          data[indx].review = msg;
        }
      }
    },
    [screen, data]
  );
  const takepic = async () => {
    // const fileToUpload = await DocumentPicker.getDocumentAsync({});
    // return fileToUpload;
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
    return `data:image/jpeg;base64,${result.assets[0].base64}`
  };
  const pickImage = useCallback(
    async (indx) => {
      takepic().then((res) => {
        let i = 0;
        for (i = 0; i < data.length; i++) {
          if (data[indx].title == screen) {
            data[indx].image = res;
            console.log("jikol", data[indx].image);
          }
        }
        setPic(res);
      });
    },
    [data, screen]
  );
  console.log("image", pic);
  const handleRemove = useCallback(
    async (indx) => {
      let i = 0;
      for (i = 0; i < data.length; i++) {
        if (data[indx].title == screen) {
          data[indx].image = null;
        }
      }
      setPic(null);
    },
    [data, screen]
  );
  let tmp = 0;
  data?.map((itm) => (tmp = tmp + itm.rating));
  useEffect(() => {
    setAvgRate((tmp / data?.length).toFixed(2));
  }, []);
  const onSubmit = () => {
    dispatch(
      addReview({
        formData: { ...formData, detail_rating: data },
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
    setPic(null);
  };
  return (
    <Screen style={styles.screen}>
      {/* headerComponent */}
      <MainHeader
        prevScreen="NewPostMainScreen"
        bottmTabScreen={false}
        title="Apple 13 pro"
        navigation={props.navigation}
        param={{ screen: "ReviewShareScreen" }}
        noThirdIcon={true}
      />

      <FlatList
        scrollEnabled
        style={{ marginTop: RFPercentage(5), flexGrow: 0 }}
        data={data && data}
        keyExtractor={(item) => item.title}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setmenuid(index);
                setScreen(item.title);
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: RFPercentage(1.9),
                height: RFPercentage(6.2),
                borderRadius: RFPercentage(3),
                backgroundColor: menuid === index ? Colors.third : Colors.white,
                borderColor: Colors.third,
                borderWidth: RFPercentage(0.3),
                margin: Spaces.smaller,
              }}
            >
              <Text
                style={{
                  fontSize: FontSizes.small,
                  fontFamily: FontFamily.regular,
                  fontWeight: "500",
                  color: menuid === index ? Colors.white : Colors.third,
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
        style={{ width: "90%" }}
      >
        {data.map((itm, indx) => (
          <ReviewInput
            key={indx}
            name={itm?.title}
            description={itm?.review}
            rate={itm?.rating}
            desc={(desc) => {
              handleEdit(desc, indx);
            }}
            imagePic={() => pickImage(indx)}
            selectedImage={itm?.image}
            removeImg={() => handleRemove(indx)}
            cStyle={screen !== itm?.title ? { display: "none" } : {}}
          />
        ))}

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
            // props.navigation.navigate("NewPostMainScreen");
            onSubmit();
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
            Share
          </Text>
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
              Review Shared Successfully!
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
