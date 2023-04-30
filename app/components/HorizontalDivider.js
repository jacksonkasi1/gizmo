import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../config/Colors'

const HorizontalDivider = () => {
  return (
    <View>
    <View style={styles.horizontalLine}/>
    </View>
  )
}

export default HorizontalDivider

const styles = StyleSheet.create({
    horizontalLine:{
        alignSelf:'center',
        marginTop:10,
        borderColor:Colors.lightPlaceHolder,
        borderWidth:0.5,
        width:'98%'
    }
})