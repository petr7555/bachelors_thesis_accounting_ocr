import { storiesOf } from '@storybook/react-native';
import React from 'react';
import HeaderTextButton from './HeaderTextButton';
import { action } from '@storybook/addon-actions';

export const Basic = () => (
  <HeaderTextButton text="Save" onPress={action('onPress')} />
);

storiesOf('HeaderTextButton', module).add('Basic', Basic);

export default {
  title: 'Buttons/HeaderTextButton',
};
