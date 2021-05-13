import CartImage from './CartImage';
import { Text } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { MixedTheme } from '../../../App';
import Colors from '../../global/styles/colors';

const NoFilteredReceipts = () => {
  const { colors } = useTheme() as MixedTheme;

  const noReceiptsText = StyleSheet.flatten([
    styles.noReceiptsText,
    { color: colors.grey },
  ]);

  const cartImageColor = colors.grey === Colors.greyDarkMode ? 'dark' : 'light';

  return (
    <View style={styles.noReceiptsContainer}>
      <CartImage colorScheme={cartImageColor} />
      <Text style={noReceiptsText}>No receipts match the search criteria.</Text>
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

export default NoFilteredReceipts;
