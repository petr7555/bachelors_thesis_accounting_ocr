import CartImage from './CartImage';
import { Text } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { MixedTheme } from '../../../App';

const NoReceipts = () => {
  const { colors } = useTheme() as MixedTheme;

  const noReceiptsText = StyleSheet.flatten([
    styles.noReceiptsText,
    { color: colors.grey },
  ]);

  return (
    <View style={styles.noReceiptsContainer}>
      <CartImage />
      <Text style={noReceiptsText}>You do not have any receipts yet.</Text>
      <Text style={noReceiptsText}>
        Click the scan button below to add a receipt.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noReceiptsContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  noReceiptsText: {
    fontSize: 16,
  },
});

export default NoReceipts;
