import React from 'react';
import { Button } from 'react-native-elements';
import Colors from '../../global/styles/colors';
import { Dimensions, StyleSheet } from 'react-native';
import { ButtonProps } from 'react-native-elements/dist/buttons/Button';

const PrimaryButton = (props: ButtonProps) => {
  return (
    <Button
      buttonStyle={styles.buttonStyle}
      containerStyle={styles.containerStyle}
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
    width: WIDTH - 60,
  },
  containerStyle: {
    borderRadius: 25,
  },
});

export default PrimaryButton;
