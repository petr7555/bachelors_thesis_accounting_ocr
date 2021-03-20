import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { IconProps } from 'react-native-vector-icons/Icon';
import { useTheme } from 'react-native-elements';

/**
 * Uses color set by theme unless another color is explicitly given in props
 */
const ThemedIonIcon = (props: IconProps) => {
  const { theme } = useTheme();
  return <Icon color={theme.colors?.black} {...props} />;
};

export default ThemedIonIcon;
