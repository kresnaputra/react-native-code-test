import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import LottieView from "lottie-react-native";

import blogData from "../../data/blogData.json";
import Card from "../../components/Card";
import Space from "../../components/Space";
import { IBlogData } from "../../types/json";
import { HomeNavProps } from "../../types/navigations/HomeNavigation";

const data: IBlogData = blogData as IBlogData;

const HomeScreen = ({ navigation }: HomeNavProps<"Home">) => {
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
    <View style={styles.container}>
      {show ? <FlatList
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
      /> : <LottieView
        autoPlay
        loop
        source={require("../../../assets/loading.json")}
      /> }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default HomeScreen;
