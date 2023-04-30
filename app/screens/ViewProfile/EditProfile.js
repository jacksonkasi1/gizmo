import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {FontSizes,FontFamily} from '../../config/font'
import Colors from '../../config/Colors'
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const EditProfile = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [name,setName]=useState('')
  const [username,setUsername]=useState('')
  const [bio,setBio]=useState('')
  const [bs64, setBs64] = useState("");
  const [ext, setExt] = useState("");
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library

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
  };
  return (
    <View style={styles.container}>
      {/* header section */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign
            name="left"
            size={26}
            color={"#ef7e46"}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.headerName}>Edit Profile</Text>
      </View>
      {/* profile picture section */}
      <View>
        <Image source={{uri: image!==null?image:'https://dbkpop.com/wp-content/uploads/2020/09/enhypen_official_profile_Heesung_1.jpg'}} style={styles.profilePic}/>
        <Text onPress={()=>pickImage()} style={styles.editText}>Edit profile</Text>
      </View>
      <View>
        <TextInput
        style={styles.textInput}
        placeholder="Name"
        placeholderTextColor={'grey'}
        value={name}
        onChangeText={(e)=>setName(e)}
        />
            <TextInput
        style={[styles.textInput,{marginTop:'3%'}]}
        placeholder="Username"
        placeholderTextColor={'grey'}
        value={username}
        onChangeText={(e)=>setUsername(e)}
        />
            <TextInput
        style={[styles.textInput,{marginTop:'3%',height:100,textAlignVertical:'top'}]}
        placeholder="Bio"
        placeholderTextColor={'grey'}
        value={bio}
        onChangeText={(e)=>setBio(e)}
        />
      </View>
      <TouchableOpacity onPress={()=>{}} style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: width / 1,
    flexDirection: "row",
    alignSelf: "flex-start",
    padding: 10,
    margin: 10,
  },
  backButton: {
    height: 50,
    width: 50,
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
    fontFamily:FontFamily.regular,
    marginLeft: "5%",
    textAlign: "center",
  },
  profilePic:{
    alignSelf:'center',
    height:100,
    width:100,
    borderRadius:100/2
  },
  editText:{
    alignSelf:'center',
    fontSize:FontSizes.small,
    fontFamily:FontFamily.medium,
    color:Colors.third,
    marginTop:'3%'
  },
  textInput:{
    width:'90%',
    marginTop:'10%',
    height:50,
    borderBottomWidth:1,
    borderBottomColor:'transparent',
    backgroundColor:'#f4f4f4',
    alignSelf:'center',
    padding:10,
    borderRadius:5
  },
  button:{
    alignSelf:'center',
    position:'absolute',
    bottom:20,
    padding:10,
    borderRadius:5,
    width:'80%',
    backgroundColor:Colors.third,
  },
  buttonText:{
    alignSelf:'center',
    fontSize:FontSizes.regular,
    fontFamily:FontFamily.medium,
    color:Colors.white,
  }
});
