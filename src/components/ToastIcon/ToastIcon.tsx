import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { IconProps } from 'react-native-vector-icons/Icon';
import Colors from '../../global/styles/colors';
import { StyleSheet } from 'react-native';

const ToastIcon = (props: IconProps) => {
  return <Icon style={styles.toastIcon} {...props} />;
};

const styles = StyleSheet.create({
  toastIcon: {
    color: Colors.white,
    fontSize: 20,
  },
});

export default ToastIcon;
