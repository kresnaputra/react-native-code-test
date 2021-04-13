import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import blogData from "../../data/blogData.json";
import Card from "../../components/Card";
import Space from "../../components/Space";
import { IBlogData } from "../../types/json";
import { HomeNavProps } from "../../types/navigations/HomeNavigation";

const data: IBlogData = blogData as IBlogData;

const HomeScreen = ({ navigation }: HomeNavProps<"Home">) => {
  const navigationDetail = (id: number) => {
    navigation.navigate("Detail", { id });
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ paddingHorizontal: 15 }}
        data={data.blogs}
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
