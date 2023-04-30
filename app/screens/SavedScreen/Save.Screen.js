import { StyleSheet, Text, View, Dimensions, TouchableOpacity,Image } from 'react-native'
import React,{useState} from 'react'
import Screen from '../../components/Screen'
import Colors from "../../config/Colors";
import { RFPercentage } from "react-native-responsive-fontsize";
import BottomModal from "../../components/BottomModal";
import { FontFamily, FontSizes } from '../../config/font'
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from'@expo/vector-icons/Feather'
import ProfileTopTab from '../../navigation/ProfileTopTab'

const SaveScreen = ({navigation}) => {
    const [bottomModal2, setBottomModal2] = useState(false);
    const bottomList = [
      {
        id: 1,
        imageSource: require("../../../assets/images/delete.png"),
        text: "Clear all Saved history",
      },
    ];
    const more = (name) => {
      if (name == 'Clear') {
        console.log("cleared")
      }
    }
    const handlePress = (itm) => {
      // console.log(props);
      switch (itm.text) {
        case "Clear":
          // console.log("fdsg");
          {
            setBottomModal2(!bottomModal2);
            more('Clear')
          }
          break;
        default:
          break;
      }
    };
    return (
        <Screen styles={styles.container}>
            {/* header Section */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <AntDesign
                        name="left"
                        size={26}
                        color={"#ef7e46"}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <Text style={styles.headerName}>Saved</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => {setBottomModal2(true)}}>
                    <Feather name='more-vertical' size={24} color={'#ef7e46'} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <ProfileTopTab screen={'Saved'}/>
            <BottomModal
        modalVisible={bottomModal2}
        setBottomModalVisible={setBottomModal2}
      >
        <View
          style={{
            marginTop: RFPercentage(1),
            alignSelf: "flex-start",
          }}
        >
          {bottomList.map((itm, indx) => (
            <TouchableOpacity
              key={indx}
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "80%",
                padding: 15,
                marginLeft: RFPercentage(-2.5),
              }}
              onPress={() => {
                handlePress(itm);
              }}
            >
              <Image
                style={{
                  width: RFPercentage(2.7),
                  height: RFPercentage(3),
                }}
                source={itm.imageSource}
              />
              <Text
                style={{
                  fontFamily: FontFamily.medium,
                  textAlign: "left",
                  textAlignVertical: "center",
                  marginLeft: RFPercentage(2),
                  color: Colors.grey,
                }}
              >
                {itm.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </BottomModal>
        </Screen>
    )
}

export default SaveScreen
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        backgroundColor: '#fff',
        width: windowWidth / 1,
        flexDirection: "row",
        alignSelf: "flex-start",
        padding: 5,
        // margin: 10,
    },
    backButton: {
        height: 50,
        width: 50,
        marginTop: '3%',
        marginLeft: '3%',
        borderRadius: 100 / 2,
        elevation: 5,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    icon: {
        alignSelf: "center",
    },
    headerName: {
        alignSelf: "center",
        fontSize: 22,
        fontWeight: "bold",
        color: "#000",
        width: "65%",
        marginTop: '3%',
        fontFamily: FontFamily.regular,
        marginLeft: "2%",
        textAlign: "center",
    },
})