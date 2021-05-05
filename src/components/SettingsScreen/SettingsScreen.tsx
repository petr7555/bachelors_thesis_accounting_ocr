import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import SignOutButton from '../SignOutButton/SignOutButton';
import InternetStatus from './InternetStatus';
import ExportButton from './ExportButton';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <InternetStatus />
      <ExportButton containerStyle={styles.exportButton} />
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
  exportButton: {
    marginBottom: 15,
  },
});
export default SettingsScreen;
