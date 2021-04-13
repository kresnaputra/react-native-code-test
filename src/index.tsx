import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./views/Auth/LoginScreen";
import AuthNavigation from "./navigations/AuthNavigation";
import { UserContext } from "./context/UserContext";
import HomeNavigation from "./navigations/HomeNavigation";

export default function Navigation() {
  const { state } = React.useContext(UserContext);

  return (
    <NavigationContainer>
      {state.uid.length > 0 ? <HomeNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}
