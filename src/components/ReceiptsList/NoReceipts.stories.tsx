import { storiesOf } from '@storybook/react-native';
import React from 'react';
import NoReceipts from './CartImage';

export const Basic = () => <NoReceipts />;

storiesOf('NoReceipts', module).add('Basic', Basic);

export default {
  title: 'NoReceipts',
};
