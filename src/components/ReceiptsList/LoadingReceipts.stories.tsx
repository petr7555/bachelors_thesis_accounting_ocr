import { storiesOf } from '@storybook/react-native';
import React from 'react';
import LoadingReceipts from './LoadingReceipts';

export const Basic = () => <LoadingReceipts />;

storiesOf('LoadingReceipts', module).add('Basic', Basic);

export default {
  title: 'LoadingReceipts',
};
