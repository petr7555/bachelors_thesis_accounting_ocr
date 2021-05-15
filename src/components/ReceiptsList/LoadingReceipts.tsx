import { Text } from 'react-native-elements';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { MixedTheme } from '../../../App';

const LoadingReceipts = () => {
  const { colors } = useTheme() as MixedTheme;

  const noReceiptsText = StyleSheet.flatten([
    styles.noReceiptsText,
    { color: colors.grey },
  ]);

  return (
    <View style={styles.noReceiptsContainer}>
      <ActivityIndicator size="large" style={styles.indicator} />
      <Text style={noReceiptsText}>Receipts are loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: { marginBottom: 10 },
  noReceiptsContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  noReceiptsText: {
    fontSize: 16,
  },
});

export default LoadingReceipts;
