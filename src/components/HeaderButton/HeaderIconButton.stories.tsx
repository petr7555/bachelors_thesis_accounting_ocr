import { storiesOf } from '@storybook/react-native';
import React from 'react';
import HeaderIconButton from './HeaderIconButton';
import { action } from '@storybook/addon-actions';

export const Basic = () => (
  <HeaderIconButton icon="search" onPress={action('onPress')} />
);

storiesOf('HeaderIconButton', module).add('Basic', Basic);

export default {
  title: 'Buttons/HeaderIconButton',
};
