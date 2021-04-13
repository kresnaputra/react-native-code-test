import * as React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { AuthStackParamList } from "../types/navigations/AuthNavigation";
import LoginScreen from "../views/Auth/LoginScreen";
import RegisterScreen from "../views/Auth/RegisterScreen";

const AuthStack = createStackNavigator<AuthStackParamList>();

function AuthNavigation() {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

export default AuthNavigation;
