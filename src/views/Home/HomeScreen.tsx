import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import LottieView from "lottie-react-native";
import { SharedElement } from "react-navigation-shared-element";

import blogData from "../../data/blogData.json";
import Space from "../../components/Space";
import ImageChahce from "../../components/ImageCache";
import { IBlogData } from "../../types/json";
import { HomeNavProps } from "../../types/navigations/HomeNavigation";
import { Layout, Text, Toggle } from "@ui-kitten/components";
import { ThemeContext } from "../../context/ThemeContext";

const data: IBlogData = blogData as IBlogData;

const HomeScreen = ({ navigation }: HomeNavProps<"Home">) => {
  const themeContext = React.useContext(ThemeContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 15,
          }}
        >
          <Toggle
            checked={themeContext.theme === "dark"}
            onChange={themeContext.toggleTheme}
          />

          <Text style={{ marginLeft: 10 }}>
            {themeContext.theme === "light" ? "Light" : "Dark"}
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: themeContext.theme === "light" ? "white" : "#212B47",
      },
      headerTitleStyle: {
        color: themeContext.theme === "light" ? "black" : "white",
      },
    });
  });

  const [show, setShow] = useState(false);

  const navigationDetail = (id: number) => {
    navigation.navigate("Detail", { id });
  };

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 5000);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <Layout style={styles.container}>
      {show ? (
        <FlatList
          style={{ paddingHorizontal: 15 }}
          data={data.blogs}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => navigationDetail(index)}>
              <SharedElement id={index.toString()}>
                <ImageChahce
                  cacheKey={`image-id${index}`}
                  style={styles.image}
                  // sometime the image show up is take a long time, cause of that I'm using this image asset
                  // source={require("../../../assets/image.jpg")}
                  source={{ uri: item.imageUrl }}
                />
              </SharedElement>
              <Text category="h4" style={styles.text}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
          ListHeaderComponent={() => <Space />}
          ItemSeparatorComponent={() => <Space />}
        />
      ) : (
        <LottieView
          autoPlay
          loop
          source={require("../../../assets/loading.json")}
        />
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 350,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "white",
  },
});

export default HomeScreen;
