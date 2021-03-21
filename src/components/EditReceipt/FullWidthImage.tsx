import React, { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';

type Props = {
  uri?: string;
};

const FullWidthImage = ({ uri }: Props) => {
  const [ratio, setRatio] = useState(1);
  useEffect(() => {
    if (uri) {
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
