import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import { pollContent, postList } from '../../components/MockData/mockData'
import VideoFlatlist from '../../components/ViewProfileComponent/VideoFlatlist'

const SearchPosts = () => {
  return (
    <View style={styles.container}>
      <FlatList
            style={styles.flatlist}
            data={pollContent}
            renderItem={({ item }) => (
              <VideoFlatlist data={item} section={'Posts'} screen={null}/>
            )}
            keyExtractor={(item) => item.id}
          />
    </View>
  )
}

export default SearchPosts

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