import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import * as React from 'react';
import ReceiptsList from '../ReceiptsList/ReceiptsList';

declare const global: { HermesInternal: null | {} };

const HomeScreen = () => {
  return (
    <>
      {/* Hermes is inactive in Debug mode (enabled from Dev Menu) */}
      {__DEV__ && global.HermesInternal && (
        <View style={styles.engine}>
          <Text>Engine: Hermes</Text>
        </View>
      )}
      <ReceiptsList />
    </>
  );
};

const styles = StyleSheet.create({
  engine: {
    paddingRight: 5,
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
});

export default HomeScreen;
