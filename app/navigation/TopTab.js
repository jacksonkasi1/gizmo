import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";
import Colors from "../config/Colors";
import { FontSizes, Spaces } from "../config/font";
import PhotoShareScreen from "../screens/NewPost/PhotoShare";
import PollShareScreen from "../screens/NewPost/PollShare";
import ReviewShareScreen from "../screens/NewPost/ReviewShare";
import StatusShareScreen from "../screens/NewPost/StatusShare";
import VideoShareScreen from "../screens/NewPost/VideoShare";

const Tab = createMaterialTopTabNavigator();
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function TopTab() {
  return (
    <Tab.Navigator
      initialRouteName="VideoShareScreen"
      screenOptions={{
        style: { height: 40 },
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: Colors.primary,
          height: 2,
        },
        tabBarLabelStyle: {
          fontSize: FontSizes.regular,
          color: Colors.black,
          textTransform: "capitalize",
        },
      }}
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="VideoShareScreen"
        component={VideoShareScreen}
        options={{ tabBarLabel: "Videos" }}
      />
      <Tab.Screen
        name="PhotoShareScreen"
        component={PhotoShareScreen}
        options={{ tabBarLabel: "Photos" }}
      />

      <Tab.Screen
        name="StatusShareScreen"
        component={StatusShareScreen}
        options={{ tabBarLabel: "Status" }}
      />
      <Tab.Screen
        name="ReviewShareScreen"
        component={ReviewShareScreen}
        options={{ tabBarLabel: "Reviews" }}
      />
      <Tab.Screen
        name="PollShareScreen"
        component={PollShareScreen}
        options={{ tabBarLabel: "Polls" }}
      />
    </Tab.Navigator>
  );
}
