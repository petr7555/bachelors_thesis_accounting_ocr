import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../ThemedIcon/ThemedIonIcon';

type Props = {
  onPress: () => void;
  icon: string;
};

const HeaderIconButton = ({ onPress, icon }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon style={styles.icon} name={icon} />
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
  icon: {
    fontSize: 25,
  },
});

export default HeaderIconButton;
