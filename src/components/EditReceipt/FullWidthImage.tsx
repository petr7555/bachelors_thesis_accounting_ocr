import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';

type Props = {
  uri?: string;
};

const FullWidthImage = ({ uri }: Props) => {
  const [ratio, setRatio] = useState(1);
  useEffect(() => {
    if (uri) {
      // @ts-ignore method getSize does exist on Image
      Image.getSize(uri, (width, height) => {
        setRatio(width / height);
      });
    }
  }, [uri]);

  return (
    <Image
      style={[styles.image, { aspectRatio: ratio }]}
      resizeMode="contain"
      source={{ uri }}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: undefined,
    width: '100%',
  },
});
export default FullWidthImage;
