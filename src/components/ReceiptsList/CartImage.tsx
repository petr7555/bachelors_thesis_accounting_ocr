import { StyleSheet, useColorScheme } from 'react-native';
import { Image } from 'react-native';
import React from 'react';
import whiteCart from '../../../images/cart_white.png';
import blackCart from '../../../images/cart_black.png';

const CartImage = () => {
  // ⚠ The black cart image will always be used on Windows in debug mode,
  // see App.tsx for explanation
  // const scheme = 'dark';
  const scheme = useColorScheme();

  return (
    <Image
      style={styles.emptyCartImg}
      source={scheme === 'dark' ? whiteCart : blackCart}
    />
  );
};

const styles = StyleSheet.create({
  emptyCartImg: {
    height: 100,
    resizeMode: 'contain',
    width: 80,
  },
});

export default CartImage;
