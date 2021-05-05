import React from 'react';
import { Button, ButtonProps } from 'react-native-elements';
import Colors from '../../global/styles/colors';
import { StyleSheet, useWindowDimensions } from 'react-native';

const PrimaryButton = ({ containerStyle, ...props }: ButtonProps) => {
  const { width } = useWindowDimensions();

  const buttonStyle = StyleSheet.flatten([
    styles.button,
    { width: width - 60 },
  ]);

  const mergedContainerStyles = StyleSheet.flatten([
    styles.container,
    containerStyle,
  ]);

  return (
    <Button
      containerStyle={mergedContainerStyles}
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
