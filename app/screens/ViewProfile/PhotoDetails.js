import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React,{useState}from 'react'
import CustomHeader from '../../components/CustomHeader'
import { RFPercentage } from "react-native-responsive-fontsize";
import { postList } from '../../components/MockData/mockData'
import Screen from "../../components/Screen";
import PhotoCard from '../../components/PhotoCard'

const PhotoDetails = ({ navigation, route }) => {
  const { name } = route.params
  const [list, setList] = useState(postList);
  const [bottomModal, setBottomModal] = useState(false);
  return (
    <Screen style={styles.container}>
      <CustomHeader
        backButton={() => navigation.goBack()}
        headerName={name}
        rightbutton={false}
      />
       <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
      >
      {list.map((itm, indx) => (
        <View style={{ width: "100%", alignItems: "center" }} key={indx}>
          <PhotoCard
            style={{ marginTop: RFPercentage(3) }}
            profileImage={itm.profileImage}
            mainImage={itm.mainImage}
            title={itm.title}
            subtitle={itm.subtitle}
            likes={itm.likes}
            dislikes={itm.dislikes}
            add={itm.add}
            content={itm.content}
            navigation={navigation}
            poll={false}
            pollContent={itm.pollContent}
            review={false}
            video={false}
            views={false}
            post={false}
            hashTag={false}
            setBottomModalVisible={setBottomModal}
            modalVisible={bottomModal}
            watched={false}
            data={itm}
          />
        </View>
      ))}
      </ScrollView>
    
    </Screen>
  )
}

export default PhotoDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff'
  }
})