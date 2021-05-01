import { storiesOf } from '@storybook/react-native';
import React from 'react';
import FullWidthImage from './FullWidthImage';

export const Basic = () => (
  <FullWidthImage uri="https://storage.googleapis.com/images_bachelorsthesisaccountingocr/sample_receipt_01.jpg" />
);

storiesOf('FullWidthImage', module).add('Basic', Basic);

export default {
  title: 'FullWidthImage',
};
