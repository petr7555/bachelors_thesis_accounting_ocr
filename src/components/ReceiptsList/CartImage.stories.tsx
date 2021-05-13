import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CartImage from './CartImage';
import { Basic } from '../ToastIcon/ToastIcon.stories';

export const LightMode = () => <CartImage colorScheme="light" />;

export const DarkMode = () => <CartImage colorScheme="dark" />;
DarkMode.parameters = {
  backgrounds: { default: 'black' },
};

storiesOf('ToastIcon', module).add('Basic', Basic);

storiesOf('CartImage', module)
  .add('Light mode', LightMode)
  .addParameters({
    backgrounds: [
      { name: 'black', value: '#000', default: true },
      { name: 'white', value: '#fff' },
    ],
  })
  .add('Dark mode', DarkMode);

export default {
  title: 'CartImage',
};
