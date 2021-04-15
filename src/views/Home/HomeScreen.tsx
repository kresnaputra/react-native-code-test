import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import LottieView from "lottie-react-native";

import blogData from "../../data/blogData.json";
import Card from "../../components/Card";
import Space from "../../components/Space";
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
        <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 15}}>
          <Toggle
            checked={themeContext.theme === "dark"}
            onChange={themeContext.toggleTheme}
          />
            
          <Text style={{marginLeft: 10}}>{themeContext.theme === 'light' ? 'Light' : 'Dark'}</Text>
        </View>
      ),
      headerStyle: {backgroundColor: themeContext.theme === 'light' ? 'white' : '#212B47'},
      headerTitleStyle: {color: themeContext.theme === 'light' ? 'black' : 'white'}
    });
  })

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
            <Card
              title={item.title}
              image={item.imageUrl}
              onPress={() => navigationDetail(index)}
            />
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
});

export default HomeScreen;
