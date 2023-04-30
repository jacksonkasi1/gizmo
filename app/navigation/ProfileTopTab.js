import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";
import Colors from "../config/Colors";
import { FontSizes, Spaces } from "../config/font";
import Videos from "../screens/ViewProfile/Videos";
import Photo from "../screens/ViewProfile/Photo";
import Status from "../screens/ViewProfile/Status";
import Review from "../screens/ViewProfile/Review";
import Poll from "../screens/ViewProfile/Poll";

const Tab = createMaterialTopTabNavigator();
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function TopTab({screen}) {
  return (
    <Tab.Navigator
      initialRouteName="VideoScreen"
      screenOptions={{
        style: { height: 30 },
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: Colors.primary,
          height: 2,
        },
        tabBarLabelStyle: {
          fontSize: FontSizes.small,
          color: Colors.black,
          textTransform: "capitalize",
        },
        tabBarItemStyle: {
          width: windowWidth / 4.5,
        },
      }}
      sceneContainerStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="VideoScreen"
        component={Videos}
        initialParams={{screen:screen}}
        options={{ tabBarLabel: "Videos" }}
      />
      <Tab.Screen
        name="PhotoScreen"
        component={Photo}
        initialParams={{screen:screen}}
        options={{ tabBarLabel: "Photos" }}
      />

      <Tab.Screen
        name="StatusScreen"
        component={Status}
        initialParams={{screen:screen}}
        options={{ tabBarLabel: "Status" }}
      />
      <Tab.Screen
        name="ReviewScreen"
        component={Review}
        initialParams={{screen:screen}}
        options={{ tabBarLabel: "Reviews" }}
      />
      <Tab.Screen
        name="PollScreen"
        component={Poll}
        initialParams={{screen:screen}}
        options={{ tabBarLabel: "Polls" }}
      />
    </Tab.Navigator>
  );
}
