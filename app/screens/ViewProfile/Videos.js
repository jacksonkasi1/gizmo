import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Recent from "./Recent";
import Popular from "./Popular";
import Oldest from "./Oldest";
import moment from "moment";
import VideoFlatlist from "../../components/ViewProfileComponent/VideoFlatlist";
import { videoData } from "../../components/MockData/mockData";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getLikeContent, getSavedContent } from "../../../redux/slices/videoSlice";
import { selectUserId } from "../../../redux/slices/userSlice";

const Videos = ({ data, id, screenName, route }) => {
  const { screen } = route.params;
  const dispatch = useDispatch();
  const status = ["Recent", "Popular", "Oldest"];
  const [index, setIndex] = useState(0);
  const likedVideos =useSelector((state)=>state.video.likedVideo) 
  const savedVideos =useSelector((state)=>state.video.savedVideo) 
  const userId = useSelector(selectUserId);
  // console.log("screen", screen,savedVideos)

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        if (screen === "Like") {
          console.log("like")
          let form = {
            user_id: userId,
            content_type: "videos",
          };
          dispatch(getLikeContent({ formData: form }))
        }
       else if (screen === "Saved") {
          console.log("save")
          let form = {
            user_id: userId,
            content_type: "videos",
          };
          dispatch(getSavedContent({ formData: form }))
        }
      };
      fetchData()
    },[screen,userId]))
  // console.log("liked", likedVideos)
  return (
    <View>
      {screenName !== undefined ? (
        <>
          <View style={styles.container}>
            {status.length &&
              status.map((e, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={styles.tabBox}
                    activeOpacity={1}
                    underlayColor=""
                    onPress={() => {
                      setIndex(i);
                    }}
                  >
                    <View
                      style={[
                        styles.tabButton,
                        index === i && styles.tabButtonActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.tabText,
                          index === i && styles.tabTextActive,
                        ]}
                      >
                        {e}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
          {index === 0 && (
            <Recent
              id={id}
              data={data}
              status={"Recent"}
              screenName={screenName}
            />
          )}
          {index === 1 && (
            <Popular
              id={id}
              data={data}
              status={"Popular"}
              screenName={screenName}
            />
          )}
          {index === 2 && (
            <Oldest
              id={id}
              data={data}
              status={"Oldest"}
              screenName={screenName}
            />
          )}
        </>
      ) : (
        <View>
          <FlatList
            style={styles.flatlist}
            data={screen=='Like'?likedVideos:screen==='Saved'?savedVideos:videoData}
            renderItem={({ item }) => (
              <VideoFlatlist data={item} section={"Video"} screen={screen} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
};

export default Videos;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    marginTop: "3%",
    marginBottom: "2%",
  },
  tabHead: {
    flexDirection: "row",
    alignSelf: "center",
    padding: 10,
    width: windowWidth / 1,
  },
  tabBox: {},
  tabButton: {
    borderRadius: 100 / 2,
    width: windowWidth / 4.8,
    height: 40,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#EF7E46",
    backgroundColor: "#fef8f5",
    borderWidth: 1,
    marginLeft: 10,
  },
  tabButtonActive: {
    borderRadius: 100 / 2,
    width: windowWidth / 4.8,
    height: 40,
    padding: 5,
    borderColor: "#EF7E46",
    borderWidth: 1,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF7E46",
  },
  tabTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  tabText: {
    color: "#EF7E46",
    fontWeight: "600",
  },
  tabContainer: {
    flex: 1,
    width: windowWidth / 1,
  },
  flatlist: {
    padding: 10,
    width: windowWidth / 1,
  },
});
