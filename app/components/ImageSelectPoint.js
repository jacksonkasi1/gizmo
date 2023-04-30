import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text,FlatList,ScrollView,ImageBackground } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';


//config
import Colors from '../config/Colors'
import { FontFamily } from '../config/font';

export default function ImageSelectPoint({image,title,subtitle}) {
  return (
    <View style={{flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between',marginTop:RFPercentage(2)}}>
    <View style={{width:RFPercentage(6),height:RFPercentage(6),borderRadius:RFPercentage(1)}}>
         <Image style={{ width:RFPercentage(6), height: RFPercentage(6) }} source={image} />
    </View>
    <View
      style={{width:'80%',height:RFPercentage(6),alignItems:'center',justifyContent:'space-between',flexDirection:'row',
                 borderWidth:RFPercentage(0.1),borderColor:Colors.white,borderRadius:RFPercentage(1),paddingHorizontal:RFPercentage(1.5)}}>
        
           <View>
          <Text style={{fontSize:RFPercentage(2),fontWeight:'400',color:Colors.black,lineHeight:RFPercentage(3),fontFamily:FontFamily.regular}}> 
                {title}
           </Text>
           </View>
           <View>
           <Text style={{fontSize:RFPercentage(2),fontWeight:'400',color:Colors.black,lineHeight:RFPercentage(3),fontFamily:FontFamily.regular}}> 
                {subtitle}
           </Text>
           
        </View>
    </View>
 </View>
  )
}