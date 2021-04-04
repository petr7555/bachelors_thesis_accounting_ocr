import React from 'react';
import { Button } from 'react-native-elements';
import Colors from '../../global/styles/colors';
import { Dimensions, StyleSheet } from 'react-native';
import { ButtonProps } from 'react-native-elements/dist/buttons/Button';

const PrimaryButton = (props: ButtonProps | null) => {
  return (
    <Button
      containerStyle={styles.containerStyle}
      buttonStyle={styles.buttonStyle}
      titleStyle={styles.titleStyle}
      {...props}
    />
  );
};

const { width: WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.secondary,
    borderRadius: 25,
    height: 50,
    maxWidth: 400,
    width: WIDTH - 60,
  },
  containerStyle: {
    borderRadius: 25,
  },
  titleStyle: {
    color: Colors.white,
  },
});

export default PrimaryButton;
