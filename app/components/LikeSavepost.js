import React, { useState, useEffect } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
//config
import Colors from "../config/Colors";
import { FontFamily } from "../config/font";
import { useLikeVideoMutation } from "../../redux/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  dislikeContent,
  likeContent,
  saveContent,
} from "../../redux/slices/mainSlice";
import {
  selectFollowersContent,
  getFollowersContent,
  getUserDetails,
} from "../../redux/slices/userSlice";

export default function LikeSavepost({
  likes,
  dislikes,
  add,
  data,
  comment,
  navigation,
  user_id,
  post_id,
  rvw,
  tabName,
}) {
  const [savePost, setSavePost] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [like, setLike] = useState(false);
  const [unLike, setUnLike] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log("refresh",data)
  }, [refresh]);
  return (
    <>
      <View style={styles.mainleft}>
        <View style={styles.slignt}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (!rvw) {
                if (data?.users_review_comments) {
                  let formData = {
                    user_id: user_id,
                    content_id: post_id,
                    content_type: "reviews",
                  };
                  dispatch(likeContent({ formData: formData }))
                    .then((res) => {
                      console.log("res", res);
                    })
                    .catch((er) => {
                      console.log("er", er);
                    });
                  dispatch(getFollowersContent(user_id));
                } else if (data?.users_video_comments) {
                  let formData = {
                    user_id: user_id,
                    content_id: post_id,
                    content_type: "videos",
                  };
                  dispatch(likeContent({ formData: formData }))
                    .then((res) => {
                      console.log("res", res);
                    })
                    .catch((er) => {
                      console.log("er", er);
                    });
                  dispatch(getFollowersContent(user_id));
                } else if (data?.users_photos_comments) {
                  let formData = {
                    user_id: user_id,
                    content_id: post_id,
                    content_type: "photos",
                  };
                  dispatch(likeContent({ formData: formData }))
                    .then((res) => {
                      console.log("res", res);
                      dispatch(getFollowersContent(user_id));
                    })
                    .catch((er) => {
                      console.log("er", er);
                    });
                } else if (data?.users_polls_comments) {
                  let formData = {
                    user_id: user_id,
                    content_id: post_id,
                    content_type: "polls",
                  };
                  dispatch(likeContent({ formData: formData }))
                    .then((res) => {
                      console.log("res", res);
                      dispatch(getFollowersContent(user_id));
                    })
                    .catch((er) => {
                      console.log("er", er);
                    });
                } else if (data?.users_status_comments) {
                  let formData = {
                    user_id: user_id,
                    content_id: post_id,
                    content_type: "status",
                  };
                  dispatch(likeContent({ formData: formData }))
                    .then((res) => {
                      console.log("res", res);
                      dispatch(getFollowersContent(user_id));
                    })
                    .catch((er) => {
                      console.log("er", er);
                    });
                }
              }
            }}
          >
            {/* <Ionicons
              name={
                data?.likes?.includes(user_id)
                  ? "thumbs-up"
                  : "thumbs-up-outline"
              }
              color={
                data?.likes?.includes(user_id) ? Colors.third : Colors.lightgrey
              }
              size={25}
            /> */}
            {data.likes?.includes(user_id) ? (
              <Image
                source={require("../../assets/images/Thumbs-Up-org.png")}
                style={{ height: 25, width: 25 }}
              />
            ) : (
              <Image
                source={require("../../assets/images/Thumbs-up.png")}
                style={{ height: 25, width: 25 }}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.likdis}>{likes}</Text>
        </View>
        <View style={styles.slignt}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (!rvw) {
                if (data?.users_review_comments) {
                  let formData = {
                    user_id: user_id,
                    content_id: post_id,
                    content_type: "reviews",
                  };
                  dispatch(dislikeContent({ formData: formData }))
                    .then((res) => {
                      console.log("res", res);
                    })
                    .catch((er) => {
                      console.log("er", er);
                    });
                  dispatch(getFollowersContent(user_id));
                } else if (data?.users_video_comments) {
                  let formData = {
                    user_id: user_id,
                    content_id: post_id,
                    content_type: "videos",
                  };
                  dispatch(dislikeContent({ formData: formData }))
                    .then((res) => {
                      console.log("res", res);
                    })
                    .catch((er) => {
                      console.log("er", er);
                    });
                  dispatch(getFollowersContent(user_id));
                } else if (data?.users_photos_comments) {
                  let formData = {
                    user_id: user_id,
                    content_id: post_id,
                    content_type: "photos",
                  };
                  dispatch(dislikeContent({ formData: formData }))
                    .then((res) => {
                      console.log("res", res);
                    })
                    .catch((er) => {
                      console.log("er", er);
                    });
                  dispatch(getFollowersContent(user_id));
                } else if (data?.users_polls_comments) {
                  let formData = {
                    user_id: user_id,
                    content_id: post_id,
                    content_type: "polls",
                  };
                  dispatch(dislikeContent({ formData: formData }))
                    .then((res) => {
                      console.log("res", res);
                      dispatch(getFollowersContent(user_id));
                    })
                    .catch((er) => {
                      console.log("er", er);
                    });
                } else if (data?.users_status_comments) {
                  let formData = {
                    user_id: user_id,
                    content_id: post_id,
                    content_type: "status",
                  };
                  dispatch(dislikeContent({ formData: formData }))
                    .then((res) => {
                      console.log("res", res);
                      dispatch(getFollowersContent(user_id));
                    })
                    .catch((er) => {
                      console.log("er", er);
                    });
                }
              }
            }}
          >
            {data.dislikes?.includes(user_id) ? (
              <Image
                source={require("../../assets/images/Thumbs-down-org.png")}
                style={{ height: 25, width: 25 }}
              />
            ) : (
              <Image
                source={require("../../assets/images/Thumbs-down.png")}
                style={{ height: 25, width: 25 }}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.likdis}>{dislikes}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            !rvw &&
              navigation.navigate("CommentScreen", {
                data: comment,
                userId: user_id,
                postId: post_id,
                tabName: tabName,
              });
          }}
          style={styles.slignt}
        >
          <Image
            style={styles.addshricon}
            source={require("../../assets/images/addposticon.png")}
          />
          <Text style={styles.addshrtext}>{add}</Text>
        </TouchableOpacity>
        <View style={styles.slignt}>
          <Image
            style={styles.addshricon}
            source={require("../../assets/images/shareicon.png")}
          />
          <Text style={styles.addshrtext}>share</Text>
        </View>
      </View>

      {/* saveicon */}
      <View style={styles.mainright}>
        {data?.saved_photo?.includes(user_id) ||
        data?.saved_poll?.includes(user_id) ||
        data?.saved_review?.includes(user_id) ||
        data?.saved_status?.includes(user_id) ||
        data?.saved_video?.includes(user_id) ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setSavePost(false);
            }}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <MaterialCommunityIcons
              name="bookmark"
              size={28}
              color={Colors.third}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (data?.users_review_comments) {
                let formData = {
                  user_id: user_id,
                  content_id: post_id,
                  content_type: "reviews",
                };
                dispatch(saveContent({ formData: formData }))
                  .then((res) => {
                    console.log("res", res);
                  })
                  .catch((er) => {
                    console.log("er", er);
                  });
                dispatch(getFollowersContent(user_id));
              } else if (data?.users_video_comments) {
                let formData = {
                  user_id: user_id,
                  content_id: post_id,
                  content_type: "videos",
                };
                dispatch(saveContent({ formData: formData }))
                  .then((res) => {
                    console.log("res", res);
                  })
                  .catch((er) => {
                    console.log("er", er);
                  });
                dispatch(getFollowersContent(user_id));
              } else if (data?.users_photos_comments) {
                let formData = {
                  user_id: user_id,
                  content_id: post_id,
                  content_type: "photos",
                };
                dispatch(saveContent({ formData: formData }))
                  .then((res) => {
                    console.log("res", res);
                  })
                  .catch((er) => {
                    console.log("er", er);
                  });
                dispatch(getFollowersContent(user_id));
              } else if (data?.users_polls_comments) {
                let formData = {
                  user_id: user_id,
                  content_id: post_id,
                  content_type: "polls",
                };
                dispatch(saveContent({ formData: formData }))
                  .then((res) => {
                    console.log("res", res);
                    dispatch(getFollowersContent(user_id));
                  })
                  .catch((er) => {
                    console.log("er", er);
                  });
              } else if (data?.users_status_comments) {
                let formData = {
                  user_id: user_id,
                  content_id: post_id,
                  content_type: "status",
                };
                dispatch(saveContent({ formData: formData }))
                  .then((res) => {
                    console.log("res", res);
                    dispatch(getFollowersContent(user_id));
                  })
                  .catch((er) => {
                    console.log("er", er);
                  });
              }
            }}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <MaterialCommunityIcons
              name="bookmark-outline"
              size={28}
              color={Colors.grey}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.savetext}>Save</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainleft: {
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
    justifyContent: "space-between",
  },
  slignt: { alignItems: "center", justifyContent: "center" },
  likdis: {
    fontSize: RFPercentage(1.5),
    fontWeight: "600",
    color: Colors.black,
    fontFamily: FontFamily.semiBold,
  },
  addshricon: { width: RFPercentage(4), height: RFPercentage(4) },
  addshrtext: {
    fontSize: RFPercentage(1.5),
    fontWeight: "600",
    color: Colors.black,
    marginTop: RFPercentage(0.5),
    fontFamily: FontFamily.semiBold,
  },

  //save
  mainright: { width: "40%", alignItems: "flex-end", justifyContent: "center" },
  savetext: {
    fontSize: RFPercentage(1.5),
    fontWeight: "600",
    color: Colors.black,
    fontFamily: FontFamily.semiBold,
    marginRight: RFPercentage(0.5),
    marginTop: RFPercentage(0.5),
  },
});
