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
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

//config
import Colors from "../config/Colors";

export default function AppSwitch() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <Switch
      style={{ marginRight: RFPercentage(2) }}
      trackColor={{ false: Colors.lightWhite, true: Colors.third }}
      thumbColor={isEnabled ? Colors.white : Colors.third}
      ios_backgroundColor="#959595"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
}
