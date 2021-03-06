import React from 'react';
import { TouchableHighlight } from 'react-native';

type Props = {
  onPress: () => void;
  children: React.ReactNode;
};

export default function Button({ onPress = () => {}, children = null }: Props) {
  return <TouchableHighlight onPress={onPress}>{children}</TouchableHighlight>;
}
