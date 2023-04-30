import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import { postList, videoData } from '../../components/MockData/mockData'
import VideoFlatlist from '../../components/ViewProfileComponent/VideoFlatlist'

const SearchVideo = () => {
  return (
    <View style={styles.container}>
      <FlatList
            style={styles.flatlist}
            data={postList}
            renderItem={({ item }) => (
              <VideoFlatlist data={item} section={'VideoAnother'} screen={null}/>
            )}
            keyExtractor={(item) => item.id}
          />
    </View>
  )
}

export default SearchVideo

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  flatlist:{
    flex:1,
    margin:10,
    padding:10,
  }
})