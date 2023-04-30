import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Colors from '../../config/Colors'
import { AntDesign } from '@expo/vector-icons';
import { FontFamily, FontSizes } from '../../config/font'

const ViewProfileTopContainer = (props) => {
    return (
        <View style={styles.container}>
            {/* profilePicture section */}
            <View style={styles.profileContainer}>
                <View style={styles.image}>
                    <Image source={props.profileImage} style={styles.profileImage} />
                </View>
                <View style={styles.nameSection}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.name}>{props.name}</Text>
                        {props.verified ?
                            <AntDesign name="checkcircle" size={24} color="#56BA6A" style={styles.verifiedCircle}/>
                            :
                            null
                        }
                    </View>
                    <Text style={styles.followerVideoStyle}>{props.followers}{'\b'}Folowers{'\b\u2022\b'}{props.videos}Videos</Text>
                </View>
            </View>
            <View style={styles.profileBottomSection}>
                <Text style={styles.rankText}>{props.rank}{' '}</Text>
                <Text style={styles.monthlyViewerText}>{props.monthlyViewer}</Text>
            </View>
            <Text style={styles.tags}>{props.tags}</Text>
        </View>
    )
}

export default ViewProfileTopContainer

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    profileContainer: {
        flexDirection: 'row',
    },
    image: {
        alignSelf: 'center',
        marginLeft: '5%',
    },
    profileImage: {
        height: 100,
        width: 100,
        resizeMode: 'contain'
    },
    nameSection: {
        alignSelf: 'center',
        marginLeft: '3%',
    },
    name: {
        color: Colors.black,
        fontFamily: FontFamily.bold,
        fontSize: FontSizes.regular,
    },
    verifiedCircle:{
        alignSelf:'center',
        marginLeft:'5%',
    },
    followerVideoStyle: {
        marginTop: '1%',
        color: Colors.darkGrey,
        fontSize: FontSizes.smaller,
        fontFamily: FontFamily.medium,
    },
    profileBottomSection: {
        alignSelf: 'center',
        flexDirection: 'row',
    },
    rankText: {
        alignSelf: 'center',
        textAlign: 'center',
        color: Colors.third,
        fontSize: FontSizes.smaller,
        fontFamily: FontFamily.semiBold,
    },
    monthlyViewerText: {
        alignSelf: 'center',
        textAlign: 'center',
        color: Colors.darkGrey,
        fontSize: FontSizes.smaller,
        fontFamily: FontFamily.semiBold,
    },
    tags: {
        alignSelf: 'center',
        fontSize: FontSizes.small,
        color: Colors.black,
        marginTop: 5,
        fontFamily: FontFamily.medium
    }
})