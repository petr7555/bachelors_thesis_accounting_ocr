import { storiesOf } from '@storybook/react-native';
import React from 'react';
import NoFilteredReceipts from './NoFilteredReceipts';

export const Basic = () => <NoFilteredReceipts />;

storiesOf('NoFilteredReceipts', module).add('Basic', Basic);

export default {
  title: 'NoFilteredReceipts',
};
