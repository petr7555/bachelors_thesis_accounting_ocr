import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import React from 'react';

type Props = {
  onPress: () => void;
  uri?: string;
  text: string;
};

const ImageThumbnail = ({ onPress, uri, text }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.touchable}>
      <View style={styles.imagePreview}>
        <Image style={styles.receiptImg} source={{ uri }} />
        <Text style={styles.showImageText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  receiptImg: {
    height: 50,
    width: 50,
  },
  showImageText: {
    fontSize: 18,
    paddingLeft: 10,
  },
  touchable: {
    width: '50%',
  },
});

export default ImageThumbnail;
