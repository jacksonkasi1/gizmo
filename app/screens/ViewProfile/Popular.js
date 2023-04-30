import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import VideoFlatlist from "../../components/ViewProfileComponent/VideoFlatlist";
import {
  photoData,
  videoData,
  statusData,
  pollData,
  reviewData,
  postList,
  pollContent,
} from "../../components/MockData/mockData";
import { useNavigation } from "@react-navigation/native";
import { useGetUserVideoQuery } from "../../../redux/api/apiSlice";

const Popular = ({ data, status, name, id }) => {
  const {
    data: vdData,
    isLoading,
    isSuccess,
  } = useGetUserVideoQuery({ user_id: id });
  useEffect(() => {
    // console.log("oye", vdData);
  });
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {data === "Video" ||
      data === "Poll" ||
      (data === "Status") | (data === "Review") ? (
        <FlatList
          style={styles.flatlist}
          data={
            data === "Video"
              ? vdData && vdData.data
              : data === "Status"
              ? postList
              : data === "Review"
              ? postList
              : pollContent
          }
          renderItem={({ item }) => (
            <VideoFlatlist data={item} section={data} />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : null}
      {data === "Photo" ? (
        <>
          <View style={styles.photoContainer}>
            {photoData?.map((i) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("PhotoDetailsScreen", { name: name })
                  }
                >
                  <Image style={styles.photoImage} source={i?.image} />
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      ) : null}
    </View>
  );
};

export default Popular;

const windowW = Dimensions.get("window").width;
const windowH = Dimensions.get("window").height;
const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
    padding: 10,
    width: windowW / 1,
  },
  photoContainer: {
    marginTop: "1%",
    marginLeft: "1%",
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  photoImage: {
    width: 95,
    height: 95,
    margin: 1,
    borderRadius: 10,
  },
});
