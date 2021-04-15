import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Text } from "@ui-kitten/components";
import mapping from "./mapping.json";
import { useFonts } from "expo-font";

import Navigation from "./src";
import UserContextProvider from "./src/context/UserContext";
import { ThemeContext } from "./src/context/ThemeContext";

const App = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  const [loaded, error] = useFonts({
    Roboto: require("./assets/fonts/Roboto/Roboto.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ApplicationProvider
        {...eva}
        theme={eva[theme]}
        customMapping={{ ...eva.mapping, ...mapping }}
      >
        <UserContextProvider>
          <Navigation />
        </UserContextProvider>
      </ApplicationProvider>
    </ThemeContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    textAlign: "center",
  },
});
