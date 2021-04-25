import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import SignOutButton from '../SignOutButton/SignOutButton';
import InternetStatus from './InternetStatus';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <InternetStatus />
      <SignOutButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
export default SettingsScreen;
