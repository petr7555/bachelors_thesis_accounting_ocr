import { Image, StyleSheet } from 'react-native';
import React from 'react';
import whiteCart from '../../../images/cart_white.png';
import blackCart from '../../../images/cart_black.png';

type Props = {
  colorScheme: 'dark' | 'light';
};

const CartImage = ({ colorScheme }: Props) => {
  return (
    <Image
      style={styles.emptyCartImg}
      source={colorScheme === 'dark' ? whiteCart : blackCart}
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
