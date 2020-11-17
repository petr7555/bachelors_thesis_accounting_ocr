import {StyleSheet, View} from 'react-native';
import * as React from 'react';
import SignOutButton from './SignOutButton';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <SignOutButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SettingsScreen;
