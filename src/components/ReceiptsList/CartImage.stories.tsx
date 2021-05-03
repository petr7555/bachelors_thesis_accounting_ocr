import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CartImage from './CartImage';

export const Basic = () => <CartImage />;

storiesOf('CartImage', module).add('Basic', Basic);

export default {
  title: 'CartImage',
};
