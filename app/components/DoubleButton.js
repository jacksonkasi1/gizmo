import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text,FlatList,Switch,Modal} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import AppButton from '../components/AppButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

//config
import Colors from '../config/Colors'
import { FontFamily } from '../config/font';

export default function DoubleButton({firstbutton,secondbutton,setModalVisible,modalVisible}) {
  return (
    <View style={{width:Platform.OS === 'ios' ?'90%':'100%',flexDirection:'row',justifyContent:'space-between'}}>
                       <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(!modalVisible)} 
                                 style={styles.firbutmain}>
                                
                                    <Text style={styles.firbuttontext}>
                                        {firstbutton}
                                    </Text>
                                 
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(!modalVisible)} 
                                 style={styles.secdbutton}>
                                
                                    <Text style={styles.secdbuttontext}>
                                        {secondbutton}
                                    </Text>
                                 
                        </TouchableOpacity>
         </View>
  )
}

const styles = StyleSheet.create({
  firbutmain:{ width: RFPercentage(17), height: RFPercentage(6),
    borderRadius: RFPercentage(1), alignItems: 'center', justifyContent: 'center',
    backgroundColor:Colors.white},
  firbuttontext:{ color: Colors.grey, fontSize: RFPercentage(2.2), fontWeight:'700',fontFamily:FontFamily.semiBold },
  secdbutton:{ width: RFPercentage(17), height: RFPercentage(6),
    borderRadius: RFPercentage(1), alignItems: 'center', justifyContent: 'center',
    backgroundColor:Colors.third},
  secdbuttontext:{ color: Colors.white, fontSize: RFPercentage(2.2), fontWeight:'700',fontFamily:FontFamily.semiBold },
})