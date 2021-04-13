import * as React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { HomeStackParamList } from "../types/navigations/HomeNavigation";
import HomeScreen from "../views/Home/HomeScreen";

const Home = createStackNavigator<HomeStackParamList>();

function AuthNavigation() {
  return (
    <Home.Navigator
      initialRouteName="Home"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Home.Screen name="Home" component={HomeScreen} />
    </Home.Navigator>
  );
}

export default AuthNavigation;
