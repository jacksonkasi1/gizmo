import React, { useState } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
  Switch,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import AppButton from "../components/AppButton";

//Components
import HeaderMode from "../components/HeaderMode";
import InputField from "../components/InputField";
import MainHeader from "../components/MainHeader";
import Screen from "../components/Screen";

//config
import Colors from "../config/Colors";
import { Spaces } from "../config/font";

export default function PersonalInformationScreen(props) {
  const [disabled, setDisabled] = useState(true);
  const informationList = [
    {
      id: "1",
      title: "Enter Email",
    },
    {
      id: "2",
      title: "Mobile Number",
    },
    {
      id: "3",
      title: "Gender",
    },
    {
      id: "4",
      title: "Date of Birth",
    },
  ];
  return (
    <Screen style={styles.screen}>
      {/* headerComponent */}
      <MainHeader
        prevScreen="HomeScreen"
        bottmTabScreen={true}
        title="Personal Information"
        navigation={props.navigation}
        noThirdIcon={true}
      />

      {/* InputFields */}
      <View
        style={{
          width: "100%",
          backgroundColor: Colors.purewhite,
          zIndex: 99,
        }}
      >
        <FlatList
          scrollEnabled={false}
          style={styles.flatstylinput}
          data={informationList}
          keyExtractor={(informationList) => informationList.id.toString()}
          showsVerticalScrollIndicator={false}
          vertical
          renderItem={({ item }) => (
            <View style={styles.inputmain}>
              <InputField
                placeholder={item.title}
                disabled={item.title == "Mobile Number" ? true : disabled}
              />
            </View>
          )}
        />
      </View>

      {disabled ? (
        <TouchableOpacity
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: RFPercentage(3),
            position: "absolute",
            bottom: Spaces.small,
            zIndex: -999,
          }}
          activeOpacity={0.7}
        >
          <AppButton
            title="EDIT"
            bgColor={Colors.third}
            txtColor={Colors.purewhite}
            btnWidth="90%"
            btnFunc={() => setDisabled(!disabled)}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: RFPercentage(3),
            position: "absolute",
            bottom: Spaces.small,
            zIndex: -999,
          }}
          activeOpacity={0.7}
        >
          <AppButton
            title="UPDATE"
            bgColor={Colors.third}
            txtColor={Colors.purewhite}
            btnWidth="90%"
            btnFunc={() => setDisabled(!disabled)}
          />
        </TouchableOpacity>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.purewhite,
  },

  //inputfield
  inputmain: {
    marginTop: Spaces.medium,
    alignItems: "center",
    justifyContent: "center",
  },
  flatstylinput: { width: "100%", marginTop: RFPercentage(5), flexGrow: 0 },

  //header
  headermain: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: RFPercentage(4),
  },

  //button
  buttonedit: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: RFPercentage(4),
  },
});
