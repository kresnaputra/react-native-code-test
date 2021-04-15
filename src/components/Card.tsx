import { Text } from "@ui-kitten/components";
import React from "react";
import { View, StyleSheet, Image, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ICardCompontent {
  title: string;
  image: string;
  onPress: () => void;
}

const CardCompontent = ({ title, image, onPress }: ICardCompontent) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        style={styles.container}
        borderRadius={20}
        source={{ uri: image }}
      >
        <Text category="h4" style={{ color: "white", textAlign: "center" }}>
          {title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 350,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CardCompontent;
