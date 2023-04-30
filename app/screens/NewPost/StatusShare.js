import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
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
import { ActivityIndicator, IconButton, TextInput } from "react-native-paper";
import { RFPercentage } from "react-native-responsive-fontsize";
import MainHeader from "../../components/MainHeader";
import Screen from "../../components/Screen";
import Colors from "../../config/Colors";
import { FontFamily, FontSizes, Spaces } from "../../config/font";
import { selectUserId } from "../../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addStatus,
  selectLoading,
  selectStatus,
} from "../../../redux/slices/statusSlice";
import AppModal from "../../components/AppModal";

//const
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function StatusShareScreen(props) {
  const [text, setText] = React.useState("");
  const [hashtags, setHashtags] = React.useState("");
  const [modalVisible2, setModalVisible2] = useState(false);

  const userId = useSelector(selectUserId);
  const statusData = useSelector(selectStatus);
  const loading = useSelector(selectLoading);
  console.log("stata", statusData);
  const dispatch = useDispatch();
  const handleStatusShare = () => {
    const formData = {
      status: text,
      hashtag: hashtags.split(","),
    };
    dispatch(addStatus({ formData: formData, user_id: userId })).then((res) => {
      try {
        if (res.payload.success) {
          setModalVisible2(!modalVisible2);
        }
      } catch (error) {
        console.log(error);
      }
    });
    setText("");
    setHashtags("");
    // shareStatus({formData:formData,userId:`${userId?userId:""}`})
    // .unwrap()
    // .then((payload)=>{
    //   if(payload.success){
    //     props.navigation.navigate('BottomTab',{screen:'HomeScreen'})
    //     setText('')
    //     setHashtags('')
    //   }
    // })
  };
  console.log("ST", text, hashtags);
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
            Status
          </Text>
          <TextInput
            value={text}
            onChangeText={(text) => setText(text)}
            mode="outlined"
            multiline
            numberOfLines={8}
            placeholder="Write a status..."
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
            {text.length}/500
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
            onChangeText={(hashtags) => {
              setHashtags(hashtags),
                console.log("hash", hashtags.match(/#[a-z0-9_]+/g));
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
            handleStatusShare();
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
              Status Shared Successfully!
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
