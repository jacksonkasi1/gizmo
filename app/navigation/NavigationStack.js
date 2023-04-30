import React from "react";
import { StyleSheet, View, Text } from "react-native";

//screens
import SplashScreen from "../screens/SplashScreen";
import NotificationSetting from "../screens/NotificationSetting";
import PersonalInformationScreen from "../screens/PersonalInformationScreen";
import ModalsScreen from "../screens/ModalsScreen";
import LoginScreen from "../screens/LoginScreen";
import OTPScreen from "../screens/OTPScreen";

//navigation
import BottomTab from "./BottomTab";

//config
import Colors from "../config/Colors";
import SplashScreen2 from "../screens/SplashScreen2";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import GetOtpScreen from "../screens/GetOtpScreen";
import ForgetPassword from "../screens/ForgetPassword";
import VerifyForgetPassword from "../screens/VerifyForgetPassword";
import ResetPassword from "../screens/ResetPassword";
import SignupScreen from "../screens/SignupScreen";
import VerifySignup from "../screens/VerifySignup";
import ChooseUserNameSignup from "../screens/ChooseUserNameSignup";
import PickTopicSignup from "../screens/PickTopicSignup";
import SignupQuestion from "../screens/SignupQuestion";
import CommentScreen from "../screens/CommentScreen";
import SettingScreen from "../screens/SettingScreen";
import SecurityScreen from "../screens/SecurityScreen";
import PrivacyAndPolicyScreen from "../screens/PrivacyAndPolicyScreen";
import AboutScreen from "../screens/AboutScreen";
import SecurityPasswordScreen from "../screens/SecurityPasswordScreen";
import TopTab from "./TopTab";
import NewPostMainScreen from "../screens/NewPost/NewPostMainScreen";
import ReviewTableScreen from "../screens/NewPost/ReviewTableScreen";
import ReviewSetScreen from "../screens/NewPost/ReviewSetScreen";
import ReviewDetailScreen from "../screens/NewPost/ReviewDetailScreen";

// View profile screens of other
import ViewProfile from "../screens/ViewProfile/ViewProfile";
import PhotoDetails from "../screens/ViewProfile/PhotoDetails";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VideoDetailsScreen from "../screens/ViewProfile/VideoDetailsScreen";
import EditProfile from "../screens/ViewProfile/EditProfile";
import LikeScreen from "../screens/LikeScreen/LikeScreen";
import SaveScreen from "../screens/SavedScreen/Save.Screen";
import ReviewMain from "../screens/Review/ReviewMain";
import WatchHistoryScreen from "../screens/WatchHistoryScreen/WatchHistoryScreen";
import ComingSoon from "../screens/ComingSoon";

const Stack = createNativeStackNavigator();

export default function ScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SplashScreen"
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SplashScreen2" component={SplashScreen2} />
      <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
      />
      <Stack.Screen name="ComingSoon" component={ComingSoon} />

      <Stack.Screen
        name="PersonalInformationScreen"
        component={PersonalInformationScreen}
      />
      <Stack.Screen name="ModalsScreen" component={ModalsScreen} />
      {/* AuthScreen */}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="GetOtpScreen" component={GetOtpScreen} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen
        name="VerifyForgetPassword"
        component={VerifyForgetPassword}
      />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="VerifySignup" component={VerifySignup} />
      <Stack.Screen
        name="ChooseUserNameSignup"
        component={ChooseUserNameSignup}
      />
      <Stack.Screen name="PickTopicSignup" component={PickTopicSignup} />
      <Stack.Screen name="SignupQuestion" component={SignupQuestion} />
      {/* HomeScreen */}
      <Stack.Screen name="CommentScreen" component={CommentScreen} />
      {/* Drawer Screen */}
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
      <Stack.Screen
        name="PrivacyAndPolicyScreen"
        component={PrivacyAndPolicyScreen}
      />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      {/* Security Screen  */}
      <Stack.Screen
        name="SecurityPasswordScreen"
        component={SecurityPasswordScreen}
      />
      {/* New POst Screen */}
      <Stack.Screen name="NewPostMainScreen" component={NewPostMainScreen} />
      <Stack.Screen name="ReviewSetScreen" component={ReviewSetScreen} />
      <Stack.Screen name="ReviewTableScreen" component={ReviewTableScreen} />
      <Stack.Screen name="ReviewDetailScreen" component={ReviewDetailScreen} />
      {/* View profile main of others */}
      <Stack.Screen name="ViewProfileMain" component={ViewProfile} />
      <Stack.Screen name="PhotoDetailsScreen" component={PhotoDetails} />
      <Stack.Screen name="VideoDetailsScreen" component={VideoDetailsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />

      {/* Like Screen Stacks */}
      <Stack.Screen name="LikeScreen" component={LikeScreen} />

      {/* Save Screen Stacks */}
      <Stack.Screen name="SaveScreen" component={SaveScreen} />

      {/* View Review */}
      <Stack.Screen name="ReviewMain" component={ReviewMain} />

      {/* WatchHistory Screen Stacks */}
      <Stack.Screen name="WatchHistory" component={WatchHistoryScreen} />
    </Stack.Navigator>
  );
}
