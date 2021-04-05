import React from 'react';
import { Button } from 'react-native-elements';
import Colors from '../../global/styles/colors';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { ButtonProps } from 'react-native-elements/dist/buttons/Button';

const PrimaryButton = (props: ButtonProps | null) => {
  const { width } = useWindowDimensions();

  const buttonStyle = StyleSheet.flatten([
    styles.button,
    { width: width - 60 },
  ]);

  return (
    <Button
      containerStyle={styles.container}
      buttonStyle={buttonStyle}
      titleStyle={styles.title}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.secondary,
    borderRadius: 25,
    height: 50,
  },
  container: {
    borderRadius: 25,
  },
  title: {
    color: Colors.white,
  },
});

export default PrimaryButton;
