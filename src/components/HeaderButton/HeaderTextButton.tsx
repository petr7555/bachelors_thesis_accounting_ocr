import { Text } from 'react-native-elements';
import React from 'react';
import { StyleSheet, TextStyle, TouchableOpacity } from 'react-native';

type Props = {
  onPress: () => void;
  text: string;
  textStyle?: TextStyle;
};

const HeaderTextButton = ({ onPress, text, textStyle }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={[styles.headerText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  headerText: {
    fontFamily: 'sans-serif-medium',
    fontSize: 20,
    fontWeight: 'normal',
  },
});

export default HeaderTextButton;
