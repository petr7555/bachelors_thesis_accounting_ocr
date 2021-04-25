import React, { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { Image } from 'react-native-elements';
import { isWeb } from '../../global/utils/platform';

type Props = {
  uri?: string;
};

const FullWidthImage = ({ uri }: Props) => {
  const [ratio, setRatio] = useState(1);
  const { width: windowWidth } = useWindowDimensions();
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    if (uri) {
      // @ts-ignore method getSize does exist on Image
      Image.getSize(uri, (width, height) => {
        setRatio(width / height);
        setImgHeight((windowWidth / width) * height);
      });
    }
  }, [uri, windowWidth]);

  return (
    <Image
      style={[
        styles.image,
        { aspectRatio: ratio },
        { height: isWeb ? imgHeight : undefined },
      ]}
      resizeMode="contain"
      source={{ uri }}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
  },
});
export default FullWidthImage;
