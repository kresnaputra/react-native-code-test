import { Text } from "@ui-kitten/components";
import Constants from 'expo-constants';
import * as Notifications from "expo-notifications";
import React, { useEffect, useRef, useState } from "react";
import { Subscription } from "@unimodules/core";
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Space from "../../components/Space";

import blogData from "../../data/blogData.json";
import { IBlogData } from "../../types/json";
import { HomeNavProps } from "../../types/navigations/HomeNavigation";

const data: IBlogData = blogData as IBlogData;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification() {
  console.log("lalaland");
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  });
}

interface INotifcationListener extends React.MutableRefObject<any>, Subscription {}

const DetailScreen = ({ route }: HomeNavProps<"Detail">) => {
  const [isSeventy, setIsSeventy] = useState(false);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef() as unknown as INotifcationListener;
  const responseListener = useRef() as unknown as INotifcationListener;

  const { params } = route;
  const { id } = params;

  const blog = data.blogs[id];

  const date = new Date(blog.datePublished);

  const handleOnScroll = async(native: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { nativeEvent } = native;
    const getSeventyPersentRead = nativeEvent.contentSize.height * 0.7;

    if (
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >
      getSeventyPersentRead
    ) {
      if (!isSeventy) {
        await schedulePushNotification();
        setIsSeventy(true);
      }
    }
  };

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(!notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <ScrollView
      onScroll={handleOnScroll}
      style={styles.container}
      scrollEventThrottle={400}
    >
      <Image source={{ uri: blog.imageUrl }} style={styles.image} />
      <Space />
      <View style={{ paddingHorizontal: 10 }}>
        <Text category="h2">{blog.title.toUpperCase()}</Text>
        <Text category="label">Author: {blog.author}</Text>
        <Text category="label">
          Date: {date.getFullYear()}-{date.getMonth()}-{date.getDate()}
        </Text>
        <Text category="label">Views: {blog.views}</Text>
        <Space />
        <Text>{blog.content}</Text>
      </View>
      <Space />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 200,
  },
  containerInformation: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default DetailScreen;
