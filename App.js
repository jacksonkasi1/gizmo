import React, { useEffect } from "react";
import { StyleSheet, View, Text, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
//React-redux
import { Provider } from "react-redux";
//navigation
import { store } from "./redux/store";
import SideDrawer from "./app/navigation/SideDrawer";
import { ActivityIndicator } from "react-native-paper";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,

    Poppins_500Medium,

    Poppins_600SemiBold,

    Poppins_700Bold,
  });
  return fontsLoaded ? (
    <Provider store={store}>
      <NavigationContainer>
        <SideDrawer />
      </NavigationContainer>
    </Provider>
  ) : (
    <ActivityIndicator 
    style={{alignSelf:'center',justifyContent:'center'}}
    />
  );
}


