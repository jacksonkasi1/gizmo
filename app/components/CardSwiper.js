import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text,FlatList,ScrollView } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import Swiper from 'react-native-swiper'

//config
import Colors from '../config/Colors'

export default function CardSwiper() {
  return (
    <View style={{width:'100%',height:RFPercentage(30),backgroundColor:Colors.grey,marginTop:RFPercentage(3),marginBottom:RFPercentage(3)}}>
    <Swiper activeDotColor={Colors.white} style={{}} >
         
      <View style={{justifyContent:'center',alignItems:'center'}}>
    <Image
          style={{
              width: '100%',
              height: RFPercentage(30),
          }}
          source={require('../../assets/images/sliderpic.png')} />
          </View>
          <View style={{justifyContent:'center',alignItems:'center'}}>
    <Image
          style={{
              width: '100%',
              height: RFPercentage(30),
          }}
          source={require('../../assets/images/sliderpic.png')} />
          </View>
          <View style={{justifyContent:'center',alignItems:'center'}}>
    <Image
          style={{
              width: '100%',
              height: RFPercentage(30),
          }}
          source={require('../../assets/images/sliderpic.png')} />
          </View>
      </Swiper>

    </View>
  )
}