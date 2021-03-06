import React from 'react';
import { BaseButton } from './BaseButton';
import { Text } from 'react-native';
import { action } from '@storybook/addon-actions';

export const light = () => (
  <BaseButton onPress={action('onPress')}>
    <Text>Click Me!</Text>
  </BaseButton>
);

export default {
  title: 'Buttons/BaseButtons',
};
