import React from 'react';
import { storiesOf } from '@storybook/react-native';
import ScanButtonRaw from './ScanButtonRaw';
import { action } from '@storybook/addon-actions';

export const NotProcessing = () => (
  <ScanButtonRaw onPress={action('onPress')} processing={false} />
);

export const Processing = () => (
  <ScanButtonRaw onPress={action('onPress')} processing={true} />
);

storiesOf('ScanButtonRaw', module)
  .add('NotProcessing', NotProcessing)
  .add('Processing', Processing);

export default {
  title: 'ScanButtonRaw',
};
