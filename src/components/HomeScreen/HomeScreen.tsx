import { useTheme } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import * as React from 'react';
import ReceiptsList from '../ReceiptsList/ReceiptsList';

declare const global: { HermesInternal: null | {} };

const HomeScreen = () => {
  const { colors } = useTheme();
  return (
    <>
      {__DEV__ && global.HermesInternal && (
        <View style={styles.engine}>
          <Text style={{ color: colors.text }}>Engine: Hermes</Text>
        </View>
      )}
      <ReceiptsList />
    </>
  );
};

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
});

export default HomeScreen;
