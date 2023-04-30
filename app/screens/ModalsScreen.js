import React, { useState } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text,FlatList,Switch,Modal} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import AppButton from '../components/AppButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Components
import Screen from '../components/Screen'
import AppModal from '../components/AppModal';
import DoubleButton from '../components/DoubleButton';
import IconTitle from '../components/IconTitle';

//config
import Colors from '../config/Colors'
import { FontFamily } from '../config/font';

export default function ModalsScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [secmodalVisible, setSecModalVisible] = useState(false);
    const [thirdmodalVisible, setThirdModalVisible] = useState(false);
    const [fourthmodalVisible, setFourthModalVisible] = useState(false);


  return (
<Screen style={styles.screen}>

    <TouchableOpacity activeOpacity={0.7}  onPress={() => setModalVisible(true)}>
      <Text style={{fontWeight:'600',fontSize:RFPercentage(2),fontFamily:FontFamily.semiBold}}>Password Update Modal </Text>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.7} style={{marginTop:RFPercentage(4)}} onPress={() => setSecModalVisible(true)}>
      <Text style={{fontWeight:'600',fontSize:RFPercentage(2),fontFamily:FontFamily.semiBold}}>Skip SignUp Modal</Text>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.7} style={{marginTop:RFPercentage(4)}} onPress={() => setThirdModalVisible(true)}>
      <Text style={{fontWeight:'600',fontSize:RFPercentage(2),fontFamily:FontFamily.semiBold}}>Gizmo Notification Modal</Text>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.7} style={{marginTop:RFPercentage(4)}} onPress={() => setFourthModalVisible(true)}>
      <Text style={{fontWeight:'600',fontSize:RFPercentage(2),fontFamily:FontFamily.semiBold}}>Three dot Modal</Text>
    </TouchableOpacity>

{/* category creation Modal */}

  <AppModal modalVisible={modalVisible} setModalVisible={setModalVisible} style={{justifyContent:'center'}}>
                <Ionicons
                    name="checkmark-circle"
                    size={100}
                    color={ Colors.green}
                  />
                  <View style={styles.firmainboltext}>
                    <Text style={styles.firboldtext}>
                           Password Updated
                     </Text>
                    <View style={styles.firlighttextmain}>
                     <Text style={styles.firlighttext}>
                            Your Password has been updated
                                   successfully.
                     </Text>
                     </View>
                </View>

                   {/* button */} 
           <TouchableOpacity activeOpacity={0.7} onPress={() => setModalVisible(!modalVisible)} 
                     style={styles.firbuttonmaincon}>
                    
                        <Text style={styles.firbuttontext}>
                            Continue
                        </Text>
                    
            </TouchableOpacity>

     </AppModal>

     {/* 2nd modal */}
     <AppModal modalVisible={secmodalVisible} setModalVisible={setSecModalVisible} style={{justifyContent:'center'}} >
                <Ionicons
                    name="alert-circle"
                    size={100}
                    color={ Colors.red}
                  />
                  <View style={styles.secboldtextmain}>
                    <Text style={styles.secboldtext}>
                            Skip Signup
                     </Text>
                    <View style={styles.seclighttextmain}>
                     <Text style={styles.seclighttext}>
                             Are you sure you want to
                                 skip the signup?
                     </Text>
                     </View>
                </View>

                   {/* button */} 
                   <View style={styles.secbuttonmain}>
                      <DoubleButton firstbutton='Sign Up' secondbutton='Skip Now'
                         modalVisible={secmodalVisible} setModalVisible={setSecModalVisible}/>
                   </View>

     </AppModal>

      {/* 3nd modal */}
      <AppModal modalVisible={thirdmodalVisible} setModalVisible={setThirdModalVisible} style={{justifyContent:'center'}}>
                
                  <View style={styles.thrmain}>
                  <View style={styles.thrtextmain}>
                    <Text style={styles.thrboldtext}>
                           “GIZMO” would like to send
                                you notification
                     </Text>
                     </View>
                    <View style={styles.thrlighttextmain}>
                     <Text style={styles.thrlighttext}>
                              Notifications may include alerts,
                               sounds, and icon badges. these can  
                                   be configured in settings.
                     </Text>
                     </View>
                </View>

                   {/* button */} 
                   <View style={styles.thrbuttonmain}>
                      <DoubleButton firstbutton='Don’t Allow' secondbutton='Allow'
                             modalVisible={thirdmodalVisible} setModalVisible={setThirdModalVisible}/>
                   </View>

     </AppModal>

     {/* 4th modal */}
     <AppModal modalVisible={fourthmodalVisible} setModalVisible={setFourthModalVisible} style={{justifyContent:'flex-end'}}>
                
                <TouchableOpacity activeOpacity={0.7} style={styles.modallineclose} 
                     onPress={() => setFourthModalVisible(!fourthmodalVisible)}/>
                <TouchableOpacity activeOpacity={0.7} onPress={() => setFourthModalVisible(!fourthmodalVisible)} style={styles.formain}>
                      <IconTitle image={require('../../assets/images/sadicon.png')} title='Not Interested'/>
                </TouchableOpacity>
                
                <TouchableOpacity activeOpacity={0.7} onPress={() => setFourthModalVisible(!fourthmodalVisible)} style={styles.formain}>
                      <IconTitle image={require('../../assets/images/xpersonicon.png')} title='Unfollow Albert Flores'/>
                 </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} onPress={() => setFourthModalVisible(!fourthmodalVisible)} style={styles.formain}>
                      <IconTitle image={require('../../assets/images/reporticon.png')} title='Report'/>
                 </TouchableOpacity>
                 
   </AppModal>
      
        
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen:{ flex: 1, justifyContent: 'center',
    alignItems:'center',backgroundColor: Colors.white },

    //1st modal
    firmainboltext:{alignItems:'center',justifyContent:'center',marginTop:RFPercentage(1)},
    firboldtext:{ color: Colors.black, fontSize: RFPercentage(2.5), fontWeight:'700',fontFamily:FontFamily.semiBold },
    firlighttextmain:{marginTop:RFPercentage(5),alignContent:'center',justifyContent:'center'},
    firlighttext:{ color: Colors.grey, fontSize: RFPercentage(2), fontWeight:'500',textAlign:'center',
    lineHeight:RFPercentage(3),fontFamily:FontFamily.regular },
    firbuttonmaincon:{ marginBottom:RFPercentage(2),marginTop:RFPercentage(3), width: RFPercentage(35), height: RFPercentage(6),
      borderRadius: RFPercentage(1), alignItems: 'center', justifyContent: 'center',
      backgroundColor:Colors.third},
    firbuttontext:{ color: Colors.white, fontSize: RFPercentage(2.2), fontWeight:'700',fontFamily:FontFamily.semiBold },
    
    //2nd modal
    secboldtextmain:{alignItems:'center',justifyContent:'center',marginTop:RFPercentage(1)},
    secboldtext:{ color: Colors.black, fontSize: RFPercentage(2.5), fontWeight:'700',fontFamily:FontFamily.semiBold },
    seclighttextmain:{width:'70%',marginTop:RFPercentage(5),alignContent:'center',justifyContent:'center'},
    seclighttext:{ color: Colors.grey, fontSize: RFPercentage(2), fontWeight:'500',fontFamily:FontFamily.regular,
    textAlign:'center',lineHeight:RFPercentage(3) },
    secbuttonmain:{width:'100%',marginTop:RFPercentage(3.5),marginBottom:RFPercentage(1),alignItems:'center',justifyContent:'center'},

    //3rd modal
    thrmain:{alignItems:'center',justifyContent:'center',marginTop:RFPercentage(2)},
    thrtextmain:{width:'90%',alignContent:'center',justifyContent:'center'},
    thrboldtext:{ color: Colors.black, fontSize: RFPercentage(2.5), fontWeight:'700',
             textAlign:'center',lineHeight:RFPercentage(3),fontFamily:FontFamily.semiBold },
    thrlighttextmain:{width:'90%',marginTop:RFPercentage(5),alignContent:'center',justifyContent:'center'},
    thrlighttext:{ color: Colors.grey, fontSize: RFPercentage(2), fontWeight:'500',
           textAlign:'center',lineHeight:RFPercentage(3),fontFamily:FontFamily.regular },
    thrbuttonmain:{width:'100%',marginTop:RFPercentage(3.5),marginBottom:RFPercentage(1),alignItems:'center',justifyContent:'center'},
    
    // 4rthmodal
    modallineclose:{width:RFPercentage(10),height:RFPercentage(0.5),
      backgroundColor:Colors.third,borderRadius:RFPercentage(4),position:'absolute',top:20},

    formain:{width:'100%'},


})