import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text,FlatList,Switch,Modal} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import AppButton from '../components/AppButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

//config
import Colors from '../config/Colors'
import { FontFamily } from '../config/font';

export default function IconTitle({image,title}) {
  return (
    <View style={{width:'100%',flexDirection:'row',marginTop:RFPercentage(2),alignItems:'center'}}>
                    
    <TouchableOpacity activeOpacity={0.7} 
        style={{ alignItems:'center',
                justifyContent:'center',width:RFPercentage(6),height:RFPercentage(6),
                borderRadius:RFPercentage(4),backgroundColor:Colors.white}}>
       <Image
        style={{
            width: RFPercentage(3.5),
            height: RFPercentage(3.5),
        }}
        source={image} />
    </TouchableOpacity>
    <View>
    <Text style={{ color: Colors.grey, fontSize: RFPercentage(2.5), fontWeight:'500',marginLeft:RFPercentage(2),fontFamily:FontFamily.regular}}>
          {title}
       </Text>
       </View>
       
 </View>
  )
}