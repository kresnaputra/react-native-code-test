import React, { useEffect, useState } from "react";
import {
  Image,
  ImageStyle,
  StyleProp,
} from "react-native";
import * as FileSystem from "expo-file-system";

interface ICachedImage {
  source: { uri: string };
  cacheKey: string;
  style?: StyleProp<ImageStyle>;
}
const CachedImage = (props: ICachedImage) => {
  const {
    source: { uri },
    cacheKey,
    style,
  } = props;

  const filesystemURI = `${FileSystem.cacheDirectory}${cacheKey}`;
  const [imgURI, setImgURI] = useState(uri);

  useEffect(() => {
    const loadImage = async ({ fileURI }: { fileURI: string }) => {
      try {
        // Use the cached image if it exists
        const metadata = await FileSystem.getInfoAsync(fileURI);
        if (!metadata.exists) {
          // download to cache
          setImgURI(uri);
          await FileSystem.downloadAsync(uri, fileURI);
          return;
        }
        setImgURI(fileURI)
      } catch (err) {
        setImgURI(uri);
      }
    };

    loadImage({ fileURI: filesystemURI });
  }, []);

  return (
    <Image
      style={style}
      source={{
        uri: imgURI,
      }}
    />
  );
};

export default React.memo(CachedImage);
