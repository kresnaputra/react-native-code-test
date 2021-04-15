import * as React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { HomeStackParamList } from "../types/navigations/HomeNavigation";
import HomeScreen from "../views/Home/HomeScreen";
import DetailScreen from "../views/Home/DetailScreen";

const Home = createSharedElementStackNavigator<HomeStackParamList>();

function AuthNavigation() {
  return (
    <Home.Navigator
      initialRouteName="Home"
      
    >
      <Home.Screen name="Home" component={HomeScreen} />
      <Home.Screen
        name="Detail"
        component={DetailScreen}
        sharedElementsConfig={(route) => {
          return [route.params.id.toString()];
        }}
      />
    </Home.Navigator>
  );
}

export default AuthNavigation;
