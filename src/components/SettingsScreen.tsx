import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DarkModePicker from './DarkModePicker';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is Settings screen</Text>
      <DarkModePicker />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingsScreen;
