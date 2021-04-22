import { storiesOf } from '@storybook/react-native';
import React from 'react';
import FullWidthImage from './FullWidthImage';

export const Basic = () => (
  // TODO add english receipt form Verca
  <FullWidthImage uri="https://media-cdn.tripadvisor.com/media/photo-s/0b/91/f0/0f/receipt.jpg" />
);

storiesOf('FullWidthImage', module).add('Basic', Basic);

export default {
  title: 'FullWidthImage',
};
