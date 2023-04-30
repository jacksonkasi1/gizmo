import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  ImageBackground,
  ScrollView,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

//Components
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import MainHeader from "../components/MainHeader";

//config
import Colors from "../config/Colors";
import { ButtonSizes, FontFamily, FontSizes, Spaces } from "../config/font";
import ProfileData from "../components/ProfileData";
import LikeSaveComment from "../components/LikeSaveComment";
import { Divider } from "react-native-paper";
import PopModal from "../components/popModal";
import BottomModal from "../components/BottomModal";
import { useDispatch } from "react-redux";
import { addComment } from "../../redux/slices/photoSlice";
import { addReviewComment } from "../../redux/slices/reviewSlice";
import { addReplyComment } from "../../redux/slices/mainSlice";
//const
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function CommentScreen(props) {
  const { data, userId, postId, tabName } = props.route.params;
  const dispatch = useDispatch();
  const [renewData,setRenewData]=  useState(data)
  const [commentVisible, setCommentVisible] = useState({ id: null, vw: false });
  const [bottomModal, setBottomModal] = React.useState(false);
  const [commentText, setCommentText] = useState("");
  const [bottomSubj, setBottomSubj] = React.useState("");
  const [popModal, setPopModal] = React.useState(false);
  const [selectedPop, setSelectedPop] = React.useState("");
  const [replyComment,setReplyComment] = useState('')
  const [replyId,setReplyId]=useState('')
  // console.log("tb", data[0]?.comments_id)
  const onSubmit = async (e) => {
    if (tabName === "Photo") {
      console.log("phot")
      let formData = {
        user_id: userId,
        content_id: postId,
        content_type: 'photos',
        comment: commentText,
      }
     await dispatch(addComment({ formData: formData, user_id: userId }))
     .then((res)=>{
      console.log("res",res)
     })
     .catch((error)=>{
      console.log("error", error)
     })
     setCommentText('')
    }
    else if(tabName === "Review"){
      console.log("post d", postId)
      let formData = {
        user_id: userId,
        content_id: postId,
        content_type: 'reviews',
        comment: commentText,
      }
     dispatch(addReviewComment({ formData: formData, user_id: userId }))
     .then((res)=>{
      console.log("resTRe",res)
     })
     .catch((error)=>{
      console.log("errorRe", error)
     })
    }
    else if(tabName === "Video"){
      console.log("post d", postId)
      let formData = {
        user_id: userId,
        content_id: postId,
        content_type: 'videos',
        comment: commentText,
      }
     dispatch(addComment({ formData: formData, user_id: userId }))
     .then((res)=>{
      console.log("resvo",res)
     })
     .catch((error)=>{
      console.log("errorvo", error)
     })
    }
  };

  const sendComment = () =>{
    if(tabName==='Photo'){
      let formData={
        content_type: "photos",
        comments_id: replyId,
        user_id:userId,
        replay: replyComment
    }
      dispatch(addReplyComment({formData:formData}))
      .then((res)=>{
        console.log("res",res)
       })
       .catch((error)=>{
        console.log("error", error)
       })
       setReplyComment('')
    }else if(tabName==='Video'){
      let formData={
        content_type: "videos",
        comments_id: replyId,
        user_id:userId,
        replay: replyComment
    }
      dispatch(addReplyComment({formData:formData}))
      .then((res)=>{
        console.log("res",res)
       })
       .catch((error)=>{
        console.log("error", error)
       })
       setReplyComment('')
    }else if(tabName==='Review'){
      let formData={
        content_type: "reviews",
        comments_id: replyId,
        user_id:userId,
        replay: replyComment
    }
      dispatch(addReplyComment({formData:formData}))
      .then((res)=>{
        console.log("res",res)
       })
       .catch((error)=>{
        console.log("error", error)
       })
       setReplyComment('')
    }
  }
  console.log("renewdata",replyId)
  return (
    <Screen style={styles.screen}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
        <MainHeader
          prevScreen="HomeScreen"
          bottmTabScreen={true}
          title="Comments"
          subTitle={data !== null ? data?.length : null}
          navigation={props.navigation}
          modalFunc={setPopModal}
          modalVisible={popModal}
        />
        {/* Main Comment */}
        {data !== null ? (
          <>
            {data.map((itm, index) => (
              <View key={index}>
                <ProfileData
                  image={itm.profileImage}
                  title={itm.title}
                  subtitle={itm.subtitle}
                  navigation={props.navigation}
                  comment={true}
                />
                <Text
                  style={{
                    width: windowWidth / 1.5,
                    fontFamily: FontFamily.regular,
                    fontSize: FontSizes.small,
                    color: Colors.black,
                    marginLeft: Spaces.large,
                    marginTop: Spaces.nMedium,
                  }}
                >
                  {itm.comment}
                </Text>
                <View
                  style={{
                    marginLeft: Spaces.large,
                    marginTop: Spaces.smaller,
                  }}
                >
                  <LikeSaveComment
                    likes={itm.likes}
                    dislikes={itm.dislikes}
                    add={itm.add}
                    id={(temp)=>setReplyId(temp)}                    
                    data={itm}
                    navigation={props.navigation}
                    func={setBottomModal}
                    funcVal={bottomModal}
                  />
                </View>

                {/* Replies */}
                {itm.replay_comments ? (
                  <>
                    {commentVisible?.id == index &&
                      commentVisible.vw &&
                      itm.replay_comments.map((dt, indx) => (
                        <View key={indx} style={{ marginLeft: Spaces.large }}>
                          <ProfileData
                            image={dt.profileImage}
                            title={dt.title}
                            subtitle={dt.subtitle}
                            navigation={props.navigation}
                            comment={true}
                          />
                          <Text
                            style={{
                              width: windowWidth / 1.8,
                              fontFamily: FontFamily.regular,
                              fontSize: FontSizes.small,
                              color: Colors.black,
                              marginLeft: Spaces.large,
                              marginTop: Spaces.nMedium,
                            }}
                          >
                            {dt.replay}
                          </Text>
                          <View
                            style={{
                              marginLeft: Spaces.large,
                              marginTop: Spaces.smaller,
                            }}
                          >
                            <LikeSaveComment
                              likes={dt.likes}
                              dislikes={dt.dislikes}
                              add={dt.add}
                              data={dt}
                              navigation={props.navigation}
                              func={setBottomModal}
                              funcVal={bottomModal}
                            />
                          </View>
                        </View>
                      ))}
                  </>
                ) : null}
                {itm?.replay_comments.length>0 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: Spaces.large,
                      marginTop: Spaces.small,
                    }}
                  >
                    <Divider
                      style={{
                        width: Spaces.large,
                        backgroundColor: Colors.blue,
                        height: 1,
                        marginRight: Spaces.smaller,
                      }}
                    />
                    <Text
                      onPress={() => {
                        setCommentVisible({
                          id: index,
                          vw: !commentVisible.vw,
                        });
                      }}
                      style={{
                        color: Colors.blue,
                        fontFamily: FontFamily.medium,
                      }}
                    >
                      {commentVisible?.id == index && commentVisible.vw
                        ? "Hide replies"
                        : `${itm.replay_comments.length} replies`}
                    </Text>
                  </View>
                ) : null}
              </View>
            ))}
          </>
        ) : null}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          // width:windowWidth/1.2,
          margin: 10,
          paddingHorizontal: Spaces.small,
        }}
      >
        <Image
          style={{
            width: RFPercentage(9),
            height: RFPercentage(9),
          }}
          source={require("../../assets/images/person5.png")}
        />
        <TextInput
          style={{
            width: "85%",
            borderRadius: Spaces.small,
            backgroundColor: Colors.lightWhite,
            height: RFPercentage(7.5),
            padding: Spaces.small,
            marginLeft: Spaces.small,
          }}
          keyboardType='default'
          value={commentText}
          // onSubmitEditing={onSubmit}
          onChangeText={(e) => {
            // console.log("r",e)
            setCommentText(e);
          }}
          // onKeyPress={()=>}
          placeholder="Add a comment ..."
          placeholderTextColor={Colors.black}
        />
<TouchableOpacity onPress={()=>onSubmit()}>
  <Text>Send</Text>
</TouchableOpacity>
      </View>
      <BottomModal
        modalVisible={bottomModal}
        setBottomModalVisible={setBottomModal}
        noTopDvd={true}
        altWidth="100%"
        altPadding={Spaces.medium}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingHorizontal: Spaces.small,
          }}
        >
          <Image
            style={{
              width: RFPercentage(9),
              height: RFPercentage(9),
            }}
            source={require("../../assets/images/person5.png")}
          />
          <TextInput
            style={{
              width: "90%",
              borderRadius: Spaces.small,
              backgroundColor: Colors.lightWhite,
              height: RFPercentage(7.5),
              padding: Spaces.small,
              marginLeft: Spaces.small,
            }}
            value={replyComment}
            keyboardType="default"
            onChangeText={(e) => {setReplyComment(e)}}
            placeholder="Add a comment ..."
            placeholderTextColor={Colors.black}
          />
          <TouchableOpacity onPress={()=>sendComment()}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      </BottomModal>
      <PopModal modalVisible={popModal} setPopModalVisible={setPopModal}>
        <Text
          style={{
            fontFamily: FontFamily.medium,
            fontSize: FontSizes.small,
            color: selectedPop == "Top" ? Colors.third : Colors.grey,
          }}
          onPress={() => setSelectedPop("Top")}
        >
          Top
        </Text>
        <Text
          style={{
            fontFamily: FontFamily.medium,
            fontSize: FontSizes.small,
            color: selectedPop == "Newest" ? Colors.third : Colors.grey,
          }}
          onPress={() => setSelectedPop("Newest")}
        >
          Newest
        </Text>
      </PopModal>
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
