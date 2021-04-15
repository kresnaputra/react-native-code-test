import { Layout, Text } from "@ui-kitten/components";
import { SharedElement } from "react-navigation-shared-element";
import LottieView from "lottie-react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Subscription } from "@unimodules/core";
import {
  AppState,
  AppStateStatus,
  Image,
  ImageBackground,
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
import { ThemeContext } from "../../context/ThemeContext";
import ImageCache from "../../components/ImageCache";

const data: IBlogData = blogData as IBlogData;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
  handleSuccess: (notificationIdentifier) => {
    Notifications.dismissNotificationAsync(notificationIdentifier);
  },
});

async function schedulePushNotification() {
  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hey continue read this article",
    },
    trigger: { hour: 3, repeats: true },
  });
  return identifier;
}

async function scheduleCancel(identifier?: string) {
  if (identifier) {
    await Notifications.cancelScheduledNotificationAsync(identifier);
    return;
  }

  await Notifications.cancelAllScheduledNotificationsAsync();
}

interface INotifcationListener
  extends React.MutableRefObject<any>,
    Subscription {}

const DetailScreen = ({ route, navigation }: HomeNavProps<"Detail">) => {
  const themeContext = React.useContext(ThemeContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: themeContext.theme === "light" ? "white" : "#212B47",
      },
      headerTintColor: themeContext.theme === "light" ? "black" : "white",
    });
  });
  const notificationListener = (useRef() as unknown) as INotifcationListener;
  const responseListener = (useRef() as unknown) as INotifcationListener;
  const appState = useRef(AppState.currentState);

  const [identifier, setIdentifier] = useState("");
  const [isSeventy, setIsSeventy] = useState(false);
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [
    notification,
    setNotification,
  ] = useState<Notifications.Notification>();

  const { params } = route;
  const { id } = params;

  const blog = data.blogs[id];

  const date = new Date(blog.datePublished);

  const handleOnScroll = async (
    native: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const { nativeEvent } = native;
    const getSeventyPersentRead = nativeEvent.contentSize.height * 0.7;

    if (
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >
      getSeventyPersentRead
    ) {
      if (!isSeventy) {
        setIsSeventy(true);
        const identifier = await schedulePushNotification();
        setIdentifier(identifier);
      }
    }
    if (
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y ===
      nativeEvent.contentSize.height
    ) {
      setDone(true);
      scheduleCancel();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 5000);

    AppState.addEventListener("change", _handleAppStateChange);

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        navigation.navigate("Detail", { id });
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
      clearTimeout(timer);
    };
  }, []);

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.current.match(/active/) && nextAppState === "background") {
      Notifications.getPresentedNotificationsAsync();
    }
    if (nextAppState === "active") {
      scheduleCancel(identifier);
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  return (
    <ScrollView
      onScrollEndDrag={handleOnScroll}
      style={styles.container}
      scrollEventThrottle={1000}
    >
      <SharedElement style={{backgroundColor: themeContext.theme === 'light' ? 'white' : '#212B47'}} id={id.toString()}>
        <ImageCache
          cacheKey={`image-id${id}`}
          // sometime the image show up is take a long time, cause of that I'm using this image asset
          // source={require('../../../assets/image.jpg')}
          source={{uri: blog.imageUrl}}
          style={styles.image}
          
        />
      </SharedElement>

      <Space />
      <Layout style={{ paddingHorizontal: 10 }}>
        <Text category="h2">{blog.title.toUpperCase()}</Text>
        <Text category="label">Author: {blog.author}</Text>
        <Text category="label">
          Date: {date.getFullYear()}-{date.getMonth()}-{date.getDate()}
        </Text>
        <Text category="label">Views: {blog.views}</Text>
        <Space />
        <Text>{blog.content}</Text>
      </Layout>
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
