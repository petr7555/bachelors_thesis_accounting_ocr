import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../global/styles/colors';

type Props = {
  onPress: () => void;
  processing: boolean;
};

const ScanButtonRaw = ({ onPress, processing }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.roundButton}
      disabled={processing}>
      {processing ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Icon style={styles.icon} name="scan" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: Colors.white,
    fontSize: 50,
  },
  roundButton: {
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    borderColor: Colors.primary,
    borderRadius: 100,
    borderWidth: 5,
    height: 90,
    justifyContent: 'center',
    marginBottom: 41,
    width: 90,
  },
});

export default ScanButtonRaw;
