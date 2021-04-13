import { Card, Text } from "@ui-kitten/components";
import React from "react";
import { View, StyleSheet, Image } from "react-native";

const Header = ({title}: {title: string}) => (
  <View>
    <Text category="h5">{title}</Text>
  </View>
);


interface ICardCompontent {
    title: string;
    image: string;
    onPress: () => void;
}

const CardCompontent = ({title, image, onPress}: ICardCompontent) => {
  return (
    <Card onPress={onPress} header={() => <Header title={title} />}>
      <Image style={{width: '100%', height: 200}} source={{uri: image}} />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CardCompontent;
